import passport from "passport";
import bycrpt from "bcrypt";

import { User } from "../models/user.model.js";

import { GraphQLLocalStrategy } from "graphql-passport";

export const passportConfig = async () => {
  passport.serializeUser((user, done) => {
    console.log("serializing user");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      console.log("deserializing user");
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(new Error("no such user"));
        }
        const valid = await bycrpt.compare(password, user.password);
        if (!valid) {
          return done(new Error("invalid password"));
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};
