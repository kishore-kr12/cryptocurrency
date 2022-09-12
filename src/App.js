import react from "react";

import { Route,Routes } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";


function App() {

  
    
  
  
  return (
 
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} exact />
        <Route path="/coins/:id" element={<CoinPage/>} exact />
      </Routes>
    </div>
   
  
  );
}

export default App;
