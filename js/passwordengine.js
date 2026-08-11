// passwordEngine.js — Full password evaluation pipeline.
// Combines: rule definitions, rule-checking logic, and strength scoring.
// Depends on: commonPasswords.js (must be loaded before this file)

// ---------------------------
// 1. Rule Definitions
// ---------------------------
const passwordRules = [
  {
    id: 'minLength',
    description: 'At least 8 characters',
    test: (password) => password.length >= 8
  },
  {
    id: 'uppercase',
    description: 'At least one uppercase letter (A-Z)',
    test: (password) => /[A-Z]/.test(password)
  },
  {
    id: 'lowercase',
    description: 'At least one lowercase letter (a-z)',
    test: (password) => /[a-z]/.test(password)
  },
  {
    id: 'number',
    description: 'At least one number (0-9)',
    test: (password) => /[0-9]/.test(password)
  },
  {
    id: 'specialChar',
    description: 'At least one special character (!@#$%^&*...)',
    test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  },
  {
    id: 'notCommon',
    description: 'Not a commonly used/leaked password',
    test: (password) => !commonPasswords.includes(password.toLowerCase())
  }
];

// ---------------------------
// 2. Rule Checking Logic
// ---------------------------
function checkPassword(password) {
  const results = passwordRules.map((rule) => ({
    id: rule.id,
    description: rule.description,
    passed: rule.test(password)
  }));

  const passedCount = results.filter((r) => r.passed).length;

  return {
    results,          // array of { id, description, passed }
    passedCount,      // how many rules passed
    totalRules: passwordRules.length
  };
}

// ---------------------------
// 3. Strength Scoring
// ---------------------------
function getPasswordStrength(password) {
  if (password.length === 0) {
    return null;
  }

  const { passedCount, totalRules } = checkPassword(password);

  // 6 total rules: length, upper, lower, number, special, notCommon
  if (passedCount <= 2) {
    return { level: 'strength-poor', text: 'Poor' };
  } else if (passedCount === 3) {
    return { level: 'strength-weak', text: 'Weak' };
  } else if (passedCount === 4 || passedCount === 5) {
    return { level: 'strength-fair', text: 'Fair' };
  } else if (passedCount === totalRules) {
    return { level: 'strength-strong', text: 'Strong' };
  }

  return { level: 'strength-fair', text: 'Fair' };
}