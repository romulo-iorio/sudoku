const { writeFileSync } = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

module.exports = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.sudokuweb.org/");

  await page.waitForSelector("#sudoku");

  const sudoku_size = (await page.$$("#sudoku tr")).length;

  const sudoku = [];
  for (let i = 1; i < sudoku_size + 1; i++) {
    const row = [];
    for (let j = 1; j < sudoku_size + 1; j++) {
      //   console.log("i", i, "j", j);
      const cell = await page.waitForSelector(
        `#sudoku tr:nth-child(${i}) td:nth-child(${j})`
      );
      const cell_value = await cell.evaluate((el) => el.innerText.trim());
      //   console.log("cell_value", cell_value);
      row.push(cell_value.length == 0 ? "0" : cell_value);
    }
    sudoku.push(row);
  }

  writeFileSync(
    path.join(__dirname, "./sudoku.json"),
    JSON.stringify(
      {
        SUDOKU: sudoku,
      },
      null,
      2
    )
  );

  return { page, sudoku };

  //   await browser.close();
};
