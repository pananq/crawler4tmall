

var index = 0;
var urlPrefix = 'http://list.tmall.com//search_product.htm?cat=50035531&s=';
var urlPostfix = '&q=q%B1%D2&sort=d&style=g&from=.list.pc_1_searchbutton#J_Filter';

var fs = require('fs');
var out = 'item_ids.txt';
if (fs.exists(out)) {
    fs.remove(out);
}

var inPath = 'item_num.txt';
var itemNum = parseInt(fs.read(inPath));


function getItemId(idx, callback)
{
	var url = urlPrefix + idx + urlPostfix;
	console.log('get item id: ' + url);
	var page = require('webpage').create();

	page.open(url, function() {
		var data = page.evaluate(function () {
			var l = document.querySelectorAll('div#J_ItemList div.product');
			var r = [];
			for (var i = 0; i < l.length; i++) {
		        r[i] = l[i].getAttribute('data-id');
		    }
		    return r;
    	});
    	for (var i = 0; i < data.length; i++) {
    		fs.write(out, data[i] + '\n', 'a');
   		}
   		page.close();
   		callback.apply();
	});
}

function process()
{
	if (index < itemNum) {
		var idx = index;
		index = index + 60;
		getItemId(idx, process);
	}
	else {
		phantom.exit(0);
	}
}


process();
