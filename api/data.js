const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const url = 'http://books.toscrape.com/';
        const { src } = await axios.get(url);
        const $ = cheerio.load(src);

        const data = [];
        $('article.product_pod').each((i, element) => {
            const title = $(element).find('h3 a').attr('title');
            const price = $(element).find('p.price_color').text();
            data.push({ title, price });
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape data' });
    }
};
