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

        document.getElementById('clock').textContent = formattedTime;
        document.getElementById('date').textContent = formattedDate;
    }

    setInterval(updateClock, 1000);
    updateClock();

    // 📌 Sidebar Toggle Function
    function toggleSidebar(sidebarId) {
        const sidebar = document.getElementById(sidebarId);
        if (!sidebar) {
            console.error(`Sidebar ${sidebarId} not found!`);
            return;
        }
        sidebar.classList.toggle('expanded');
        console.log(`${sidebarId} sidebar toggled. Is expanded: ${sidebar.classList.contains('expanded')}`);
    }

    // 📌 Hamburger Menu Event Listeners for Left and Right Sidebars
    const hamburgerLeft = document.querySelector(".sidebar .hamburger-menu");
    const hamburgerRight = document.querySelector(".sidebar-right .hamburger-menu");

    if (hamburgerLeft) {
        hamburgerLeft.addEventListener("click", function () {
            console.log("Left sidebar hamburger menu clicked.");
            toggleSidebar("sidebar");
        });
    } else {
        console.error("Left sidebar hamburger menu not found");
    }

    if (hamburgerRight) {
        hamburgerRight.addEventListener("click", function () {
            console.log("Right sidebar hamburger menu clicked.");
            toggleSidebar("sidebar-right");
        });
    } else {
        console.error("Right sidebar hamburger menu not found");
    }

    // 📌 Toggle Wallpaper Button Functionality
    const toggleButton = document.getElementById("toggle-wallpaper-btn");
    const video = document.getElementById("video-background");

    if (!toggleButton) {
        console.error("Toggle Wallpaper Button not found in index.html");
        return; // Stop further execution if button is not found
    }

    if (!video) {
        console.error("Video element not found in index.html");
        return; // Stop further execution if video is not found
    }

    // 📌 Toggle Background Function
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

    // Add click event listener to each keyboard key
    keyboardButtons.forEach(button => {
        button.addEventListener("click", function () {
            const key = this.getAttribute("data-key");

            console.log(`Key pressed: ${key}`);

            if (key === "backspace") {
                // Remove the last character from the input field
                passwordInput.value = passwordInput.value.slice(0, -1);
                console.log("Backspace pressed. New input: ", passwordInput.value);
            } else if (key === "submit") {
                checkPassword();
            } else {
                // Add the clicked key to the input field
                passwordInput.value += key;
                console.log("New input: ", passwordInput.value);
            }
        });
    });

    // 📌 Password Validation Function
    function checkPassword() {
        var userInput = document.getElementById("passwordInput").value;
        var correctPassword = "twentyone";  // The specific word to validate

        console.log("Checking password...");

        // Check if the entered word matches the correct password
        if (userInput === correctPassword) {
            console.log("Password correct, redirecting...");
            // Redirect to another page if the word is correct
            window.location.href = "main.html";  // Replace with your desired page URL
        } else {
            console.log("Password incorrect.");
            // If the word is incorrect, reload the current page
            alert("Incorrect passcode.");
            document.getElementById("passwordInput").value = ""; // Clear the input instead of reloading
        }
    }

    // 📌 Event Listener for Submit Button (password check)
    const submitButton = document.querySelector("button[type='submit']");
    if (submitButton) {
        submitButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent form submission
            console.log("Submit button clicked.");
            checkPassword();
        });
    } else {
        console.error("Submit button not found.");
    }
});
