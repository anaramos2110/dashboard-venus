// Página principal do dashboard, com sidebar e área de conteúdo dinâmico para produtos, categorias e banners.

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faTags, 
  faImages, 
  faChartLine, 
  faSignOutAlt,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('produtos');

  return (
    <div className="flex min-h-screen bg-[#FFF0FA] font-['Montserrat'] text-gray-800">
      
      {/* SIDEBAR LATERAL */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-8 border-b border-gray-100 flex flex-col items-center">
          {/* Espaço para sua Logo */}
          <div className="w-20 h-20 bg-[#f2d5da] rounded-full flex items-center justify-center mb-4">
             <span className="text-[#AA1F64] font-bold text-xl">V</span>
          </div>
          <h1 className="text-[#AA1F64] font-bold tracking-widest text-xs uppercase text-center">
            Vênus Admin
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('produtos')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === 'produtos' ? 'bg-[#AA1F64] text-white shadow-md' : 'text-gray-500 hover:bg-[#f2d5da]/30'}`}
          >
            <FontAwesomeIcon icon={faBox} />
            <span className="text-sm font-semibold">Produtos</span>
          </button>

          <button 
            onClick={() => setActiveTab('categorias')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === 'categorias' ? 'bg-[#AA1F64] text-white shadow-md' : 'text-gray-500 hover:bg-[#f2d5da]/30'}`}
          >
            <FontAwesomeIcon icon={faTags} />
            <span className="text-sm font-semibold">Categorias</span>
          </button>

          <button 
            onClick={() => setActiveTab('carrossel')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === 'carrossel' ? 'bg-[#AA1F64] text-white shadow-md' : 'text-gray-500 hover:bg-[#f2d5da]/30'}`}
          >
            <FontAwesomeIcon icon={faImages} />
            <span className="text-sm font-semibold">Banners</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="text-sm font-semibold">Sair</span>
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gerenciar {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p className="text-gray-400 text-sm">Controle total da Vênus Confeitaria</p>
          </div>
          
          <button className="bg-[#AA1F64] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} />
            Novo Item
          </button>
        </header>

        {/* ÁREA DE CONTEÚDO DINÂMICO */}
        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white min-h-400px">
          {activeTab === 'produtos' && (
            <div className="text-center py-20">
              <p className="text-gray-400 italic">Lista de produtos aparecerá aqui...</p>
            </div>
          )}
          {/* Aqui chamaremos os componentes de Lista de Categorias e Banners */}
        </section>
      </main>
    </div>
  );
}