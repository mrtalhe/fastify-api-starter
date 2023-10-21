import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
  'mysql://127.0.0.1:3306/mysql',
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    password: "12345678",
    username: "root",
  },
)
sequelize.sync({force: false})

export default sequelize;