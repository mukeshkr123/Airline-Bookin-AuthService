const express = require("express");
const apiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");

const app = express();

const prepareAndStartServer = () => {
  // passes json
  app.use(express.json());

  //routes
  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

prepareAndStartServer();
