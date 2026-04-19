import { i as isAlphabetical } from "./is-alphabetical.mjs";
import { i as isDecimal } from "./is-decimal.mjs";
function isAlphanumerical(character) {
  return isAlphabetical(character) || isDecimal(character);
}
export {
  isAlphanumerical as i
};
