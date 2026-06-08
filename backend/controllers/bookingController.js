const db = require("../config/db");

exports.addBooking = (req, res) => {

const {
user_id,
package_id,
booking_date,
full_name,
email,
phone,
travelers,
special_requests,
total_amount,
status,
payment_status
} = req.body;

const booking_reference =
"NT" + Date.now();

const sql = `     INSERT INTO bookings
    (
      booking_reference,
      user_id,
      package_id,
      full_name,
      email,
      phone,
      travelers,
      special_requests,
      total_amount,
      booking_date,
      status,
      payment_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

db.query(
sql,
[
booking_reference,
user_id,
package_id,
full_name,
email,
phone,
travelers,
special_requests,
total_amount,
booking_date,
status,
payment_status
],
(err, result) => {


  if (err) {
    return res.status(500).json(err);
  }

  res.json({
    message: "Booking Added Successfully",
    booking_reference
  });

}


);

};

exports.getBookings = (req, res) => {

const sql = "SELECT * FROM bookings";

db.query(sql, (err, result) => {


if (err) {
  return res.status(500).json(err);
}

res.json(result);


});

};

exports.getUserBookings = (req, res) => {

const { userId } = req.params;

const sql = `
  SELECT
    bookings.*,
    packages.title,
    packages.image,
    packages.duration,
    packages.location
  FROM bookings
  JOIN packages
    ON bookings.package_id = packages.id
  WHERE bookings.user_id = ?
  ORDER BY bookings.created_at DESC
`;

db.query(sql, [userId], (err, result) => {


if (err) {
  return res.status(500).json(err);
}

res.json(result);


});

};

exports.updateBooking = (req, res) => {

const { id } = req.params;

const {
status,
payment_status
} = req.body;

const sql = `     UPDATE bookings
    SET status=?, payment_status=?
    WHERE id=?
  `;

db.query(
sql,
[
status,
payment_status,
id
],
(err, result) => {


  if (err) {
    return res.status(500).json(err);
  }

  res.json({
    message: "Booking Updated Successfully"
  });

}


);

};

exports.deleteBooking = (req, res) => {

const { id } = req.params;

const sql = "DELETE FROM bookings WHERE id=?";

db.query(sql, [id], (err, result) => {


if (err) {
  return res.status(500).json(err);
}

res.json({
  message: "Booking Deleted Successfully"
});


});

};
