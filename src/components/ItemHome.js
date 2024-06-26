import React from "react";
import HeaderButtons from "./HeaderButtons";
import { getDatabase, ref, child, set, get, push } from "firebase/database";
import { database } from "../firebase";
import Editor from "./Editor";
import Summary from "./Summary";
import _ from "lodash";

function _writeUserData(itemId, data) {
  // console.log("writing ", data);
  set(ref(database, "quotations/" + itemId), {
    ...data,
    updatedTimestamp: Date.now(),
  });
}
const writeUserData = _.throttle(_writeUserData, 5000);

const copyQuotation = (itemKey) => {
  const postListRef = ref(database, "quotations/");
  const newKey = push(postListRef).key;
  readUserData(itemKey).then((data) => {
    const newData = {
      ...data,
      clientDetails: {
        ...data.clientDetails,
        quotationNumber: data.clientDetails.quotationNumber + " - Copy",
      },
    };
    return writeUserData(newKey, newData);
  });
};

function readUserData(itemId) {
  const dbRef = ref(database);

  return get(child(dbRef, `quotations/${itemId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return { ...DEFAULT_DATA, ...snapshot.val() };
      } else {
        // console.log("No data available");
        return DEFAULT_DATA;
      }
    })
    .then((data) => {
      return {
        ...data,
        // convert undefined items to empty Objects
        data: ([...data.data] || []).map((item) => item || {}),
      };
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

const DEFAULT_DATA = {
  data: [],
  clientDetails: {},
  createdTimestamp: Date.now(),
};

// const localDataString = window.localStorage.getItem("KH_data");
// const localClientString = window.localStorage.removeItem("KH_ClientDetails");

export default function ItemHome({ itemId, onClickShowList }) {
  const [showSummary, setShowSummary] = React.useState(false);
  const [initialData, setInitialData] = React.useState(DEFAULT_DATA);
  const [isLoading, setIsLoading] = React.useState(true);
  if (isLoading) {
    readUserData(itemId).then((data) => {
      setInitialData(data);
      setIsLoading(false);
    });
  }

  const updateData = (data) => {
    // console.log("updating ", data);
    setInitialData({ ...initialData, data });
    writeUserData(itemId, { ...initialData, data });
  };
  const updateClientDetails = (clientDetails) => {
    setInitialData({ ...initialData, clientDetails });
    writeUserData(itemId, { ...initialData, clientDetails });
  };

  if (isLoading) {
    return;
  }

  return showSummary ? (
    <Summary clientData={initialData.clientDetails} data={initialData.data} />
  ) : (
    <div className="mt-5">
      <HeaderButtons
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        onClickShowList={onClickShowList}
        copyQuotation={() => copyQuotation(itemId)}
      />

      <Editor
        data={initialData.data}
        clientDetails={initialData.clientDetails}
        updateData={updateData}
        updateClientDetails={updateClientDetails}
      />
    </div>
  );
}
