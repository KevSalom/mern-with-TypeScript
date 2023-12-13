import mongoose from "mongoose";

const DBconnection = async () => {
    try {
        await mongoose.connect(
        "mongodb+srv://kevsalom:Guardianes33@kevsalom.lfiygna.mongodb.net/merndb?retryWrites=true&w=majority"
      );
      console.log('Base de datos lista para usar')
    } catch (error) {
      console.log(error);
    }
  };
  
    export default DBconnection;