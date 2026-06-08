const db = require("../config/db");

exports.canReview = (req, res) => {

  const { userId, packageId } = req.params;

  const sql = `
    SELECT *
    FROM bookings
    WHERE user_id = ?
    AND package_id = ?
    AND status = 'Approved'
  `;

  db.query(sql, [userId, packageId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      canReview: result.length > 0,
      booking: result[0] || null
    });

  });

};

exports.addReview = (req, res) => {

  const {
    user_id,
    package_id,
    booking_id,
    rating,
    review
  } = req.body;

  const sql = `
    INSERT INTO reviews
    (
      user_id,
      package_id,
      booking_id,
      rating,
      review,
      status
    )
    VALUES (?, ?, ?, ?, ?, 'pending')
  `;

  db.query(
    sql,
    [
      user_id,
      package_id,
      booking_id,
      rating,
      review
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Review Submitted"
      });

    }
  );

};

exports.getPackageReviews = (req, res) => {

  const { packageId } = req.params;

  const sql = `
    SELECT reviews.*, users.name
    FROM reviews
    JOIN users
      ON reviews.user_id = users.id
    WHERE package_id = ?
    AND status = 'approved'
    ORDER BY created_at DESC
  `;

  db.query(sql, [packageId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

exports.getReviews = (req, res) => {

  const sql = `
    SELECT
      reviews.*,
      users.name,
      packages.title
    FROM reviews
    JOIN users
      ON reviews.user_id = users.id
    JOIN packages
      ON reviews.package_id = packages.id
    ORDER BY reviews.created_at DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

exports.approveReview = (req, res) => {

  const { id } = req.params;

  db.query(
    "UPDATE reviews SET status='approved' WHERE id=?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Review Approved"
      });

    }
  );

};

exports.deleteReview = (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM reviews WHERE id=?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Review Deleted"
      });

    }
  );

};