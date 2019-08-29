const data = {
  a: {
    b: {
      c: 123
    }
  }
};

/**
 * Get data from an object using selector as a path.  
 * 
 * @param {*} selector - / separated selector of key names e.g. a/b.
 * @param {Object} obj - object to retrieve data from.
 * @returns {Object} - object containing data that selector references, or
 *   undefined if none. 
 */
const getDataFromObject = (selector, obj) => {
  if (! obj || typeof(obj) !== 'object') {
    // No object provided.
    return; 
  }

  if (! selector || selector.length === 0) {
    // No selector provided, return whole object.
    return obj;
  }

  let tmp = obj;

  const selectorParts = selector.split('/');

  for (const selectorPart of selectorParts) {
    if (tmp.hasOwnProperty(selectorPart)) {
      tmp = tmp[selectorPart];
    } else {
      // Bad selector
      return; 
    }
  }

  return tmp;
};

// Example usages and expected results.
console.log(getDataFromObject('a/b', data)); // { c: 123 }
console.log(getDataFromObject('a/b/c', data)); // 123
console.log(getDataFromObject('', data)); // { a: { b: { c: 123 } } }
console.log(getDataFromObject('a/b/c/d', data)); // undefined
console.log(getDataFromObject('a/b', {})); // undefined
console.log(getDataFromObject('a/b', 'not an object')); // undefined