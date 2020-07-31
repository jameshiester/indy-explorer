export const asyncForEach = async <T>(
  array: T[],
  callback: (item: T, index: number, values: T[]) => Promise<void>
) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const isInt = (val: string | number) =>
  typeof (val === 'number') && Number.isInteger(val as number);
