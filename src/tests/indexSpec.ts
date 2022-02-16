
import strings from '../utilities/strings'
import numbers from '../utilities/numbers'
import arrays from '../utilities/arrays'

const numbArr = [1, 5, 7]
const wordArr = ['ahmed', 'mohmed', 'aly']
it('expect strings.cap() to equal hello', () => {
  expect(strings.capitalize('Ahmed')).toEqual('Ahmed');
});
it('expect numbers() to equal hello', () => {
  expect(numbers.multiply(10, 4)).toBeCloseTo(40);
});
it('should not contain the third index', () => {
  expect(arrays.cut3(wordArr)).not.toContain('aly');
});
it('should not contain the third index', () => {
  expect(arrays.addArr(numbArr)).toBeTruthy();
});
