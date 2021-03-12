/**
 * Compare current and incoming array by each object's id and return the items
 * removed, added, shared by both arrays.
 *
 * @param {array} current Current array
 * @param {array} incoming New array
 *
 * @return object
 *  removed: {array} Items removed in incoming.
 *  added: {array} Items added on incoming.
 *  shared: {array} Items that did not change.
 */
export const diffArrayById = (current, incoming) => {
  return diffArrayByProp(current, incoming, 'id');
};

/**
 * Compare current and incoming array by each object's given prop and return the
 * items
 * removed, added, shared by both arrays.
 *
 * @param {array} current Current array
 * @param {array} incoming New array
 *
 * @return object
 *  removed: {array} Items removed in incoming.
 *  added: {array} Items added on incoming.
 *  shared: {array} Items that did not change.
 */
export const diffArrayByProp = (current, incoming, prop) => {
  return diffArrayByFn(
    current,
    incoming,
    (currentLayer, incomingLayer) => currentLayer[prop] === incomingLayer[prop]
  );
};

/**
 * Compare current and incoming array by given function and return the items
 * removed, added, shared by both arrays.
 *
 * @param {array} current Current array
 * @param {array} incoming New array
 *
 * @return object
 *  removed: {array} Items removed in incoming.
 *  added: {array} Items added on incoming.
 *  shared: {array} Items that did not change.
 */
export const diffArrayByFn = (current, incoming, fn) => {
  const [removed, shared] = current.reduce(
    (acc, c) => {
      const found = !!incoming.find((n) => fn(c, n));
      return found ? [acc[0], acc[1].concat(c)] : [acc[0].concat(c), acc[1]];
    },
    [[], []]
  );

  const added = incoming.filter((n) => !current.find((c) => fn(c, n)));
  return {
    removed,
    shared,
    added
  };
};
