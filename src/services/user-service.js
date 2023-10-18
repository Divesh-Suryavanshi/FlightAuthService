const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/serverConfig");

const UserRepository = require("../repository/user-repository");
const repository = new UserRepository();

class UserService {
  async create(data) {
    try {
      const response = await repository.create(data);
      return response;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async createToken(id) {
    try {
      const user = await this.getById(id);
      console.log("secret: ", SECRET);
      console.log("user: ", user);
      const token = jwt.sign({ email: user.email, id: user.id }, SECRET);
      // console.log("token: ", token);
      return token;
    } catch (error) {
      console.log("Something went wrong while generating a token");
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const user = await repository.getByEmail(email);
      return user;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await repository.getById(id);
      console.log("getById: ", response);
      return response;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.getByEmail(email);
      if (!user) {
        throw "User doesn't exists";
      }

      const isPasswordCorrect = bcrypt.compareSync(
        plainPassword,
        user.password
      );
      // const isPasswordCorrect = user.password === plainPassword;

      if (!isPasswordCorrect) {
        throw "Incorrect password";
      }
      console.log("id: ", user.id);
      const token = await this.createToken(user.id);
      return { email: user.email, id: user.id, token };
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async verifyToken(token) {
    try {
      let user = jwt.verify(token, SECRET);
      if (!user) {
        throw "Invalid token";
      }
      return user;
    } catch (error) {
      console.log("something went wrong in token authentication");
      throw error;
    }
  }
}
// TODO
// createToken(user:{email, id})
// verifyToken(token)
// checkPassword(plainPassword,encyptedPassword)
// async signIn(email, plainPassword)
// ---- fetch user by email
// ---- compare passwords
// ---- generate Token
// repository --> asycn getByEmail(email)

// user model
// beforeCreate((user) => {
// encrypted = bcrypt.hashSync(user.password,SALT) , SALT -> environmen variables -> bcrypt.genSaltSync(9: saltRounds)
// user.password = encryptedPassword
// })

// middleware
// validateUserAuth() -> email or password is missing, commit -> add email and password validation for incoming auth request

// user service
// async isAuthenticated(token) -> if !response -> err: invalid token, if !user -> err: no user with corresponding token exists
//  return user.id
//

// authorisation
// add model -> role
// create many to many association user_roles
// add role seed files
// create isAdmin method in both service and repository layer
//
// middleware
// validateIsAdminRequest -> !req.body.id -> err: user id is not given, else next();
//
// create new micro service -> booking service
// create error files -> app-error-> genericc, validationError, serviceError
// create model
// Booking -> flightId:integer, userId:integer, status:enum,
// add validations -> flightId -> not null, userId -> not null, status -> not null defauoltValue -> In Process values:['In Process', "Booked", "Cancelled"]
// commit -> added booking model
// now add total no. of seats, toatlCost column to model using migration, migration:create
//
// flight repository -> add getFlightById

module.exports = UserService;
