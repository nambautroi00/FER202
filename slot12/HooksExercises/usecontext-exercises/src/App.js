//áp dụng ThemeProvider để bao bọc toàn bộ ứng dụng
import { ThemeProvider } from "./contexts/ThemeContext";
import LightSwitch from "./components/LightSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import CounterComponent from "./components/CounterComponent";
import { AuthProvider1 } from "./contexts/AuthContext1";
import LoginForm1 from "./components/LoginForm1";

function App() {
  return (
    <div>
      <ThemeProvider>
        <CounterComponent />
        <LightSwitch />
      </ThemeProvider>

      <AuthProvider1>
        <div className="App">
          <LoginForm1 />
        </div>
      </AuthProvider1>
    </div>
  );
}

export default App;
