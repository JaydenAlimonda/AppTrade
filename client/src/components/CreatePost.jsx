import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../context/ContextProvider";

export default function CreatePost(props) {
  const { addPost } = useContext(Context)
  // State for new posts
  const [inputs, setInputs] = useState({
    offer: "",
    price: 0,
    location: "",
    author: "",
    contact: "",
    typeOfOffer: "",
  });

  // Function to handle changes in form inputs
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    addPost(inputs); // function to add post from parent
    setInputs({ // Clear input fields after submission
      offer: "",
      price: 0,
      location: "",
      author: "",
      contact: "",
      typeOfOffer: "",
    });
    window.location.href = "/"; // Redirect to home page after submission
  }

  return (
    <>
      <h2 className="create-trade-title">Create Trade Post</h2>
      <div className="form-container-container">
        <form onSubmit={handleSubmit} className="form-container">
          <p>What is your offer? :</p>
          <input
            type="text"
            name="offer"
            value={inputs.offer}
            onChange={handleChange}
            className="form-container-inputs"
          />
          <p>Offer price? :</p>
          <input
            type="number"
            name="price"
            value={inputs.price}
            placeholder=""
            onChange={handleChange}
            className="form-container-inputs"
          />
          <p>Meetup location? :</p>
          <input
            type="text"
            name="location"
            value={inputs.location}
            onChange={handleChange}
            className="form-container-inputs"
          />
          <p>Enter Contact information :</p>
          <input
            type="text"
            name="contact"
            value={inputs.contact}
            onChange={handleChange}
            className="form-container-inputs"
          />
          <p>Is this a service or item :</p>
          <select
            name="typeOfOffer"
            value={inputs.typeOfOffer}
            onChange={handleChange}
            className="form-container-inputs"
          >
            <option value="">Type of Offer</option>
            <option value="service">Service</option>
            <option value="item">Item</option>
          </select>
          <button type="submit" className="form-container-inputs">
            {props.btnTxt}
          </button>
        </form>
      </div>
    </>
  );
}
