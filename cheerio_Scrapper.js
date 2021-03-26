const request = require ("request");
const cheerio = require ("cheerio");
const jsonfile = require ("jsonfile");

//request to webPage will error handling, html set as variable
request("https://dev-test.hudsonstaging.co.uk/"), (error, response, html) => {
    if(!error && response.statusCode === 200){
        const webPage = cheerio.load(html);

        //new array to push reterived data into
        const products = [];

        //loops through data to create metadate object which is pushed into products array
        webPage(".product-tile").each((index, element) => {
          //gets image data
          let img_url = webPage(element).find("img").attr("src");

          //gets quatiaty data removes extra letters/ whitespace and converts string to Int
          let qauntity = webPage(element)
            .find(".detials p")
            .first()
            .text()
            .trim()
            .slice(10);
          qauntity = parseInt(qauntity);

          //gets price data removes extra letters/ whitespace and converts string to Int
          let price = webPage(element)
            .find(".detials p")
            .last()
            .text()
            .trim()
            .slice(8);
          price = parseInt(price);

          //pushes items it array as metadata object
          products[index] = metadata = { img_url, qauntity, price };
        })


    }
};