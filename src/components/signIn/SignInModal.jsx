import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { IconButton } from "@mui/material";
import SignIn from "./SignIn";

function SignInModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <>
      <div className="flex items-center">
        <IconButton color="primary" onClick={handleShow}>
          <div className="flex justify-center items-center gap-1">
            <SupervisorAccountIcon style={{ color: "#063970" }} />
            <p
              className="text-base pt-2  font-bold"
              style={{ color: "#063970" }}
            >
              Log In
            </p>
          </div>
        </IconButton>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <SignIn handleCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignInModal;
