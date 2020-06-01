const User = require("../models/index.js").User;
const Feedback = require("../models/index.js").Feedback;
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const adminconfig = require("../config/adminconfig.json");

// function cvUpload(req, res) {
//   const folder = path.join(__dirname, '../files');
//   if (!fs.existsSync(folder)) {
//     fs.mkdirSync(folder)
//   }

//   const form = new formidable.IncomingForm()

//   form.uploadDir = folder

//   // form.on('file', function (field, file) {
//   //   fs.rename(file.path, form.uploadDir + "/" + "Bobita_Cristian.pdf", function (error) { });
//   // });

//   form.on('error', function (err) {
//     // console.log("an error has occured with form upload");
//     // console.log(err);
//     request.resume();
//   });

//   form.on('aborted', function (err) {
//     //console.log("user aborted upload");
//   });

//   form.on('end', function () {
//     //console.log('-> upload done');
//   });
//   form.parse(req, (_, fields, files) => {
//     // console.log('\n-----------')
//     // console.log('Fields', fields)
//     // console.log('Received:', Object.keys(files))
//     res.send('Thank you')
//   })

// }

function cvUpload(req, res) {
  const lastName = req.params.lastName;
  const firstName = req.params.firstName;
  const folder = path.join(__dirname, '../files');
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
  const form = new formidable.IncomingForm()
  form.uploadDir = folder
  form.on('file', function (field, file) {
    fs.rename(file.path, form.uploadDir + "/" + `CV_${lastName}_${firstName}.pdf`, function (error) { });
  });
  form.parse(req, (_, fields, files) => {
    res.send('Thank you')
  })

}

const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ message: "Server error" });
  }
};

const getUserByEmail = async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ message: "email not found" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server error" })
  }
};

const createUser = async (req, res) => {
  try {
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
      const folder = path.join(__dirname, '../files');
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder)
      }
      const form = new formidable.IncomingForm()
      form.uploadDir = folder
      form.on('file', function (field, file) {
        fs.rename(file.path, form.uploadDir + "/" + `${firstName}_${lastName}.pdf`, function (error) { res.send('sugipula') });
      });
      form.parse(req, (_, fields, files) => {
        res.send('Thank you')
      })


      if (await email.localeCompare(adminconfig.email) == 0) {
        User.create({
          firstName,
          lastName,
          email,
          phone,
          password: adminconfig.password,
          isAdmin: true,
          token: Math.random().toString(36)
        });
      } else {
        User.create({
          firstName,
          lastName,
          email,
          phone,
          password,
          isAdmin: false,
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

const createObeserver = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
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
    if (errors.length === 0) {
      User.create({
        firstName,
        lastName,
        email,
        password,
        isObserver: true,
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

const getFeedbackForUser = async (req, res) => {
  let user_id = req.params.user_id;
  let feedback = await Feedback.findOne({
    where: {
      userId: user_id
    }
  });
  if (!feedback) {
    res.status(400).send({ message: "feedback does not exist" });
  } else
    res.status(404).json(feedback);
}

module.exports = {
  cvUpload,
  getUser,
  getUserByEmail,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getFeedbackForUser,
  createObeserver
};
