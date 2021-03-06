import axios from 'axios';
import cheerio from 'cheerio';

const getParams = (text, price, product, img) => {
  const sizes = [' kg', ' ml', ' g', ' l', ' vnt'];
  let size;
  let idx;
  for (let i = 0; i < sizes.length; i += 1) {
    idx = text.indexOf(sizes[i]);
    size = sizes[i].replace(/ /g, '');
    if (idx !== -1) break;
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
    ammount *= 1000;
  } else if (size === 'l') {
    size = 'ml';
    ammount *= 1000;
  }
  const vnt = Math.ceil(product.ammount / ammount);

  return {
    description: text, ammount: vnt, price: price * vnt, size, img,
  };
};

const getPrices = async (req, res) => {
  try {
    const url = 'https://www.barbora.lt/paieska?uzklausa=';
    const { products } = req.body;
    const resProducts = [];

    await Promise.all(products.map(async (product) => {
      const ti = product.title.replace(/\s/g, '%20').replace(/ą/g, 'a')
        .replace(/č/g, 'c').replace(/ė/g, 'e')
        .replace(/š/g, 's')
        .replace(/ų/g, 'u')
        .replace(/ū/g, 'u')
        .replace(/ž/g, 'z')
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'%20')
        .replace(/ę/g, 'e');
      const u = url.concat(ti);
      await axios.get(u, {
        headers: {
          Referer: u,
        },
      }).then(async (html) => {
        const $ = await cheerio.load(html.data);
        const el = await $('.b-product-price-current-number');
        const elz = await $('.b-product-title > span');
        const img = await $('.b-link--product-info > img');
      
        let minPrice = 999999;
        let minObj;

        for (let i = 0; i < el.length; i += 1) {
          const text = $(elz[i]).text();
          const price = $(el[i]).text().replace(/\s/g, '')
            .replace(/€/g, '')
            .replace(/,/g, '.');
          const imgFull = `https://www.barbora.lt${$(img[i]).attr('src')}`;
          const resp = getParams(text, price, product, imgFull);

          if (resp.price < minPrice && resp.size === product.size) {
            minPrice = resp.price;
            minObj = resp;
          }
        }
        resProducts.push(minObj);
      });
    }));
    return res.json(resProducts);
  } catch (e) {
    return res.json({ err: 'Bad request' });
  }
};

export default getPrices;
