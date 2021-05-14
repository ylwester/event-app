const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
            .messages({
                'string.min': `Nazwa użytkownika musi zawierać minimum 3 znaków`,
                'string.empty': `Nazwa użytkownika nie może być pusta`,
                'any.required': `Nazwa użytkownika jest wymagana`,
            }),
        email: Joi.string()
            .min(6)
            .required()
            .email()
            .messages({
                'string.email': `Zły adres email`,
                'string.empty': `Adres email nie może być pusty`,
                'any.required': `Adres email jest wymagany`,
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                'string.min': `Hasło musi zawierać minimum 3 znaków`,
                'string.empty': `Pole hasło nie może być puste`,
            }),
        confirmPassword: Joi.any().valid(Joi.ref('password'))
            .required()
            .label('Confirm password')
            .messages({ 'any.only': '{{#label}} does not match' })
    })

    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email()
        .messages({
            'string.empty': `Adres email nie może być pusty`,
            'any.required': `Adres email jest wymagany`,
        }),
        password: Joi.string()
            .min(6)
            .required()
        .messages({
            'string.empty': `Pole hasło nie może być puste`,
            'any.required': `Hasło jest wymagane`,
        }),
    })


    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;