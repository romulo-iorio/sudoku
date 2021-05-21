module.exports = (i, j, div_index, length) => {
  let s = 0;
  for (let c_i = 0; c_i < div_index; c_i++) {
    for (let c_j = 0; c_j < div_index; c_j++) {
      if (i == 0 * div_index + c_i) {
        if (j == 0 * div_index + c_j) {
          return 0;
        } else if (j == 1 * div_index + c_j) {
          return 1;
        } else if (j == 2 * div_index + c_j) {
          return 2;
        }
      } else if (i == 1 * div_index + c_i) {
        if (j == 0 * div_index + c_j) {
          return 3;
        } else if (j == 1 * div_index + c_j) {
          return 4;
        } else if (j == 2 * div_index + c_j) {
          return 5;
        }
      } else if (i == 2 * div_index + c_i) {
        if (j == 0 * div_index + c_j) {
          return 6;
        } else if (j == 1 * div_index + c_j) {
          return 7;
        } else if (j == 2 * div_index + c_j) {
          return 8;
        }
      }
    }
  }
};
