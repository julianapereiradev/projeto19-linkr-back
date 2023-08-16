import joi from "joi";

export const publishSchema = joi.object({
    url: joi.string().uri().required().messages({
        'string.uri': 'O campo link deve ser uma URL válida',
        'any.required': 'O campo link é obrigatório',
    }),
    content: joi.string().allow(null),
    userId: joi.number().integer()
});