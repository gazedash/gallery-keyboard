export function validateKey(testKey, refKey) {
  const res = testKey === refKey;
  if (res) {
    // {key, altKey, ctrlKey, metaKey}
    return res;
  }
  // iterate all keys of testKey
  if (typeof testKey === "object") {
    let testKeyObject = {};
    for (let prop in testKey) {
      testKeyObject[prop] = testKey[prop];
    }
    return Object.keys(refKey).every(key => {
      return testKeyObject[key] === refKey[key];
    });
  }
}

export function minusOneOrZeroOrOne(first, second) {
  return first ? -1 : second ? 1 : 0;
}

export function move(currentPlusDiff, limit, loop = false) {
  let res = 0;
  const lastIndex = limit - 1;
  if (currentPlusDiff < 0) {
    res = loop ? lastIndex : 0;
  } else {
    if (currentPlusDiff < limit) {
      res = currentPlusDiff;
    } else {
      res = loop ? 0 : lastIndex;
    }
  }
  return res;
}

export function getNext({ isPrevKey, isNextKey, limit, current, loop = false }) {
  const diff = minusOneOrZeroOrOne(isPrevKey, isNextKey);
  const currentPlusDiff = current + diff;
  return move(currentPlusDiff, limit, loop);
}

export function isObjectEmpty(obj) {
      return Object.keys(obj).length === 0;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isKey(key) {
  return key.endsWith("Key");
}