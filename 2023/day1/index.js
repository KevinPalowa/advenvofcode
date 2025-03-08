const fs = require("fs").promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}
readFile("input.txt").then((data) => {
  const numberString = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const calibrationValues = data.trimEnd().split(/\r?\n/);
  const temp = [];
  calibrationValues.forEach((calibrationValue) => {
    let firstDigit = "";
    let secondDigit = "";
    for (let index = 0; index < calibrationValue.length; index++) {
      if (!isNaN(calibrationValue[index])) {
        firstDigit = calibrationValue[index];
        break;
      }
    }

    for (let index = calibrationValue.length - 1; index >= 0; index--) {
      if (!isNaN(calibrationValue[index])) {
        secondDigit = calibrationValue[index];
        break;
      }
    }
    temp.push(parseInt(firstDigit + secondDigit));
  });
  console.log(temp.reduce((acc, num) => acc + num, 0));
});
