import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './tradelogger.css';

const TradeLogger = () => {
  const [profitLoss, setProfitLoss] = useState('');
  const [tradeDate, setTradeDate] = useState('');
  const [tradeDescription, setTradeDescription] = useState('');
  const [totalProfit, setTotalProfit] = useState(0);
  const [tradeList, setTradeList] = useState([]);
  const [showTradeDetails, setShowTradeDetails] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedTradeList = JSON.parse(localStorage.getItem('tradeList'));
    const storedTotalProfit = JSON.parse(localStorage.getItem('totalProfit'));

    if (storedTradeList && storedTradeList.length > 0) {
      setTradeList(storedTradeList);
      setShowTradeDetails(true); // Show trade details on initial render
    }

    if (storedTotalProfit) {
      setTotalProfit(storedTotalProfit);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tradeList', JSON.stringify(tradeList));
  }, [tradeList]);

  useEffect(() => {
    localStorage.setItem('totalProfit', JSON.stringify(totalProfit));
  }, [totalProfit]);

  const handleNoteTrade = () => {
    const tradeProfitLoss = parseInt(profitLoss);
    setTotalProfit(totalProfit + tradeProfitLoss);

    const newTrade = {
      date: tradeDate,
      profitLoss: tradeProfitLoss,
      description: tradeDescription,
    };

    const updatedTradeList = [...tradeList, newTrade];
    setTradeList(updatedTradeList);

    setProfitLoss('');
    setTradeDate('');
    setTradeDescription('');

    setShowTradeDetails(true);
  };

  const handleViewTrade = (index) => {
    setSelectedTrade(index);
  };

  const handleDeleteTrade = (index) => {
    const updatedTradeList = [...tradeList];
    updatedTradeList.splice(index, 1);
    setTradeList(updatedTradeList);

    const updatedTotalProfit = updatedTradeList.reduce(
      (total, trade) => total + trade.profitLoss,
      0
    );
    setTotalProfit(updatedTotalProfit);

    if (selectedTrade === index) {
      setSelectedTrade(null);
    }
  };

  

  return (
    <div className="container">
      <div className="navbar">
        <h1 className="title">TradeLogger - Home</h1>
     
      </div>

      <div className="total-profit-loss">
        <h3>Total Profit/Loss:</h3>
        <p className={totalProfit >= 0 ? 'profit' : 'loss'}>
          {totalProfit >= 0 ? '+' : '-'}
          {Math.abs(totalProfit)}
        </p>
      </div>

      <div className="input-group">
        <label htmlFor="profitLoss">Trade Profit/Loss:</label>
        <input
          type="text"
          id="profitLoss"
          value={profitLoss}
          onChange={(e) => setProfitLoss(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="tradeDate">Trade Date:</label>
        <input
          type="date"
          id="tradeDate"
          value={tradeDate}
          onChange={(e) => setTradeDate(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="tradeDescription">Trade Description:</label>
        <input
          type="text"
          id="tradeDescription"
          value={tradeDescription}
          onChange={(e) => setTradeDescription(e.target.value)}
          required
        />
      </div>

      <button className="noteTradeButton" onClick={handleNoteTrade}>
        Note Your Trade
      </button>

      {showTradeDetails && (
        <div className="trade-details">
          <h4>Trade Details:</h4>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Profit/Loss</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tradeList.map((trade, index) => (
                <tr key={index}>
                  <td>{trade.date}</td>
                  <td className={trade.profitLoss >= 0 ? 'profit' : 'loss'}>
                    {trade.profitLoss >= 0 ? '+' : '-'}
                    {Math.abs(trade.profitLoss)}
                  </td>
                  <td>
                    {trade.description.length > 30 ? (
                      <>
                        {`${trade.description.substring(0, 30)}... `}
                      
                      </>
                    ) : (
                      trade.description
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleViewTrade(index)}>
                      View
                    </button>
                    <button onClick={() => handleDeleteTrade(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTrade !== null && (
        <div className="selected-trade">
          <h4>Selected Trade:</h4>
          <p>
            <strong>Date:</strong> {tradeList[selectedTrade].date}
          </p>
          <p>
            <strong>Profit/Loss:</strong>{' '}
            {tradeList[selectedTrade].profitLoss >= 0 ? '+' : '-'}
            {Math.abs(tradeList[selectedTrade].profitLoss)}
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {tradeList[selectedTrade].description}
          </p>
          <button onClick={() => setSelectedTrade(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TradeLogger;
