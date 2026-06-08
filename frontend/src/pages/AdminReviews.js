import { useEffect, useState } from "react";
import API from "../api";

function AdminReviews() {

  const [reviews, setReviews] = useState([]);

  const loadReviews = () => {
    API.get("/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const approveReview = async (id) => {

    try {

      await API.put(
        `/reviews/approve/${id}`
      );

      loadReviews();

    } catch (err) {
      console.log(err);
    }

  };

  const deleteReview = async (id) => {

    try {

      await API.delete(
        `/reviews/delete/${id}`
      );

      loadReviews();

    } catch (err) {
      console.log(err);
    }

  };

  return (

  <div className="container">

    <div className="admin-page-header">
      <h1>Manage Reviews</h1>
      <p>{reviews.length} reviews submitted</p>
    </div>

    <div className="admin-table-wrapper">

      <table className="admin-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Package</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {reviews.map((review) => (

            <tr key={review.id}>

              <td>{review.id}</td>

              <td>{review.name}</td>

              <td>{review.title}</td>

              <td>
                {"⭐".repeat(review.rating)}
              </td>

              <td>{review.review}</td>

              <td>
                <span
                  className={
                    review.status === "approved"
                      ? "status-approved"
                      : "status-pending"
                  }
                >
                  {review.status}
                </span>
              </td>

              <td>

                {review.status === "pending" && (

                  <button
                    className="action-btn warning-btn"
                    onClick={() =>
                      approveReview(review.id)
                    }
                  >
                    Approve
                  </button>

                )}

                <button
                  className="action-btn delete-btn"
                  onClick={() =>
                    deleteReview(review.id)
                  }
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

export default AdminReviews;