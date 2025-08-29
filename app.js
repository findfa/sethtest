// Show signup section
function showSignup() {
    document.getElementById("signup-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
}

// Show login section
function showLogin() {
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

// Signup function
function signup() {
    const firstName = document.getElementById("signup-firstname").value;
    const lastName = document.getElementById("signup-lastname").value;
    const phone = document.getElementById("signup-phone").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!firstName || !lastName || !phone || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            // Save user details in Firestore
            return db.collection("users").doc(cred.user.uid).set({
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email
            });
        })
        .then(() => {
            alert("Signup successful! Redirecting to dashboard...");
            window.location = "dashboard.html";
        })
        .catch(err => alert(err.message));
}

// Login function
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            // Optional: fetch user data
            return db.collection("users").doc(cred.user.uid).get();
        })
        .then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                console.log("Logged in user:", userData);
            }
            window.location = "dashboard.html";
        })
        .catch(err => alert(err.message));
}

// Reset password function
function resetPassword() {
    const email = prompt("Enter your email to reset password:");
    if (email) {
        auth.sendPasswordResetEmail(email)
            .then(() => alert("Password reset email sent!"))
            .catch(err => alert(err.message));
    }
}

db.collection("users").add({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com"
})
.then(docRef => {
    console.log("Document written with ID: ", docRef.id);
})
.catch(error => {
    console.error("Error adding document: ", error);
});
