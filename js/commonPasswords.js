// commonPasswords.js — A blacklist of common/weak passwords.
// Used by rules.js to flag passwords that are technically "complex"
// on paper (e.g. mixed case + number) but are still widely known/guessable.
//
// This is a small starter list — can be expanded later with a larger
// public breached-password dataset if needed.

const commonPasswords = [
  'password',
  'password1',
  'password123',
  '123456',
  '123456789',
  '12345678',
  'qwerty',
  'qwerty123',
  'abc123',
  'letmein',
  'welcome',
  'welcome1',
  'admin',
  'admin123',
  'iloveyou',
  'monkey',
  'dragon',
  'football',
  'baseball',
  'sunshine',
  'princess',
  'trustno1',
  '111111',
  '000000',
  '1234567',
  'shadow',
  'master',
  'superman',
  'starwars',
  'passw0rd'
];