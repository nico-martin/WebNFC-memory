export const shuffleArray = <T>(a: Array<T>): Array<T> => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

export const sortObject = (object: {
  [key: number]: number;
}): Array<[number, number]> => {
  const sortable = Object.entries(object).reduce(
    (acc, [key, value]) => [...acc, [key, value]],
    []
  );

  return sortable.sort((a, b) => b[1] - a[1]);
};
