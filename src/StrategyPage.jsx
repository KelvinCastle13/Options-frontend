import axios from "axios";
import { useState, useEffect } from "react";
import { StrategyIndex } from "./StrategyIndex"
import { StrategyShow } from "./StrategyShow";
import { Modal } from "./Modal";


export function StrategyPage() {
  const [strategies, setStrategies] = useState([]);
  const [isStrategiesShowVisible, setIsStrategiesShowVisible] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState({});
  
  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("/strategies.json").then((response) => {
      console.log(response.data);
      setStrategies(response.data);
    });
  };

  const handleShow = (strategy) => {
    console.log("handleShow", strategy);
    setIsStrategiesShowVisible(true);
    setCurrentStrategy(strategy);
  };

  useEffect(handleIndex, []);
 
  
  return (
    <main>
      <StrategyIndex strategies={strategies} onShow={handleShow}/>
      <Modal 
      show={isStrategiesShowVisible}
      onClose={() => setIsStrategiesShowVisible(false)}>
        <StrategyShow strategy={currentStrategy} />
      </Modal>
    </main>
  )
}