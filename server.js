const args = process.argv;
var length = 5;
var count = 2;
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
    .then(_ => TakeTextsAndURLs());
    function TakeTextsAndURLs(){
        var i=0,j=0,h=0;
        var titles = new Array();
        var URLs = new Array();
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();
        var deferred3 = Q.defer();
        var deferred4 = Q.defer();
        var promise1 = deferred1.promise;
        var promise2 = deferred2.promise;
        var promise3 = deferred3.promise;
        var promise4 = deferred4.promise;
        console.log("taking  titles and URLs");
        //console.log(driver);
        driver.wait(until.titleIs(process.argv[2]+' - Google Search'), 2000).then(function(){
        driver.findElements(By.css(".bkWMgd .g .r>a")).then(function(elements){
            console.log("inside findelements");
            elements.forEach(function (element,index) {
                //console.log("inside foreach elements");
                element.getText().then(function(text){
                    //console.log(text);
                    titles.push(text);
                    i++;
                    if(i == elements.length - 1){
                        console.log("deferred 1 resolved");
                        deferred1.resolve(text);
                    }
                })
            })
        })
        })
        promise1.then(function(){
            driver.wait(until.titleIs(process.argv[2]+' - Google Search'), 2000).then(function(){
            driver.findElements(By.css(".iUh30")).then(function(elements){
                elements.forEach(function (element,index) {
                    element.getText().then(function(text){
                        //console.log(text);
                        URLs.push(text);
                        j++;
                        if(j==elements.length - 1){
                            console.log("deferred 2 resolved");
                            deferred2.resolve(text);
                        }
                    });
                });
            })
            //driver.quit();
        })
    })
    promise1.done(function(text1){
        promise2.done(function(text2){
            console.log(titles);
            console.log(URLs);
            i=0;
            console.log("Writing loop begins:");
            while(i<titles.length){
                console.log(i);
                    //console.log(titles[i]);
                    //console.log(URLs[i]);
                 //ws.cell(lastRow1 + i+1, 2).string(titles[i]);
                 //ws.cell(lastRow1 + i+1, 1).string(URLs[i]);
                if(i==titles.length - 1)
                {
                    lastRow1 = i;
                    console.log("Deferred 3 resolved");
                    deferred3.resolve();
                }
                i++;
            }
            //console.log("everything executed. J : " + j);
        })
    });
    promise3.done(function(){
        console.log("reached at promise 3 -> done");
        //wb.write('Excel.xlsx')
        h=2;
        console.log("Recursive function fired for count: "+ count);
        recursiveFn(length, count)
    });
    }
    function recursiveFn( length, count){
        console.log("inside recursive fn");
        driver.wait(until.titleIs(process.argv[2]+' - Google Search'), 5000).then(function(){
          //  driver.wait(ExpectedConditions.presenceOfAllElementsLocatedBy(By.css("a[aria-label=\"Page "+ count + "\"]")), 5000).then(function(){    
            console.log("recursive fn - inside wait");
            console.log("Value of count:", count);
            driver.findElement(By.css("a[aria-label=\"Page "+ count + "\"]")).click().then(function(){
                //console.log("Value of count:",count)
                if(count < length){
                    driver.wait(until.titleIs(process.argv[2]+' - Google Search'), 2000).then(function(){
                        count = count + 1;
                        TakeTextsAndURLs()
                        console.log("count incremented!");
                        console.log("Value of new count:",count);
                    });
                    //recursiveFn(driver, until, length, count)
                }
                else{
                    //wb.write('Excel.xlsx');
                }
            });
       })        
    }

