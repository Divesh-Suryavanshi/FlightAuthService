const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const UserService = require("./services/user-service");

const db = require("./models");

const prepareAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);
  const service = new UserService();
  // const response = await service.signIn("1@gmail.com", "divesh");
  // const user = await service.verifyToken(token);
  // const user = await service.create({
  //   email: "1@gmail.com",
  //   password: "divesh",
  // });

  // const user = await service.getById(1);
  // const role = await service.getRoleById(4);
  // await user.addRole(4);
  // role.addUser(user);
  // const result = await user.hasRole(role);

  const result = await service.isAdmin(1);

  app.listen(PORT, () => {
    // db.sequelize.sync({ alter: true });
    console.log(`server running at port ${PORT}`);
    // console.log(response);
    // console.log("db: ", db);
    // console.log("user: ", user, "role: ", role);
    console.log("user has role?: ", result);
  });
};
prepareAndStartServer();
