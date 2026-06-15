(function() {

    const KEY_BILI_STATE = 'win10_bili_view_state';

    const _isZ2 = localStorage.getItem('win10_zhoumu2') === 'true';
    const _isZ3 = localStorage.getItem('win10_zhoumu3') === 'true';

    function getBiliViews() {
        return {
            normal: document.getElementById('bilibili-view-normal'),
            v404:   document.getElementById('bilibili-view-404'),
            web1:   document.getElementById('bilibili-view-web1'),
            title:  document.getElementById('bilibili-title-text'),
        };
    }

    function showBiliView(state) {
        const v = getBiliViews();
        if (!v.normal || !v.v404 || !v.web1) return;

        v.normal.style.display = 'none';
        v.v404.style.display   = 'none';
        v.web1.style.display   = 'none';

        if (state === '404') {
            v.v404.style.display = 'flex';
            if (v.title) v.title.innerHTML = '404 Not Found';
        } else if (state === 'web1') {
            v.web1.style.display = 'block';
            if (v.title) v.title.innerHTML = '兔子先生の日记 - 个人主页';
            if (localStorage.getItem('win10_creepy_audio_played') !== 'true') {
                localStorage.setItem('win10_creepy_audio_played', 'true');
                const scareAudio = new Audio('audio/windows-10-foreground-earrape.mp3');
                scareAudio.volume = 0.3; 
                scareAudio.play().catch(e => console.log('音效播放被浏览器拦截:', e));
            }
        } else {
            v.normal.style.display = 'block';
            if (v.title) {
                v.title.innerHTML = '<img src="image/zilizili.png" alt="icon" style="width:14px;height:14px;margin-right:5px;vertical-align:text-bottom;">个人空间 - zilizili';
            }
        }
    }

    function restoreBiliState() {
        const savedState = localStorage.getItem(KEY_BILI_STATE);

        if (_isZ2 || _isZ3) {
            if (savedState === 'web1') {
                showBiliView('web1');
            } else {
                if (savedState !== '404') {
                    localStorage.setItem(KEY_BILI_STATE, '404');
                }
                showBiliView('404');
            }
        } else {
            if (savedState === '404' || savedState === 'web1') {
                localStorage.removeItem(KEY_BILI_STATE);
            }
            showBiliView('normal');
        }
    }

    const _originalOpenApp = window.openApp;
    window.openApp = function(appId) {
        _originalOpenApp(appId);

        if (appId === 'bilibili') {
            const savedState = localStorage.getItem(KEY_BILI_STATE);
            if (_isZ2 || _isZ3) {
                if (savedState === 'web1') {
                    showBiliView('web1');
                } else {
                    localStorage.setItem(KEY_BILI_STATE, '404');
                    showBiliView('404');
                }
            } else {
                showBiliView('normal');
            }
        }
    };

    function initBiliEvents() {
        const v = getBiliViews();
        if (!v.normal && !v.v404 && !v.web1) {
            setTimeout(initBiliEvents, 200);
            return;
        }

        const linkBtn = document.getElementById('btn-open-web1');
        if (linkBtn) {
            linkBtn.onclick = function(e) {
                e.preventDefault();
                localStorage.setItem(KEY_BILI_STATE, 'web1');
                showBiliView('web1');
            };
        }

        restoreBiliState();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBiliEvents);
    } else {
        initBiliEvents();
    }

})();
