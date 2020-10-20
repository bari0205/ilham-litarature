const express = require("express");

const router = express.Router();

const { authenticated } = require("../../middleware/authentication");

//Categories
const {
  getCategory,
  readOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");

router.get("/category", getCategory);
router.get("/category/:id", readOneCategory);
router.post("/category", authenticated, createCategory);
router.patch("/category/:id", authenticated, updateCategory);
router.delete("/category/:id", authenticated, deleteCategory);

//Users
const {
  getUser,
  readOneUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/user");

router.get("/user", getUser);
router.get("/user/:id", readOneUser);
router.patch("/user/:id", updateUser);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);

//Books
const {
  getBooks,
  readOneBooks,
  createBooks,
  updateBooks,
  deleteBooks,
  readUserBooks,
  readAprovedBooks,
  readAprovedBooksCategory,
  readAprovedBooksCategoryYear,
  readYear,
} = require("../controller/books");

router.get("/books", getBooks);
router.get("/books/:id", readOneBooks);
router.get("/book-user/:id", readUserBooks);
router.get("/book-aprove", readAprovedBooks);
router.get("/year", readYear);
router.get("/book-aprove/:title", readAprovedBooksCategory);
router.get("/book-aprove/:title/:pub", readAprovedBooksCategoryYear);
router.post("/books", authenticated, createBooks);
router.patch("/books/:id", authenticated, updateBooks);
router.delete("/books/:id", authenticated, deleteBooks);

//auth
const { register, login, checkAuth } = require("../controller/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/checkAuth", authenticated, checkAuth);

//library
const {
  readOneLibrary,
  createLibrary,
  deleteLibrary,
} = require("../controller/libraries");

router.get("/mark/:id", readOneLibrary);
router.delete("/mark/:id", deleteLibrary);
router.post("/mark", createLibrary);

module.exports = router;
