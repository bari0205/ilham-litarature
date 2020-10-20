const { User } = require("../../models");

exports.getUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { all: users },
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

exports.readOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const detailUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { detail: detailUser },
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

exports.createUser = async (req, res) => {
  try {
    const createUser = await User.create(req.body);

    res.send({
      message: "User has succesfully created",
      data: {
        create: createUser,
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

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateUser = await User.update(body, {
      where: {
        id,
      },
    });

    if (updateUser) {
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updateAt"],
        },
      });

      return res.status(500).send({
        message: "User Successfuly Update",
        data: user,
      });
    } else {
      return res.status(404).send({
        message: "User didn't exist",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.destroy({
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
