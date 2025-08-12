import axios from "axios";
import { useState, useEffect } from "react";
import { StrategyIndex } from "./StrategyIndex"
import { LegsShow } from "./LegsShow";
import { StrategyShow } from "./StrategyShow";
import { Modal } from "./Modal";

export function StrategyPage({  addTrade }) {
  const [strategies, setStrategies] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [currentStrategy, setCurrentStrategy] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  useEffect(() => {
    axios.get("/strategies.json").then(response => setStrategies(response.data));
  }, []);

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

  const handelSaveLegs = (newTrade) => {
    addTrade(newTrade);
    setIsModalVisible(false);
  }

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
            onSubmit={handelSaveLegs}
          />
        )}
      </Modal>
    </main>
  )
}