const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const countryRoutes = require("./routes/country.route");
const serviceRoutes = require("./routes/service.routes");
const logger = require("morgan");
const { errorHandler } = require("./middleware/errorHandler");
const seedRoles = require("./seeders/seedRoles");
const seedCountries = require("./seeders/seedCountries");
config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: [
      "https://fincclean.vercel.app",
      "https://laundromat.eduos.com.ng",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to FincCleanApp, your favorite laundry management system");
});
app.get("/roles", (req, res) => {
  seedRoles();
  res.send("Roles has been created");
});

app.get("/seed-countries", (req, res) => {
  seedCountries();
  res.status(200).json({
    message: "Countries has been created",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/services", serviceRoutes);
// batch B of dev
app.use("/api/shift", require("./routes/shiftRoute"));
app.use("/api/payroll", require("./routes/payrollRoute"));
app.use("/api/attendance", require("./routes/attendanceRoute"));
app.use("/api/pickup", require("./routes/pickupRoute"));
app.use("/api/delivery", require("./routes/deliveryRoute"));
app.use("/api/user", require("./routes/permission"));
app.use("/api/store", require("./routes/storeRoute"));

app.use(errorHandler);

app.use("*", (req, res) => {
  res.status(404).send({
    error: "Not Found",
    statusCode: 404,
  });
});

const runserver = () => {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => console.error(error.message));
};

runserver();
