import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/FirebaseConfigDb';
import styles from './Produtos.module.css';
import Navbar from './Navbar';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'produtos'));
      setProdutos(
        querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate('/principal');
  };

  return (
    <div>
      <Navbar />

      <div className={styles.produtosContainer}>
        <h1>Lista de Produtos</h1>
        
        <div className={styles.tableContainer}>
          <table className={styles.produtosTable}>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={produto.id}>
                  <td>{produto.codigo ? produto.codigo : index + 1}</td>
                  <td>{produto.product}</td>
                  <td>{produto.quantity}</td>
                  <td>{new Date(produto.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.backButton} onClick={handleBackClick}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Produtos;
