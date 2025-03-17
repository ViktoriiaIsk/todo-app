import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider"; 
import { store } from "./store/store";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
