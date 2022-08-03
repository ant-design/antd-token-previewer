const deepUpdateObj = (obj: any, path: string[], value: any): any => {
  if (path.length === 0) {
    return obj;
  }
  return {
    ...obj,
    [path[0]]:
      path.length === 1
        ? value
        : deepUpdateObj(obj[path[0]] ?? {}, path.slice(1), value),
  };
};

export default deepUpdateObj;
