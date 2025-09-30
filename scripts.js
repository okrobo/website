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

   // 📌 Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("passwordInput");
    const keys = document.querySelectorAll("#numericKeyboard .key");
    const keyClear = document.getElementById("keyClear");
    const keyDelete = document.getElementById("keyDelete");
    const keyEnter = document.getElementById("keyEnter");

    const correctPassword = "twentyone"; // 🔒 Insecure for production, okay for demos

    // 📌 Keyboard Button Press Handling
    keys.forEach(key => {
        key.addEventListener("click", () => {
            passwordInput.value += key.textContent;
        });
    });

    // 📌 Clear input
    if (keyClear) {
        keyClear.addEventListener("click", () => {
            passwordInput.value = "";
        });
    }

    // 📌 Delete last character
    if (keyDelete) {
        keyDelete.addEventListener("click", () => {
            passwordInput.value = passwordInput.value.slice(0, -1);
        });
    }

    // 📌 Enter key - check password
    if (keyEnter) {
        keyEnter.addEventListener("click", checkPassword);
    }

    // 📌 Handle "Enter" key on physical keyboard
    if (passwordInput) {
        passwordInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                checkPassword();
            }
        });
    }

    // 📌 Password check logic
    function checkPassword() {
        const userInput = passwordInput.value;

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

// CALENDAR JS //

let currentDate = new Date();
let currentMonth = currentDate.getMonth(); // 0-based: January = 0
let currentYear = currentDate.getFullYear();

// Function to generate the calendar
function generateCalendar() {
    const calendarBody = document.getElementById('calendar-body');
    const monthYearText = document.getElementById('month-year');

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get the starting day of the week for the current month (0 = Sunday, 6 = Saturday)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Set the header text (Month and Year)
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    monthYearText.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Generate the key for the current month (e.g., notes-09-2025)
    const localStorageKey = `notes-${String(currentMonth + 1).padStart(2, '0')}-${currentYear}`;

    // Get saved notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem(localStorageKey)) || {};

    // Clear the calendar before re-rendering (except weekdays)
    const weekdays = document.querySelector('.weekdays');
    calendarBody.innerHTML = '';
    calendarBody.appendChild(weekdays); // Re-append weekdays after clearing

    // Get today's date
    const today = new Date();
    const isCurrentMonthAndYear =
        currentMonth === today.getMonth() && currentYear === today.getFullYear();

    // Create empty cells for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarBody.appendChild(emptyDiv);
    }

    // Generate the day cells for the current month
    for (let i = 1; i <= daysInMonth; i++) {
        // Create the day cell
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        // Create the day number span
        const dayNumber = document.createElement('span');
        dayNumber.textContent = i;

        // 🌟 Highlight today
        if (isCurrentMonthAndYear && i === today.getDate()) {
            dayNumber.classList.add('today-highlight');
        }

        // Create the textarea for the day
        const textarea = document.createElement('textarea');
        textarea.placeholder = `...`;
        textarea.id = `day-${i}`;

        // Load saved text for this day if available
        const savedText = savedNotes[i];
        if (savedText) {
            textarea.value = savedText;
        }

        // Add event listener to save text to localStorage when it changes
        textarea.addEventListener('input', function () {
            savedNotes[i] = textarea.value;
            localStorage.setItem(localStorageKey, JSON.stringify(savedNotes));
        });

        // Add the day number and textarea to the day cell
        dayDiv.appendChild(dayNumber);
        dayDiv.appendChild(textarea);

        // Append the day cell to the calendar body
        calendarBody.appendChild(dayDiv);
    }
}


// Navigate to previous month
document.getElementById('prev-month').addEventListener('click', function () {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar();
});

// Navigate to next month
document.getElementById('next-month').addEventListener('click', function () {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar();
});

// Generate the initial calendar
window.onload = generateCalendar;

