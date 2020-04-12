const axios = require('axios').default;
const PUBLIC_KEY = 'vU4m4uJkyGzw1CZIb1hpgX15u1PxMlU1';
const LIMIT = 1;
const RATING = 'pg';
const recipePuppy = axios.create({baseURL:  'http://www.recipepuppy.com'});
const giphy = axios.create({baseURL: 'http://api.giphy.com/v1/gifs/search?'});

module.exports = async function recipePuppyExternal(request, response, next) {
    const { i } = request.query;
    const all = {
        keywords: i.split(','),
        recipes: []
    };
    const gif = '';
    try {
        const recipePuppyResponse = await recipePuppy.get(`/api/?i=${all.keywords.join(', ')}`);
        for (const data of recipePuppyResponse.data.results) {
            const {title, href, ingredients, thumbnail} = data;
            const recipe = {
                title: title.replace(/(\r\n|\n|\r|\t)/gm, '').trim(),
                ingredients,
                link: href,
                gif: ''
            };
            const options = {
                params: {
                    q: encodeURIComponent(recipe.title),
                    api_key: PUBLIC_KEY,
                    rating: RATING,
                    limit: LIMIT
                }
            };
            const giphyResponse =  await giphy.get('', options);
            recipe.gif = giphyResponse.data.data[0].embed_url;
            all.recipes.push(recipe);
        }
        request.body = all;
    } catch (err) {
        console.log(err.message);
        return response.status(500).json({ result: 'error', message: 'An error occurred while trying to fetch the recipe.' });
    }

    next();
};