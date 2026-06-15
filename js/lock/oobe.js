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

    const assetsToLoad = window.LOCK_ASSETS_TO_LOAD || [];
    const totalAssets = assetsToLoad.length;

    let loadedCount = 0;
    let isPreloadDone = false;
    const countedAssets = new Set();

    if (acceptBtn) {
        acceptBtn.disabled = true;
        acceptBtn.style.opacity = '0.5';
        acceptBtn.style.cursor = 'not-allowed';
        acceptBtn.innerText = totalAssets ? '正在下载游戏资源 (0%)' : '接 受';
    }

    function finishPreload() {
        if (isPreloadDone) return;
        isPreloadDone = true;
        if (acceptBtn) {
            acceptBtn.disabled = false;
            acceptBtn.style.opacity = '1';
            acceptBtn.style.cursor = 'pointer';
            acceptBtn.innerText = '接 受';
        }
    }

    function updatePreloadProgress(key) {
        // 每个资源只计一次，避免重复触发（canplaythrough 等事件可能多次触发）
        if (countedAssets.has(key)) return;
        countedAssets.add(key);

        loadedCount++;
        const percent = totalAssets ? Math.min(100, Math.floor((loadedCount / totalAssets) * 100)) : 100;

        if (acceptBtn && !isPreloadDone) {
            acceptBtn.innerText = `正在下载游戏资源 (${percent}%)`;
        }

        if (loadedCount >= totalAssets) {
            finishPreload();
        }
    }

    if (!totalAssets) {
        finishPreload();
    }

    assetsToLoad.forEach((src, i) => {
        const key = i + '|' + src;
        let settled = false;
        const done = () => { if (settled) return; settled = true; updatePreloadProgress(key); };

        if (src.endsWith('.wav') || src.endsWith('.mp3')) {
            const audio = new Audio();
            audio.preload = 'auto';
            // 监听多个事件：远程服务器(如 GitHub Pages)上 canplaythrough 经常不触发，
            // 额外监听 canplay / loadeddata / error，确保资源一定会被计数
            audio.oncanplaythrough = done;
            audio.oncanplay = done;
            audio.onloadeddata = done;
            audio.onerror = done;
            audio.src = src;
            try { audio.load(); } catch (e) {}
        } else {
            const img = new Image();
            img.onload = done;
            img.onerror = done;
            img.src = src;
        }

        // 单个资源最多等待 8 秒。避免个别资源(尤其是音频在远程服务器上不触发
        // canplaythrough)导致进度永远停在 99%、"接受"按钮无法点击、卡住进不去游戏。
        setTimeout(done, 8000);
    });

    // 兜底保险：无论发生什么，最多 12 秒后必定解锁"接受"按钮
    setTimeout(finishPreload, 12000);

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
