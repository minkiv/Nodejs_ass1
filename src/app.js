import express from "express";
import productRouter from "./routes/product.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/web17309")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use("/api", productRouter);

// export const viteNoteApp = app;
app.listen(8080, () => {
  console.log(`server rung post 8080`);
});
