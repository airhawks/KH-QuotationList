import * as React from "react";
import ReactDOM from "react-dom/client";

import Summary from "./components/Summary.js";
import Editor from "./components/Editor.js";

import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwKnWWyWHPOYwehaL-paX7KPOLHdomH6s",
  authDomain: "kh-curtains.firebaseapp.com",
  projectId: "kh-curtains",
  storageBucket: "kh-curtains.appspot.com",
  messagingSenderId: "88547459846",
  appId: "1:88547459846:web:99c15fd9dfa6c44ef19487",
};

// Initialize Firebase
initializeApp(firebaseConfig);

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
