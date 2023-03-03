import * as React from "react";
import ReactDOM from "react-dom/client";

import Summary from "./components/Summary.js";
import Editor from "./components/Editor.js";

import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  const [showSummary, setShowSummary] = React.useState(false);
  return showSummary ? (
    <Summary />
  ) : (
    <>
      <div className="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
        <button
          type="button"
          className="btn btn-primary me-sm-2"
          onClick={setShowSummary}
        >
          Show Receipt
        </button>
      </div>

      <Editor />
    </>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
