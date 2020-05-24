module.exports = (sequelize, DataTypes) => {
  return sequelize.define("feedbacks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cvRating: DataTypes.INTEGER,
    cvFeedback: DataTypes.TEXT,
    interviewRating: DataTypes.INTEGER,
    interviewFeedback: DataTypes.TEXT,
    mention: DataTypes.TEXT,
  });
};
