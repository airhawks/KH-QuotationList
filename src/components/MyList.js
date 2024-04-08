import React from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { ref, child, get, push } from "firebase/database";
import { Button, Input, Row, Col } from "reactstrap";
import { database } from "../firebase";
import ItemHome from "./ItemHome";
import ClientDetails from "./ClientDetails";

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
  const [searchText, setSearchText] = React.useState("");

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
    <ItemHome
      itemId={selectedKey}
      onClickShowList={() => setSelectedKey(null)}
    />
  ) : (
    <Container className="m-5">
      <Row>
        <Col xs="4">
          <Button color="primary" onClick={addNewItem} xs="3">
            Add new quotation
          </Button>
        </Col>
        <Col>
          <Input
            placeholder="Check it out"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
      </Row>
      <ListGroup className="mt-4">
        {Object.entries(listItems)
          .map(([index, item]) => [index, item["clientDetails"] || {}])
          .filter(
            ([index, item]) =>
              (item.contact || "").includes(searchText) ||
              (item.quotationNumber || "").includes(searchText) ||
              (item.name || "").includes(searchText),
          )
          .map(([index, { name, contact, quotationNumber }]) => {
            console.log(index);
            return (
              <ListGroupItem key={index} onClick={() => setSelectedKey(index)}>
                <div>No. {quotationNumber}</div>
                <div>Name: {name}</div>
                <div>Phone Number: {contact}</div>
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </Container>
  );
};
export default AllQuotations;
