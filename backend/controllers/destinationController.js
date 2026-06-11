const db = require("../config/db");

exports.addDestination = (req, res) => {

  const {
    name,
    description,
    image
  } = req.body;

  const sql = `
    INSERT INTO destinations
    (name, description, image)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, image],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Destination Added Successfully"
      });
    }
  );
};

exports.getDestinations = (req, res) => {

  const sql = "SELECT * FROM destinations";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.updateDestination = (req, res) => {

  const { id } = req.params;

  const {
    name,
    description,
    image
  } = req.body;

  const sql = `
    UPDATE destinations
    SET name=?, description=?, image=?
    WHERE id=?
  `;

  db.query(
    sql,
    [name, description, image, id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Destination Updated Successfully"
      });
    }
  );
};

exports.deleteDestination = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM destinations WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Destination Deleted Successfully"
    });
  });
};

exports.getPackagesByDestination = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT * FROM packages
    WHERE destination_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.getDestinationById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM destinations WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Destination not found"
      });
    }

    res.json(result[0]);
  });
};