document.addEventListener("DOMContentLoaded", function () {
    // 📌 Clock Function
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedTime = `${(hours % 12 || 12)}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
        const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        // Ensure the clock and date elements exist before updating them
        const clockElement = document.getElementById('clock');
        const dateElement = document.getElementById('date');
        if (clockElement) clockElement.textContent = formattedTime;
        if (dateElement) dateElement.textContent = formattedDate;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Run once on load

    // 📌 Hamburger Menu and Sidebar Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');

    if (hamburgerMenu && sidebar) {
        hamburgerMenu.addEventListener('click', function(event) {
            event.stopPropagation();
            console.log("Hamburger menu clicked.")
            sidebar.classList.toggle('expanded');
        });
    } else {
        console.error("Hamburger menu or sidebar not found in the DOM.");
    }

    // 📌 Toggle Wallpaper Button Functionality
    const toggleButton = document.getElementById("toggle-wallpaper-btn");
    const video = document.getElementById("video-background");

    if (!toggleButton || !video) {
        console.error("Toggle Wallpaper Button or Video element not found in index.html");
        return;
    }

    let isVideoVisible = true;

    toggleButton.addEventListener("click", function () {
        console.log("Toggle wallpaper button clicked.");
        if (isVideoVisible) {
            video.style.display = "none";
            console.log("Video background hidden.");
        } else {
            video.style.display = "block";
            console.log("Video background displayed.");
        }
        isVideoVisible = !isVideoVisible;
    });

    // 📌 On-Screen Keyboard Functionality
    const passwordInput = document.getElementById("passwordInput");
    const keyboardButtons = document.querySelectorAll("#keyboard .key");

    if (passwordInput && keyboardButtons.length > 0) {
        keyboardButtons.forEach(button => {
            button.addEventListener("click", function () {
                const key = this.getAttribute("data-key");

                console.log(`Key pressed: ${key}`);

                if (key === "backspace") {
                    passwordInput.value = passwordInput.value.slice(0, -1);
                    console.log("Backspace pressed. New input: ", passwordInput.value);
                } else if (key === "submit") {
                    checkPassword();
                } else {
                    passwordInput.value += key;
                    console.log("New input: ", passwordInput.value);
                }
            });
        });
    } else {
        console.error("Password input or keyboard buttons not found.");
    }

    // 📌 Enter submits password
    passwordInput.addEventListener("keydown", function(event) {
        // Check if the pressed key is 'Enter'
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission (if it's inside a form)
            checkPassword(); // Submit password
        }
    });

    // 📌 Password Validation Function
    function checkPassword() {
        const userInput = passwordInput.value;
        const correctPassword = "twentyone"; // The specific word to validate

        console.log("Checking password...");

        if (userInput === correctPassword) {
            console.log("Password correct, redirecting...");
            window.location.href = "main.html"; // Replace with your desired page URL
        } else {
            console.log("Password incorrect.");
            alert("Incorrect passcode.");
            passwordInput.value = ""; // Clear the input instead of reloading
        }
    }

    // 📌 When the user scrolls, show the scrollbar
    window.addEventListener('scroll', function () {
        document.body.classList.add('scroll-active');

        // Remove the 'scroll-active' class after a delay (e.g., 1.5s) if the user stops scrolling
        clearTimeout(document.body.scrollTimeout);
        document.body.scrollTimeout = setTimeout(function () {
            document.body.classList.remove('scroll-active');
        }, 1500); // Hide scrollbar after 1.5 seconds of inactivity
    });
});
