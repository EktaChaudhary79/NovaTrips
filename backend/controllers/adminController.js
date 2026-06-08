const db = require("../config/db");

exports.getStats = (req, res) => {

const usersQuery =
"SELECT COUNT(*) AS totalUsers FROM users";

const packagesQuery =
"SELECT COUNT(*) AS totalPackages FROM packages";

const bookingsQuery =
"SELECT COUNT(*) AS totalBookings FROM bookings";

const revenueQuery =
"SELECT SUM(total_amount) AS totalRevenue FROM bookings";

db.query(usersQuery, (err, usersResult) => {


if (err) {
  return res.status(500).json(err);
}

db.query(packagesQuery, (err, packagesResult) => {

  if (err) {
    return res.status(500).json(err);
  }

  db.query(bookingsQuery, (err, bookingsResult) => {

    if (err) {
      return res.status(500).json(err);
    }

    db.query(revenueQuery, (err, revenueResult) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        users:
          usersResult[0].totalUsers,

        packages:
          packagesResult[0].totalPackages,

        bookings:
          bookingsResult[0].totalBookings,

        revenue:
          revenueResult[0].totalRevenue || 0
      });

    });

  });

});


});

};
