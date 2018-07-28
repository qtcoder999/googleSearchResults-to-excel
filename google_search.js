const args = process.argv;

var xl = require('excel4node');
var Q = require('q');
var lastRow1 = 0;
var lastRow2 = 0;
var wb = new xl.Workbook();
var ws = wb.addWorksheet('Sheet 1');
const {Builder, By, Key, until} = require('selenium-webdriver');

var driver = new Builder()
    .forBrowser('chrome')
    .build();

var s = driver.get('http://www.google.com/ncr')
    .then(_ =>
        driver.findElement(By.name('q')).sendKeys(process.argv[2], Key.RETURN))
    .then(_ => driver.wait(until.titleIs(process.argv[2]+' - Google Search'), 5000))
    .then(_ => recursiveFn(5, 2));
    
    function TakeTextsAndURLs(length1, count1){
        console.log(length1, count1);
        var i=0,j=0,h=0;
        var titles = new Array();
        var URLs = new Array();
        var deferred1 = Q.defer();

        var promise1 = deferred1.promise;

        console.log("taking  titles and URLs");
                
        driver.wait(until.titleIs(process.argv[2]+' - Google Search'), 2000).then(function(length1,count1){
            console.log(length1, count1);
            driver.findElements(By.css(".bkWMgd .g .r>a"),length1,count1).then(function(elements,length1,count1){
                console.log(length1,count1);
                console.log("inside findelements");
                void async function(length1,count1) {
                        console.log(length1,count1);
                        await elements.forEach(function (element,index) {
                            //console.log("inside foreach elements");
                        void async function() {
                                    await element.getText().then(function(text){
                                                //console.log(text);
                                                titles.push(text);
                                                i++;
                                                if(i == elements.length ){
                                                            console.log("deferred 1 resolved");
                                                            console.log(titles);
                                                            deferred1.resolve(text);
                                                            
                                                            if(count1 <= length1){
                                                                    console.log("Inside if");
                                                                    count1++;
                                                                    driver.findElement(By.css("a[aria-label=\"Page "+ count1 + "\"]")).click();
                                                                    recursiveFn(length1, count1);
                                                            }
                                                }
                                    })
                            }();
                        })
                }();
            })
        })
    return promise1;
}
async function recursiveFn( length, count){
        console.log("Inside recursive");
        console.log(length,count);
        console.log("Inside async text and URLs");
        TakeTextsAndURLs(length, count)
}