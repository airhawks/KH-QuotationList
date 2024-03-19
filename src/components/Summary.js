import logoImage from "../assets/logo.png";
import LuxuriaLogo from "../assets/LuxuriaLogo.png";

function VR() {
  return (
    <div className="col-auto gx-0">
      <div
        className="vr"
        style={{
          height: "100%",
          width: "1px",
        }}
      ></div>
    </div>
  );
}

function Divider() {
  return (
    <hr
      style={{
        margin: 0,
      }}
    />
  );
}

const COLS = [
  "Sr. No.",
  "Description",
  "Image",
  // "HSN/SAC",
  "QTY",
  "Rate",
  "Amount",
];

const COLS_SIZES = {
  "Sr. No.": 0.7,
  Description: 4,
  Image: 1.5,
  "HSN/SAC": 1,
  QTY: 0.5,
  Rate: 0.5,
  Amount: 0.5,
};

const to2DecimalPlaces = (numberOrString) => {
  const numberFormatter = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return numberFormatter.format(numberOrString);
};

export default function Summary({
  name = "Client Name",
  quotationNumber = 0,
  quotationDate = new Date(),
}) {
  const localDataString = window.localStorage.getItem("KH_data");
  const data = JSON.parse(localDataString || "[]");

  const localClientDataString = window.localStorage.getItem("KH_ClientDetails");
  const clientData = JSON.parse(localClientDataString || "{}");

  const grossAmount = data.reduce((sum, row) => {
    return sum + (row.rate || 0) * (row.quantity || 0);
  }, 0);

  return (
    <div className="main-container">
      <div className="container-fluid black-border-container">
        <div className="row">
          <div className="col-4 ">
            <div className="d-flex align-items-center justify-content-center flex-column h-100">
              <img src={LuxuriaLogo} className="w-100" alt="" />
            </div>
          </div>
          <VR />
          <div className="col">
            <strong className="text-center">
              <p className="h3 fw-semibold">QUOTATION </p>
              <p
                className="h4"
                // style={{
                //   backgroundColor: "#f9a927",
                //   color: "#058492",
                // }}
              >
                Luxuria By Kaushal Homes
              </p>
              <p className="h6">405 opp. Metro pillar no. 120, MG Road</p>
              <p className="h6">Ghitorni, Delhi - 110030</p>
              <p className="h6">
                <a href="mailto:sumit@kaushalhomes.com">
                  sumit@kaushalhomes.com
                </a>
                {/* ,{" "}
                <a href="https://www.kaushalhomes.com/">www.kaushalhomes.com</a> */}
              </p>
              <p className="h6"> Mob. No. +9196371-70000</p>
            </strong>
          </div>
        </div>
        <Divider />
        <div className="row gx-0">
          <div className="col ms-2 ">
            To, <span className="h6 fw-bold">{clientData.name}</span>
            <div className="ms-4">
              <p className="fw-semibold">{clientData.address}</p>
              <p className="fw-semibold">Contact No. : {clientData.contact}</p>
            </div>
          </div>
          <VR />
          <div className="col-4">
            <div className="row text-center">
              <p>Quotation Number </p>
              <strong>
                <p>{clientData.quotationNumber}</p>
              </strong>
            </div>
            <hr
              style={{
                margin: 0,
              }}
            />
            <div className="row text-center">
              <p>Quotation Date</p>
              <strong>
                <p>{quotationDate.toLocaleDateString("en-IN")}</p>
              </strong>
            </div>
          </div>
        </div>
        <Divider />
        <div className="row">
          <p className="ms-2">
            In Accordance with your request inquiry, we are pleased to submit
            the following Quotation with our Best Prices
          </p>
        </div>
        <div className="row"></div>
        <div className="row"></div>
        <Divider />
        <table className="my-3 table table-striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              {COLS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="text-center"
                  style={{
                    width: `${COLS_SIZES[column] * 10}%`,
                    wordWrap: "break-word",
                    maxWidth: `${COLS_SIZES[column] * 10}%`,
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ description, image, HSN_SAC, quantity, rate }, index) => (
                <tr className="text-center" key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="text-start">
                    {description
                      ? description.split("\n").map((line, index) => {
                          if (line.startsWith("HH ")) {
                            return (
                              <div className="fw-bold h6" key={index + line}>
                                {line.replace(/HH /, "")}
                              </div>
                            );
                          } else if (line.startsWith("BB ")) {
                            return (
                              <div
                                key={index + line}
                                className="fw-semibold fst-italic"
                              >
                                {line.replace(/BB /, "")}
                              </div>
                            );
                          }
                          return <div key={index + line}>{line}</div>;
                        })
                      : null}
                  </td>
                  <td>
                    {image ? <img className="w-100" src={image} alt="" /> : ""}
                  </td>
                  {/* <td>{HSN_SAC}</td> */}
                  <td>{quantity}</td>
                  <td>{to2DecimalPlaces(rate || 0)}</td>
                  <td>{to2DecimalPlaces((quantity || 0) * (rate || 0))}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        <Divider />

        <div className="row">
          <div className="col ms-2  my-2">
            <strong>Terms and Conditions</strong>
            <p>
              <ul>
                <li>Once goods have been sold, they cannot be returned.</li>
                <li>
                  Interest @18% p.a shall be charged on payment after due date.
                </li>
                <li>
                  Payment terms: 50% advance has to be given in advance. Rest of
                  the 50% before delivery.
                </li>
                <li>
                  Delivery period will be from 30 to 35 days after advance is
                  received.
                </li>
                <li>All disputes are subject to Delhi jurisdiction only.</li>
              </ul>
            </p>
          </div>
          <VR />
          <div
            className="col-sm-auto text-center my-2 me-2"
            style={{ width: "280px" }}
          >
            <div className="row">
              <div className="col text-start">
                <p>Gross Amount </p>
                <p>Add GST @18%</p>
              </div>
              {/* <VR /> */}
              <div className="col text-end">
                <p>{to2DecimalPlaces(grossAmount)}</p>
                <p>{to2DecimalPlaces(grossAmount * 0.18)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>
                  Total Amount (INR) &nbsp;
                  {to2DecimalPlaces(grossAmount * 1.18)}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}
