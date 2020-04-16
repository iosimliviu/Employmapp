const User = require("../models/index").User;

const checkLogin = async (req, res, next) => {
    const { token, id } = req.session;

    if (!token || !id) {
        res.status(403).send({ message: "Forbidden" });
    } else {
        const user = await User.findOne({ where: { token, id }, raw: true });

        if (!user) {
        res.status(403).send({ message: "Forbidden" });
        } else {
        next();
        }
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, password }, raw: true });

    if (!user) {
      res.status(403).send({ message: "Incorrect email or password" });
    } else {
      if (req.session.id) {
        res.status(202).send({ message: "Already logged it" });
      } else {
        req.session.id = user.id;
        req.session.token = user.token;
        res.status(200).send({ message: "Successful login" });
      }
    }
}

const userRegister =  async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const errors = [];
      if (!firstName) {
        errors.push("First name is empty");
      }
      if (!lastName) {
        errors.push("Last name is empty");
      }
      if (!email) {
        errors.push("Email is empty");
      } else if (
        !email.match(
          /(?:[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@stud.ase.ro/
        )
      ) {
        errors.push("Email is not valid");
      } else if (await User.findOne({ where: { email }, raw: true })) {
        errors.push("Email already used");
      }
      if (!password) {
        errors.push("Password is empty");
      }
      if (!password) {
        errors.push("Password is empty");
      }
      if (errors.length === 0) {
        await User.create({
          firstName,
          lastName,
          email,
          password,
          token: Math.random().toString(36)
        });
        res.status(201).send({
          message: `User ${firstName} ${lastName} was sucessfull created`
        });
      } else {
        res.status(400).send({ errors });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error"
      });
    }
  }

module.exports = { 
    checkLogin,
    userLogin,
    userRegister
};
