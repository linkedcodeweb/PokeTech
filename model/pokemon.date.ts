export function datePokemon(date: Date): string {
  //getDay() returns the day of the week from 0 to 6 (0 is Sunday)
  const multiDay = date.getDay() + 1;

  const daySum: number = reduceNumber(date.getDate() * multiDay);

  //getMonth() returns the month from 0 to 11
  const monthSum: number = reduceNumber((date.getMonth() + 1) * multiDay);

  const yearSum: number = reduceNumber(date.getFullYear() * multiDay);

  let pokemonID = `${daySum - 1}${monthSum - 1}${yearSum - 1}`;
  
  //quitamos los ceros a la izquierda
  return pokemonID === "000" ? pokemonID = "1000" :  pokemonID.replace(/^0+/, '');
}

function reduceNumber(num: number) {
  const numString = num.toString().split("");
  
  let arraySum = numString.reduce((a, b) => a + parseInt(b), 0);
  while (arraySum >= 10) {
    arraySum = arraySum
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return arraySum;
}

//-------- Before Algorithm Improvement --------//  
// export function datePokemon(date: string): string {
//   const dateFormat = date.split("/");
//   const day = dateFormat[0].split("");
//   const month = dateFormat[1].split("");
//   const year = dateFormat[2].split("");
//   const daySum = reduceNumber(day);
//   const monthSum = reduceNumber(month);
//   const yearSum = reduceNumber(year);
//   const pokemonID = `${daySum - 1}${monthSum - 1}${yearSum - 1}`;
//   return pokemonID;
// }