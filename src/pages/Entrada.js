
import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/FirebaseConfigDb';
import styles from './EntradaModal.module.css';

function EntradaModal({ isOpen, onClose }) {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productsRef = collection(db, 'produtos');
      const q = query(productsRef, where('product', '==', product));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        
        const productDoc = querySnapshot.docs[0];
        const currentQuantity = productDoc.data().quantity;
        const newQuantity = currentQuantity + parseInt(quantity, 10);

        await updateDoc(doc(db, 'produtos', productDoc.id), {
          quantity: newQuantity,
          date: new Date().toISOString(),
        });
        alert(`Quantidade de ${product} atualizada para ${newQuantity}.`);
      } else {
        
        await addDoc(productsRef, {
          product,
          quantity: parseInt(quantity, 10),
          date: new Date().toISOString(),
        });
        alert(`Produto ${product} adicionado com sucesso.`);
      }

      onClose(); 
    } catch (error) {
      console.error("Erro ao adicionar ou atualizar produto: ", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContentEntrada}>
        <h2>Entrada de Produto</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="product">Produto</label>
          <input
            type="text"
            id="product"
            name="product"
            placeholder="Nome do Produto"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
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

export default EntradaModal;
