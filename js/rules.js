// rules.js — Defines the password requirement rule set.
// Each rule has: an id, a description (for UI display later), and a test function.

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
  }
];