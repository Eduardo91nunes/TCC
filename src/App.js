import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Principal from './pages/Principal'; 
import Produtos from './pages/Produtos'
import Entrada from './pages/Entrada'
import Saida from './pages/Saida'
import Relatorio from './pages/Relatorio'


const App = () => {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Principal" element={<Principal />} />
          <Route path="/Produtos" element={<Produtos />} />
          <Route path="/Entrada" element={<Entrada />} />
          <Route path="/Saida" element={<Saida/>} />
          <Route path="/Relatorio" element={<Relatorio />} />

        
        </Routes>
      
    </Router>
  );
};

export default App;
