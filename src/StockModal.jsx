import { useState,  useEffect } from "react";
import axios from "axios";

export function StockModal() {
  const [stocks, setStocks] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  useEffect(() => {
    axios.get("/stocks").then(response => {setStocks(response.data);})
    axios.get("/strategies").then(response => {setStrategies(response.data);})
  }, []);
    
  const openModal = (stock) => {
    setSelectedStock(stock);
    setSelectedStrategy(null);
  }

  const closeModal = () => {
    setSelectedStock(null);
    setSelectedStrategy(null);
  }

return (
  <div>
    <h2>Stocks</h2>
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {stocks.map(stock => (
        <button key={stock.id} onClick={() => openModal(stock)}>
          {stock.name}
        </button>
      ))}
    </div>

    {selectedStock && (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={closeModal} 
    >
      <div
        onClick={(effect) => effect.stopPropagation()} 
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px",
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        {!selectedStrategy ? (
              <>
                <h3>{selectedStock.name} — Select Strategy</h3>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  {strategies.map(strategy => (
                    <button
                      key={strategy.id}
                      onClick={() => setSelectedStrategy(strategy)}
                      style={{
                        backgroundColor: "#eee",
                        borderRadius: "5px",
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      {strategy.name}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <LegsShow
                stock={selectedStock}
                strategy={selectedStrategy}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}