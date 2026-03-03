import { useState } from 'react';
import { api } from '../../Services/api';
import { toast } from 'sonner';

export function FormProduto({ onProdutoCadastrado }) {
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', estoque: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Converte os valores para números antes de salvar
    const produtoFormatado = {
      ...novoProduto,
      preco: Number(novoProduto.preco),
      estoque: Number(novoProduto.estoque)
    };

    try {
      await api.post('/produtos', produtoFormatado);
      toast.success("Produto cadastrado com sucesso!");
      setNovoProduto({ nome: '', preco: '', estoque: '' }); // Limpa o formulário
      onProdutoCadastrado(); // Atualiza a lista na tela
    } catch (error) {
      toast.error("Erro ao cadastrar produto.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-gray-100">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome do Insumo</label>
        <input 
          required
          type="text"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Ex: Ureia Agrícola"
          value={novoProduto.nome}
          onChange={e => setNovoProduto({...novoProduto, nome: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Preço (R$)</label>
        <input 
          required
          type="number"
          step="0.01"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="0.00"
          value={novoProduto.preco}
          onChange={e => setNovoProduto({...novoProduto, preco: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Qtd Inicial</label>
        <input 
          required
          type="number"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="0"
          value={novoProduto.estoque}
          onChange={e => setNovoProduto({...novoProduto, estoque: e.target.value})}
        />
      </div>

      <button className="bg-green-700 text-white font-bold py-2 px-4 rounded-md hover:bg-green-800 transition-colors shadow-lg">
        + Adicionar ao Estoque
      </button>
    </form>
  );
}