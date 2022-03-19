const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/datasub';

const dbConnect = async () => {
  await mongoose.connect(mongoUri, () => {
    console.log('DB connected');
  });
};

module.exports = { dbConnect };
