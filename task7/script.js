// Utility function to hash password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Delete account function
function deleteAccount() {
    const user = getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(u => u.username !== user.username || u.email !== user.email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Register function
async function register(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.username === username || user.email === email)) {
        return 'User already exists';
    }

    const hashedPassword = await hashPassword(password);
    users.push({ username, email, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));

    return 'Registration successful';
}

// Login function
async function login(identifier, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const hashedPassword = await hashPassword(password);

    const user = users.find(
        user =>
            (user.username === identifier || user.email === identifier) &&
            user.password === hashedPassword
    );

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return 'Login successful';
    }

    return 'Invalid credentials';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const message = document.getElementById('message');

            const result = await login(username, password);
            message.textContent = result;

            if (result === 'Login successful') {
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const message = document.getElementById('message');

            const result = await register(username, email, password);
            message.textContent = result;

            if (result === 'Registration successful') {
                window.location.href = 'index.html';
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            logout();
        });
    }

    // Dashboard access control
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        if (isLoggedIn()) {
            const user = getCurrentUser();
            welcomeMessage.textContent = `Welcome, ${user.username}!`;
        } else {
            window.location.href = 'index.html';
        }
    }

});
