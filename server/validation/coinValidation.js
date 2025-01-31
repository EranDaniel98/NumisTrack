const Joi = require('joi');

const validateCoin = (data) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        year: Joi.number().integer().min(0).required,
        country: Joi.string().required(),
        condition: Joi.string().valid('Poor', 'Fair', 'Good', 'Very Good', 'Excellent').required(),
        value: Joi.number().optional(),
        description: Joi.string().optional(),
        additionalAttributes: Joi.object().optional(),
    });
    
    return schema.validate(data);
};

module.exports = validateCoin;