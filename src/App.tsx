import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #333",
          paddingBottom: "20px",
          textAlign: "center",
        }}
      >
        <h1>ChiPoPo</h1>
        <div style={{ fontSize: "20px", fontWeight: "semi-bold" }}>
          <Link to="invoices">Invoices</Link> |{" "}
          <Link to="expenses">Expenses</Link>
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
