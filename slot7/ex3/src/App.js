import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Banner from "./components/Banner";
import Navbar from "./components/Navar";
import GridLayout from "./components/GridLayout";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Banner />
      <Navbar />
      <GridLayout />
      <Footer />
    </div>
  );
}

export default App;
