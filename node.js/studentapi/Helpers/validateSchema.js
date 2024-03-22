const Joi = require('joi');

const authSchema = Joi .object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
})

const vendorValidate = Joi.object ({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phonenumber: Joi.number().required(),
    email: Joi.string().email().required(),
    address: Joi.string(),
})


module.exports = {authSchema, vendorValidate}