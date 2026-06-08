const express = require("express");

const router = express.Router();

const {
getUsers,
deleteUser,
makeAdmin,
removeAdmin
} = require("../controllers/userController");

router.get("/", getUsers);

router.delete("/delete/:id", deleteUser);

router.put("/make-admin/:id", makeAdmin);

router.put("/remove-admin/:id", removeAdmin);

module.exports = router;
