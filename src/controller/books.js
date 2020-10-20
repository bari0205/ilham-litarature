const { required } = require("@hapi/joi");
const { User, Category, Books, Library, sequelize } = require("../../models");
const library = require("../../models/library");
const { Sequelize } = require("sequelize");

exports.getBooks = async (req, res) => {
  try {
    const books = await Books.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "bookUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],

      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          ,
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { all: books },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.readOneBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const detailBooks = await Books.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          ,
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
      include: [
        {
          model: User,
          as: "bookUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },

        {
          model: Library,
          attributes: {
            exclude: ["createdAt", "updatedAt", "BookId", "UserId"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { detail: detailBooks },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.readUserBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const userBooks = await Books.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        userId: id,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          ,
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
      include: [
        {
          model: User,
          as: "bookUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { detail: userBooks },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.readAprovedBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const aprovedBooks = await Books.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        status: "Aproved",
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          ,
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
      include: [
        {
          model: User,
          as: "bookUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { all: aprovedBooks },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.readAprovedBooksCategory = async (req, res) => {
  try {
    const { title } = req.params;
    const Op = Sequelize.Op;
    const aprovedBooks = await Books.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        status: "Aproved",
        title: {
          [Op.like]: "%" + title + "%",
        },
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          ,
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
      include: [
        {
          model: User,
          as: "bookUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { all: aprovedBooks },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.readYear = async (req, res) => {
  try {
    const { title } = req.params;
    const Op = Sequelize.Op;
    const aprovedBooks = await Books.findAll({
      order: [["publication", "DESC"]],
      where: {
        status: "Aproved",
      },
      group: ["publication"],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          ,
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
      include: [
        {
          model: User,
          as: "bookUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { all: aprovedBooks },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.readAprovedBooksCategoryYear = async (req, res) => {
  try {
    const { title, pub } = req.params;

    const Op = Sequelize.Op;
    const aprovedBooks = await Books.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        status: "Aproved",
        title: {
          [Op.like]: "%" + title + "%",
        },
        publication: pub,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          ,
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
      include: [
        {
          model: User,
          as: "bookUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { all: aprovedBooks },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.createBooks = async (req, res) => {
  try {
    const createBooks = await Books.create(req.body);

    res.send({
      message: "Category has succesfully created",
      data: {
        create: createBooks,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.updateBooks = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateBooks = await Books.update(body, {
      where: {
        id,
      },
    });

    if (updateBooks) {
      const book = await Books.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updateAt"],
        },
      });

      return res.status(500).send({
        message: "Book Successfuly Update",
        data: book,
      });
    } else {
      return res.status(404).send({
        message: "Book didn't exist",
      });
    }

    res.send({
      message: "Category has succesfully created",
      data: {
        update: updateBooks,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBooks = await Books.destroy({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Delete Data Successfuly",
      data: { id },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};
