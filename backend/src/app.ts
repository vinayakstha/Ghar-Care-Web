import express, { Application, Request, response, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import adminUserRoutes from "./routes/admin/user.route";
import adminCategoryRoutes from "./routes/admin/category.route";
import adminServiceRoutes from "./routes/admin/service.route";
import categoryRoutes from "./routes/category.route";
import serviceRoutes from "./routes/service.route";
import bookingRoutes from "./routes/booking.route";
import cors from "cors";
import path from "path";

dotenv.config();

const app: Application = express();

let corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3003"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
const uploadsPath = path.resolve(__dirname, "../uploads"); // adjust based on where uploads is
app.use("/uploads", express.static(uploadsPath));

//user routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/user/service", serviceRoutes);
app.use("/api/user/booking", bookingRoutes);

//admin routes
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/category", adminCategoryRoutes);
app.use("/api/admin/service", adminServiceRoutes);
app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: "true", message: "welcome to the api" });
});

export default app;
