
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Bily Shorten' });
};

exports.shorten = function (req,res) {

	var cheerio = require('cheerio');
	var linksHTML = new Array();

	var htmlBody = req.body.htmlText;

	$ = cheerio.load(htmlBody);

	links = $('a'); //jquery get all hyperlinks
	$(links).each(function(i, link){
		//console.log($(link).text() + ':\n  ' + $(link).attr('href'));
		linksHTML.push($(link).attr('href'));
	});
	
	
	loop(htmlBody,linksHTML,0,function(html){
		res.end(html);
	});
	
};

function loop(htmlBody,linkArray,index,callback)
{
	var bitly = require("../module/bitly.js");
	var originalLink = linkArray[index];
	
	bitly.shorten(originalLink,function(json) {

			
			htmlBody = htmlBody.replace(originalLink,json.url);
	
			index ++;
			if(index < linkArray.length)
			{
				loop(htmlBody,linkArray,index,callback);
			}
			else {
				callback(htmlBody);
			}
	});
}