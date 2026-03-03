import { useEffect, useState } from "react";
import { api } from "../../Services/api";
import { toast } from "sonner";
import { FormCliente } from "./FormCliente";

export function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);

  function carregarDados() {
    api.get("/clientes").then((res) => setClientes(res.data));
    api.get("/vendas").then((res) => setVendas(res.data));
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function excluirCliente(id, nomeFazenda) {
    const temCompras = vendas.some((v) => v.clienteNome === nomeFazenda);

    if (temCompras) {
      toast.error(
        "Proibido excluir: Este cliente já possui histórico de compras!"
      );
      return;
    }

    toast(`Excluir a fazenda ${nomeFazenda}?`, {
      duration: Infinity, // não fecha sozinho

      action: {
        label: "Confirmar",
        onClick: async () => {
          try {
            await api.delete(`/clientes/${id}`);
            toast.success("Cliente removido com sucesso!");
            carregarDados();
          } catch (error) {
            toast.error("Erro ao excluir cliente.");
          }
        },
      },

      cancel: {
        label: "Cancelar",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-green-800 mb-8 tracking-tighter">
        Painel de Clientes
      </h1>

      <FormCliente onClienteCadastrado={carregarDados} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clientes.map((cliente) => (
          <div
            key={cliente.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {cliente.nomeFazenda}
              </h2>
              <p className="text-gray-500 text-sm">{cliente.proprietario}</p>
              <p className="text-gray-500 text-sm">{cliente.whatsapp}</p>
              <p className="text-gray-500 text-sm">{cliente.email}</p>
            </div>

            <button
              onClick={() =>
                excluirCliente(cliente.id, cliente.nomeFazenda)
              }
              className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}