import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function AdminEditPackage() {

const { id } = useParams();
const navigate = useNavigate();

const [form, setForm] = useState({
  title: "",
  description: "",
  price: "",
  duration: "",
  image: ""
});

useEffect(() => {


API.get(`/packages/${id}`)
  .then((res) => {
    setForm({
  title: res.data.title,
  description: res.data.description,
  price: res.data.price,
  duration: res.data.duration,
  image: res.data.image
});
  })
  .catch((err) => console.log(err));


}, [id]);

const handleChange = (e) => {

setForm({
  ...form,
  [e.target.name]: e.target.value
});


};

const handleSubmit = async (e) => {


e.preventDefault();

try {

  await API.put(
    `/packages/update/${id}`,
    form
  );

  alert("Package Updated Successfully");

  navigate("/admin/packages");

} catch (err) {
  console.log(err);
}


};

return (

<div className="container">

  <div className="admin-page-header">
    <h1>Edit Package</h1>
    <p>Update package details below</p>
  </div>

  <div className="form-card package-edit-layout">

  <div className="package-form-section">

    <form onSubmit={handleSubmit} className="package-form">

  <div className="form-group">
    <label>Package Title</label>
    <input
      name="title"
      value={form.title}
      onChange={handleChange}
      placeholder="Title"
    />
  </div>

  <div className="form-group">
    <label>Description</label>
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Description"
    />
  </div>

  <div className="form-group">
    <label>Price (₹)</label>
    <input
      name="price"
      value={form.price}
      onChange={handleChange}
      placeholder="Price"
    />
  </div>

  <div className="form-group">
    <label>Duration</label>
    <input
      name="duration"
      value={form.duration}
      onChange={handleChange}
      placeholder="Duration"
    />
  </div>

  <button
    type="submit"
    className="action-btn warning-btn"
  >
    Update Package
  </button>

    </form>

  </div>

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

  <div className="edit-package-overlay">
    <h3>{form.title}</h3>

    <p>{form.duration}</p>

    <h4>₹{form.price}</h4>
  </div>

</div>
  </div>

</div>

</div>

);


}

export default AdminEditPackage;
