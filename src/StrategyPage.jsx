import axios from "axios";
import { useState, useEffect } from "react";
import { StrategyIndex } from "./StrategyIndex"
import { LegsShow } from "./LegsShow";
import { StrategyShow } from "./StrategyShow";
import { Modal } from "./Modal";

export function StrategyPage() {
  const [strategies, setStrategies] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [currentStrategy, setCurrentStrategy] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("/strategies.json").then((response) => {
      console.log(response.data);
      setStrategies(response.data);
    });
  };
  
  useEffect(handleIndex, []);

  const handleShowInfo = (strategy) => {
    setCurrentStrategy(strategy);
    setModalContent("info");
    setIsModalVisible(true);
  };

  const handleAddLegs = (strategy) => {
    console.log("Add Legs clicked for strategy:", strategy);
    setCurrentStrategy(strategy);
    setModalContent("legs");
    setIsModalVisible(true);
  };

  const handleLegsSubmit = (legsData) => {
    axios.post("/legs", {
      strategy_id: currentStrategy.id,
      legs: legsData,
    }).then(() => {
      setIsModalVisible(false);
    });
  };

  return (
    <main>
      <StrategyIndex 
      strategies={strategies} 
      onShow={handleShowInfo}
      onAddLegs={handleAddLegs}
      />
      <Modal 
      show={isModalVisible} 
      onClose={() => setIsModalVisible(false)}
      >
        {modalContent === "info" && 
        <StrategyShow strategy={currentStrategy} />}
        {modalContent === "legs" && (
          <LegsShow
            strategy={currentStrategy}
            onClose={() => setIsModalVisible(false)}
            onSubmit={handleLegsSubmit}
          />
        )}
      </Modal>

    </main>
  )
}