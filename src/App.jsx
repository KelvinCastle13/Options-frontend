import axios from "axios";
import { Header } from "./Header";
import { StrategyPage } from "./StrategyPage";
import { Footer } from "./Footer";

axios.defaults.baseURL = "htpp://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Header />
    </div>
  )
}

export default App;