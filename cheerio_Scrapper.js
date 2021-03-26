const request = require ("request");
const cheerio = require ("cheerio");
const jsonfile = require ("jsonfile");

//request to webPage will error handling, html set as variable
request("https://dev-test.hudsonstaging.co.uk/"), (error, response, html) => {
    if(!error && response.statusCode === 200){
        const webPage = cheerio.load(html);

        //new array to push reterived data into
        const products = [];

        
    }
};