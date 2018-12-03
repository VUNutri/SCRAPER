import axios from 'axios';
import cheerio from 'cheerio';

const getPrices = async (req, res) => {
  let url = 'https://www.barbora.lt/paieska?uzklausa=';
  const { products } = req.body;

  await Promise.all(products.map(async (product) => {
    await axios.get(url.concat(product.title)).then(async (html) => {
      const $ = await cheerio.load(html.data);
      const sizes = ['kg', 'g', 'l', 'ml'];
      const el = await $('.b-product-price-current-number');
      const elz = await $('.b-product-title > span');
      const text = await $(elz[0]).text();
      console.log(text);
      for (let i in sizes) {
        let idx = text.indexOf(i);
        if (idx != -1) break;
      }

      while(text[i])

      const price = await $(el[0]).text().replace(/\s/g, '').replace(/€/g, '').replace(/,/g, '.');
      product = await Object.assign(product, { price: parseFloat(price, 10) });
    });
  }));
  return res.json(products);
};

export default getPrices;
