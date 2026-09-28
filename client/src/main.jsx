import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Approutes from "./routes/Approute.jsx";
import AuthProvider from "./auth/context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Approutes />
  </AuthProvider>,
);
