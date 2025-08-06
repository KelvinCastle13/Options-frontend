import axios from "axios";
import { useState, useEffect } from "react";
import { StrategyIndex } from "./StrategyIndex"


export function StrategyPage() {
  const [strategies, setStrategies] = useState([]);
  
  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("/strategies.json").then((response) => {
      console.log(response.data);
      setStrategies(response.data);
    });
  };

  useEffect(handleIndex, []);
 
  
  return (
    <main>
      <StrategyIndex strategies={strategies} />
    </main>
  )
}