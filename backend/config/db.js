const mongoose = require('mongoose')

const connectDb =  async()=>{
    try {
        const conn =  await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected at the : ${conn.connection.host}`);

    }catch(error){
        console.log('MongoDB connection failed',error.message);
        process.exit(1);

    }

}

module.exports  = connectDb;