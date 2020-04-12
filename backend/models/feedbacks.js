module.exports = (sequelize, DataTypes) => {
    return sequelize.define("feedbacks", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      isUser: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      cvRating: DataTypes.INTEGER,
      cvFeedback: DataTypes.STRING,
      interviewRating: DataTypes.INTEGER,
      interviewFeedback: DataTypes.STRING,      
    });
};
  