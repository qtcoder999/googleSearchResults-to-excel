const excel = require("./excel");
require("chromedriver");

const { Builder, By, Key } = require("selenium-webdriver");

let url = "http://www.google.com/ncr",
  driver,
  windows,
  numberOfNewTabsToOpen;

async function openChrome() {
  return new Promise(async function(resolve, reject) {
    driver = new Builder().forBrowser("chrome").build();
    driver.then(function() {
      console.log(Date.now(), "openchrome promise resolved");
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

  arr.map(async (item, index) => {
    const searchTerm = item[0];
  });
};
