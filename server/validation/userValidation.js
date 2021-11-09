import Joi from '@hapi/joi';

export const authSchema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(4)
    .max(30)
    .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string().min(8)
        .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*"))
        .required()
        .messages({
            "string.base": `"Password" should match'`,
            "string.empty": `"Password" cannot be an empty field`,
            "any.required": `"Password" is a required.`,
          }),

    passwordTwo: Joi.ref('password')
})