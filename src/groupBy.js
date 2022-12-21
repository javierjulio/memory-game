const groupBy = (array, property) => {
  return array.reduce((r, v, i, a, k = v[property]) => ((r[k] || (r[k] = [])).push(v), r), {})
}

export default groupBy
