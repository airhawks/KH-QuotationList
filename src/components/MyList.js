import React from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { getDatabase, ref, child, get, push } from "firebase/database";
import { Button } from "reactstrap";
import { database } from "../firebase";
import ItemHome from "./ItemHome";

const readAllQuotations = () => {
  const localDataString = window.localStorage.getItem("KH_data");
  const jsonData = JSON.parse(localDataString || "[]");
  return jsonData;
};

const writeAllQuotations = (data) => {
  window.localStorage.setItem("KH_data", JSON.stringify(data));
};

const dbRef = ref(database);

const AllQuotations = ({}) => {
  const [selectedKey, setSelectedKey] = React.useState(null);
  const [listItems, setListItems] = React.useState([]);

  const addNewItem = () => {
    const postListRef = ref(database, "quotations/");
    setSelectedKey(push(postListRef).key);
  };

  React.useEffect(() => {
    get(child(dbRef, `quotations/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setListItems(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }, []);

  return selectedKey ? (
    <ItemHome itemId={selectedKey} />
  ) : (
    <Container className="m-5">
      <Button color="primary" onClick={addNewItem}>
        Add new quotation
      </Button>
      <ListGroup className="mt-2">
        {Object.keys(listItems).map((index) => (
          <ListGroupItem key={index} onClick={() => setSelectedKey(index)}>
            {index}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};
export default AllQuotations;
