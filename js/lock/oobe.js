document.addEventListener("DOMContentLoaded", () => {
    const oobeScreen = document.getElementById('win10-oobe-screen');
    const bootScreen = document.getElementById('win10-boot-screen');
    const acceptBtn = document.getElementById('oobe-accept-btn');

    const isZ2 = localStorage.getItem('win10_zhoumu2') === 'true';
    const isZ3 = localStorage.getItem('win10_zhoumu3') === 'true';
    const isFirstBootDone = localStorage.getItem('win10_first_boot_done') === 'true';
    const tier1 = window.LOCK_ASSETS_TIER1 || window.LOCK_ASSETS_TO_LOAD || [];
    const tier2 = window.LOCK_ASSETS_TIER2 || [];

    // 加载单个资源；done 保证只回调一次(成功/失败/8秒超时)
    function loadOne(src, done) {
        let settled = false;
        const finish = () => { if (settled) return; settled = true; done(); };
        if (src.endsWith('.wav') || src.endsWith('.mp3')) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.oncanplaythrough = finish;
            audio.oncanplay = finish;
            audio.onloadeddata = finish;
            audio.onerror = finish;
            audio.src = src;
            try { audio.load(); } catch (e) { finish(); }
        } else {
            const img = new Image();
            img.onload = finish;
            img.onerror = finish;
            img.src = src;
        }
        setTimeout(finish, 8000);
    }

    // 按数组顺序、限制并发地加载 — 保证剧情靠前的资源先到
    function loadQueue(list, concurrency, onEach) {
        let next = 0;
        function pump() {
            if (next >= list.length) return;
            const src = list[next++];
            loadOne(src, () => {
                if (onEach) onEach(src);
                pump();
            });
        }
        for (let i = 0; i < Math.min(concurrency, list.length); i++) pump();
    }

    let tier2Started = false;
    function startTier2() {
        if (tier2Started) return;
        tier2Started = true;
        loadQueue(tier2, 4);
    }

    // 等 Service Worker 接管页面再开始预载,让首次下载的资源直接进 SW 缓存;
    // 2 秒兜底,SW 不可用(或安装慢)时照常加载
    function whenSwReady(cb) {
        let called = false;
        const go = () => { if (called) return; called = true; cb(); };
        if (!('serviceWorker' in navigator)) return go();
        if (navigator.serviceWorker.controller) return go();
        navigator.serviceWorker.addEventListener('controllerchange', go);
        setTimeout(go, 2000);
    }

    // 非首次进入：不设门槛，静默按序预载全部
    if (isZ2 || isZ3 || isFirstBootDone) {
        if (oobeScreen) oobeScreen.style.display = 'none';
        if (bootScreen) bootScreen.style.display = 'none';
        whenSwReady(() => {
            loadQueue(tier1, 6, null);
            startTier2();
        });
        return;
    }
    if (oobeScreen) oobeScreen.style.display = 'flex';

    // 首次进入：只等第一档(~630KB)，下完立即放行；第二档转后台
    const totalAssets = tier1.length;
    let loadedCount = 0;
    let isPreloadDone = false;

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
        startTier2();
    }

    if (!totalAssets) {
        finishPreload();
    } else {
        whenSwReady(() => {
            loadQueue(tier1, 6, () => {
                loadedCount++;
                const percent = Math.min(100, Math.floor((loadedCount / totalAssets) * 100));
                if (acceptBtn && !isPreloadDone) {
                    acceptBtn.innerText = `正在下载游戏资源 (${percent}%)`;
                }
                if (loadedCount >= totalAssets) finishPreload();
            });
        });
    }

    setTimeout(finishPreload, 12000);

    if (acceptBtn) {
        acceptBtn.onclick = () => {
            if (!isPreloadDone) return;

            const startupSound = new Audio('audio/windows10_sound.mp3');
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
