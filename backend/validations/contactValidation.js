const Joi = require('@hapi/joi');

const contactValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .messages({
                'string.empty': `Imie nie może być puste`,
                'any.required': `Imie jest wymagane`,
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
        message: Joi.string()
            .min(6)
            .required()
            .messages({
                'string.min': `Wiadomość musi zawierać minimum 24 znaki`,
                'string.empty': `Wiadomość nie może być pusta`,
                'any.required': `Wiadomość jest wymagana`,
            }),

    })

    return schema.validate(data);
}

module.exports = contactValidation