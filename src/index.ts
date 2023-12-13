import app from "./app";
import DBconnection from "./db";

const PORT = 3000;

const start = async () => {
  try {
    await DBconnection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();