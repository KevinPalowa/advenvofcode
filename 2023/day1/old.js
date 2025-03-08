const fs = require("fs").promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}
/* function getIndexSpelledNumber(text) {
  const numberString = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
  };

  return text;
}
console.log(getIndexSpelledNumber("2njsevenszzsfltconesixhsflpbpd")); */
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
  const calibrationValues = data.split(/\r?\n/);
  const temp = [];
  calibrationValues.forEach((calibrationValue, kindex) => {
    let firstDigit = "";
    let secondDigit = "";
    let firstDigitString = null;
    let secondDigitString = null;
    for (let index = 0; index < numberString.length; index++) {
      const num = numberString[index];
      let tempfirstDigitString;
      if (calibrationValue.includes(num)) {
        tempfirstDigitString = {
          value: (index + 1).toString(),
          index: calibrationValue.indexOf(num),
        };
        if (
          (firstDigitString?.index ?? Infinity) >
          (tempfirstDigitString.index ?? 0)
        ) {
          firstDigitString = {
            value: (index + 1).toString(),
            index: calibrationValue.indexOf(num),
          };
        }
      }
    }

    /* NOTE: this loop expect to get string that contains but backwards  */
    for (let index = 0; index < numberString.length; index++) {
      const num = numberString[index];
      let tempsecondDigitString;
      if (calibrationValue.includes(num)) {
        tempsecondDigitString = {
          value: (index + 1).toString(),
          index: calibrationValue.lastIndexOf(num),
        };

        if (
          (secondDigitString?.index ?? 0) < (tempsecondDigitString.index ?? 0)
        ) {
          secondDigitString = {
            value: (index + 1).toString(),
            index: calibrationValue.lastIndexOf(num),
          };
        }
      }
    }
    for (let index = 0; index < calibrationValue.length; index++) {
      if (!isNaN(Number(calibrationValue[index]))) {
        firstDigit = calibrationValue[index];
        break;
      }
    }

    for (let index = calibrationValue.length - 1; index >= 0; index--) {
      if (!isNaN(Number(calibrationValue[index]))) {
        secondDigit = calibrationValue[index];
        break;
      }
    }
    if (firstDigit && secondDigit) {
      let finalValue = "";
      const isFirstDigitString =
        firstDigitString &&
        firstDigitString.index < calibrationValue.indexOf(firstDigit);

      const isSecondDigitString =
        secondDigitString &&
        secondDigitString.index > calibrationValue.lastIndexOf(secondDigit);

      if (isFirstDigitString) {
        finalValue += firstDigitString.value;
      } else {
        finalValue += firstDigit;
      }

      /* console.log( */
      /*   secondDigitString?.index, */
      /*   calibrationValue.lastIndexOf(secondDigit), */
      /*   secondDigit, */
      /*   kindex, */
      /* ); */
      if (isSecondDigitString) {
        finalValue += secondDigitString.value;
      } else {
        finalValue += secondDigit;
      }

      console.log(finalValue, "index:", kindex);
      temp.push(parseInt(finalValue));
    }
  });
  console.log(temp.reduce((acc, num) => acc + num, 0));
});
