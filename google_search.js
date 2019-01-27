var excel = require("./excel");

require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");

async function devMain() {
  var driver = new Builder().forBrowser("chrome").build();
  await driver
    .get("http://www.google.com/ncr")
    .then(_ =>
      driver.findElement(By.name("q")).sendKeys("game of thrones", Key.RETURN)
    );

  await driver.sleep(1000);

  await driver.findElement(By.css(".bkWMgd .g .rc .r a")).click();
}
var r
const foo = async () => {
    var r = await excel.getDataFromExcel();
}

devMain();

foo();

console.log(r);

//movieNames.data.map(item => item.toString());

//devMain();
