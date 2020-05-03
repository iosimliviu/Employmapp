const sequelize = require("./database.js");
const User = sequelize.import("./users.js");
const UserTest = sequelize.import("./userTests.js")
const Test = sequelize.import("./tests.js");
const Feedback = sequelize.import("./feedbacks.js");
const Question = sequelize.import("./questions.js");
const Answer = sequelize.import("./answers.js");
const CodeQuestion = sequelize.import("./codeQuestions.js");
const CodeQuestionTest = sequelize.import("./codeQuestionsTests.js")

User.hasOne(Feedback, { onDelete: "cascade", hooks: "true" });
User.hasMany(UserTest, { onDelete: "cascade", hooks: "true" });
Test.hasMany(UserTest);
Test.hasMany(Question);
Test.hasMany(CodeQuestion);
Question.hasMany(Answer, { onDelete: "cascade", hooks: "true" });
//CodeQuestion.hasMany(CodeQuestionTest);

sequelize.sync().then(() => {
  console.log("Tables and database is ok");
});

module.exports = {
  sequelize,
  User,
  UserTest,
  Test,
  Feedback,
  Question,
  Answer,
  CodeQuestion,
  CodeQuestionTest
};
