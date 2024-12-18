import { regexPhone, regexEmail, regexName } from '../regex';

describe('regexPhone', () => {
  test('valid phone number with 8 digits', () => {
    expect(new RegExp(regexPhone).test('12345678')).toBe(true);
  });

  test('valid phone number with 12 digits', () => {
    expect(new RegExp(regexPhone).test('123456789012')).toBe(true);
  });

  test('invalid phone number with 7 digits', () => {
    expect(new RegExp(regexPhone).test('1234567')).toBe(false);
  });

  test('invalid phone number with letters', () => {
    expect(new RegExp(regexPhone).test('abc12345')).toBe(false);
  });
});

describe('regexEmail', () => {
  test('valid email test@example.com', () => {
    expect(new RegExp(regexEmail).test('test@example.com')).toBe(true);
  });

  test('valid email a@b.co', () => {
    expect(new RegExp(regexEmail).test('a@b.co')).toBe(false);
  });

  test('valid email user.name+tag+sorting@example.com', () => {
    expect(new RegExp(regexEmail).test('user.name+tag+sorting@example.com')).toBe(true);
  });


  test('invalid email @example.com', () => {
    expect(new RegExp(regexEmail).test('@example.com')).toBe(false);
  });
});

describe('regexName', () => {
  test('valid name John', () => {
    expect(new RegExp(regexName).test('John')).toBe(true);
  });

  test('valid name JaneDoe', () => {
    expect(new RegExp(regexName).test('JaneDoe')).toBe(true);
  });

  test('invalid name ab', () => {
    expect(new RegExp(regexName).test('ab')).toBe(false);
  });

});
