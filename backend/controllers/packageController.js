const db = require("../config/db");

exports.addPackage = (req, res) => {
  console.log("ADD PACKAGE HIT");
  console.log(req.body);

  const {
    destination_id,
    title,
    description,
    price,
    duration,
    image
  } = req.body;

  const sql = `
    INSERT INTO packages
    (destination_id, title, description, price, duration, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      destination_id,
      title,
      description,
      price,
      duration,
      image
    ],
    (err, result) => {

      if (err) {
  console.log("ADD PACKAGE ERROR:", err);
  return res.status(500).json(err);
}

      res.json({
        message: "Package Added Successfully"
      });
    }
  );
};

exports.getPackages = (req, res) => {

  const sql = "SELECT * FROM packages";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

/* NEW FUNCTION */

exports.getPopularPackages = (req, res) => {

  const sql = "SELECT * FROM packages WHERE is_popular = TRUE";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.updatePackage = (req, res) => {

  const { id } = req.params;

  const {
    title,
    description,
    price,
    duration
  } = req.body;

  const sql = `
    UPDATE packages
    SET title=?, description=?, price=?, duration=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      title,
      description,
      price,
      duration,
      id
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Package Updated Successfully"
      });
    }
  );
};

exports.deletePackage = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM packages WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Package Deleted Successfully"
    });
  });
};

exports.getPackageById = (req, res) => {

  const { id } = req.params;

  const sql = "SELECT * FROM packages WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Package not found"
      });
    }

    res.json(result[0]);
  });
};