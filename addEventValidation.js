const Joi = require('@hapi/joi');

const addEventValidation = data => {
    const schema = Joi.object({
        title: Joi.string()
            .min(6)
            .required()
            .messages({
                'string.min': `Tytuł musi zawierać minimum 6 znaków`,
                'string.empty': `Tytuł nie może być pusty`,
                'any.required': `Tytuł jest wymagany`,
            }),
        description: Joi.string()
            .min(6)
            .required()
            .messages({
                'string.min': `Opis musi zawierać minimum 24 znaki`,
                'string.empty': `Opis nie może być pusty`,
                'any.required': `Opis jest wymagany`,
            }),
        day: Joi.string()
            .required()
            .messages({
                'string.empty': `Nie została wybrana data wydarzenia`,
            }),
        location: {
            latitude: Joi.number().greater(0).messages({
                'any.required': "Musisz wybrać lokalizacje",
                'number.greater': "Musisz wybrać lokalizacje"
            }),
            longitude: Joi.number(),
        },
        selectedCategories: Joi.array().min(1).messages({
            'array.min': "Musisz wybrać kategorie",
            'any.required': "Musisz wybrać kategorie",
            'array.base': "Musisz wybrać kategorie",
        })
    }).unknown(true);

    return schema.validate(data);
}

module.exports = addEventValidation;