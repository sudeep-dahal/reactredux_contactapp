import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditContact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state);
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );
  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setNumber(currentContact.number);
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.email === email && email
    );
    const checkNumber = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) &&
        contact.number === number &&
        parseInt(number)
    );

    if (!email || !number || !name) {
      return toast.warning("Please fill all fields");
    }

    if (checkEmail) {
      return toast.error("Email already exists");
    }
    if (checkNumber) {
      return toast.error("Number already exists");
    }

    const data = {
      id: parseInt(id),
      name,
      email,
      number,
    };

    dispatch({ type: "UPDATE_CONTACT", payload: data });
    toast.success("Contact Updated");
    navigate("/");
  };

  return (
    <div className="container">
      {currentContact ? (
        <>
          <h1 className="display-3 my-5  text-center">
            Edit Contact: {currentContact.name}
          </h1>
          <div className="row">
            <div className="col-md-6 shadow my-auto mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-4 mb-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className="form-control"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-12 text-center mb-4">
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn  btn-dark"
                  />

                  <Link to="/" className="btn ml-3 btn-danger">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className="display-3 my-5 text-center">
          Contact with id {id} does not exist..
        </h1>
      )}
    </div>
  );
};

export default EditContact;
