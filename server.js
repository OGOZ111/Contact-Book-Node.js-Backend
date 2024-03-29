const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const cors = require("cors");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Add cors middleware before defining routes
app.use(cors());

app.use(express.json()); // convert to json format
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
