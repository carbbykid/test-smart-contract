import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Expenses from "./pages/expenses";
import Invoice from "./pages/invoices/invoice";
import Invoices from "./pages/invoices";
import NotFound from "./pages/NotFound";
import NewInvoice from "./pages/invoices/new-invoice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="invoices" element={<Invoices />}>
            <Route
              index
              element={
                <h2 style={{ padding: "30px" }}>Please select an invoice</h2>
              }
            />
            <Route path=":invoiceId" element={<Invoice />} />
            <Route path="new" element={<NewInvoice />} />
          </Route>
          <Route path="expenses" element={<Expenses />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
