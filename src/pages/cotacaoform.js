import { useState } from 'react';

export default function CotacaoForm() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);

  function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${ano}${mes}${dia}`;
  }

  const buscarCotacoes = async () => {
    if (!dataInicio || !dataFim) {
      alert("Preencha as duas datas!");
      return;
    }

    const start = formatarData(dataInicio);
    const end = formatarData(dataFim);

    const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${start}&end_date=${end}`;

    try {
      const resposta = await fetch(url);
      const resultado = await resposta.json();
      setDados(resultado);
      setErro(null);
    } catch (error) {
      setErro("Erro ao buscar os dados.");
      setDados(null);
    }
  };

  return (
    <div className="min-h-screen p-8 text-foreground bg-background">
      <h2 className="text-2xl font-semibold mb-6">Buscar Cotação USD/BRL</h2>

      <div className="flex flex-col gap-4 max-w-sm">
        <div>
          <label htmlFor="dataInicio" className="block mb-1 font-medium">
            Data Início:
          </label>
          <input
            type="date"
            id="dataInicio"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="dataFim" className="block mb-1 font-medium">
            Data Fim:
          </label>
          <input
            type="date"
            id="dataFim"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={buscarCotacoes}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>

      {erro && <p className="text-red-500 mt-4">{erro}</p>}

      {dados && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Resultados:</h3>
          <ul className="space-y-2">
            {dados.map((item) => (
              <li key={item.timestamp}>
                <strong>{new Date(item.timestamp * 1000).toLocaleDateString()}:</strong>{' '}
                Compra: R$ {item.bid} | Venda: R$ {item.ask}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
