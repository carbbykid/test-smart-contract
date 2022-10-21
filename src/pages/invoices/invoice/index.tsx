import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { invoices } from "../../../data/invoices";

type InvoiceParams = {
  invoiceId: string;
};
const Invoice = () => {
  const params = useParams<InvoiceParams>();
  const navigate = useNavigate();
  const invoiceInfo = invoices.find(
    (invoice) => invoice.id.toString() === params.invoiceId
  );

  useEffect(() => {
    if (!invoiceInfo) navigate("..");
  }, [invoiceInfo, navigate]);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Invoice </h1>
      <div>{`${invoiceInfo?.name} info ${invoiceInfo?.id}`}</div>
    </div>
  );
};

export default Invoice;
