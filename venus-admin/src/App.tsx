// Página principal do Admin, onde configuramos as rotas e a estrutura geral do layout

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar'; // Vamos criar esse componente
import DashboardHome from '@/pages/DashboardHome';
import Produtos from '@/pages/Produtos';
import Categorias from '@/pages/Categorias';
import Banners from '@/pages/Banners';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#FFF0FA] font-['Montserrat']">
        {/* O Sidebar fica fixo em todas as rotas do Admin */}
        {/* <Sidebar /> */}

        {/* Conteúdo Principal que muda conforme a rota */}
        <main className="flex-1 p-10 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/banners" element={<Banners />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}