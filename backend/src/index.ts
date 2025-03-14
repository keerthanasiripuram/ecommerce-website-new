import express from "express";
import cors from "cors";
import userRoutes from "./routes/user-route";
import productRoutes from "./routes/product-route";
import orderRoutes from "./routes/order-route";
import adminRoutes from "./routes/admin-routes";
import path from "path";
import { CustomError } from "./errorObject";
import authRoutes from "./routes/auth-routes";

const app = express();
const port = 3001; //TODO

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3002",
  "http://localhost:3003", 
];

//apply middlewres
// app.use(cors({ origin: "http://localhost:3000" })); //TODO
// Apply CORS middleware
app.use(
  cors({
    origin: function (origin: string | undefined, callback) {
      if (origin&&allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } 
   else if (!origin) {
      callback(null, true); // Allow requests with no origin (e.g., from Postman or cURL)
    }else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/auth",authRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  // if (err instanceof CustomError) {
  //   return res.status(err.statusCode).json({
  //     message: err.message,
  //   });
  // }
  if (err instanceof Error) {
    if(err.message==="CONFLICT")
    {
      console.log("yeahhh")
      return res.status(409).json({
        message: err.message,
        statk: err.stack,
      });
    }
    else if(err.message==="NOT_FOUND")
      {
        return res.status(404).json({
          message: err.message,
          statk: err.stack,
        });
      }
  }
  if(err?.code)
  {
    return res.status(500).json({
      message: "DB ERROR",
    });
  }
  return err;
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
