import { Link, Outlet } from "react-router-dom";
import { invoices } from "../../data/invoices";

function Invoices() {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Invoices</h2>
      <Link to="new">Create new invoice</Link>
      <div style={{ display: "flex" }}>
        <nav style={{ borderRight: "1px solid" }}>
          {invoices.map((invoice) => {
            return (
              <Link
                key={invoice.id}
                style={{
                  display: "block",
                  fontSize: "30px",
                  padding: "10px",
                  margin: "1rem",
                }}
                to={invoice.id.toString()}
              >
                {invoice.name}
              </Link>
            );
          })}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Invoices;
