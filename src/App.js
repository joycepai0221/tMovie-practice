import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Router from "./config/Routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
