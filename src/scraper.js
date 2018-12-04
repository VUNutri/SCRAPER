import axios from 'axios';
import cheerio from 'cheerio';

const getPrices = async (req, res) => {
  let url = 'https://www.barbora.lt/paieska?uzklausa=';
  const { products } = req.body;
  const resProducts = [];

  await Promise.all(products.map(async (product) => {
    await axios.get(url.concat(product.title)).then(async (html) => {
      const $ = await cheerio.load(html.data);
      const el = await $('.b-product-price-current-number');
      const elz = await $('.b-product-title > span');

      let minPrice = 999999;
      let minObj;

      for (let i = 0; i < el.length; i++) {
        const text = await $(elz[i]).text();
        const price = await $(el[i]).text().replace(/\s/g, '').replace(/€/g, '').replace(/,/g, '.');
        const resp = getParams(text, price, product);

        if (resp.price < minPrice) {
          minPrice = resp.price;
          minObj = resp;
        }
        else console.log(resp);
      }
      resProducts.push(minObj);
    });
  }));
  return res.json(resProducts);
};

const getParams = (text, price, product) => {
  const sizes = [' kg', ' ml', ' g', ' l'];
  let size;
  let idx;
  for (let i in sizes) {
    idx = text.indexOf(sizes[i]);
    size = sizes[i].replace(/ /g, '');
    if (idx != -1) break 
  }
  let a = text.slice(idx - 1, idx);
  let c = idx;
  while (a !== ' ') {
    c -= 1;
    a = text.slice(c - 1, c);
  }
  let ammount = parseFloat(text.slice(c, idx));
  if (size === 'kg') {
    size = 'g';
    ammount = ammount * 1000;
  } else if (size === 'l') {
    size = 'ml';
    ammount = ammount * 1000;
  }
  const vnt = Math.ceil(product.ammount / ammount);

  return { description: text, ammount: vnt, price: price * vnt };
};

export default getPrices;
