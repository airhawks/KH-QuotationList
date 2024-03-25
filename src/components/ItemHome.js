import React from "react";
import HeaderButtons from "./components/HeaderButtons";

const localDataString = window.localStorage.getItem("KH_data");
let localData = JSON.parse(localDataString || "[]");

export default function ItemHome({ itemId }) {
  const [showSummary, setShowSummary] = React.useState(false);

  console.log("ItemHome", itemId);

  const updateData = (data) => {};

  return showSummary ? (
    <Summary />
  ) : (
    <>
      <HeaderButtons
        showSummary={showSummary}
        setShowSummary={setShowSummary}
      />

      <Editor initialData={initialData} updateData={updateData} />
    </>
  );
}
