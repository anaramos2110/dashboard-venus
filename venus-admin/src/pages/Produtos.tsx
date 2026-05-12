import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCheckCircle, faSpinner, faCookieBite } from '@fortawesome/free-solid-svg-icons';
// Importando direto para evitar qualquer erro de alias path
import { db, storage } from '../../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Produtos() {
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [promocao, setPromocao] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !nome || !preco) return alert("Preencha todos os campos da Vênus! ✨");

    setLoading(true);
    try {
      const fileName = `${Date.now()}_${image.name}`;
      const storageRef = ref(storage, `produtos/${fileName}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "produtos"), {
        nome,
        preco: parseFloat(preco),
        promocao,
        imageUrl: url,
        createdAt: new Date()
      });

      alert("Doce cadastrado com sucesso! 🍰");
      // Limpa os campos para o próximo cadastro
      setNome(''); setPreco(''); setPromocao(false); setImage(null); setPreview(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar. Verifique se o Storage está ativo no Firebase!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 font-['Montserrat'] animate-fade-in p-2">
      <header>
        <h2 className="text-3xl font-bold text-gray-800">Gerenciar Vitrine</h2>
        <p className="text-gray-400 text-sm">Cadastre novos doces e gerencie o catálogo da Vênus.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* COLUNA DO FORMULÁRIO (Fixa e sempre visível) */}
        <div className="xl:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white sticky top-6">
            <h3 className="text-[#AA1F64] font-bold mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faCookieBite} />
              Novo Produto
            </h3>

            <div className="space-y-5">
              {/* Box de Upload */}
              <div className="relative h-52 bg-[#FFF0FA] rounded-[2rem] border-2 border-dashed border-[#f2d5da] flex items-center justify-center overflow-hidden hover:border-[#AA1F64] transition-all group">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center p-4">
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="text-[#AA1F64] text-3xl mb-2 opacity-30" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Foto do Doce</p>
                  </div>
                )}
                <input 
                  type="file" 
                  onChange={handleImageChange} 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  accept="image/*" 
                />
              </div>

              {/* Inputs */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-4">Nome do Doce</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Bolo de Pote"
                  className="w-full mt-1 bg-[#FFF0FA] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#AA1F64] text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-4">Preço (R$)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  placeholder="0,00"
                  className="w-full mt-1 bg-[#FFF0FA] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#AA1F64] text-sm"
                />
              </div>

              <label className="flex items-center gap-3 p-4 bg-[#FFF0FA] rounded-2xl cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={promocao} 
                  onChange={(e) => setPromocao(e.target.checked)} 
                  className="w-5 h-5 accent-[#AA1F64]" 
                />
                <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">Destaque Promoção</span>
              </label>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#AA1F64] text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-[#8e1a53] transition-all disabled:bg-gray-300 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span>Salvar Produto</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* COLUNA DA LISTA (Onde os produtos vão aparecer) */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white min-h-[600px]">
             <h3 className="text-gray-800 font-bold mb-6">Produtos no Catálogo</h3>
             
             {/* Placeholder para a lista que vamos carregar do Firebase */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-100 rounded-3xl">
                  <p className="text-gray-400 italic">Lista de produtos em breve...</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}