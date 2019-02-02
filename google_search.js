var excel = require("./excel");

require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");

let url = "http://www.google.com/ncr";
let windowCount = 0;
let driver;

async function devMain(item) {
  if (windowCount === 0) {
    driver = new Builder().forBrowser("chrome").build();
  }
  mywindow = await driver.executeScript('window.open("' + url + '"); ');

  //await driver.executeScript('mywindow.focus();');
  await driver.switch_to_window(driver.window_handles[windowCount]);

  await driver
    .get(url)
    .then(driver.findElement(By.name("q")).sendKeys(item, Key.RETURN))
    .then(++windowCount);
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
