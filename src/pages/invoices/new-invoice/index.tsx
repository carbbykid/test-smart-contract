import React from "react";

const NewInvoice = () => {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Create new Invoice</h2>
      <form action="submit">
        <label style={{ display: "block" }} htmlFor="name">
          Name
        </label>
        <input type="text" name="name" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewInvoice;
