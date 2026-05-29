
import { createRoot } from "react-dom/client";
import App from "./App";

// @ts-ignore: CSS module declarations not available in this TS project setup
import "./styles/index.css";
// @ts-ignore: CSS module declarations not available in this TS project setup
import "./styles/tailwind.css";

createRoot(document.getElementById("root")!).render(
  <App />
);

