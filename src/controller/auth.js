const { User } = require("../../models");

//dec or en data like password
const bycript = require("bcrypt");

//make token
const jwt = require("jsonwebtoken");

//Validation
const joi = require("@hapi/joi");

//key for decrypt jwt token
const jwtKey = process.env.JWT_KEY;

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User Valid",
      data: {
        user,
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

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, gender, password, phone, address } = req.body;

    //Validation
    const schema = joi.object({
      fullName: joi.string().min(3).required(),
      email: joi.string().email().min(10).required(),
      gender: joi.string().min(3).required(),
      password: joi.string().min(8).required(),
      phone: joi.number().min(10).required(),
      address: joi.string().required(),
    });

    // get error from validation
    const { error } = schema.validate(req.body);

    //if error existed
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }
    //Validation end

    //check email exist
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    //send response if email exist
    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email has already taken",
        },
      });
    }

    //dec strength
    const saltRounds = 10;

    //dec password
    const hashedPassword = await bycript.hash(password, saltRounds);

    //create User
    const user = await User.create({
      fullName,
      email,
      gender,
      password: hashedPassword,
      phone,
      address,
    });

    // create new jwttoken after register
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //send request user data & jwt
    res.send({
      message: "You has been registered",
      data: {
        email: user.email,
        gender,
        fullName,
        phone,
        address,
        token,
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

exports.login = async (req, res) => {
  try {
    //get email pass body
    const { email, password } = req.body;

    //validation
    const schema = joi.object({
      email: joi.string().min(10).required(),
      password: joi.string().min(8).required(),
    });

    //get error
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    ///validate end

    //check user
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //if user email not existed
    if (!user) {
      return res.status(400).send({
        error: {
          message: "Email or Pass Invalid",
        },
      });
    }

    //if user password not existed
    const validPass = await bycript.compare(password, user.password);
    if (!validPass) {
      return res.status(400).send({
        error: {
          message: "Email or Password Invalid",
        },
      });
    }

    //if all exist
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //send new respon
    res.send({
      message: "Login Success",
      data: {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        token,
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
