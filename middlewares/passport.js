const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Hospital = require("../models/hospital");

const initialize = (passport) => {
  console.log("passport initialized");
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "TOP_SECRET",
  };

  passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
      console.log("jwtPayload = ", jwtPayload);
      await Hospital.findById(jwtPayload.id)
        .then((hospital) => {
          if (hospital) {
            return next(null, hospital);
          } else {
            return next(null, false);
          }
        })
        .catch((err) => {
          return next(err, false);
        });
    })
  );
};

module.exports = initialize;
