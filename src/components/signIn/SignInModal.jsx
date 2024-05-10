import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { IconButton } from "@mui/material";
import SignIn from "./SignIn";

function SignInModal() {
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

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <SignIn />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignInModal;
