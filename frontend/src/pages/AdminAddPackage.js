import { useState } from "react";
import API from "../api";

function AdminAddPackage() {

const [form, setForm] = useState({
destination_id: "",
title: "",
description: "",
price: "",
duration: "",
image: ""
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {


e.preventDefault();

try {

  await API.post("/packages/add", form);

  alert("Package Added Successfully");

  setForm({
    destination_id: "",
    title: "",
    description: "",
    price: "",
    duration: "",
    image: ""
  });

} catch (err) {
  console.log(err);
}


};

return (

<div className="container">

  <div className="admin-page-header">
    <h1>Add Package</h1>
    <p>Create a new travel package</p>
  </div>

  <div className="package-edit-layout">

    {/* LEFT FORM CARD */}

    <div className="form-card">

      <form
        onSubmit={handleSubmit}
        className="package-form"
      >

        <div className="form-group">
          <label>Destination ID</label>

          <input
            name="destination_id"
            value={form.destination_id}
            onChange={handleChange}
            placeholder="Enter destination ID"
          />
        </div>

        <div className="form-group">
          <label>Package Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter package title"
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter package description"
          />
        </div>

        <div className="form-group">
          <label>Price (₹)</label>

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter package price"
          />
        </div>

        <div className="form-group">
          <label>Duration</label>

          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="e.g. 5 Days / 4 Nights"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Paste image URL"
          />
        </div>

        <button
          type="submit"
          className="action-btn warning-btn"
        >
          Add Package
        </button>

      </form>

    </div>

    {/* RIGHT IMAGE PREVIEW */}

    <div className="package-preview-section">

      <div className="package-image-preview">

        <img
          src={
            form.image ||
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          }
          alt={form.title}
          className="edit-package-image"
        />

      </div>

    </div>

  </div>

</div>

);

}

export default AdminAddPackage;
