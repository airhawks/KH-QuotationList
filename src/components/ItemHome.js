import React from "react";
import HeaderButtons from "./HeaderButtons";
import { getDatabase, ref, child, set, get } from "firebase/database";
import { database } from "../firebase";
import Editor from "./Editor";
import Summary from "./Summary";
import _ from "lodash";

function _writeUserData(itemId, data) {
  console.log("writing ", data);
  set(ref(database, "quotations/" + itemId), data);
}
const writeUserData = _.throttle(_writeUserData, 5000);

function readUserData(itemId) {
  const dbRef = ref(database);

  return get(child(dbRef, `quotations/${itemId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
        return {
          data: [],
          clientDetails: {},
        };
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// const localDataString = window.localStorage.getItem("KH_data");
// const localClientString = window.localStorage.removeItem("KH_ClientDetails");

export default function ItemHome({ itemId }) {
  const [showSummary, setShowSummary] = React.useState(false);
  const [initialData, setInitialData] = React.useState({
    data: [],
    clientDetails: {},
  });
  const [isLoading, setIsLoading] = React.useState(true);
  if (isLoading) {
    readUserData(itemId).then((data) => {
      console.log(data);
      setInitialData(data);
      setIsLoading(false);
    });
  }

  console.log("ItemHome", itemId);

  const updateData = (data) => {
    console.log("updating data", data, initialData);
    setInitialData({ ...initialData, data });
    writeUserData(itemId, { ...initialData, data });
  };
  const updateClientDetails = (clientDetails) => {
    console.log("updating data", clientDetails, initialData);
    setInitialData({ ...initialData, clientDetails });
    writeUserData(itemId, { ...initialData, clientDetails });
  };

  if (isLoading) {
    return;
  }

  return showSummary ? (
    <Summary />
  ) : (
    <>
      <HeaderButtons
        showSummary={showSummary}
        setShowSummary={setShowSummary}
      />

      <Editor
        data={initialData.data}
        clientDetails={initialData.clientDetails}
        updateData={updateData}
        updateClientDetails={updateClientDetails}
      />
    </>
  );
}