const groupBy = (array, propOrFunc) => {
  return array.reduce(function (obj, item) {
    var key = typeof propOrFunc === 'function' ? propOrFunc(item) : item[propOrFunc];

    if (!obj.hasOwnProperty(key))
      obj[key] = [];

    obj[key].push(item);

    return obj;
  }, {});
};

export default groupBy;
