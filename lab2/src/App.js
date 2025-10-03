import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import MenuSection from "./components/MenuSection";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <div>
      <Header />
      <Carousel />
      <MenuSection />
      <BookingForm />
    </div>
  );
}

export default App;
