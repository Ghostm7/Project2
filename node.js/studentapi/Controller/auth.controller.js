const { authSchema } = require("../Helpers/validateSchema")

module.exports = {

    //add user
    addUser :async(req,res,next)=>{
        try {
            const {email , password}=await authSchema.validateAsync (req.body)
            const exists = await User.findOne({where: {email}})
            if(exists) {
                throw createHttpError.Conflict('${email} has already been registered')
            }
            const newUser = new User({email,password})
            const savedUser = await newUser.save()

            const accessToken = await signAccessToken(savedUser.user_id)
            res.status(200).send({accessToken})
        }
        catch (error){
            next(error)
    }
}
}