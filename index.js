// index.js

const message = "Hello! Welcome to the AltSchool Cloud Engineering Program.\n" +
 "This is the Assessment 3 Registration Form.\n" +
 "Please fill in the details as prompted.\n" +
 "To proceed, close this alert box.\n" +
 "Thank you! 😊"; 
alert(message);

(function runFormPrompts() {
    function validateName(name) {
        if (!name) return "Name is required.";
        if (name.trim().length < 2) return "Name must be at least 2 characters.";
        if (!/^[A-Za-z\s'-]+$/.test(name.trim())) return "Name can only contain letters, spaces, hyphens or apostrophes.";
        return "";
    }

    function validateAge(ageStr) {
        if (!ageStr) return "Age is required.";
        const age = Number(ageStr);
        if (!Number.isFinite(age) || !Number.isInteger(age)) return "Age must be an integer.";
        if (age < 18) return "Must be older than 18";
        return "";
    }

    function validateEmail(email) {
        if (!email) return "Email is required.";
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email.trim())) return "Enter a valid email address.";
        return "";
    }

    function validatePassword(password) {
        if (!password) return "Password is required.";
        if (password.length < 8) return "Password must be at least 8 characters.";
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            return "Password must include lowercase, uppercase and a number.";
        }
        if (!/[^A-Za-z0-9]/.test(password)) return "Password should include at least one special character.";
        return "";
    }

    function validateConfirmPassword(confirmPassword) {
        if (confirmPassword !== password) return "Passwords do not match.";
        return "";
    }

    function promptUntilValid(message, validator) {
        while (true) {
            const value = prompt(message);
            if (value === null) { // user pressed Cancel
                alert("Input cancelled.");
                return null;
            }
            const error = validator(value);
            if (!error) return value;
            alert(error);
        }
    }

    const name = promptUntilValid("Enter your full name:", validateName);
    if (name === null) return;

    const age = promptUntilValid("Enter your age:", validateAge);
    if (age === null) return;

    const email = promptUntilValid("Enter your email address:", validateEmail);
    if (email === null) return;

    const password = promptUntilValid(
        "Enter a password (Password must be at least 8 characters, with one uppercase letter, one number, and one special character):",
        validatePassword
    );
    if (password === null) return;

    const passwordConfirm = promptUntilValid(
        "Confirm your password",
        validateConfirmPassword
    );
    if (passwordConfirm === null) return;

    alert("Registration successful!");
})();
