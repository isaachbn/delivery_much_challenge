module.exports = function parameterValidation(request, response, next) {
    const { i } = request.query;

    if (!i || i.split(',').length > 3) {
        return response.status(400).json({ message: 'Pass a maximum of three ingredients.' })
    }

    next();
};