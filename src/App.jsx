import axios from "axios";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StrategyPage } from "./StrategyPage";
import { LegsShow } from "./LegsShow";
import { StockModal } from "./StockModal";


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Header />
      <StrategyPage />
      <StockModal />
      <LegsShow />
      <Footer />
    </div>
  )
}

export default App;