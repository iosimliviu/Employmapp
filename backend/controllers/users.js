const User = require("../models/index.js").User;
const Test = require("../models/index.js").Test;
const adminconfig = require("../config/adminconfig.json");

const getUser =  async(req, res) => {
    const userId = req.params.id;
    try{
        const user = await User.findOne({ where : { id: userId } });
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send({ message: "Server error" });
    }
};

const getUserByEmail =  async(req, res) => {
  const userEmail = req.body.email;
  try{
      const user = await User.findOne({ where : { email: userEmail } });
      res.status(200).send(user);
  } catch (e) {
      res.status(500).send({ message: "email not found" });
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
      //const { firstName, lastName, email, password } = req.body;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const phone = req.body.phone;
      const password = req.body.password;

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
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        )
      ) {
        errors.push("Email is not valid");
      } else if (await User.findOne({ where: { email }, raw: true })) {
        errors.push("Email already used");
      }
      if (!password) {
        errors.push("Password is empty");
      }
      if (!phone) {
        errors.push("Phone is empty");
      }
      if (errors.length === 0) {
        if(await email.localeCompare(adminconfig.email) ==  0){
           User.create({
            firstName,
            lastName,
            email,
            phone,
            password : adminconfig.password,
            isAdmin : true,
            token: Math.random().toString(36)
          });
        } else{
           User.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            isAdmin : false,
            token: Math.random().toString(36)
          });
        }
        
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

const getAllTestsForUser = async (req, res) => {
  let user_id = req.params.user_id;
  let tests = await Test.findAll({
    where : {
      userId : user_id
    }
  });
  if (tests.length > 0) {
    res.status(200).json(tests);
  } else 
  res.status(404).json({ message: "user has taken 0 tests" });
};

module.exports = {
    getUser,
    getUserByEmail,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getAllTestsForUser
};
  