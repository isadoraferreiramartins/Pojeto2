import { useState } from "react";
import { api } from "../../Services/api";
import { toast } from "sonner";

export function FormCliente({ onClienteCadastrado }) {
  const [novoCliente, setNovoCliente] = useState({
    nomeFazenda: "",
    proprietario: "",
    whatsapp: "",
    email: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/clientes", novoCliente);
      toast.success("Fazenda cadastrada com sucesso!");
      setNovoCliente({
        nomeFazenda: "",
        proprietario: "",
        whatsapp: "",
        email: "",
      });
      onClienteCadastrado();
    } catch (error) {
      toast.error("Erro ao cadastrar cliente.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end border border-gray-100"
    >
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
          Nome da Fazenda
        </label>
        <input
          required
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ex: Fazenda Boa Vista"
          value={novoCliente.nomeFazenda}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, nomeFazenda: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
          Proprietário
        </label>
        <input
          required
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Nome do produtor"
          value={novoCliente.proprietario}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, proprietario: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
          Whatsapp
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          placeholder="(XX) XXXXX-XXXX"
          value={novoCliente.whatsapp || ""}
          onChange={(e) => {
            const valor = e.target.value.replace(/\D/g, "");
            setNovoCliente({ ...novoCliente, whatsapp: valor });
          }}
        />
      </div>
      <div>
        <input
          required
          type="email"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          placeholder="E-mail do produtor"
          value={novoCliente.email || ""}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, email: e.target.value })
          }
        />
      </div>

      <button className="bg-green-700 text-white font-bold py-2 px-4 rounded-md hover:bg-green-800 transition-all shadow-lg">
        + Cadastrar Cliente
      </button>
    </form>
  );
}
