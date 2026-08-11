// main.js — Entry point: DOM wiring and event listeners
// (Strength bar + rule-checking wiring will be added in a later commit)

document.addEventListener('DOMContentLoaded', () => {

  // ---- Password visibility toggle ----
  const passwordInput = document.getElementById('password-input');
  const toggleButton = document.getElementById('toggle-visibility');
  const eyeOpenIcon = document.getElementById('eye-open');
  const eyeClosedIcon = document.getElementById('eye-closed');

  // Defensive check — logs a clear error instead of failing silently
  if (!passwordInput || !toggleButton || !eyeOpenIcon || !eyeClosedIcon) {
    console.error('[Password Toggle] One or more elements not found:', {
      passwordInput, toggleButton, eyeOpenIcon, eyeClosedIcon
    });
    return;
  }

  toggleButton.addEventListener('click', () => {
    const isCurrentlyHidden = passwordInput.type === 'password';

    // Toggle input type
    passwordInput.type = isCurrentlyHidden ? 'text' : 'password';

    // Toggle icon visibility: eye-open shows when VISIBLE, slash shows when HIDDEN
    eyeOpenIcon.style.display = isCurrentlyHidden ? 'block' : 'none';
    eyeClosedIcon.style.display = isCurrentlyHidden ? 'none' : 'block';

    // Update accessibility attributes
    toggleButton.setAttribute('aria-label', isCurrentlyHidden ? 'Hide password' : 'Show password');
    toggleButton.setAttribute('aria-pressed', String(isCurrentlyHidden));
  });

  console.log('[Password Toggle] Initialized successfully.');

  // ---- Strength bar wiring (real rule-based checking) ----
  const strengthBar = document.getElementById('strength-bar');
  const strengthLabel = document.getElementById('strength-label');
  const strengthClasses = ['strength-poor', 'strength-weak', 'strength-fair', 'strength-strong'];

  // Map each strength level to explicit width/color values
  const strengthStyles = {
    'strength-poor':   { width: '25%',  color: '#ef4444' },
    'strength-weak':   { width: '50%',  color: '#f59e0b' },
    'strength-fair':   { width: '75%',  color: '#fb923c' },
    'strength-strong': { width: '100%', color: '#22c55e' }
  };

  function updateStrengthBar(password) {
    // Reset classes first
    strengthBar.classList.remove(...strengthClasses);
    strengthLabel.classList.remove(...strengthClasses);

    if (password.length === 0) {
      strengthBar.style.width = '0%';
      strengthBar.style.backgroundColor = 'transparent';
      strengthLabel.textContent = '';
      return;
    }

    const result = getPasswordStrength(password);
    const style = strengthStyles[result.level];

    // Force a reflow so the browser registers a real style change
    // even if the previous and new state happen to match momentarily.
    void strengthBar.offsetWidth;

    strengthBar.classList.add(result.level);
    strengthLabel.classList.add(result.level);
    strengthLabel.textContent = result.text;

    // Set explicitly too, as a safety net in case class timing fails
    strengthBar.style.width = style.width;
    strengthBar.style.backgroundColor = style.color;
  }

  passwordInput.addEventListener('input', () => {
    updateStrengthBar(passwordInput.value);
  });
});