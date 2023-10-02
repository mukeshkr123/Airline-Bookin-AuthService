const express = require("express");
const apiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");

const app = express();
// const UserRepository = require("./repository/user-repository");

const prepareAndStartServer = () => {
  // passes json
  app.use(express.json());

  //routes
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);

    // const repo = new UserRepository();
    // const response = await repo.getById(1);
    // console.log(response);
  });
};

prepareAndStartServer();
