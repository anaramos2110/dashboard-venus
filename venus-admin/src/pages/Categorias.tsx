// Página de categorias, onde o admin pode criar novas categorias dentro do catálogo, como "Bolos", "Doces", "Salgados", etc. Cada categoria pode ter uma imagem representativa e um nome. O admin pode editar ou excluir categorias existentes, e também pode arrastar e soltar para reordenar a lista de categorias. Essa página ajuda a organizar os produtos em grupos, facilitando a navegação para os clientes na loja online.

export default function Catalogo() {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm">
      <h1 className="text-xl font-bold text-[#AA1F64]">Nossas Categorias</h1>
      <p className="text-gray-400">Adicione categorias ou novos produtos.</p>
    </div>
  );
}