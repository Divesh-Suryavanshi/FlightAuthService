const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const UserService = require("./services/user-service");

const prepareAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);
  const service = new UserService();
  const user = await service.signIn("divesh@gmail.com", "Divesh");

  app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
    console.log(user);
  });
};
prepareAndStartServer();
