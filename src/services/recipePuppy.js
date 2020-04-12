const axios = require('axios').default;
const recipePuppy = axios.create({baseURL:  'http://www.recipepuppy.com'});
const giphy = axios.create({baseURL: 'http://api.giphy.com/v1/gifs/search?'});

module.exports = async function recipePuppyExternal(request, response, next) {
    const { i } = request.query;
    const all = {
        keywords: i.split(','),
        recipes: []
    };
    try {
        const recipePuppyResponse = await recipePuppy.get(`/api/?i=${all.keywords.join(', ')}`);
        for (const data of recipePuppyResponse.data.results) {
            const {title, href, ingredients, thumbnail} = data;
            const recipe = {
                title: title.replace(/(\r\n|\n|\r|\t)/gm, '').trim(),
                ingredients: ingredients.split(',').sort().join(', ').trim(),
                link: href,
                gif: ''
            };
            const options = {
                params: {
                    q: encodeURIComponent(recipe.title),
                    api_key: process.env.PUBLIC_KEY,
                    rating: process.env.RATING,
                    limit: process.env.LIMIT
                }
            };
            const giphyResponse =  await giphy.get('', options);
            recipe.gif = giphyResponse.data.data[0].embed_url;
            all.recipes.push(recipe);
        }
        request.body = all;
    } catch (err) {
        return response.status(err.response ? err.response.status : 500).json({ message: err.message });
    }

    next();
};