var excel = require("./excel");

require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");

var driver = new Builder().forBrowser("chrome").build();
let url = "http://www.google.com/ncr";

async function devMain(item) {
  mywindow = await driver.executeScript('window.open("' + url + '"); ');

  //await driver.executeScript('mywindow.focus();');

  await driver
    .get(url)
    .then(driver.findElement(By.name("q")).sendKeys(item, Key.RETURN))
}
//   await driver.wait(function() {
//     return driver.isElementPresent(By.css(".bkWMgd .g .rc .r a"));
//   });

//   await driver
//     .findElement(By.css(".bkWMgd .g .rc .r a"))
//     .click()
// }

//devMain();
let arr;
let tabCount = 0;

const getData = async () => {
  return await excel.getDataFromExcel();
};

getData().then(result => {
  passToDev(result[0].data);
});

const passToDev = arr => {
  arr.map(item => {
    devMain(item[0]);
  });
};
