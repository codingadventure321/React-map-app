let duration = (date) => {
  let d1 = new Date();
  let d2 = new Date(date);
  console.log(d1.getTime() / (1000 * 3600 * 24));
  return (d1 - d2) / (1000 * 3600 * 24);
};

console.log(duration("9/12/2020"));
