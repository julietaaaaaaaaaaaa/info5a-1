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
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Buscar Cotação USD/BRL</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Data Início:
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            style={{ marginLeft: "1rem" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Data Fim:
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            style={{ marginLeft: "1rem" }}
          />
        </label>
      </div>

      <button onClick={buscarCotacoes} style={{ padding: "0.5rem 1rem" }}>
        Buscar
      </button>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {dados && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Resultados:</h3>
          <ul>
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
