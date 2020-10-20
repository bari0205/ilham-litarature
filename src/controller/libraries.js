const { Library, Books, User } = require("../../models");

//Foo adalah parent
//Bar adalah children

exports.readOneLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const detailLibrary = await Library.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "BookId"],
      },
      include: [
        {
          model: User,
          as: "libraryUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },

        {
          model: Books,
          as: "libraryBook",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Library Response Successfuly Loaded",
      data: { detail: detailLibrary },
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

exports.createLibrary = async (req, res) => {
  try {
    const createLibrary = await Library.create(req.body);

    res.send({
      message: "Book has succesfully Marked",
      data: {
        create: createLibrary,
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

exports.deleteLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLibrary = await Library.destroy({
      where: {
        id,
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
