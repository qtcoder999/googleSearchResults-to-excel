const args = process.argv;

var xl = require('excel4node');

var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');

// Create a reusable style
var style1 = wb.createStyle({
	font: {
		color: '#333333',
		size: 12,
	},
	numberFormat: '$#,##0.00; ($#,##0.00); -',
});

var style2 = wb.createStyle({
	font: {
		color: '#ea6a47',
		size: 12,
	},
	numberFormat: '$#,##0.00; ($#,##0.00); -',
});

const { Builder, By, Key, until } = require('selenium-webdriver');
var driver = new Builder()
	.forBrowser('chrome')
	.build();
var s = driver.get('http://www.google.com/ncr')
	.then(_ =>
		driver.findElement(By.name('q')).sendKeys(process.argv[2], Key.RETURN))
	.then(_ => driver.wait(until.titleIs(process.argv[2] + ' - Google Search'), 5000))
	.then(_ => TakeTextsAndURLs());

async function writeToExcel(titles, URLs) {

	// for (var i in titles) {
	// 	ws.cell(i, 1)
	// 		.string(titles[i])
	// 		.style(style);
	// 	ws.cell(i, 2)
	// 		.string(URLs[i])
	// 		.style(style);
	// }
	// ws.cell(i, 1)
	// .string("Paras")
	// .style(style);
	for (var i = 0; i < titles.length; i++) {
		ws.cell(i + 1, 1)
			.string(titles[i])
			.style(style1);
		ws.cell(i + 1, 2)
		.string(URLs[i])
		.style(style2);
		//console.log(typeof(titles[i]));
	}

}


async function TakeTextsAndURLs() {
	var i = 0, j = 0, h = 0;
	var titles = new Array();
	var URLs = new Array();
	await getTitles(titles);
	await getURLs(URLs);
	await writeToExcel(titles, URLs);
	//console.log("Reached here")
	wb.write('data.xlsx');

	// console.log(titles);
	// console.log(URLs);
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
							resolve(1);
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
			driver.findElements(By.css(".bkWMgd .g .rc .r > a")).then(function (elements) {
				elements.forEach(function (element, index) {
					element.getText().then(function (text) {
						titles.push(text);
						//console.log(titles);
						i++;
						if (i == elements.length) {
							resolve(1);
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
