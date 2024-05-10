import Header from "./components/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
