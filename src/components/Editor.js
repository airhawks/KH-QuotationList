import * as React from "react";
import FormItem from "./ItemForm";
import ClientDetails from "./ClientDetails";

const COLS = [
  "Sr. No.",
  "Description",
  "Image",
  "HSN/SAC",
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

export default function Editor({
  data = [],
  clientDetails,
  updateData,
  updateClientDetails,
}) {
  const [editingItem, updateEditingItem] = React.useState({});
  const [focussedItem, setFocussedItem] = React.useState(null);
  const [modaShown, setModalShown] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const addItem = () => {
    const item = editingItem;
    // setShowModal();
    focussedItem !== null
      ? updateData([
          ...data.slice(0, focussedItem),
          item,
          ...data.slice(focussedItem + 1),
        ])
      : updateData([...data, item]);
    data.push({});
    // console.log("additem", data);
  };

  // console.log("editor render", data);

  React.useEffect(() => {
    const myModalEl = document.getElementById("exampleModal");
    if (myModalEl == null) {
      return;
    }
    const onShowModal = () => {
      setModalShown(true);
    };
    const onHideModal = () => {
      setModalShown(false);
    };
    myModalEl.addEventListener("show.bs.modal", onShowModal);
    myModalEl.addEventListener("hidden.bs.modal", onHideModal);
    return () => {
      myModalEl.removeEventListener("show.bs.modal", onShowModal);
      myModalEl.removeEventListener("hidden.bs.modal", onHideModal);
    };
  }, []);

  return (
    <div className="container-fluid ">
      <ClientDetails
        clientDetails={clientDetails}
        updateClientDetails={updateClientDetails}
      />
      <div className="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
        {focussedItem !== null ? (
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit Item
          </button>
        ) : null}

        {focussedItem !== null ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              updateData([
                ...data.slice(0, focussedItem),
                ...data.slice(focussedItem + 1),
              ]);
              setFocussedItem(null);
            }}
          >
            Delete Item
          </button>
        ) : null}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => setFocussedItem(null)}
        >
          Add Item
        </button>
      </div>
      <table
        className="table table-dark table-striped"
        style={{ width: "100%" }}
      >
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
            (
              { description, image, HSN_SAC, quantity, rate, amount },
              index,
            ) => (
              <tr
                className={
                  focussedItem === index
                    ? "focussedItem text-center"
                    : "text-center"
                }
                key={index}
                onClick={() => setFocussedItem(index)}
              >
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
                <td>{HSN_SAC}</td>
                <td>{quantity || 0}</td>
                <td>{rate || 0}</td>
                <td>{(quantity || 0) * (rate || 0)}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>

      {/* Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Item Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {modaShown ? (
                <FormItem
                  onChange={updateEditingItem}
                  data={focussedItem !== null ? data[focussedItem] : {}}
                  setUploading={setUploading}
                />
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                disabled={uploading}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addItem}
                disabled={uploading}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
