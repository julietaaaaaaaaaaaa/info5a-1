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
    <div className="form-container">
      <h2>Buscar Cotação USD/BRL</h2>

      <div className="form-group">
        <label htmlFor="dataInicio">Data Início:</label>
        <input
          type="date"
          id="dataInicio"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dataFim">Data Fim:</label>
        <input
          type="date"
          id="dataFim"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
      </div>

      <button onClick={buscarCotacoes}>Buscar</button>

      {erro && <p className="erro">{erro}</p>}

      {dados && (
        <div className="resultados">
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
