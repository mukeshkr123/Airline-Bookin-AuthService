const express = require("express");
const apiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");

const app = express();

const db = require("./models/index");

const prepareAndStartServer = () => {
  // passes json
  app.use(express.json());
  //routes
  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

  if (process.env.DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }
};

prepareAndStartServer();
