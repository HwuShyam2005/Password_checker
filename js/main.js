// main.js — Entry point: DOM wiring and event listeners
// (Strength bar + rule-checking wiring will be added in a later commit)

document.addEventListener('DOMContentLoaded', () => {

  // ---- Password visibility toggle ----
  const passwordInput = document.getElementById('password-input');
  const toggleButton = document.getElementById('toggle-visibility');
  const eyeOpenIcon = document.getElementById('eye-open');
  const eyeClosedIcon = document.getElementById('eye-closed');

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

});