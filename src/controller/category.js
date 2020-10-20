const { Category } = require("../../models");

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { all: categories },
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

exports.readOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const detailCategories = await Category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { detail: detailCategories },
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

exports.createCategory = async (req, res) => {
  try {
    const createCategory = await Category.create(req.body);

    res.send({
      message: "Category has succesfully created",
      data: {
        create: createCategory,
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

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateCategory = await Category.update(
      { name: body.name },
      {
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        individualHooks: true,
      }
    );

    res.send({
      message: "Category has succesfully updated",
      data: {
        update: updateCategory,
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

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.destroy({
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
