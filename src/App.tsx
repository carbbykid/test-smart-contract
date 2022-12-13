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
        <div style={{ fontSize: "20px", fontWeight: "semi-bold" }}>
          <div className="nav">
            <div className="nav_item">
              <Link to="/">
                <h4>ChiPoPo</h4>
              </Link>
            </div>

            <div className="nav_item">
              <Link to="/web3">
                <h4>Web3</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
