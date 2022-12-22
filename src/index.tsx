import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import "./assets/global.css";
import PageWeb3 from "./pages/web3";
import PageSolanaClassic from "./pages/solana-classic";
import PageSolana from "./pages/solana";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/web3" element={<PageWeb3 />} />
          <Route path="/solana-classic" element={<PageSolanaClassic />} />
          <Route path="/solana" element={<PageSolana />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
