const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepositoy = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepositoy.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      // find the user by email
      const user = await this.userRepositoy.getByEmail(email);
      //compare the password
      const passwordMatch = this.checkPassword(password, user.password);
      if (!passwordMatch) {
        console.log("Password mismatch");
        throw { error: "Incorrect password" };
      }
      // create the token if password matches and send it to the user
      const newJWT = this.createToken({
        email: user.email,
        password: user.password,
      });
      return newJWT;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation");
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;
