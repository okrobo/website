// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Format time in 12-hour format
    const formattedTime = `${(hours % 12 || 12)}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;
    
    // Format date as MMM/DD/YYYY
    const month = now.toLocaleString('default', { month: 'short' });
    const day = now.getDate();
    const year = now.getFullYear();
    const formattedDate = `${month}/${day < 10 ? '0' + day : day}/${year}`;
    
    // Update the clock and date in the HTML
    document.getElementById('clock').textContent = formattedTime;
    document.getElementById('date').textContent = formattedDate;
}

setInterval(updateClock, 1000);

updateClock();

function toggleSidebar(sidebarId) {
    var sidebar = document.getElementById(sidebarId);
    sidebar.classList.toggle('expanded'); // Toggle the 'expanded' class to show/hide content
}
