const User = require("../models/index").User;

const getUser =  async(req, res) => {
    const userId = req.params.id;
    try{
        const user = await User.findOne({ where : { id: userId } });
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send({ message: "Server error" });
    }
};

const getAllUsers =  async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Server error" })
    }
};

const createUser =  async (req, res) => {
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

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        User.findOne({
        where: {
            id: userId,
        },
        }).then((result) => {
        if (result) {
            result.destroy();
            res.status(200).send({
            message: "User deleted",
            });
        } else
            res.status(404).send({
            message: "Could not find user",
            });
        });
    } catch (e) {
        res.status(500).send({ message: "Server error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let password = req.body.password;

        const foundUser = await User.findOne({
            where: {
                id
            }
        });
        if (!foundUser) {
            res.status(400).send({ message: "user does not exist" });
        }
        else {
            const updatedUser = await foundUser.update({
                ...foundUser, 
                password
            });
            res.status(200).send({ updatedUser, message: "user has been updated" });

        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" })
    }
}
module.exports = {
    getUser,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
};
  