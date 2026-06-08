const db = require("../config/db");

exports.getUsers = (req, res) => {

const sql =
"SELECT id, name, email, role, created_at FROM users ORDER BY id DESC";

db.query(sql, (err, result) => {


if (err) {
  return res.status(500).json(err);
}

res.json(result);


});

};

exports.deleteUser = (req, res) => {

const { id } = req.params;

const sql =
"DELETE FROM users WHERE id=?";

db.query(sql, [id], (err, result) => {


if (err) {
  return res.status(400).json({
    message: "Cannot delete user because bookings exist"
  });
}

res.json({
  message: "User Deleted Successfully"
});


});

};

exports.makeAdmin = (req, res) => {

const { id } = req.params;

const sql =
"UPDATE users SET role='admin' WHERE id=?";

db.query(sql, [id], (err, result) => {


if (err) {
  return res.status(500).json(err);
}

res.json({
  message: "User Promoted To Admin"
});


});

};

exports.removeAdmin = (req, res) => {

const { id } = req.params;

const sql =
"UPDATE users SET role='user' WHERE id=?";

db.query(sql, [id], (err, result) => {

if (err) {
return res.status(500).json(err);
}

res.json({
message: "Admin Removed Successfully"
});

});

};

