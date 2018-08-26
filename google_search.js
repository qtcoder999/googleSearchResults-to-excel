const args = process.argv;

const { Builder, By, Key, until } = require('selenium-webdriver');
var driver = new Builder()
    .forBrowser('chrome')
    .build();
var s = driver.get('http://www.google.com/ncr')
    .then(_ =>
        driver.findElement(By.name('q')).sendKeys(process.argv[2], Key.RETURN))
    .then(_ => driver.wait(until.titleIs(process.argv[2] + ' - Google Search'), 5000))
    .then(_ => TakeTextsAndURLs());


async function TakeTextsAndURLs() {
    var i = 0, j = 0, h = 0;
    var titles = new Array();
    var URLs = new Array();
    await getTitles(titles);
    await getURLs(URLs);
    console.log(titles);
    console.log(URLs);
}
function getURLs(URLs) {
	return new Promise(function (resolve, reject) {
	    var i = 0;
	    driver.wait(until.titleIs(process.argv[2] + ' - Google Search'), 2000).then(function () {
	        driver.findElements(By.css(".iUh30")).then(function (elements) {
	                 elements.forEach(function (element, index) {
	                         element.getText().then(function (text) {
	                            URLs.push(text);
	                            i++;
	                            if (i == elements.length) {
	                            	resolve	(1);
	                                //if (count1 <= length1) {
	                                //count1++;
	                                //driver.findElement(By.css("a[aria-label=\"Page " + count1 + "\"]")).click();
	                                // }
	                            }
	                        })
	             
	                })
	        })
	    })

	});
}

function getTitles(titles) {
	return new Promise(function (resolve, reject) {
			    var i = 0;
			    driver.wait(until.titleIs(process.argv[2] + ' - Google Search'), 2000).then(function () {
			        driver.findElements(By.css(".bkWMgd .g .r>a")).then(function (elements) {
			                 elements.forEach(function (element, index) {
			                         element.getText().then(function (text) {
			                            titles.push(text);
			                           
			                            i++;
			                            if (i == elements.length) {
			                            	resolve();
			                                //if (count1 <= length1) {
			                                //count1++;
			                                //driver.findElement(By.css("a[aria-label=\"Page " + count1 + "\"]")).click();
			                                // }
			                            }
			                        })
			             
			                })
			        
			        })
			    })
     });
}
