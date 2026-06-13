document.addEventListener("DOMContentLoaded", () => {
    const oobeScreen = document.getElementById('win10-oobe-screen');
    const bootScreen = document.getElementById('win10-boot-screen');
    const acceptBtn = document.getElementById('oobe-accept-btn');

    const isZ2 = localStorage.getItem('win10_zhoumu2') === 'true';
    const isZ3 = localStorage.getItem('win10_zhoumu3') === 'true';
    const isFirstBootDone = localStorage.getItem('win10_first_boot_done') === 'true';

    if (isZ2 || isZ3 || isFirstBootDone) {
        if (oobeScreen) oobeScreen.style.display = 'none';
        if (bootScreen) bootScreen.style.display = 'none';
        return; 
    }
    if (oobeScreen) oobeScreen.style.display = 'flex';

    const assetsToLoad = [
        'image/学校背景.png', 'image/证件照.png', 'image/医院报告.png',
        'image/医院报告2.png', 'image/医院报告3.png', 'image/zilizili.jpg',
        'rabbit/rabbit.gif', 'rabbit/rabbit1.gif', 'rabbit/rabbit3.gif',
        'rabbit/bighug.gif', 'image/全家图.png', 'image/全家图1.png',
        'image/全家图2.png', 'audio/message.wav', 'image/野餐2.png',
        'image/野餐.png', 'image/野餐3.png'
    ];
    let loadedCount = 0;
    let isPreloadDone = false;

    assetsToLoad.forEach(src => {
        if (src.endsWith('.wav') || src.endsWith('.mp3')) {
            const audio = new Audio();
            audio.oncanplaythrough = () => { loadedCount++; if(loadedCount >= assetsToLoad.length) isPreloadDone = true; };
            audio.onerror = () => { loadedCount++; if(loadedCount >= assetsToLoad.length) isPreloadDone = true; };
            audio.src = src;
        } else {
            const img = new Image();
            img.onload = () => { loadedCount++; if(loadedCount >= assetsToLoad.length) isPreloadDone = true; };
            img.onerror = () => { loadedCount++; if(loadedCount >= assetsToLoad.length) isPreloadDone = true; };
            img.src = src;
        }
    });
    if (acceptBtn) {
        acceptBtn.onclick = () => {
            const startupSound = new Audio('audio/windows10_sound.wav'); 
            startupSound.volume = 0.6;
            
            startupSound.muted = true;
            startupSound.play().then(() => {
                startupSound.pause();
                startupSound.currentTime = 0;
                startupSound.muted = false;
            }).catch(e => console.log("音频预解锁失败:", e));
            if (bootScreen) bootScreen.style.display = 'flex';
            oobeScreen.style.opacity = '0';
            
            setTimeout(() => {
                oobeScreen.style.display = 'none';
                setTimeout(() => {
                    const finishBoot = () => {
                        const tempStyle = document.getElementById('first-boot-style');
                        const lockEl = document.getElementById('lockscreen');
                        const loginEl = document.querySelector('.login-screen');
                        startupSound.play().catch(e => {
                            console.error('音效播放失败:', e);
                        });
                        if (lockEl) lockEl.style.display = '';
                        if (loginEl) loginEl.style.display = '';
                        if (tempStyle) tempStyle.remove();
                        
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                bootScreen.style.opacity = '0';
                                setTimeout(() => {
                                    bootScreen.style.display = 'none';
                                    localStorage.setItem('win10_first_boot_done', 'true');
                                }, 800);
                            });
                        });
                    };

                    if (isPreloadDone) {
                        finishBoot();
                    } else {
                        const poll = setInterval(() => {
                            if (isPreloadDone) {
                                clearInterval(poll);
                                finishBoot();
                            }
                        }, 100);
                    }
                }, 3500); 

            }, 500);
        };
    }
});

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