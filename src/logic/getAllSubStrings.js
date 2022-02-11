
export function getAllSubstrings(str) {
    var i, j, result = [];
    for (i = 0; i < str.length; i++) {
      for (j = i + 1; j < str.length + 1; j++) {
        let subStr = str.slice(i, j)
        if (subStr.replace(/\s/g, "").length)
          result.push(subStr.trim().toLowerCase());
      }
    }
    return [...new Set(result)];
  }