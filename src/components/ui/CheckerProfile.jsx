import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Zoom } from "@mui/material";
import { baseURL } from "../../api/axios";
import axios from "../../api/axios";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

function CheckerProfile({ checker, setWantToReRender, wantToReRender }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    handleClose();
    try {
      await axios.delete(`/checkers/${checker._id}`);
      alert("Checker has been successfully deleted");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setWantToReRender(!wantToReRender);
    }
  };

  return (
    <>
      <Zoom in={true} style={{ transitionDelay: true ? "100ms" : "0ms" }}>
        <Card style={{ width: "15rem", height: "15rem" }}>
          <Card.Img
            variant="top"
            src={`${baseURL}/checkerDP/checkers/${checker.url}`}
            style={{ width: "100%", height: "10vw", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{checker.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{checker.companyName}</ListGroup.Item>
            <ListGroup.Item>{checker.email}</ListGroup.Item>
            <ListGroup.Item>{checker.telephone}</ListGroup.Item>
          </ListGroup>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-bl rounded-br hover:bg-red-600"
            onClick={handleShow}
          >
            Delete
          </button>
        </Card>
      </Zoom>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        handleYes={handleDelete}
      >
        Do you want to delete that checker?
      </ConfirmModal>
    </>
  );
}

export default CheckerProfile;