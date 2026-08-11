// checker.js — Core logic: evaluates a password against passwordRules (from rules.js)
// Returns an object with pass/fail results per rule + a total count passed.

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