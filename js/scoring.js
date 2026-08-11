// scoring.js — Converts checker.js results into a strength level for the UI.
// Maps "how many rules passed" to one of: poor / weak / fair / strong

function getPasswordStrength(password) {
  if (password.length === 0) {
    return null;
  }

  const { passedCount, totalRules } = checkPassword(password);

  // 5 total rules currently (length, upper, lower, number, special)
  if (passedCount <= 1) {
    return { level: 'strength-poor', text: 'Poor' };
  } else if (passedCount === 2) {
    return { level: 'strength-weak', text: 'Weak' };
  } else if (passedCount === 3 || passedCount === 4) {
    return { level: 'strength-fair', text: 'Fair' };
  } else if (passedCount === totalRules) {
    return { level: 'strength-strong', text: 'Strong' };
  }

  return { level: 'strength-fair', text: 'Fair' };
}