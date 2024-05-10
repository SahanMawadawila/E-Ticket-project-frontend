import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { IconButton } from "@mui/material";

function SignUp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="flex items-center">
        <IconButton color="primary" onClick={handleShow}>
          <SupervisorAccountIcon style={{ color: "#1e81b0" }} />
          <p className="ml-2 text-black text-lg pt-2  font-bold">Log In</p>
        </IconButton>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignUp;
