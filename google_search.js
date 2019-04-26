var excel = require("./excel");

require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");

let url = "http://www.google.com/ncr";
let windowCount = 0;
let driver = new Builder().forBrowser("chrome").build();

async function devMain(item) {
  console.log(item);

  mywindow = await driver.executeScript('window.open("' + url + '"); ');

  //await driver.executeScript('mywindow.focus();');
  await driver.switch_to_window(driver.window_handles[windowCount]);

  await driver
    .get(url)
    .then(driver.findElement(By.name("q")).sendKeys(item, Key.RETURN))
    .then(++windowCount);
}

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
