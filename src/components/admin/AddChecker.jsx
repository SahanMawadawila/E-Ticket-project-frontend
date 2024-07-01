import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import ImageUploadForPerson from "../ui/ImageUploadForPerson";
import { useNavigate } from "react-router-dom";

const AddChecker = () => {
  const phoneRegex = /^\d{10}$/;
  const [companies, setCompanies] = useState([]);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // [1
  const [input, setInput] = useState({
    name: "",
    password: "",
    email: "",
    telephone: "",
    companyName: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephoneError, setTelephoneError] = useState(false);
  const [telephoneFocus, setTelephoneFocus] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [logInError, setLogInError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/companies");
        setCompanies(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCompanies();

    return () => {
      URL.revokeObjectURL(image);
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      confirmPasswordError ||
      telephoneError ||
      !image ||
      !input.companyName ||
      !input.email ||
      !input.name ||
      !input.password ||
      !input.telephone
    ) {
      setLogInError("Missing fields");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("password", input.password);
      formData.append("email", input.email);
      formData.append("telephone", input.telephone);
      formData.append("companyName", input.companyName);
      formData.append("image", imageFile);
      await axios.post("/checkers", formData);
      navigate("/admin");
    } catch (err) {
      if (err.response.status === 400) {
        setLogInError("Missing fields");
      } else if (err.response.status === 409) {
        setLogInError("User already exists");
      } else {
        setLogInError("Server error");
      }
    }
  };

  useEffect(() => {
    if (input.password !== confirmPassword) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  }, [input.password, confirmPassword]);

  // Clean up the image URL when new image is uploaded old image URL is revoked
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image);
    };
  }, [image]);

  useEffect(() => {
    setLogInError("");
  }, [input]);

  return (
    <div className=" md:max-w-[50vw] mx-auto p-6 shadow-2xl max-w-[80vw]">
      <form>
        <p className="text-center  bg-green-600 text-white font-bold rounded-md ">
          Add Checker
        </p>
        {logInError && (
          <p className="text-red-500 text-sm text-center">{logInError}</p>
        )}
        <div className="flex flex-col justify-center items-center">
          <img
            src={image ? image : "../../images/profile.png"}
            alt=""
            className="h-24 w-24 object-cover object-center shadow-2xl
            rounded-full mt-2 mb-2
             "
          />
          <div>
            <ImageUploadForPerson
              setImage={setImage}
              setImageFile={setImageFile}
            />
          </div>
        </div>

        <div className="justify-between flex-col md:flex md:flex-row md:flex-wrap gap-3 ">
          <div className="flex flex-col">
            <label className="ml-2 pr-1 pb-1 pt-1" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="ml-2 pr-1 pb-1 pt-1" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="ml-2 pr-1 pb-1 pt-1" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            {confirmPasswordError && (
              <p className="text-red-500 text-sm ml-2">
                Passwords do not match
              </p>
            )}
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="ml-2 pr-1 pb-1 pt-1" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="sahan12@gmail.com"
              className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label className="ml-2 pr-1 pb-1 pt-1" htmlFor="telephone">
              Telephone Number:
            </label>
            {telephoneError && telephoneFocus && (
              <p className="text-red-500 text-sm ml-2">
                Invalid telephone number
              </p>
            )}
            <input
              type="tel"
              id="telephone"
              placeholder="0712345678"
              className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
              value={input.telephone}
              onChange={(e) => {
                if (phoneRegex.test(e.target.value)) {
                  setTelephoneError(false);
                } else {
                  setTelephoneError(true);
                }
                setInput({ ...input, telephone: e.target.value });
              }}
              onFocus={() => setTelephoneFocus(true)}
            />
          </div>

          <div className="flex flex-col">
            <label className="ml-2 pr-1 pb-1 pt-1" htmlFor="confirmPassword">
              Company Name:
            </label>
            <Autocomplete
              disablePortal
              id="combo-box-demo3"
              options={companies.length > 0 ? companies : ["Jagath"]}
              sx={{ width: 200, flexGrow: 1, height: 30, marginLeft: 1 }}
              renderInput={(params) => <TextField {...params} label="SLTB" />}
              onInputChange={(event, newValue) => {
                setInput({ ...input, companyName: newValue });
              }}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChecker;
