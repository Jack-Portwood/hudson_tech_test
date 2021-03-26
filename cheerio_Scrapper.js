const request = require("request");
const cheerio = require("cheerio");
const jsonfile = require("jsonfile");

//request to webPage will error handling, html set as variable
request("https://dev-test.hudsonstaging.co.uk/", (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const webPage = cheerio.load(html);

    //new array to push reterived data into
    const products = [];

    //loops through data to create  object which is pushed into products array
    webPage(".product-tile").each((index, element) => {
      //gets name of product
      let product = webPage(element).find(".product-name").text().trim();

      //gets image data
      let img_url = webPage(element).find("img").attr("src");

      //gets quatiaty data removes extra letters/ whitespace and converts string to Int
      let quantity = webPage(element)
        .find(".details p")
        .first()
        .text()
        .trim()
        .slice(10)
        quantity = parseInt(quantity);

      //gets price data removes extra letters/ whitespace and converts string to Int
      let price = webPage(element)
        .find(".details p")
        .last()
        .text()
        .trim()
        .slice(8)
        price = parseFloat(price);
      //pushes items it array as metadata object
      product = { "product": product, "metadata": { "img_url": img_url, "quantity": quantity, "price": price }};

      products.push(product);

    });
    console.log(products)
    //converts data to Json file
    jsonfile.writeFile("data.json", products);
  }
});
