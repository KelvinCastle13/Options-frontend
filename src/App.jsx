import axios from "axios";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StrategyPage } from "./StrategyPage";
import { StockModal } from "./StockModal";
import { TradePage } from "./TradePage";
import { useState, useEffect } from "react";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const [trades, setTrades] = useState([]);
  
  useEffect(() => {
    axios.get("/trades.json").then(response => setTrades(response.data));
  }, []);

  const addTrade = (newTrade) => {
    setTrades(prevTrades => [...prevTrades, newTrade]);
  };

  const appContainerStyle = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
  };

  return (
    <div style={appContainerStyle}>
      <Header />
      <StrategyPage 
        setTrades={setTrades} 
        addTrade={addTrade}
      />
      <StockModal 
        addTrade={addTrade}
      />
      <TradePage 
        trades={trades} 
        setTrades={setTrades} 
      />
      <Footer />
    </div>
  )
}

export default App;