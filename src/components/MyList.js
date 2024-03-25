import React from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
get(child(dbRef, `users/quotations`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

const readAllQuotations = () => {
  const localDataString = window.localStorage.getItem("KH_data");
  const jsonData = JSON.parse(localDataString || "[]");
  return jsonData;
};

const writeAllQuotations = (data) => {
  window.localStorage.setItem("KH_data", JSON.stringify(data));
};

const AllQuotations = ({}) => {
  const listItems = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];
  return (
    <Container>
      <ListGroup>
        {listItems.map((item, index) => (
          <ListGroupItem key={index}>{item}</ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};
export default AllQuotations;
