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

  const result = await service.isAdmin(1);

  app.listen(PORT, () => {
    // db.sequelize.sync({ alter: true });
    console.log(`server running at port ${PORT}`);
  });
};
prepareAndStartServer();
