const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        // Think new url parser field not needed since i am using v4 mongo
        await mongoose.connect(db, {
            useNewUrlParser: true
        })
        
        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        // Exit process if fail
        process.exit(1);
    }
} 

module.exports = connectDB