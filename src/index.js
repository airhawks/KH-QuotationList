import * as React from "react";
import ReactDOM from "react-dom/client";
import Summary from "./components/Summary.js";
import Editor from "./components/Editor.js";

import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import { auth, loginUser, logout } from "./firebase.js";
import MyList from "./components/MyList.js";
import { onAuthStateChanged } from "firebase/auth";

const clearStorage = () => {
  window.localStorage.removeItem("KH_data");
  window.localStorage.removeItem("KH_ClientDetails");
  window.location.reload();
};

function App() {
  const [showSummary, setShowSummary] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isLoaded, setLoaded] = React.useState(false);
  const [loginDetails, setLoginDetails] = React.useState({});

  const updateLoginDetails = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  React.useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        console.log("user", user);
        setUser(user);
        setLoaded(true);
      }),
    [],
  );
  if (isLoaded) {
    // return null;
  }

  if (!user) {
    return (
      <div className="m-2">
        <label htmlFor="HSN/SAC" className="mt-3 form-label">
          Username
        </label>
        <input
          className="form-control"
          id="HSN/SAC"
          onChange={(e) => updateLoginDetails("email", e.target.value)}
        />
        <label htmlFor="quantity" className="mt-3 form-label">
          Password
        </label>
        <input
          className="form-control"
          id="quantity"
          type="password"
          onChange={(e) => updateLoginDetails("password", e.target.value)}
        />
        <div className="d-grid gap-2 mt-3  d-sm-flex justify-content-sm-start">
          <button
            type="button"
            className="btn btn-primary me-sm-2"
            onClick={() => loginUser(loginDetails.email, loginDetails.password)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return <MyList />;
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

// function downloadToExcel() {
//   const localDataString = window.localStorage.getItem("KH_data");
//   const jsonData = JSON.parse(localDataString || "[]");
//   // Convert the JSON data to an array of arrays
//   // const data = jsonData.map((row) => Object.values(row));
//   // Create a new workbook object
//   const worksheet = XLSX.utils.json_to_sheet(jsonData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Quotation");
//   const excelFile = XLSX.writeFile(workbook, "Quotation.xlsx", {
//     compression: true,
//   });
// }
