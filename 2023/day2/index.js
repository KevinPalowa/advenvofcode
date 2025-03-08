const fs = require("fs").promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}
const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;
readFile("input.txt").then((data) => {
  const gameLogs = data
    .trimEnd()
    .split(/\n/)
    .map((gameLog) => {
      const cubes = gameLog
        .split(":")[1]
        .split(";")
        .map((cube) => {
          return cube
            .trim()
            .split(",")
            .map((e) => {
              const splittedCube = e.trim().split(" ");
              const cubeColor = splittedCube[1];
              const cubeAmount = splittedCube[0];
              return {
                [cubeColor]: parseInt(cubeAmount),
              };
            });
        });
      return {
        id: parseInt(gameLog.split(":")[0].split(" ")[1]),
        cubes,
      };
    });

  /**
   * Checks if the game is possible based on the provided game log.
   * @param {Array<Array<Object>>} gameLog An array of objects representing the game log.
   * Each object should have a color property (e.g., { red: 1 }) indicating the color and its count.
   * @returns {boolean} True if the game is possible, otherwise false.
   */
  function checkIsGamePossibile(gameLog) {
    return gameLog
      .flat()
      .map((e) => {
        return (
          (e.red ?? 0) <= redCubes &&
          (e.green ?? 0) <= greenCubes &&
          (e.blue ?? 0) <= blueCubes
        );
      })
      .every(Boolean);
  }

  const possibleGame = gameLogs.filter((gameLog) => {
    return checkIsGamePossibile(gameLog.cubes);
  });
  console.log(
    possibleGame.reduce((acc, obj) => {
      const min_red = Math.min(
        ...obj.cubes
          .flat()
          .map((cube) => cube.red)
          .filter(Boolean),
      );
      const min_green = Math.min(
        ...obj.cubes
          .flat()
          .map((cube) => cube.green)
          .filter(Boolean),
      );
      const min_blue = Math.min(
        ...obj.cubes
          .flat()
          .map((cube) => cube.blue)
          .filter(Boolean),
      );
      const multipleCubes = min_red * min_blue * min_green;
      console.log(`Red: ${min_red} Green: ${min_green} Blue: ${min_blue}`);
      return acc + multipleCubes;
    }, 0),
  );
});
