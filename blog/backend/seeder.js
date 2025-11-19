import { Users } from "./src/model/userModel.js";
import { users } from "./src/data/users.js";
import { connectDB }  from "./src/config/db.js";
import dotenv from 'dotenv';
dotenv.config({ path: "backend/.env" });

connectDB();

const DB_Data = async () => {
    
    try {
        
        await Users.deleteMany();
        await Users.insertMany(users);

        console.log(`Users data in DB got Deleted and new Users inserted`);
        process.exit();

    } catch (error) {
        console.log(`There is an error ${error}`);
        process.exit(1);
    }
}

if( process.argv[2] === "-d" ){
    DB_Data();
}
else{
    process.exit(1);
}