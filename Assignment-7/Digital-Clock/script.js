function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
  
    const timeDisplay = document.getElementById('timeDisplay');
    timeDisplay.textContent = `${hours}  ${minutes}  ${seconds}`;
  }
  
  
  setInterval(updateClock, 1000);
  
  
  updateClock();
  