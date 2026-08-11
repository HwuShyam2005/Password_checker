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
    const isPasswordVisible = passwordInput.type === 'text';

    // Toggle input type
    passwordInput.type = isPasswordVisible ? 'password' : 'text';

    // Toggle icon visibility
    eyeOpenIcon.style.display = isPasswordVisible ? 'block' : 'none';
    eyeClosedIcon.style.display = isPasswordVisible ? 'none' : 'block';

    // Update accessibility attributes
    toggleButton.setAttribute('aria-label', isPasswordVisible ? 'Show password' : 'Hide password');
    toggleButton.setAttribute('aria-pressed', String(!isPasswordVisible));
  });

  console.log('[Password Toggle] Initialized successfully.');

  // ---- Strength bar wiring (real rule-based checking) ----
  const strengthBar = document.getElementById('strength-bar');
  const strengthLabel = document.getElementById('strength-label');
  const strengthClasses = ['strength-poor', 'strength-weak', 'strength-fair', 'strength-strong'];

  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    console.log('[DEBUG] Input event fired. Password:', password);

    // Clear previous stage classes
    strengthBar.classList.remove(...strengthClasses);
    strengthLabel.classList.remove(...strengthClasses);

    if (password.length === 0) {
      strengthBar.style.width = '0%';
      strengthLabel.textContent = '';
      return;
    }

    console.log('[DEBUG] typeof getPasswordStrength:', typeof getPasswordStrength);
    console.log('[DEBUG] typeof checkPassword:', typeof checkPassword);
    console.log('[DEBUG] typeof passwordRules:', typeof passwordRules);

    const result = getPasswordStrength(password);
    console.log('[DEBUG] Strength result:', result);

    strengthBar.classList.add(result.level);
    strengthLabel.classList.add(result.level);
    strengthLabel.textContent = result.text;
    console.log('[DEBUG] strengthBar classList now:', strengthBar.className);
  });
});