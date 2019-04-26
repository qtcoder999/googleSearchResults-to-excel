var excel = require("./excel");

require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");

let url = "http://www.google.com/ncr";
let windowCount = 0,
  driver;

async function openChrome() {
  return new Promise(async function(resolve, reject) {
    driver = new Builder().forBrowser("chrome").build();
    driver.then(function() {
      console.log("openchrome promise resolved");
      resolve();
    });
  });
}
async function devMain(item) {
  console.log(item);

  return new Promise(async function(resolve, reject) {
    // Do async job
    await driver
      .get(url)
      .then(driver.findElement(By.name("q")).sendKeys(item, Key.RETURN))
      .then(resolve());
  });

  // await driver.executeScript('mywindow = window.open("' + url + '"); ');

  // await driver.executeScript("mywindow.focus();");
  // await driver.switch_to_window(driver.window_handles[windowCount]);
}

//devMain();
let arr;

const getData = async () => {
  return await excel.getDataFromExcel();
};

getData().then(result => {
  passToDev(result[0].data);
});

const passToDev = async arr => {
  await openChrome();
  arr.map(async item => {
    await devMain(item[0]);
  });
};
