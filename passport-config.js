/* const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')

const User = require('./models/user')

function initialize(passport){
    const authenticateUser = async (email, password, done) => {
        const user = await User.find({'email' : email})
        if(user == null)
        {
            return done(null, false, {message: 'Wrong Email :('})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done(null, false, {message: 'Incorrect Password :('})
            }
        }
        catch(e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({username: 'email'},
    authenticateUser))
    passport.serializeUser((user,done)=>done(null, user.id))
    passport.deserializeUser(async(id,done)=>{
        return done(null, await User.findById(id))
    })
}

module.exports = initialize */