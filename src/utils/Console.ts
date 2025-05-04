export const Console = async (name: string, obj: any) => {
  const data = typeof obj;
  const item = transformObject(obj);
  if (__DEV__) {
    console.log('---------------------------------------------');
    console.log(
      name,
      JSON.stringify(item) === '{}' ? '' : JSON.stringify(item, null, 2),
    );
  }
};

function transformObject(obj: object) {
  const transformedObj = {};
  for (const key in obj) {
    const type = typeof obj[key];
    if (obj[key] == null) {
      transformedObj[key] = 'Null';
    } else if (type === 'object' && !Array.isArray(obj[key])) {
      transformedObj[key] = transformObject(obj[key]);
    } else if (Array.isArray(obj[key])) {
      if (obj[key].length > 0) {
        transformedObj[key + [`[${obj[key].length}]`]] = transformObject(
          obj[key][0],
        );
      } else {
        transformedObj[key + [`[${obj[key].length}]`]] = 'vazio';
      }
    } else {
      transformedObj[key] = type;
    }
  }
  return transformedObj;
}
