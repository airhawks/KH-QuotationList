import React from "react";
import { logout } from "../firebase";
export default function HeaderButtons({ showSummary, setShowSummary }) {
  return showSummary ? null : (
    <div className="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
      <button
        type="button"
        className="btn btn-primary me-sm-2"
        onClick={setShowSummary}
      >
        Show Receipt
      </button>

      {/* <button
        type="button"
        className="btn btn-primary me-sm-2"
        onClick={downloadToExcel}
      >
        Download to Excel
      </button> */}

      <button
        type="button"
        className="btn btn-primary me-sm-2"
        onClick={logout}
      >
        Logout
      </button>
      {/* <button
        type="button"
        className="btn btn-primary me-sm-2"
        onClick={clearStorage}
      >
        Clear form
      </button> */}
    </div>
  );
}
