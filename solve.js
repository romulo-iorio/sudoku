const { writeFileSync } = require("fs");
const path = require("path");

const selectSquare = require("./select-square");
// const sudoku = require("./sudoku.json").sudoku;

module.exports = async (sudoku) => {
  const numbers = [];
  for (let i = 1; i < sudoku.length + 1; i++) {
    numbers.push(i.toString());
  }

  let solved_sudoku = sudoku;
  let solved = true;
  let control_counter = 0;

  do {
    let rows = solved_sudoku;
    let columns = [];
    for (let i = 0; i < sudoku.length; i++) {
      const column = [];
      for (const row of rows) {
        column.push(row[i]);
      }
      columns.push(column);
    }

    let squares = [];
    const div_index = Math.sqrt(sudoku.length);
    for (let s_i = 0; s_i < div_index; s_i++) {
      for (let s_j = 0; s_j < div_index; s_j++) {
        const square = [];
        for (let i = 0 + s_i * div_index; i < div_index * (s_i + 1); i++) {
          for (let j = 0 + s_j * div_index; j < div_index * (s_j + 1); j++) {
            square.push(solved_sudoku[i][j]);
          }
        }
        squares.push(square);
      }
    }

    solved = true;

    let actual_sudoku = solved_sudoku;
    let s = 0;
    for (let j = 0; j < sudoku.length; j++) {
      for (let i = 0; i < sudoku.length; i++) {
        // console.log("sudoku[i][j]", sudoku[i][j]);
        // console.log("Number.isNaN(sudoku[i][j])", Number.isNaN(sudoku[i][j]));
        if (parseInt(solved_sudoku[i][j]) == 0) {
          // console.log("Era um espaço vazio no sudoku original, preenchendo");
          // console.log(`\n\nsudoku[${i}][${j}]\n\n`);
          s = selectSquare(i, j, div_index, sudoku.length);
          const options = numbers.filter((number) => {
            // console.log(`\n Number: ${number}`);
            const row_condition = !rows[i].includes(number);
            const column_condition = !columns[j].includes(number);
            const square_condition = !squares[s].includes(number);
            // console.log("row", i);
            // console.log("row_condition", row_condition);
            // console.log("column", j);
            // console.log("column_condition", column_condition);
            // console.log("square", s);
            // console.log("square_condition", square_condition);

            return row_condition && column_condition && square_condition;
          });

          // console.log("options", options);

          if (control_counter > 10) {
            control_counter = 0;
            if (options.length > 1) {
              solved = solved && false;
              actual_sudoku[i][j] = options[0];
            } else if (options.length == 0) {
              throw new Error("null value");
            }
          } else {
            if (options.length > 1) {
              solved = solved && false;
            } else if (options.length == 0) {
              throw new Error("null value");
            } else {
              control_counter = 0;
              solved = solved && true;
              actual_sudoku[i][j] = options[0];
            }
          }

          // console.log("solved_sudoku[i][j]", solved_sudoku[i][j]);
        } else {
          // console.log("Não era um espaço vazio no sudoku original, pulando");
        }
      }
    }

    // console.log("solved", solved);
    // console.log("solved_sudoku", solved_sudoku);
    solved_sudoku = actual_sudoku;
    writeFileSync(
      path.join(__dirname, "./solved-sudoku.json"),
      JSON.stringify(
        {
          sudoku: solved_sudoku,
        },
        null,
        2
      )
    );
    control_counter++;
  } while (!solved);

  // console.log("solved_sudoku", solved_sudoku);
};
