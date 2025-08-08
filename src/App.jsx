import axios from "axios";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StrategyPage } from "./StrategyPage";
import LogPage from "./LogPage";


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Header />
      <StrategyPage />
      <LogPage />
      <Footer />
    </div>
  )
}

export default App;