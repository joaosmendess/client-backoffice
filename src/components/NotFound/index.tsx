// src/components/NotFound.tsx
import React from 'react';
import notFound from '../../assets/Oops_-404-Error-with-a-broken-robot-amico.webp'

const NotFound: React.FC = () => {
  return (
    <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
             <img src={notFound} alt="404 - Página Não Encontrada" style={{ height: '25rem' }} />

      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
    </div>
  );
};

export default NotFound;
