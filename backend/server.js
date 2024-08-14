const express = require("express");
const dotenv = require("dotenv").config();
const swagger = require("./config/swagger");
const cors = require("cors");
const port = process.env.PORT;
const { errHandler } = require("./middlewares/errorModule");
const connectDB = require("./config/db");
const http = require("http");
const createAdmin = require("./utils/createAdminUser");

// Connect to the database
connectDB();
createAdmin();
const app = express();
const server = http.createServer(app); // Create an HTTP server

// Middleware setup
app.use(cors());
swagger(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes setup

app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/messages", require("./Routes/messageRoutes"));
app.use(errHandler);

// Socket.IO setup
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // <--- Allow requests from your frontend
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start listening
server.listen(port, () => {
  console.log(`App is working on port ${port}`);
});
