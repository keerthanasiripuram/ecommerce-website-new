import express from "express";
import cors from "cors";
import userRoutes from "./routes/user-route";
import productRoutes from "./routes/product-route";
import orderRoutes from "./routes/order-route";
import adminRoutes from "./routes/admin-routes";
import path from "path";
import { CustomError } from "./errorObject";

const app = express();
const port = 3001; //TODO

//apply middlewres
app.use(cors({ origin: "http://localhost:3000" })); //TODO

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
