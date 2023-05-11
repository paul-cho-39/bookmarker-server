export function convertArrayIntoObject<T extends Record<string, any>>(arr: T[]) {
   return arr.reduce((obj: Record<string, unknown>, item) => {
      Object.keys(item).forEach((key) => {
         obj[key] = item[key];
      });
      return obj;
   }, {});
}
