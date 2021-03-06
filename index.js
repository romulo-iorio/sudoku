const search = require("./search");
const solve = require("./solve");

(async () => {
  const { page, sudoku } = await search();
  await solve(sudoku);

  console.log("Esperando para conferĂȘncia");
  await page.waitForTimeout(99999999);
})();
