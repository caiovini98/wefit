import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";

import { ThemeProvider } from "styled-components";
import theme from "./theme";

import HeaderComponent from "./components/Header/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <HeaderComponent />
          <AppRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
