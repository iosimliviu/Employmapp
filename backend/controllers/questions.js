const Question = require("../models/index").Question;

// const createQuestion = async(req, res) => {
//     const group = new Group(req.body);
//     if (group.name) {
//       await group.save();
//       let user_group = new UserGroup();
//       user_group.userId = req.user.id;
//       user_group.groupId = group.id;
//       await user_group.save();
//       res.status(201).send({
//         message: "Group created!",
//         group: group,
//       });
//     } else {
//       res.status(400).json({
//         message: "Invalid group payload",
//       });
//     }
// };