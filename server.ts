import express from "express";
import cors from "cors";
import cropRoutes from "./routes/Crop-routes";
import vehicleRoutes from "./routes/vehicle-routes";
import fieldRoutes from "./routes/Field-routes"; // Import Field routes

const app = express();

// Enable CORS globally
app.use(cors());

// Use JSON middleware
app.use(express.json());

// Routes
app.use("/crop", cropRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/field", fieldRoutes); // Use fieldRoutes

// Catch-all route for unhandled routes
app.use("*", (req, res) => {
    res.status(404).send("Not Found");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
