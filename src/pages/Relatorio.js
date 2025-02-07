import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/FirebaseConfigDb';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './Relatorio.module.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Relatorio() {
  const [produtos, setProdutos] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const reportRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'produtos'));
        const produtosData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setProdutos(produtosData);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchData();
  }, []);

  const filteredReports = produtos.filter((produto) => {
    const produtoDate = new Date(produto.date);
    return (
      (!startDate || produtoDate >= startDate) &&
      (!endDate || produtoDate <= endDate)
    );
  });

  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('relatorio_produtos.pdf');
    }).catch((error) => {
      console.error('Erro ao gerar o PDF:', error);
    });
  };

  const handleBackClick = () => {
    navigate('/principal');
  };

  return (
    <div>
      <Navbar />

      <div className={styles.relatorioContainer} ref={reportRef}>
        <h1>Relatório de Produtos</h1>

        <div className={styles.filterContainer}>
          <label>Data de Início:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Selecione a data de início"
          />

          <label>Data de Fim:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Selecione a data de fim"
          />
        </div>

        <table className={styles.relatorioTable}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((produto, index) => (
              <tr key={produto.id}>
                <td>{produto.codigo ? produto.codigo : index + 1}</td>
                <td>{produto.product}</td>
                <td>{produto.quantity}</td>
                <td>{new Date(produto.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.buttonContainer}>
          <button className={styles.downloadButton} onClick={downloadPDF}>
            Baixar Relatório em PDF
          </button>
          <button className={styles.backButton} onClick={handleBackClick}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Relatorio;
