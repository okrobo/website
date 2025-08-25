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

    // 📌 Checklist App
    const inputBox = document.getElementById("inputBox");
    const checklist = document.getElementById("checklist");

    // Load saved checklist from localStorage when page loads
    loadChecklist();

    inputBox.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && inputBox.value.trim() !== "") {
            addItem(inputBox.value.trim());
            inputBox.value = "";
            saveChecklist();  // Save to localStorage after adding item
        }
    });

    // 📌 Add item at the top of the checklist
    function addItem(text, completed = false) {
        const li = document.createElement("li");

        const leftWrapper = document.createElement("div");
        leftWrapper.className = "item-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;

        const span = document.createElement("span");
        span.textContent = text;
        span.className = "item-text";

        checkbox.onchange = () => {
            if (checkbox.checked) {
                li.classList.add("completed");
                span.classList.add("completed");
            } else {
                li.classList.remove("completed");
                span.classList.remove("completed");
            }
            saveChecklist();  // Save to localStorage after checkbox change
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            li.remove();
            saveChecklist();  // Save to localStorage after deletion
        };

        leftWrapper.appendChild(checkbox);
        leftWrapper.appendChild(span);
        li.appendChild(leftWrapper);
        li.appendChild(deleteBtn);

        // Insert new item at the top
        checklist.insertBefore(li, checklist.firstChild);
    }

    // Save the current checklist to localStorage
    function saveChecklist() {
        const items = [];
        const listItems = checklist.querySelectorAll("li");
        listItems.forEach(item => {
            const checkbox = item.querySelector("input[type='checkbox']");
            const text = item.querySelector(".item-text").textContent;
            const completed = checkbox.checked;
            items.push({ text, completed });
        });

        // Save the checklist array to localStorage
        localStorage.setItem("checklistItems", JSON.stringify(items));
    }

    // Load checklist from localStorage
    function loadChecklist() {
        const savedItems = JSON.parse(localStorage.getItem("checklistItems"));
        if (savedItems && Array.isArray(savedItems)) {
            savedItems.reverse().forEach(item => {
                addItem(item.text, item.completed);
            });
        }
    }
});
