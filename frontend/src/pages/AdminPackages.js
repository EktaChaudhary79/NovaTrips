import { useEffect, useState } from "react";
import API from "../api";

import { useNavigate } from "react-router-dom";

function AdminPackages() {

const [packages, setPackages] = useState([]);
const navigate = useNavigate();

const loadPackages = () => {


API.get("/packages")
  .then((res) => setPackages(res.data))
  .catch((err) => console.log(err));


};

useEffect(() => {
loadPackages();
}, []);

const deletePackage = async (id) => {


if (!window.confirm("Delete package?")) {
  return;
}

try {

  await API.delete(`/packages/delete/${id}`);

  alert("Package Deleted");

  loadPackages();

} catch (error) {
  console.log(error);
}


};

return (


<div className="container">

  <div className="admin-page-header">
  <h1>Manage Packages</h1>
</div>

<div className="admin-table-wrapper">
  <table className="admin-table">

    <thead>

      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Price</th>
        <th>Duration</th>
        <th>Actions</th>
      </tr>

    </thead>

    <tbody>

      {packages.map((pkg) => (

        <tr key={pkg.id}>

          <td>{pkg.id}</td>

          <td>{pkg.title}</td>

          <td>₹{pkg.price}</td>

          <td>{pkg.duration}</td>

          <td>

  <button
    className="action-btn warning-btn"
    onClick={() =>
      navigate(`/admin/edit-package/${pkg.id}`)
    }
  >
    Edit
  </button>

  <button
    className="action-btn delete-btn"
    onClick={() => deletePackage(pkg.id)}
  >
    Delete
  </button>

</td>

        </tr>

      ))}

    </tbody>

  </table>
</div>

</div>


);

}

export default AdminPackages;
