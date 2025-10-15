import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";
import LoginForm from "./components/LoginForm";
import LoginForm2 from "./components/LoginForm2";
import SearchItem from "./components/SearchItem";
import AccountsSearch from "./components/AccountsSearch";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">useState Hook Exercises</h1>
      <CounterComponent />
      <LightSwitch />
      <LoginForm />
      <LoginForm2 />
      <SearchItem />
      <AccountsSearch />
      <RegisterForm />
    </Container>
  );
}

export default App;
