const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const url = req.query.url;
        
        if (!url) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }

        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);

        const data = [];
        $('article.product_pod').each((i, element) => {
            const title = $(element).find('h3 a').attr('title');
            const price = $(element).find('p.price_color').text();
            data.push({ title, price });
        });

        res.status(200).json(data);
    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
};
