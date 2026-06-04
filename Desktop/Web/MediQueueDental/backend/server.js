const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const receptionRoutes = require("./routes/receptionRoutes");

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store io instance globally
app.set("io", io);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Home
app.get("/", (req, res) => {
  res.send("🏥 MediQueue Dental API Running");
});

// Health Check
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend Working"
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/reception", receptionRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `🚀 MediQueue Server Running On Port ${PORT}`
  );
});