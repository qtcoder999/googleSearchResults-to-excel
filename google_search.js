const excel = require("./excel");
require("chromedriver");

const { Builder, By, Key, until } = require("selenium-webdriver");

let url = "http://www.google.com/",
  driver,
  suffix = "goodreads",
  arrayDuplicate = [];

async function openChrome() {
  return new Promise(async function(resolve, reject) {
    driver = new Builder().forBrowser("chrome").build();
    driver.then(function() {
      // console.log(Date.now(), "openchrome promise resolved");
      resolve();
    });
  });
}

const getData = async () => {
  return await excel.getDataFromExcel();
};

getData().then(result => {
  passToDev(result[0].data);
});

const passToDev = async arr => {
  await openChrome();
  await openTabs(arr.length - 1);
  await getHandles();
  console.log("Search terms history:");
  await mainLoop(arr, 0);
};

const mainLoop = async (arr, count) => {
  if (count <= arr.length - 1) {
    const searchTerm = arr[count].toString();
    await openGoogle(searchTerm, count);
    mainLoop(arr, ++count);
  }
};
const getHandles = async () => {
  await driver.getAllWindowHandles().then(async function(handles) {
    arrayDuplicate = handles;
    // console.log(handles.length);
  });
};
const openTabs = async count => {
  await driver.executeScript("window.open(); window.focus();");
  if (count > 1) return openTabs(--count);
};
async function openGoogle(searchTerm, index) {
  await driver.switchTo().window(arrayDuplicate[arrayDuplicate.length - 1]);
  await searchTheTerm(searchTerm).then(arrayDuplicate.pop());
}
const searchTheTerm = async searchTerm => {
  console.log(searchTerm);
  const searchLocator = By.name("q");
  const iAmFeelingLuckyLocator = By.css(
    '.FPdoLc.VlcLAe input[aria-label="I\'m Feeling Lucky"]'
  );
  return driver
    .get(url)
    .then(
      await driver
        .findElement(
          async () => await driver.wait(until.elementLocated(searchLocator))
        )
        .sendKeys(`${searchTerm} ${suffix}`)
    )
    .then(await driver.findElement(iAmFeelingLuckyLocator).click());
};
