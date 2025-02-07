import React, { useState } from 'react';
import styles from './SaidaModal.module.css';
import { db } from '../services/FirebaseConfigDb';
import { collection, doc, getDocs, query, updateDoc, deleteDoc, where } from 'firebase/firestore';

function SaidaModal({ isOpen, onClose }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const normalizedProductName = productName.toLowerCase();

      
      const productsRef = collection(db, 'produtos'); 
      const q = query(productsRef, where('product', '==', normalizedProductName)); 
      const querySnapshot = await getDocs(q);

      console.log("Query result:", querySnapshot);
      console.log("Nome do produto pesquisado:", normalizedProductName);

      if (!querySnapshot.empty) {
        const productDoc = querySnapshot.docs[0];
        const currentQuantity = productDoc.data().quantity;

        const newQuantity = currentQuantity - parseInt(quantity);

        if (newQuantity > 0) {
          await updateDoc(doc(db, 'produtos', productDoc.id), {
            quantity: newQuantity,
          });
          alert(`A quantidade de ${quantity} foi retirada. Novo estoque: ${newQuantity}.`);
        } else {
          await deleteDoc(doc(db, 'produtos', productDoc.id));
          alert(`O produto ${productName} foi removido do estoque.`);
        }
      } else {
        alert('Produto não encontrado no estoque.');
      }
    } catch (error) {
      console.error("Erro ao dar saída no produto:", error);
      alert('Erro ao atualizar o estoque.');
    }

    setProductName('');
    setQuantity('');
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContentSaida}>
        <h2>Saída de Produto</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="product">Produto</label>
          <input
            type="text"
            id="product"
            name="product"
            placeholder="Nome do Produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />

          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1"
          />

          <div className={styles.buttonGroup}>
            <button type="submit">Enviar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SaidaModal;
