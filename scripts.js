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

    // Function to show the custom message modal (replaces alert())
const showMessage = (title, message) => {
    const messageModal = document.getElementById('message-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    // NOTE: Removed all button styling logic to adhere to the request.
    
    messageModal.classList.add('show');
};

// Function to hide the custom message modal
const hideMessage = () => {
    document.getElementById('message-modal').classList.remove('show');
};

// Define the password input globally for both functions to use
const passwordInput = document.getElementById("passwordInput");

// 📌 Password Validation Function (Globally accessible for the form submit)
window.checkPassword = () => {
    const userInput = passwordInput.value;
    // Correct password is "twentyone"
    const correctPassword = "twentyone"; 
    
    console.log("Checking password...");

    if (userInput === correctPassword) {
        console.log("Password correct, Access Granted.");
        // Using modal instead of window.location.href for environment compatibility
        showMessage('Access Granted', `Passcode verified! You would now be redirected to main.html.`);
        passwordInput.value = ""; // Clear on success
    } else {
        console.log("Password incorrect.");
        // Using custom message modal instead of alert()
        showMessage('Access Denied', 'Incorrect passcode.');
        passwordInput.value = "";
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const keyboard = document.getElementById('keyboard');
    const messageModal = document.getElementById('message-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    
    // 1. Physical Keyboard "Enter" key listener 
    if (passwordInput) {
        // Focus on input to allow physical key presses 
        passwordInput.focus(); 
        passwordInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                window.checkPassword();
            }
        });
    }


    // 2. Virtual Keyboard Click Handler
    keyboard.addEventListener('click', (event) => {
        const target = event.target;
        
        // Only proceed if a button with 'data-key' was clicked
        if (target.classList.contains('key')) {
            const key = target.getAttribute('data-key');
            let currentValue = passwordInput.value;
            
            // Flash feedback for press
            target.classList.add('active-press');
            setTimeout(() => target.classList.remove('active-press'), 100);

            // Handle different key types
            switch (key) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    // Append number, respecting the input's maxlength attribute (10)
                    if (passwordInput.value.length < (passwordInput.maxLength > 0 ? passwordInput.maxLength : 10)) {
                        passwordInput.value += key;
                    }
                    break;

                case 'backspace':
                    // Remove the last character
                    passwordInput.value = currentValue.slice(0, -1);
                    break;

                case 'submit':
                    // Handle the 'Go' action by calling the checkPassword function
                    window.checkPassword(); 
                    break;

                default:
                    // Ignore other keys
                    break;
            }
        }
    });

    // 3. Modal Close Listeners
    modalCloseButton.addEventListener('click', hideMessage);
    messageModal.addEventListener('click', (event) => {
        // Allows closing modal by clicking the overlay itself
        if (event.target === messageModal) {
            hideMessage();
        }
    });
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

