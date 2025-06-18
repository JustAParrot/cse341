const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const Trainer = require("../models/trainerModel")

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingTrainer = await Trainer.findOne({ googleId: profile.id })
    if (existingTrainer) return done(null, existingTrainer)

    const newTrainer = await Trainer.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id
    })
    return done(null, newTrainer)
  } catch (err) {
    return done(err, null)
  }
}))

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  Trainer.findById(id).then(user => done(null, user))
})
