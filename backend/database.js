import mongoose from "mongoose";
import mongoose from "mongoose";

//connect to db
const app=express();
function connectDB() {
    const dbURI='mongodb+srv://User:test@ken.sifl7.mongodb.net/KenGPT?retryWrites=true&w=majority&appName=Ken';
   
    try {
      mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
      console.log(`Database connected: ${url}`);
    });
   
    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });
    return;
  }
  export default connectDB;