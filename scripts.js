document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // 📌 Clock Function
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedTime = `${(hours % 12 || 12)}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
        const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        const clockElement = document.getElementById('clock');
        const dateElement = document.getElementById('date');
        if (clockElement) clockElement.textContent = formattedTime;
        if (dateElement) dateElement.textContent = formattedDate;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 📌 Sidebar Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    if (hamburgerMenu && sidebar) {
        hamburgerMenu.addEventListener('click', function (event) {
            event.stopPropagation();
            console.log("Hamburger menu clicked.");
            sidebar.classList.toggle('expanded');
        });
    } else {
        console.error("Hamburger menu or sidebar not found.");
    }

    // 📌 Toggle Wallpaper
    const toggleButton = document.getElementById("toggle-wallpaper-btn");
    const video = document.getElementById("video-background");
    if (toggleButton && video) {
        let isVideoVisible = true;
        toggleButton.addEventListener("click", function () {
            console.log("Toggle wallpaper button clicked.");
            video.style.display = isVideoVisible ? "none" : "block";
            isVideoVisible = !isVideoVisible;
        });
    } else {
        console.error("Toggle Wallpaper Button or Video element not found.");
    }

    // 📌 TextBox LocalStorage Functionality
    const textBox = document.getElementById('text-box');
    if (textBox) {
        console.log("Text box found.");

        // Retrieve saved content
        const savedContent = localStorage.getItem('textBoxContent');
        if (savedContent !== null) {
            textBox.value = savedContent;
            console.log("Loaded saved content:", savedContent);
        }

        // Save input to localStorage
        textBox.addEventListener('input', function () {
            try {
                localStorage.setItem('textBoxContent', textBox.value);
                console.log("Text saved to localStorage:", textBox.value);
            } catch (e) {
                console.error("Error saving to localStorage", e);
            }
        });
    } else {
        console.error("Text box element not found.");
    }

    // 📌 Show Scrollbar When Scrolling
    window.addEventListener('scroll', function () {
        document.body.classList.add('scroll-active');
        clearTimeout(document.body.scrollTimeout);
        document.body.scrollTimeout = setTimeout(function () {
            document.body.classList.remove('scroll-active');
        }, 1500);
    });

    // 📌 Enter submits password
    const passwordInput = document.getElementById("passwordInput");
    if (passwordInput) {
        passwordInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                checkPassword();
            }
        });
    }

    // 📌 Password Validation Function
    function checkPassword() {
        const userInput = passwordInput.value;
        const correctPassword = "twentyone";
        console.log("Checking password...");
        if (userInput === correctPassword) {
            console.log("Password correct, redirecting...");
            window.location.href = "main.html";
        } else {
            console.log("Password incorrect.");
            alert("Incorrect passcode.");
            passwordInput.value = "";
        }
    }
});
