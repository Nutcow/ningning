document.addEventListener("DOMContentLoaded", () => {
    const lockscreen = document.getElementById("lockscreen");
    const timeDisplay = document.getElementById("time");
    const dateDisplay = document.getElementById("date");
    
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");
    const errorMessage = document.getElementById("errorMessage");

    function updateClock() {
        const now = new Date();
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}`;

        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
    
    updateClock();
    setInterval(updateClock, 1000);

    lockscreen.addEventListener("click", () => {
        lockscreen.classList.add("slide-up");
        setTimeout(() => passwordInput.focus(), 600); 
        setTimeout(() => {
            lockscreen.style.display = "none";
        }, 650); 
    });

    function handleLogin() {
        const passwordValue = passwordInput.value.trim();
        const isZhoumu3 = localStorage.getItem('win10_zhoumu3') === 'true';
        const correctPassword = isZhoumu3 ? "ruoning" : "jiangruoning";

        if (passwordValue === correctPassword) {
            errorMessage.style.display = "none";
            window.location.href = "pc.html";
        } else {
            passwordInput.value = "";
            errorMessage.style.display = "block";
            passwordInput.focus();
        }
    }

    loginButton.addEventListener("click", handleLogin);

    passwordInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    });
    
    passwordInput.addEventListener("input", () => {
        errorMessage.style.display = "none";
    });
});
