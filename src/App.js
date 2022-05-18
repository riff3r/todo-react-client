import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import MainNav from "./component/MainNav";
import NotFound from "./component/NotFound";

function App() {
  return (
    <div className="App">
      <MainNav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
