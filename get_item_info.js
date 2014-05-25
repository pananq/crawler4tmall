

var system = require('system');
var args = system.args;

if (args.length != 2) {
    console.log('args erros: require itemid');
    phantom.exit(1);
}

var itemid = args[1];
console.log("itemid: " + itemid);

var url = 'http://detail.tmall.com/item.htm?id=' + itemid;
var page = require('webpage').create();
phantom.addCookie({
	'Accept-Encoding': 'deflate',
});
console.log("url: " + url);

function regmacth(str, pa) {
    var m = str.match(pa);
    if (m != null && m.length > 0)
        return m[0];
    else
        return '';
}



var pagePath = 'data/' + itemid + '.png'

page.open(url, function (status) {
    if (status != 'success') {
        console.log('unable to load page: ' + url);
        phantom.exit(0);
    }
    else {
        window.setTimeout(function() {
            var data = page.evaluate(function () {
            	var itemDetail = [];
                

                try {
                    //sales num by month
                    itemDetail[1] = document.querySelector('p.tm-count').innerText;
                    //item name
                    itemDetail[0] = document.querySelector('div.tb-detail-hd h3').innerText;
                    //shop name
                    itemDetail[2] = document.querySelector('a.slogo-shopname').innerText;
                    //item price
                    itemDetail[3] = document.querySelector('span.tm-price').innerText;
                }
                catch(e) {
                    itemDetail = ['', '', '', ''];
                }
                
                return itemDetail;
            });

            //page.render(pagePath);
            
            var fs = require('fs');
            var path = 'res.csv';
            var content = itemid + ',' + data[1] + ',' + regmacth(data[0], /\d+/g) +',' + data[3] + ',' + data[2] + ',\'' + data[0] + '\'\n';
            fs.write(path, content, 'a');
            //console.log(data);
            phantom.exit(0);
        }, 3000);
    }
});
