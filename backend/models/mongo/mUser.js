import User from "./user.models.js";
import connectDB from "../../config/mongoConnectDB.js";
connectDB();

const mUser = {
  create: async (user) => {
    try {
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      throw {
        status: 500,
        message: `Error al crear el usuario ${user.username}`,
      };
    }
  },
  getOne: async (username) => {
    try {
      const user = await User.findOne({ username });
      // console.log({ user, username });

      return user;
    } catch (err) {
      throw {
        status: 500,
        message: `Error al obtener el usuario ${username}`,
      };
    }
  },
};

export default mUser;
