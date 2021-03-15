import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const UserModel = mongoose.model("User", UserSchema);

class User {
  public username?: string;
  public password?: string;
  public email?: string;

  constructor(username?: string, password?: string, email?: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  async getAllUsers(): Promise<Array<Object>> {
    const searchQuery = await UserModel.find();
    return searchQuery;
  }

  async register(): Promise<Object | undefined> {
    try {
      // verify if username is available
      let checkAvailable = await UserModel.find({ username: this.username }),
        available: boolean;
      checkAvailable.length > 0 ? (available = false) : (available = true);
      // case it's available
      if (available) {
        // hash password
        bcrypt.hash(this.password, 12, (err: Error, hash: string) => {
          if (err) throw err;
          // setting hashed password to user password
          this.password = hash;
          // creating user model
          const userToRegister = new UserModel({
            username: this.username,
            password: this.password,
            email: this.email,
          });
          // save to db
          userToRegister.save().then((doc) => {
            if (doc) {
              return doc;
            } else {
              throw new Error("Não foi possível adicionar ao banco de dados.");
            }
          });
        });
      } else {
        throw new Error("Este nome de usuário não está disponível.");
      }
    } catch (e) {
      // error handling
      return e.message;
    }
  }

  async validatePassword(): Promise<boolean | any> {
    try {
      // search for user with provided username
      const userData: Array<any> | IUser = await UserModel.find({
        username: this.username,
      });

      // if has no matches, throws an error
      if (userData.length < 1)
        throw new Error("Este usuário não existe.");

      // compares the provided password with the one registered on db
      const match: boolean | Error = await bcrypt.compare(
        this.password,
        userData[0].password
      );

      if (match) {
        return true;
      } else {
        throw new Error("As senhas não batem.");
      }
    } catch (e) {
      return e.message;
    }
  }
}

export default User;
