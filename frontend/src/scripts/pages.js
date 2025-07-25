import { initRegisterForm, initLoginForm } from "./interface/userForm.js";
import { togglePassword } from "./utils/toggle.js";
import { openModalLink, openModalCard } from "./interface/modal.js";
import { initAddMovie, initDeleteMovie, initEditMovie, loadUserMovies } from "./interface/movieFeatures.js"
import { logoutUser, requireAuth, settingsUser, backSettings } from "./utils/redirect.js";

export function initPage() {
    const page = document.body.dataset.page;

    if (page === 'index') {
        initRegisterForm();
        togglePassword();
    } else if (page === 'login') {
        initLoginForm();
        togglePassword();
    } else if (page === 'main') {
        openModalLink();
        openModalCard();
        initAddMovie();
        initDeleteMovie();
        initEditMovie();
        loadUserMovies();
        logoutUser();
        requireAuth();
        settingsUser();
    } else if (page === 'settings') {
        requireAuth();
        backSettings();
    }
}
