import { baseURL } from "../../api/axios";
import axios from "../../api/axios";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

function CheckerProfile({ checker }) {
  const [show, setShow] = useState(false);
  const { mutate } = useSWRConfig();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    handleClose();
    try {
      await axios.delete(`/checkers/${checker._id}`);
      mutate("/checkers");
      toast.success("Checker has been deleted successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  // , name, companyName,email,telephone

  return (
    <>
      <div className="w-full flex gap-3 bg-white shadow-lg rounded-lg border-2 pl-2 pr-2 text-xs md:text-base items-center pb-1">
        <img
          src={`${baseURL}/checkerDP/checkers/${checker.url}`}
          alt=""
          className="md:h-20 md:w-20 h-12 w-12 object-cover object-center shadow-2xl
            rounded-full mt-2 mb-2
             "
        />
        <div className="flex-wrap flex justify-between flex-1 gap-2">
          <div>
            <p className="text-gray-600 mb-0 ">Name :</p>
            <p className="text-gray-900 font-semibold mb-1 md:mb-4">
              {checker.name}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-0 ">Company :</p>
            <p className="text-gray-900 font-semibold mb-1 md:mb-4">
              {checker.companyName}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-0 ">Email :</p>
            <p className="text-gray-900 font-semibold mb-1 md:mb-4">
              {checker.email}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-0 ">Tel :</p>
            <p className="text-gray-900 font-semibold mb-1 md:mb-4">
              {checker.telephone}
            </p>
          </div>

          <div className="self-end">
            <button
              onClick={handleShow}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 "
            >
              Delete
            </button>
          </div>
        </div>
      </div>

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
