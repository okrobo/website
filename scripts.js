// A utility function to safely get an element and log an error if it's missing.
const getElement = (id, required = true) => {
    const element = document.getElementById(id);
    if (!element && required) {
        // Only log errors for elements essential for core functionality
        console.error(`Required element with ID "${id}" not found.`);
    }
    return element;
};

// ===============================================
// === Core DOMContentLoaded Logic (Main App) ===
// ===============================================
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // Initialize all components
    initClock();
    initSidebarToggle();
    initWallpaperToggle();
    initTextBoxStorage();
    initScrollbarHider();
    
    // Password and Keyboard components
    initPasswordProtection(); 
    initKeyboardInput(); // New function for the on-screen keyboard

    initChecklist();

    // Calendar initialization
    generateCalendar(); 
});


// -----------------------------------------------
// 1. Clock Component
// -----------------------------------------------
function updateClock() {
    const now = new Date();
    // Use modern Intl API for robust and locale-aware time/date formatting
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const formattedDate = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    // Centralize element lookups (non-critical, so required=false)
    const clockElement = getElement('clock', false);
    const dateElement = getElement('date', false);

    if (clockElement) clockElement.textContent = formattedTime;
    if (dateElement) dateElement.textContent = formattedDate;
}

function initClock() {
    // Run immediately, then set interval
    updateClock();
    setInterval(updateClock, 1000);
}


// -----------------------------------------------
// 2. Sidebar Toggle Component
// -----------------------------------------------
function initSidebarToggle() {
    const hamburgerMenu = getElement('hamburger-menu', false);
    const sidebar = getElement('sidebar', false);

    if (hamburgerMenu && sidebar) {
        hamburgerMenu.addEventListener('click', (event) => {
            event.stopPropagation();
            sidebar.classList.toggle('expanded');
        });
    }
}


// -----------------------------------------------
// 3. Toggle Wallpaper Component
// -----------------------------------------------
function initWallpaperToggle() {
    const toggleButton = getElement("toggle-wallpaper-btn", false);
    const video = getElement("video-background", false);

    if (toggleButton && video) {
        // Use a flag for video state
        let isVideoVisible = true; 
        
        toggleButton.addEventListener("click", () => {
            // Using a CSS class is generally better than inline style for toggles
            video.classList.toggle('hidden', isVideoVisible);
            isVideoVisible = !isVideoVisible;
        });
    }
}


// -----------------------------------------------
// 4. TextBox LocalStorage Component (Now Firestore Ready if you decide to upgrade!)
// -----------------------------------------------
function initTextBoxStorage() {
    const textBox = getElement('text-box', false);
    if (!textBox) return;

    // Load saved content
    try {
        const savedContent = localStorage.getItem('textBoxContent');
        if (savedContent !== null) {
            textBox.value = savedContent;
        }
    } catch (e) {
        console.error("Error loading content from localStorage", e);
    }

    // Save input to localStorage (using an anonymous function is fine here)
    textBox.addEventListener('input', () => {
        try {
            localStorage.setItem('textBoxContent', textBox.value);
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    });
}


// -----------------------------------------------
// 5. Scrollbar Hider Component
// -----------------------------------------------
function initScrollbarHider() {
    // Use an object to hold the timeout ID for better scope management
    const state = { scrollTimeout: null };

    window.addEventListener('scroll', () => {
        document.body.classList.add('scroll-active');
        clearTimeout(state.scrollTimeout);
        state.scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scroll-active');
        }, 1500);
    });
}


// -----------------------------------------------
// 6. Password Protection Component
// -----------------------------------------------
const CORRECT_PASSWORD = "twentyone"; 

function checkPassword() {
    const passwordInput = getElement("passwordInput", false);
    if (!passwordInput) return;

    const userInput = passwordInput.value;
    
    if (userInput === CORRECT_PASSWORD) {
        // Updated to use alert() for success feedback
        alert("Passcode accepted!"); 
        window.location.href = "main.html";
    } else {
        // Updated to use alert() for failure feedback
        alert("Incorrect passcode."); 
        // Visually clear the input on failure
        passwordInput.value = ""; 
    }
}

function initPasswordProtection() {
    const passwordInput = getElement("passwordInput", false);
    if (!passwordInput) return;

    // Listen for Enter keypress for keyboard/manual input
    passwordInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            checkPassword();
        }
    });
}


// -----------------------------------------------
// 7. On-Screen Keyboard Input
// -----------------------------------------------
function initKeyboardInput() {
    const passwordInput = getElement("passwordInput", false);
    const keyboard = getElement("keyboard", false);
    
    if (!passwordInput || !keyboard) {
        console.warn("Password input or keyboard not found, skipping keyboard initialization.");
        return;
    }

    // Use event delegation on the keyboard container
    keyboard.addEventListener('click', (event) => {
        const keyButton = event.target.closest('.key');
        if (!keyButton) return; // Not a key button

        const key = keyButton.dataset.key;
        let currentValue = passwordInput.value;

        // Numbers 0-9
        if (!isNaN(parseInt(key)) && key.length === 1) {
            passwordInput.value = currentValue + key;
        } 
        // Backspace / Delete
        else if (key === 'backspace') {
            passwordInput.value = currentValue.slice(0, -1);
        } 
        // Submit / Go
        else if (key === 'submit') {
            checkPassword();
        }
        
        // Ensure the input stays focused for physical keyboard users (optional but nice)
        passwordInput.focus(); 
    });
}


// -----------------------------------------------
// 8. Checklist Component
// -----------------------------------------------
function initChecklist() {
    const inputBox = getElement("inputBox", false);
    const checklist = getElement("checklist", false);
    if (!inputBox || !checklist) return;

    loadChecklist(checklist, addItem);

    // Use an arrow function for conciseness
    inputBox.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && inputBox.value.trim() !== "") {
            addItem(checklist, inputBox.value.trim());
            inputBox.value = "";
            saveChecklist(checklist); 
        }
    });
}

function saveChecklist(checklist) {
    try {
        const items = Array.from(checklist.querySelectorAll("li")).map(item => {
            const checkbox = item.querySelector("input[type='checkbox']");
            const text = item.querySelector(".item-text").textContent;
            return {
                text,
                completed: checkbox.checked
            };
        });
        localStorage.setItem("checklistItems", JSON.stringify(items));
    } catch (e) {
        console.error("Error saving checklist to localStorage", e);
    }
}

function loadChecklist(checklist, addItemCallback) {
    try {
        const savedItems = JSON.parse(localStorage.getItem("checklistItems"));
        if (Array.isArray(savedItems)) {
            // Reverse here to ensure items load in their original order 
            // before being inserted at the start of the list.
            savedItems.reverse().forEach(item => {
                addItemCallback(checklist, item.text, item.completed);
            });
        }
    } catch (e) {
        console.error("Error loading checklist from localStorage", e);
    }
}

function addItem(checklist, text, completed = false) {
    const li = document.createElement("li");

    // DOM construction in a single, clear block
    li.innerHTML = `
        <div class="item-left">
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <span class="item-text">${text}</span>
        </div>
        <button class="delete-btn">Delete</button>
    `;

    const checkbox = li.querySelector("input[type='checkbox']");
    const span = li.querySelector(".item-text");
    const deleteBtn = li.querySelector(".delete-btn");

    // Apply completion class on creation
    if (completed) {
        li.classList.add("completed");
        span.classList.add("completed");
    }

    // Attach event listeners
    checkbox.onchange = () => {
        const isChecked = checkbox.checked;
        li.classList.toggle("completed", isChecked);
        span.classList.toggle("completed", isChecked);
        saveChecklist(checklist);
    };

    deleteBtn.onclick = () => {
        li.remove();
        saveChecklist(checklist);
    };

    // Insert new item at the top
    checklist.insertBefore(li, checklist.firstChild);
}


// ===============================================
// === Calendar Component (Global Scope) ===
// ===============================================
// Variables defined in the global scope for calendar navigation
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Generates and renders the calendar view for the currentMonth/currentYear.
 */
function generateCalendar() {
    const calendarBody = getElement('calendar-body', false);
    const monthYearText = getElement('month-year', false);
    if (!calendarBody || !monthYearText) return;

    // Calculate month metrics
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

    // Update header
    monthYearText.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

    // Prepare localStorage key and load notes
    const monthKey = String(currentMonth + 1).padStart(2, '0');
    const localStorageKey = `notes-${monthKey}-${currentYear}`;
    const savedNotes = JSON.parse(localStorage.getItem(localStorageKey)) || {};

    // Clear calendar grid and reset the day container
    calendarBody.innerHTML = '';

    // Get today's date for highlight
    const today = new Date();
    const isCurrentMonthAndYear =
        currentMonth === today.getMonth() && currentYear === today.getFullYear();

    // 1. Create empty cells for the days before the first day
    for (let i = 0; i < firstDay; i++) {
        calendarBody.appendChild(document.createElement('div'));
    }

    // 2. Generate the day cells for the current month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        const dayNumber = document.createElement('span');
        dayNumber.textContent = i;

        if (isCurrentMonthAndYear && i === today.getDate()) {
            dayNumber.classList.add('today-highlight');
        }

        const textarea = document.createElement('textarea');
        textarea.placeholder = `...`;
        textarea.value = savedNotes[i] || ''; // Load saved text or empty string

        // Add event listener to save text to localStorage
        textarea.addEventListener('input', () => {
            savedNotes[i] = textarea.value;
            // Debouncing this would be an advanced optimization for performance
            localStorage.setItem(localStorageKey, JSON.stringify(savedNotes));
        });

        dayDiv.append(dayNumber, textarea);
        calendarBody.appendChild(dayDiv);
    }
}

// -----------------------------------------------
// Calendar Navigation Event Listeners
// -----------------------------------------------

// Helper to update month/year and regenerate calendar
function navigateMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
}

// Attach these listeners safely after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    const prevButton = getElement('prev-month', false);
    const nextButton = getElement('next-month', false);

    if (prevButton) {
        prevButton.addEventListener('click', () => navigateMonth(-1));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => navigateMonth(1));
    }
});
