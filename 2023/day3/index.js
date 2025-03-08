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
  const numbers = [];
  let number = "";
  for (let index = 0; index < data.length; index++) {
    const isCharDigit = !isNaN(parseInt(data[index]));
    if (isCharDigit) {
      number += data[index];
    } else if (number !== "") {
      numbers.push(parseInt(number));
      number = "";
    }
  }
  console.log(numbers.reduce((acc, obj) => acc + obj, 0));
});
