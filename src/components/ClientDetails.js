import * as React from "react";

const localDataString = window.localStorage.getItem("KH_ClientDetails");
let localData = JSON.parse(localDataString || "{}");

export default function ClientDetails() {
  const [data, updateData] = React.useState(localData);
  const { name, address, contact, quotationNumber } = data;

  const setData = (data) => {
    window.localStorage.setItem("KH_ClientDetails", JSON.stringify(data));
    updateData(data);
  };

  const onChangeField = (field, value) => {
    const updatedData = {
      ...data,
      [field]: value
    };
    setData(updatedData);
  };

  return (
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        className="form-control"
        id="name"
        defaultValue={name}
        onChange={(e) => onChangeField("name", e.target.value)}
      />

      <label htmlFor="address" className="mt-3 form-label">
        Address
      </label>
      <input
        className="form-control"
        id="address"
        defaultValue={address}
        onChange={(e) => onChangeField("address", e.target.value)}
      />
      <label htmlFor="contact" className="mt-3 form-label">
        Contact
      </label>
      <input
        className="form-control"
        id="contact"
        defaultValue={contact}
        onChange={(e) => onChangeField("contact", e.target.value)}
      />
      <label htmlFor="quotationNumber" className="mt-3 form-label">
        Quotation Number
      </label>
      <input
        className="form-control"
        id="quotationNumber"
        defaultValue={quotationNumber}
        onChange={(e) => onChangeField("quotationNumber", e.target.value)}
      />
    </div>
  );
}
