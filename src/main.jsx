import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from './components/ThemeProvider.jsx';
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <div className="min-h-screen w-screen overflow-hidden">
          <App />
          <Toaster position="top-center"/>
        </div>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
