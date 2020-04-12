const sequelize = require("./database.js");
const User = sequelize.import("./users.js");
const Test = sequelize.import("./tests.js");
const Feedback = sequelize.import("./feedbacks.js");
const TestQuestion = sequelize.import("./testQuestions.js");
const Question = sequelize.import("./questions.js");
const Answer = sequelize.import("./answers.js");
const CodeQuestion = sequelize.import("./codeQuestions.js");
const CodeQuestionTest = sequelize.import("./codeQuestionsTests.js");

User.hasOne(Feedback, { onDelete: "cascade", hooks: "true" });
User.hasMany(Test);
Test.hasMany(TestQuestion, { onDelete: "cascade", hooks: "true" });
TestQuestion.hasMany(Question);
TestQuestion.hasMany(CodeQuestion);
CodeQuestion.hasMany(CodeQuestionTest, { onDelete: "cascade", hooks: "true" });
Question.hasMany(Answer, { onDelete: "cascade", hooks: "true" });

sequelize.sync().then(() => {
  console.log("Tables and database is ok");
});

module.exports = {
  sequelize,
  User,
  Test,
  Feedback,
  TestQuestion,
  Question,
  Answer,
  CodeQuestion,
  CodeQuestionTest,
};
