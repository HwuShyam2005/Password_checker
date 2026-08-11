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
});