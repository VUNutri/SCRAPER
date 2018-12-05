# Barbora.lt web scraper

This is a web scraper designed to get shopping list with cheapest grocaries options.

**Get shopping list**
POST request url: `<host>/getList`
JSON Request: 
```
{
  "title": string,
  "size": ml,
  "ammount": int,
  "proteins": int
}
```
JSON Response: 
```
{
  "description": string,
  "ammount": int,
  "price" float
  "size": "string",
  "img": "string"
}
```

### Built with
![](https://www.brandeps.com/logo-download/N/Node-JS-01.png)