import {Sequelize} from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
    `${process.env.DB_NAME}`,
    `${process.env.DB_USER}`,
    `${process.env.DB_PASS}`,
    {
        host: `${process.env.DB_HOST}`,
        dialect: `postgres`
    }
)
const checkconnect = async () => {
    try{
        await sequelize.authenticate();
        return console.log(`connect database success`);
    }catch(e){
        return console.log(`connect database failure`, e);
    }
}

export {
    checkconnect
}
