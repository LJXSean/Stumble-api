const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Think new url parser field not needed since i am using v4 mongo
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process if fail
    process.exit(1);
  }
};

module.exports = connectDB;
