// hyperscript function that outputs template nodes (hence "t")
const t = (name, data, ...next) => {
  if (Array.isArray(data)) next = data, data = null;
  let n = next.length;
  if (!name) return n ? n > 1 ? next : next[0] : data;
  name = {name};
  if (data)
    if (name.data = data, data.key != null) 
      name.key = data.key, delete data.key;
  if (n) name.next = n > 1 ? next : next[0];
  return name;
}

// A is the fragment name; fragments simply short to their children
module.exports = { t, A: null }
