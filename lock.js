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
    'image/myPc.png', 'image/recycleEmpty.png', 'image/folder.png', 'image/wechat.png', 
    'image/zipfolder.png', 'image/app.png', 'image/drive.png', 'image/新闻.png', 
    'image/google.png', 'image/note.png', 'image/zilizili.png', 'image/pdf.png', 
    'image/video.png', 'image/小红书.png', 'image/exe.png', 'image/file.png', 
    'image/image.png', 'image/db.png', 'image/redpacket.png',
    
    'image/ningning.jpg', 'image/yueyue.jpg', 'image/anmo.jpg', 'image/baba.png', 
    'image/gege.jpg', 'image/mama.png', 'image/user.png', 'image/user2.jpg', 
    'image/ming.png', 'image/wechatfile.jpeg',

    'image/对照表.png', 'image/全家图.png', 'image/全家图1.png', 'image/全家图2.png', 
    'image/zoo.png', 'image/zoo1.png', 'image/水族馆.png', 'image/水族馆1.png', 
    'image/山上.png', 'image/山上1.png', 'image/兔子先生.png', 'image/吃饭.png', 
    'image/tv.png', 'image/成绩单.png', 'image/毕业照.png',

    'image/医院.png', 'image/医院报告.png', 'image/医院报告2.png', 'image/医院报告3.png', 
    'image/校徽.png', 'image/学校背景.png', 'image/证件照.png',

    'image/dog.png', 'image/emoji.jpg', 'image/emoji2.jpg', 'image/emoji10.jpg', 
    'image/兔子.png', 'image/catemoji.png', 'pyq/pyq1.png', 'pyq/pyq2.png', 'image/pyq3.jpg',
    'hands/l.gif', 'hands/u.gif', 'hands/f.gif', 'hands/w.gif', 'hands/a.gif',

    'pt/1.png', 'pt/2.png', 'pt/3.png', 'pt/4.png', 'pt/5.png', 
    'pt/6.png', 'pt/7.png', 'pt/8.png', 'pt/9.png', 'pt/fullpt.jpg',

    'image/zilizili.jpg', 'image/雨雨.jpg', 'image/小兔子.png', 'image/banner.jpg',
    'rabbit/rabbit.gif', 'rabbit/rabbit1.gif', 'rabbit/rabbit3.gif', 
    'rabbit/bighug.gif', 'rabbit/good.gif',

    'image/xw2.png', 'image/xw3.png', 'image/xw4.png', 'image/xw5.png',

    'image/野餐.png', 'image/野餐2.png', 'image/野餐3.png', 
    'image/生日.png', 'image/生日2.png', 'image/小时候.png',

    'xhs/xhs.jpg', 'xhs/xhs2.jpg', 'xhs/xhs3.jpg', 'xhs/xhs4.jpg', 'xhs/xhs5.jpg', 
    'xhs/xhs6.jpg', 'xhs/xhs7.jpg', 'xhs/xhs8.jpg', 'xhs/xhs10.jpg', 'xhs/xhs11.jpg', 
    'xhs/xhs12.jpg', 'xhs/xhs13.jpg', 'xhs/xhs14.png', 'xhs/xhs14.jpg', 'xhs/xhs15.png', 
    'xhs/xhs15.jpg', 'xhs/xhs16.png', 'xhs/xhs16.jpg', 'xhs/xhs17.jpg', 'xhs/xhs18.png', 
    'xhs/xhs18.jpg', 'xhs/xhs19.png', 'xhs/xhs19.jpg', 'xhs/xhs20.jpg', 'xhs/xhs21.jpg', 
    'xhs/xhs22.jpg', 'xhs/xhs23.jpg', 'xhs/xhs24.jpg', 'xhs/xhs25.jpg', 'xhs/xhs26.jpg', 
    'xhs/xhs27.jpg', 'xhs/xhs28.jpg', 'xhs/xhs29.jpg', 'xhs/xhs30.jpg', 'xhs/xhs31.jpg', 
    'xhs/xhs32.jpg', 'xhs/xhs33.jpg', 'xhs/xhs34.jpg', 'xhs/xhs35.jpg', 'xhs/xhs36.jpg', 
    'xhs/xhs37.jpg',

    'video/video.mp4', 
    'audio/message.wav', 'audio/windowsError.mp3', 'audio/windows-10-bsod-sound.mp3', 
    'audio/morse.wav', 'audio/wechat_ring.mp3', 'audio/windows-10-foreground-earrape.mp3', 
    'audio/windows10_sound.wav'
    ];
    
    let loadedCount = 0;
    let isPreloadDone = false;

    if (acceptBtn) {
        acceptBtn.disabled = true;
        acceptBtn.style.opacity = '0.5';
        acceptBtn.style.cursor = 'not-allowed';
        acceptBtn.innerText = '正在下载游戏资源 (0%)';
    }

    function updatePreloadProgress() {
        loadedCount++;
        const percent = Math.floor((loadedCount / assetsToLoad.length) * 100);
        
        if (acceptBtn && !isPreloadDone) {
            acceptBtn.innerText = `正在下载游戏资源 (${percent}%)`;
        }

        if (loadedCount >= assetsToLoad.length) {
            isPreloadDone = true;
            if (acceptBtn) {
                acceptBtn.disabled = false;
                acceptBtn.style.opacity = '1';
                acceptBtn.style.cursor = 'pointer';
                acceptBtn.innerText = '接 受';
            }
        }
    }

    assetsToLoad.forEach(src => {
        if (src.endsWith('.wav') || src.endsWith('.mp3')) {
            const audio = new Audio();
            audio.oncanplaythrough = updatePreloadProgress;
            audio.onerror = updatePreloadProgress; 
            audio.src = src;
        } else {
            const img = new Image();
            img.onload = updatePreloadProgress;
            img.onerror = updatePreloadProgress;
            img.src = src;
        }
    });

    if (acceptBtn) {
        acceptBtn.onclick = () => {
            if (!isPreloadDone) return; 

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

                    finishBoot();
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