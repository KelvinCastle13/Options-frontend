import { useState,  useEffect } from "react";
import { LegsShow } from "./LegsShow";
import axios from "axios";

export function StockModal({ addTrade }) {
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
  <div style={containerStyle}>
    <h2 style={headerStyle}>Stocks</h2>

    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="New stock name"
        value={newStockName}
        onChange={(event) => setNewStockName(event.target.value)}
        style={inputStyle}
      />
      <button
          onClick={handleCreateStock}
          disabled={!newStockName.trim()}
          style={{
            ...addButtonStyle,
            ...(newStockName.trim() ? {} : addButtonStyle.disabled),
          }}
        >
          Add Stock
        </button>
    </div>

    <div style={stocksContainerStyle}>
        {stocks.map((stock) => (
          <button
            key={stock.id}
            onClick={() => openModal(stock)}
            style={stockButtonHoverStyle}
          >
            {stock.name}
          </button>
        ))}
      </div>
  
  {selectedStock && (
    <div style={modalOverlayStyle} onClick={closeModal}>
      <div
        onClick={(event) => event.stopPropagation()}
        style={modalContentStyle}
      >
        {!selectedStrategy ? (
              <>
                <h3>{selectedStock.name} — Select Strategy</h3>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  {strategies.map(strategy => (
                    <button
                      key={strategy.id}
                      onClick={() => setSelectedStrategy(strategy)}
                      style={strategyButtonHoverStyle}
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
                onSave={(newTrade) => {
                  addTrade(newTrade);
                  closeModal();
                  console.log("Trade saved:", newTrade)
                }}
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
            onChange={(event) => setEditingStockName(event.target.value)}
            style={editingInputStyle}
          />
          <button
            onClick={handleUpdateStock}
            style={{ ...editingButtonStyle, ...editButtonColor }}
          >
            Save
          </button>
          <button
            onClick={() => setEditingStockId(null)}
            style={{ ...editingButtonStyle, ...deleteButtonColor }}
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
            borderTop: "1px solid #39ff14",
            paddingTop: "10px",
          }}
        >
          <button
            onClick={() => {
              setEditingStockId(selectedStock.id);
              setEditingStockName(selectedStock.name);
            }}
            style={{ ...editingButtonStyle, ...editButtonColor }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteStock(selectedStock.id)}
            style={{ ...editingButtonStyle, ...deleteButtonColor }}
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

const containerStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  backgroundColor: "#161b22",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 0 20px #39ff14aa",
  fontFamily: "'Courier New', monospace",
  color: "#39ff14",
};

const headerStyle = {
  marginBottom: "24px",
};

const inputStyle = {
  padding: "8px 12px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #39ff14",
  backgroundColor: "#0d1117",
  color: "#39ff14",
  fontFamily: "'Courier New', monospace",
  outline: "none",
  marginRight: "8px",
  width: "200px",
};

const addButtonStyle = {
  backgroundColor: "#39ff14",
  color: "#0d1117",
  border: "none",
  borderRadius: "6px",
  padding: "8px 16px",
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "'Courier New', monospace",
  transition: "background-color 0.3s ease",
  disabled: {
    backgroundColor: "#1b2a0f",
    cursor: "not-allowed",
  },
};

const stocksContainerStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const stockButtonStyle = {
  backgroundColor: "#0d1117",
  border: "1px solid #39ff14",
  borderRadius: "8px",
  padding: "8px 14px",
  color: "#39ff14",
  cursor: "pointer",
  fontFamily: "'Courier New', monospace",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
};

const stockButtonHoverStyle = {
  backgroundColor: "#39ff14",
  color: "#0d1117",
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#161b22",
  padding: "24px",
  borderRadius: "12px",
  minWidth: "300px",
  maxWidth: "80%",
  textAlign: "center",
  position: "relative",
  color: "#39ff14",
  fontFamily: "'Courier New', monospace",
};

const strategyButtonStyle = {
  backgroundColor: "#0d1117",
  borderRadius: "5px",
  border: "1px solid #39ff14",
  padding: "8px 12px",
  cursor: "pointer",
  color: "#39ff14",
  fontWeight: "bold",
  margin: "5px",
  fontFamily: "'Courier New', monospace",
  transition: "background-color 0.3s ease",
};

const strategyButtonHoverStyle = {
  backgroundColor: "#39ff14",
  color: "#0d1117",
};

const editingInputStyle = {
  width: "120px",
  fontSize: "0.8rem",
  padding: "4px 8px",
  borderRadius: "5px",
  border: "1px solid #39ff14",
  backgroundColor: "#0d1117",
  color: "#39ff14",
  fontFamily: "'Courier New', monospace",
};

const editingButtonStyle = {
  fontSize: "0.8rem",
  padding: "4px 8px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "'Courier New', monospace",
};

const editButtonColor = {
  backgroundColor: "#39ff14",
  color: "#0d1117",
  marginRight: "5px",
};

const deleteButtonColor = {
  backgroundColor: "#e74c3c",
  color: "white",
};