import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("error", console.error.bind(console, "connection error: "));
database.once("open", () => {
  console.log("🔌 Database successfully connected.");
});

export { database };
