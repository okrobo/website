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
    }

    // Debugging log to check if sidebar elements exist
    console.log("Sidebar elements:", document.querySelector(".sidebar .hamburger-menu"));
    console.log("Sidebar-right elements:", document.querySelector(".sidebar-right .hamburger-menu"));

    const hamburgerLeft = document.querySelector(".sidebar .hamburger-menu");
    const hamburgerRight = document.querySelector(".sidebar-right .hamburger-menu");

    if (hamburgerLeft) {
        hamburgerLeft.addEventListener("click", function () {
            toggleSidebar("sidebar");
        });
    } else {
        console.error("Left sidebar hamburger menu not found");
    }

    if (hamburgerRight) {
        hamburgerRight.addEventListener("click", function () {
            toggleSidebar("sidebar-right");
        });
    } else {
        console.error("Right sidebar hamburger menu not found");
    }

    // 📌 Check if the toggle wallpaper button and video element exist
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
        if (isVideoVisible) {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
        isVideoVisible = !isVideoVisible;
    });
});

// Function to check the entered word
function checkPassword() {
    var userInput = document.getElementById("passwordInput").value;
    var correctPassword = "twentyone";  // The specific word to validate

    // Check if the entered word matches the correct password
    if (userInput === correctPassword) {
        // Redirect to another page if the word is correct
        window.location.href = "main.html";  // Replace with your desired page URL
    } else {
        // If the word is incorrect, reload the current page
        alert("Incorrect word. Try again.");
        window.location.href = window.location.href;  // Reload current page
    }
}
