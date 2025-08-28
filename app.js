function showSignup() {
    document.getElementById("signup-section").style.display = "block";
}

function showLogin() {
    document.getElementById("signup-section").style.display = "none";
}

function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Signup successful! Redirecting to dashboard...");
            window.location = "dashboard.html";
        })
        .catch(err => alert(err.message));
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location = "dashboard.html")
        .catch(err => alert(err.message));
}

function resetPassword() {
    const email = prompt("Enter your email to reset password:");
    if(email) {
        auth.sendPasswordResetEmail(email)
            .then(() => alert("Password reset email sent!"))
            .catch(err => alert(err.message));
    }
}
