import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Breadcrumb from "./components/Breadcrumb";
import StudentList from "./components/StudentList";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <Breadcrumb />
      <StudentList />
      <Footer />
    </div>
  );
}

export default App;
