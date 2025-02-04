function updateClock() {
    const now = new Date();

    // Format time in 12-hour format with AM/PM
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12-hour format

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Format date as MMM/DD/YYYY
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[now.getMonth()];
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();
    const dateString = `${month}/${day}/${year}`;

    // Update HTML elements
    document.getElementById("clock").textContent = timeString;
    document.getElementById("date").textContent = dateString;
}

// Update the clock every second
setInterval(updateClock, 1000);
updateClock(); // Run immediately when page loads
