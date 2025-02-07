import React, { useState } from 'react';
import styles from '../principal.module.css';
import logo from '../assets/lk.svg';
import { Link } from 'react-router-dom';
import SaidaModal from '../pages/Saida';
import EntradaModal from '../pages/Entrada';

function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProduct('');
    setQuantity('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${modalType} de Produto:`, product, 'Quantidade:', quantity);
    closeModal();
  };

  return (
    <div className={styles.corpo}>
      <div className={styles.navbarItems}>
        <img className={styles.logo} src={logo} alt="Lkustons" />
        <div className={styles.navbarLinksContainer}>
          <Link className={styles.navbarLink} to="/Produtos">Produtos</Link>

          <Link
            className={styles.navbarLink}
            to="#"
            onClick={() => openModal('Entrada')}
          >
            Entrada
          </Link>

          <Link
            className={styles.navbarLink}
            to="#"
            onClick={() => openModal('Saída')}
          >
            Saída
          </Link>

          <Link className={styles.navbarLink} to="/Relatorio">Relatório</Link>
        </div>


        <EntradaModal
          isOpen={isModalOpen && modalType === 'Entrada'}
          onClose={closeModal}
          product={product}
          setProduct={setProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          handleSubmit={handleSubmit}
        />


        <SaidaModal
          isOpen={isModalOpen && modalType === 'Saída'}
          onClose={closeModal}
          product={product}
          setProduct={setProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          handleSubmit={handleSubmit}
        />

      </div>
      <div className={styles.logoMeio}>
        <img className={styles.meio} src={logo} alt="Logo Meio" />
      </div>

    </div>


  );
}

export default Navbar;

