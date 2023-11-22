export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

// ** Error(s) solved : **
// Test error : ● Date helper › When getMonth is called › the function return janvier for 2022-01-01 as date
//   Expected: "janvier"
//   Received: undefined
// Test error : ● Date helper › When getMonth is called › the function return juillet for 2022-07-08 as date
//   Expected: "juillet"
//   Received: "juin"
// Test error : ● When a event card is created › a title, a label and a month are displayed
//   Unable to find an element with the text: /avril/.
// Test error : ● When slider is created › a list card is displayed
//   Unable to find an element with the text: janvier.

// ** Solution : **
// the months displayed in letters are not correct
// Add 1 to getMonth
// export const getMonth = (date) => MONTHS[date.getMonth()];
export const getMonth = (date) => MONTHS[date.getMonth()+1];
