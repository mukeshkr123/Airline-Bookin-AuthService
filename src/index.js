const exprees = require("express");
const { PORT } = require("./config/serverConfig");
const app = exprees();

const prepareAndStartServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

prepareAndStartServer();
