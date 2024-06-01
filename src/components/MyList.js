import React from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { ref, child, get, push } from "firebase/database";
import { Button, Input, Row, Col } from "reactstrap";
import { database } from "../firebase";
import ItemHome from "./ItemHome";

const convertToReabableTime = (timestampInSeconds) => {
  // const timestampInSeconds = unixTimestamp / 1000;
  const dateObject = new Date(timestampInSeconds);
  // Format the date and time as "March 25, 2023 at 9:26:20 AM"
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return dateObject.toLocaleString("en-IN", options);
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
          setListItems(snapshot.val());
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }, [selectedKey]);

  return selectedKey ? (
    <ItemHome
      itemId={selectedKey}
      onClickShowList={() => {
        setSelectedKey(null);
      }}
    />
  ) : (
    <Container className="mt-5">
      <Row>
        <Col xs="4">
          <Button color="primary" onClick={addNewItem} xs="3">
            Add new quotation
          </Button>
        </Col>
        <Col>
          <Input
            placeholder="Search"
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
          .reverse()
          .map(([index, { name, contact, quotationNumber }]) => {
            return (
              <ListGroupItem key={index} onClick={() => setSelectedKey(index)}>
                <div>No. {quotationNumber}</div>
                <div>Name: {name}</div>
                <div>Phone Number: {contact}</div>
                <div>
                  Created time:{" "}
                  {convertToReabableTime(listItems[index].createdTimestamp)} |
                  Updated time:
                  {convertToReabableTime(listItems[index].updatedTimestamp)}
                </div>
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </Container>
  );
};
export default AllQuotations;
