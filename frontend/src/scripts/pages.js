import { initRegisterForm  } from "./register.js";
import { initLoginForm  } from "./login.js";
import { togglePassword  } from "./toggle.js";

export function initPage() {
  const page = document.body.dataset.page;

  if (page === 'index') {
    initRegisterForm();
    togglePassword();
  } else if (page === 'login') {
    initLoginForm();
    togglePassword();
  }
}
