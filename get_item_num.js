

var beginURL = 'http://list.tmall.com//search_product.htm?cat=50035531&q=q%B1%D2&sort=d&style=g&from=.list.pc_1_searchbutton#J_Filter';

var itemNum = 0;


var page = require('webpage').create();

page.open(beginURL, function () {
    var data = page.evaluate(function () {
    	return document.querySelector('p.j_ResultsNumber span').innerText;
	});
	console.log('item num:' + parseInt(data));
	var fs = require('fs');
	var path = 'item_num.txt';
    if (fs.exists(path)) {
	    fs.remove(path);
    }
	fs.write(path, parseInt(data).toString(), 'w');
	phantom.exit(0);
});

