import get from 'lodash.get';
import { round } from './format';

const numOrUndef = (val) =>
  typeof val === 'undefined' ? undefined : Number(val);

const cleanRound = (v, roundDec) => round(numOrUndef(v), numOrUndef(roundDec));

/**
 * List of valid function for the inline syntax.
 */
const fnsMappings = {
  sum: (v, v2) => Number(v) + Number(v2),
  subtract: (v, v2) => Number(v) - Number(v2),
  multiply: (v, v2) => Number(v) * Number(v2),
  divide: (v, v2) => Number(v) / Number(v2),
  prefix: (v, p) => p + v,
  suffix: (v, s) => v + s,
  capitalize: (v) => v.charAt(0).toUpperCase() + v.slice(1),
  toUpperCase: (v) => v.toUpperCase(),
  toLowerCase: (v) => v.toLowerCase(),
  round: cleanRound,
  roundSafe: (v, roundDec, errVal = 'N/A') => {
    const rounded = cleanRound(v, roundDec);
    return isNaN(rounded) ? errVal : rounded;
  },
  percent: (v, roundDec, errVal = 'N/A') => {
    const rounded = cleanRound(v, roundDec);
    return isNaN(rounded) ? errVal : rounded + '%';
  },
  _error: (v, name) => {
    // eslint-disable-next-line
    console.error(
      'parsePropSyntax: Function',
      name,
      'is not valid. Execution skipped.'
    );
    return v;
  }
};

/**
 * Parses the input string into a syntax tree.
 * Function are separated by pipes (|) and parameters by colons (:)
 * The first piece must always be the path to the value and the subsequent
 * functions to apply must be specified in the allowed list.
 * Functions are always applied in order of specification.
 * If a function does not exist it will be ignored and an error printed.
 *
 * @example
 * Processing:
 *  Input string: prop_value|round:2|suffix:%
 * Result:
 * {
 *   accessor: 'prop_value'
 *   fns: [
 *     {
 *       name: 'round'
 *       args: [2]
 *     },
 *     {
 *       name: 'suffix'
 *       args: ['%']
 *     }
 *   ]
 * }
 *
 * @param {string} str String to parse
 *
 * @returns {object} Syntax tree structure
 */
export function computeSyntaxTree(str) {
  const [prop, ...fnStrings] = str.split('|');

  return {
    accessor: prop,
    fns: fnStrings.map((str) => {
      const [fn, ...args] = str.split(':');
      if (!fnsMappings[fn]) {
        return {
          name: '_error',
          args: [fn, ...args]
        };
      }
      return { name: fn, args };
    })
  };
}

/**
 * Applies a syntax tree to a source object returning the resulting value.
 *
 * @example
 * Source:
 * {
 *   prop_value: 3.141592,
 *   another: 'foobar'
 * }
 *
 * Syntax tree:
 * {
 *   accessor: 'prop_value'
 *   fns: [
 *     {
 *       name: 'round'
 *       args: [2]
 *     },
 *     {
 *       name: 'suffix'
 *       args: ['%']
 *     }
 *   ]
 * }
 *
 * Steps according to syntax tree:
 * - Get value from source using accessor prop_value
 *   => 3.141592
 * - Apply function round with args [2]
 *   => 3.14
 * - Apply function suffix with args [%]
 *   => 3.14%
 *
 * @see computeSyntaxTree()
 *
 * @param {object} source Source object
 * @param {object} syntaxTree Syntax tree as returned by computeSyntaxTree
 */
export function applySyntaxTree(source, syntaxTree) {
  const value = get(source, syntaxTree.accessor);
  return syntaxTree.fns.reduce((v, fn) => {
    return fnsMappings[fn.name](v, ...fn.args);
  }, value);
}

/**
 * Computes a the final value of a syntax property string against a values object
 *
 * @param {string} propString Prop string to process
 * @param {object} values Source object
 */
export function computeFinalPropValue(propString, values) {
  const syntaxTree = computeSyntaxTree(propString);
  return applySyntaxTree(values, syntaxTree);
}
