var bitlylogin = ''; //login bit.ly key
var bitlyKey = ''; //Legacy API Key , check on https://bitly.com/a/settings/advanced


//domain bit.ly, j.mp, bitly.com
exports.shorten = function (longUrl,domain,callback) {


	
	var url = '/v3/shorten?login='+ bitlylogin + '&apiKey=' + bitlyKey + '&format=json&longUrl=' + encodeURIComponent(longUrl);

	if (typeof callback === 'undefined') {
		callback = domain;
	}
	else {
		
		if(domain != '')
		{
			url = url + "&domain=" + domain;
		}	
	}
	
	
	var options = {
	    host: 'api.bit.ly',
	    path: url
	};
	
	var receObj = this;
	var http = require('http');
	var req = http.get(options, function(res) {
		
		
		res.on("data", function(chunk) {
			var resp = JSON.parse(chunk);
    		callback(resp.data);
  		});

	});
}