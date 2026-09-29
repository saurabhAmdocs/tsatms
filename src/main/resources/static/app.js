let captchaId = '';
let pendingRole = '';

async function captcha() {
  const data = await api('/api/auth/captcha');
  captchaId = data.captchaId;
  document.getElementById('captcha').textContent = data.captcha;
}

async function login() {
  try {
    const username = user.value.trim();
    const data = await api('/api/auth/login', {method: 'POST', body: JSON.stringify({
      username, password: pass.value, captchaId, captcha: cap.value
    })});
    pendingRole = data.role;
    sessionStorage.setItem('username', username);
    otpbox.hidden = false;
    msg.className = 'ok';
    msg.textContent = 'Demo OTP: ' + (data.otp || 'delivered by configured provider');
    if (data.otp) otp.value = data.otp;
  } catch (e) {
    msg.className = 'err';
    msg.textContent = e.message;
    captcha();
  }
}

async function verifyOtp() {
  try {
    const data = await api('/api/auth/otp', {method: 'POST', body: JSON.stringify({
      username: sessionStorage.getItem('username'), otp: otp.value
    })});
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('role', pendingRole);
    location.href = PAGES[pendingRole] || '/';
  } catch (e) {
    msg.className = 'err';
    msg.textContent = e.message;
  }
}

captcha();
