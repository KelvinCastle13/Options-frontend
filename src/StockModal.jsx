import { useState,  useEffect } from "react";
import { LegsShow } from "./LegsShow";
import axios from "axios";

export function StockModal() {
  const [stocks, setStocks] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [newStockName, setNewStockName] = useState("");
  const [editingStockId, setEditingStockId] = useState(null);
  const [editingStockName, setEditingStockName] =useState("");

  useEffect(() => {
    fetchStocks();
    fetchStrategies();
  }, []);

  function fetchStocks() {
    axios.get("/stocks")
      .then(response => setStocks(response.data))
  }

  function fetchStrategies() {
    axios.get("/strategies")
      .then(response => setStrategies(response.data))
  }    

  const openModal = (stock) => {
    setSelectedStock(stock);
    setSelectedStrategy(null);
  }

  const closeModal = () => {
    setSelectedStock(null);
    setSelectedStrategy(null);
  }

  const handleCreateStock = () => {
    if (!newStockName.trim()) return;

    axios.post("/stocks", { name: newStockName })
      .then(response => {
        setStocks([...stocks, response.data]);
        setNewStockName("");
      })
  };

  const cancelEdit = () => {
    setEditingStockId(null);
    setEditingStockName("");
  };

  const handleUpdateStock = () => {
    if (!editingStockName.trim()) return;

    axios.patch(`/stocks/${editingStockId}`, { name: editingStockName })
      .then(response => {
        setStocks(stocks.map(s  => s.id === editingStockId ? response.data : s))
        cancelEdit();
      })
  };

  const handleDeleteStock = (id) => {
    axios
      .delete(`/stocks/${id}`)
      .then(() => {
        setStocks(stocks.filter(s => s.id !== id));
        if (selectedStock?.id === id) closeModal();
      })
  };

return (
  <div>
    <h2>Stocks</h2>

    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="New stock name"
        value={newStockName}
        onChange={(event) => setNewStockName(event.target.value)}
      />
      <button 
        onClick={handleCreateStock}
        disabled={!newStockName.trim()}>/
        Add Stock
      </button>
    </div>

    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {stocks.map((stock) => (
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
        onClick={(event) => event.stopPropagation()} 
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px",
          maxWidth: "80%",
          textAlign: "center",
          position: "relative",
        }}
      >
        {!selectedStrategy ? (
              <>
                <h3>{selectedStock.name} — Select Strategy</h3>
                <div 
                style={{ 
                  display: "flex", 
                  gap: "10px", 
                  flexWrap: "wrap", 
                  justifyContent: "center" 
                }}>
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
                legCount={selectedStrategy.leg_count}
                onClose={closeModal}
              />
            )}

      {editingStockId === selectedStock.id ? (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            gap: "5px",
          }}
        >
          <input
            type="text"
            value={editingStockName}
            onChange={event => setEditingStockName(event.target.value)}
            style={{ width: "120px", fontSize: "0.8rem" }}
          />
          <button
            onClick={handleUpdateStock}
            style={{ fontSize: "0.8rem", padding: "4px 8px" }}
          >
            Save
          </button>
          <button
            onClick={() => setEditingStockId(null)}
            style={{ fontSize: "0.8rem", padding: "4px 8px" }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            borderTop: "1px solid #ddd",
            paddingTop: "10px"
          }}
        >
          <button
            onClick={() => {
              setEditingStockId(selectedStock.id);
              setEditingStockName(selectedStock.name);
            }}
            style={{ fontSize: "0.8rem", padding: "6px 10px" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteStock(selectedStock.id)}
            style={{ fontSize: "0.8rem", padding: "6px 10px" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  </div>
)}
</div>
  );
}