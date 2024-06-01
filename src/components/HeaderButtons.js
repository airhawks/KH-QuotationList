import React from "react";
import { logout } from "../firebase";
export default function HeaderButtons({
  showSummary,
  setShowSummary,
  onClickShowList,
  copyQuotation,
}) {
  return showSummary ? null : (
    <div className="d-grid gap-2 m-2 d-sm-flex ">
      <button
        type="button"
        className="btn btn-primary me-sm-2"
        onClick={onClickShowList}
      >
        Back
      </button>
      <button
        type="button"
        className="btn btn-primary me-sm-2"
        onClick={setShowSummary}
      >
        Show Receipt
      </button>

      <button
        type="button"
        className="btn btn-primary me-sm-2"
        onClick={copyQuotation}
      >
        Copy Quotation
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
