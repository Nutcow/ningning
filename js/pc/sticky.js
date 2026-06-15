
(function () {
    'use strict';

    var IS_Z2_ONLY = localStorage.getItem('win10_zhoumu2') === 'true' &&
                     localStorage.getItem('win10_zhoumu3') !== 'true';
    if (!IS_Z2_ONLY) return;

    var STORAGE_KEY = 'win10_sticky_state_z2';

    var GW = 80, GH = 100, OX = 15, OY = 15;

    var NOTE_DEFS = {
        yueyue:     { text: '月月说搜搜电脑，但是我该搜什么..？',        attr: '月月' },
        diary:      { text: '嗯？COPLJXYIOE？这是什么意思呢？',          attr: '兔子先生の日记' },
        chengjidan: { text: '为什么我爸爸的名字会出现在这里？这人是谁？', attr: '成绩单' },
        biyezhao:   { text: '这是谁的毕业照啊？为什么出现在我的电脑里？？', attr: '毕业照' },
        tijian:     { text: '江明远...是谁？',                          attr: '我爸爸的体检报告' },
        google:     { text: '我搜不到这个人',                            attr: 'google 搜索' },
        merged_pic: { text: '1314？',                             attr: '日记' },
        key_txt:    { text: '钥匙？RABBIT？这是啥？',                    attr: 'key.txt' }
    };

    var SVG = {
        noteLg:
            '<svg viewBox="0 0 48 48" width="44" height="44" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="8" y="6" width="32" height="36" fill="#FBE45C" stroke="#D6B12C" stroke-width="1.6"/>' +
            '<g stroke="#B98E1F" stroke-width="2" stroke-linecap="square" opacity="0.7">' +
            '<line x1="14" y1="15" x2="34" y2="15"/><line x1="14" y1="22" x2="34" y2="22"/>' +
            '<line x1="14" y1="29" x2="34" y2="29"/><line x1="14" y1="36" x2="26" y2="36"/></g></svg>',
        noteSm:
            '<svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="3" y="3" width="18" height="18" fill="#FBE45C" stroke="#D6B12C" stroke-width="1.4"/>' +
            '<g stroke="#B98E1F" stroke-width="1.5" stroke-linecap="square" opacity="0.75">' +
            '<line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="17" y2="13"/><line x1="7" y1="17" x2="13" y2="17"/></g></svg>',
        min:
            '<svg viewBox="0 0 24 24" width="12" height="12"><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="1.6"/></svg>',
        close:
            '<svg viewBox="0 0 24 24" width="12" height="12"><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="1.6"/>' +
            '<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="1.6"/></svg>',
        dots:
            '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">' +
            '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
        cbEmpty:
            '<svg viewBox="0 0 16 16" width="16" height="16"><rect x="1.5" y="1.5" width="13" height="13" fill="#fffdf2" stroke="#AC9C42" stroke-width="1.4"/></svg>',
        cbDone:
            '<svg viewBox="0 0 16 16" width="16" height="16"><rect x="1.5" y="1.5" width="13" height="13" fill="#6E6633" stroke="#6E6633" stroke-width="1.4"/>' +
            '<path d="M4.3 8.2l2.4 2.4 4.8-5" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="square" stroke-linejoin="miter"/></svg>',
        empty:
            '<svg viewBox="0 0 64 64" width="54" height="54"><rect x="15" y="10" width="34" height="44" fill="none" stroke="#C7B650" stroke-width="2"/>' +
            '<g stroke="#C7B650" stroke-width="2" stroke-linecap="square" opacity="0.85">' +
            '<line x1="22" y1="24" x2="42" y2="24"/><line x1="22" y1="32" x2="42" y2="32"/><line x1="22" y1="40" x2="34" y2="40"/></g></svg>'
    };

    function loadState() {
        try {
            var s = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (s && typeof s === 'object') {
                if (!Array.isArray(s.notes)) s.notes = [];
                if (typeof s.seen !== 'number') s.seen = 0;
                return s;
            }
        } catch (e) {}
        return { notes: [], seen: 0, open: false, min: false, winPos: null, iconPos: null };
    }
    var state = loadState();
    function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {} }
    function hasNote(key) { for (var i = 0; i < state.notes.length; i++) if (state.notes[i].key === key) return true; return false; }
    function unreadCount() { return Math.max(0, state.notes.length - (state.seen || 0)); }

    function addNote(key) {
        if (!NOTE_DEFS[key] || hasNote(key)) return;
        state.notes.push({ key: key, text: NOTE_DEFS[key].text, attr: NOTE_DEFS[key].attr, struck: false, ts: Date.now() });
        saveState();
        renderList(key);
        if (winEl && state.open && !state.min) markSeen();
        else updateBadges();
    }

    function fmtTime(ts) {
        var d = new Date(ts || Date.now());
        function p(n) { return (n < 10 ? '0' : '') + n; }
        return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    }

    function injectStyle() {
        if (document.getElementById('sn-style')) return;
        var css =
'.sn-ico{position:absolute;width:76px;height:86px;display:flex;flex-direction:column;align-items:center;' +
  'justify-content:flex-start;padding:5px;cursor:default;border:1px solid transparent;z-index:1;' +
  'font-family:"Segoe UI","Microsoft YaHei","PingFang SC",sans-serif;}' +
'.sn-ico:hover{background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);}' +
'.sn-ico .sn-ico-img{width:48px;height:48px;display:flex;align-items:center;justify-content:center;' +
  'filter:drop-shadow(0 2px 2px rgba(0,0,0,.35));}' +
'.sn-ico .sn-ico-txt{margin-top:5px;font-size:12px;color:#fff;text-align:center;' +
  'text-shadow:0 1px 2px black;}' +
'.sn-badge{position:absolute;min-width:16px;height:16px;padding:0 4px;background:#E81123;' +
  'color:#fff;font-size:11px;font-weight:700;line-height:16px;text-align:center;font-family:"Segoe UI",Arial,sans-serif;}' +
'.sn-ico .sn-badge{top:2px;right:9px;}' +
'#sn-task .sn-badge{top:5px;right:5px;}' +
'#sn-win{position:absolute;width:300px;height:406px;display:none;flex-direction:column;overflow:hidden;' +
  'background:#FCF6A4;border:1px solid #E2D264;border-radius:0;box-shadow:0 6px 22px rgba(0,0,0,.32);' +
  'font-family:"Segoe UI","Microsoft YaHei","PingFang SC",sans-serif;animation:snFade .12s linear;}' +
'#sn-win *{box-sizing:border-box;border-radius:0;}' +
'#sn-titlebar{height:32px;flex:none;display:flex;align-items:center;gap:7px;padding:0 0 0 10px;cursor:move;' +
  'background:#F7EE7C;border-bottom:1px solid #E6D85F;}' +
'#sn-titlebar .sn-tt{flex:1;font-size:12px;color:#73671f;font-weight:600;letter-spacing:.5px;' +
  'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
'.sn-tb-btn{width:38px;height:32px;flex:none;display:flex;align-items:center;justify-content:center;cursor:pointer;' +
  'color:#5d531c;transition:background .1s,color .1s;}' +
'.sn-tb-btn:hover{background:rgba(0,0,0,.09);}' +
'.sn-tb-btn.sn-menu.sn-on{background:rgba(0,0,0,.12);}' +
'.sn-tb-btn.sn-close:hover{background:#E81123;color:#fff;}' +
'#sn-menu-pop{position:absolute;display:none;z-index:6;min-width:128px;background:#FFFDF0;' +
  'border:1px solid #D7C95F;box-shadow:0 5px 16px rgba(0,0,0,.24);}' +
'#sn-menu-pop .sn-mi{padding:9px 14px;font-size:13px;color:#3b3624;cursor:pointer;white-space:nowrap;}' +
'#sn-menu-pop .sn-mi:hover{background:#F2E981;}' +
'#sn-list{flex:1;overflow-y:auto;overflow-x:hidden;background:#FCF6A4;}' +
'#sn-list::-webkit-scrollbar{width:11px;}' +
'#sn-list::-webkit-scrollbar-thumb{background:rgba(120,105,30,.32);border:3px solid #FCF6A4;}' +
'#sn-list::-webkit-scrollbar-track{background:transparent;}' +
'.sn-item{display:flex;gap:10px;align-items:flex-start;padding:11px 13px;cursor:pointer;' +
  'border-bottom:1px solid rgba(70,58,0,.11);}' +
'.sn-item:hover{background:rgba(255,255,255,.30);}' +
'.sn-cb{flex:none;margin-top:1px;line-height:0;}' +
'.sn-it-main{flex:1;min-width:0;}' +
'.sn-tx{font-size:14.5px;color:#322F28;line-height:1.5;word-break:break-word;}' +
'.sn-meta{margin-top:5px;font-size:11px;color:#93853f;}' +
'.sn-meta .sn-src{color:#82742f;}' +
'.sn-item.sn-struck{opacity:.78;}' +
'.sn-item.sn-struck .sn-tx{text-decoration:line-through;text-decoration-color:rgba(120,90,30,.85);color:#7d7549;}' +
'.sn-item.sn-new{animation:snFlash 1.3s ease;}' +
'.sn-item.sn-hide{display:none;}' +
'.sn-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;' +
  'min-height:280px;color:#9c8f4c;}' +
'.sn-empty .sn-em-tx{margin-top:16px;font-size:14px;color:#8c7f3e;letter-spacing:2px;}' +
'#sn-foot{flex:none;height:27px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;' +
  'background:#F7EE7C;border-top:1px solid #E6D85F;font-size:11px;color:#73671f;}' +
'@keyframes snFade{from{opacity:0;}to{opacity:1;}}' +
'@keyframes snFlash{0%{background:rgba(255,235,120,.9);}100%{background:transparent;}}';
        var st = document.createElement('style');
        st.id = 'sn-style';
        st.textContent = css;
        document.head.appendChild(st);
    }

    var iconEl, winEl, listEl, footEl, menuPop, menuBtn, taskEl, desktop;

    function cellOccupied(x, y) {
        var occ = false;
        document.querySelectorAll('.desktop-icon').forEach(function (ic) {
            if (ic.style.display === 'none') return;
            var l = parseInt(ic.style.left, 10) || 0, t = parseInt(ic.style.top, 10) || 0;
            if (Math.abs(l - x) < 10 && Math.abs(t - y) < 10) occ = true;
        });
        return occ;
    }
    function findFreeCell() {
        var dw = (desktop.clientWidth || window.innerWidth), dh = (desktop.clientHeight || window.innerHeight);
        var cols = Math.max(1, Math.floor((dw - OX) / GW)), rows = Math.max(1, Math.floor((dh - OY) / GH));
        var pref = [2, 1, 0, 3, 4, 5, 6, 7];
        for (var c = 0; c < pref.length; c++) {
            if (pref[c] >= cols) continue;
            for (var r = 1; r < rows; r++) {
                var x = OX + pref[c] * GW, y = OY + r * GH;
                if (!cellOccupied(x, y)) return { left: x, top: y };
            }
        }
        return { left: OX + 2 * GW, top: OY + GH };
    }

    function buildIcon() {
        if (document.getElementById('sn-ico')) return;
        iconEl = document.createElement('div');
        iconEl.className = 'sn-ico';
        iconEl.id = 'sn-ico';
        iconEl.title = '便利贴';
        iconEl.innerHTML = '<div class="sn-ico-img">' + SVG.noteLg + '</div>' +
            '<div class="sn-ico-txt">便利贴</div><div class="sn-badge" style="display:none;"></div>';
        desktop.appendChild(iconEl);

        var ip = state.iconPos;
        if (!ip || typeof ip.left !== 'number' || cellOccupied(ip.left, ip.top)) ip = findFreeCell();
        iconEl.style.left = ip.left + 'px'; iconEl.style.top = ip.top + 'px';
        state.iconPos = ip; saveState();

        iconEl.addEventListener('dblclick', openWin);
        makeDrag(iconEl, iconEl, function () {
            var sl = Math.round((iconEl.offsetLeft - OX) / GW) * GW + OX;
            var st2 = Math.round((iconEl.offsetTop - OY) / GH) * GH + OY;
            var maxL = (desktop.clientWidth || window.innerWidth) - GW;
            var maxT = (desktop.clientHeight || window.innerHeight) - GH;
            sl = Math.max(OX, Math.min(sl, maxL)); st2 = Math.max(OY, Math.min(st2, maxT));
            if (cellOccupied(sl, st2)) {
                iconEl.style.left = state.iconPos.left + 'px'; iconEl.style.top = state.iconPos.top + 'px';
            } else {
                iconEl.style.left = sl + 'px'; iconEl.style.top = st2 + 'px';
                state.iconPos = { left: sl, top: st2 }; saveState();
            }
        });
    }

    function buildWindow() {
        if (document.getElementById('sn-win')) return;
        winEl = document.createElement('div');
        winEl.id = 'sn-win';
        winEl.innerHTML =
            '<div id="sn-titlebar">' +
                '<span style="display:flex;align-items:center;margin-right:1px;">' + SVG.noteSm + '</span>' +
                '<span class="sn-tt">便利贴</span>' +
                '<span class="sn-tb-btn sn-menu" title="更多">' + SVG.dots + '</span>' +
                '<span class="sn-tb-btn sn-min" title="最小化">' + SVG.min + '</span>' +
                '<span class="sn-tb-btn sn-close" title="关闭">' + SVG.close + '</span>' +
            '</div>' +
            '<div id="sn-menu-pop">' +
                '<div class="sn-mi" data-act="strikeAll">全部划掉</div>' +
                '<div class="sn-mi" data-act="clearStrike">清除划线</div>' +
            '</div>' +
            '<div id="sn-list"></div>' +
            '<div id="sn-foot"><span>便利贴</span><span class="sn-foot-r"></span></div>';
        desktop.appendChild(winEl);

        listEl = winEl.querySelector('#sn-list');
        footEl = winEl.querySelector('.sn-foot-r');
        menuPop = winEl.querySelector('#sn-menu-pop');
        menuBtn = winEl.querySelector('.sn-menu');

        var wp = state.winPos;
        if (wp && typeof wp.left === 'number') { winEl.style.left = wp.left + 'px'; winEl.style.top = wp.top + 'px'; }
        else {
            var dw = desktop.clientWidth || window.innerWidth, dh = desktop.clientHeight || window.innerHeight;
            winEl.style.left = Math.max(0, dw - 300 - 60) + 'px';
            winEl.style.top = Math.max(0, (dh - 406) / 2 - 6) + 'px';
        }

        menuBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleMenu(); });
        winEl.querySelector('.sn-min').addEventListener('click', function (e) { e.stopPropagation(); minimizeWin(); });
        winEl.querySelector('.sn-close').addEventListener('click', function (e) { e.stopPropagation(); closeWin(); });
        menuPop.querySelectorAll('.sn-mi').forEach(function (mi) {
            mi.addEventListener('click', function (e) { e.stopPropagation(); doMenuAction(mi.getAttribute('data-act')); closeMenu(); });
        });

        winEl.addEventListener('mousedown', focusWin);
        makeDrag(winEl, winEl.querySelector('#sn-titlebar'), function () {
            state.winPos = { left: winEl.offsetLeft, top: winEl.offsetTop }; saveState();
        }, true);

        renderList(null);
    }

    function toggleMenu() {
        if (!menuPop) return;
        if (menuPop.style.display === 'block') { closeMenu(); return; }
        menuPop.style.display = 'block';
        menuPop.style.top = '32px';
        menuPop.style.right = '2px';
        menuPop.style.left = 'auto';
        menuBtn.classList.add('sn-on');
        setTimeout(function () { document.addEventListener('click', outsideMenu, true); }, 0);
    }
    function closeMenu() {
        if (menuPop) menuPop.style.display = 'none';
        if (menuBtn) menuBtn.classList.remove('sn-on');
        document.removeEventListener('click', outsideMenu, true);
    }
    function outsideMenu(e) {
        if (menuPop && !menuPop.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
    }
    function doMenuAction(act) {
        if (act === 'strikeAll') state.notes.forEach(function (n) { n.struck = true; });
        else if (act === 'clearStrike') state.notes.forEach(function (n) { n.struck = false; });
        saveState();
        renderList(null);
    }

    function buildTaskItem() {
        if (document.getElementById('sn-task')) return;
        var bar = document.getElementById('taskbar-apps');
        if (!bar) return;
        taskEl = document.createElement('div');
        taskEl.className = 'task-item open active';
        taskEl.id = 'sn-task';
        taskEl.title = '便利贴';
        taskEl.style.position = 'relative';
        taskEl.innerHTML = SVG.noteSm + '<div class="sn-badge" style="display:none;"></div>';
        taskEl.addEventListener('click', function () { if (state.min) restoreWin(); else minimizeWin(); });
        bar.appendChild(taskEl);
    }
    function removeTaskItem() { if (taskEl && taskEl.parentNode) taskEl.parentNode.removeChild(taskEl); taskEl = null; }

    function topZ() {
        var max = 10;
        document.querySelectorAll('.window').forEach(function (w) {
            var z = parseInt(window.getComputedStyle(w).zIndex, 10);
            if (!isNaN(z) && z > max) max = z;
        });
        return max;
    }
    function focusWin() {
        if (!winEl) return;
        winEl.style.setProperty('z-index', topZ() + 1, 'important');
        document.querySelectorAll('.task-item').forEach(function (t) { t.classList.remove('active'); });
        if (taskEl) taskEl.classList.add('active');
    }

    function openWin() {
        if (!winEl) buildWindow();
        state.open = true; state.min = false;
        winEl.style.display = 'flex';
        buildTaskItem(); focusWin(); markSeen(); saveState();
    }
    function restoreWin() {
        state.min = false;
        if (!winEl) buildWindow();
        winEl.style.display = 'flex';
        if (taskEl) taskEl.classList.add('active');
        focusWin(); markSeen(); saveState();
    }
    function minimizeWin() {
        state.min = true;
        closeMenu();
        if (winEl) winEl.style.display = 'none';
        if (taskEl) taskEl.classList.remove('active');
        saveState();
    }
    function closeWin() {
        state.open = false; state.min = false;
        closeMenu();
        if (winEl) winEl.style.display = 'none';
        removeTaskItem(); saveState();
    }

    function renderList(newKey) {
        if (!listEl) return;
        listEl.innerHTML = '';

        if (state.notes.length === 0) {
            var empty = document.createElement('div');
            empty.className = 'sn-empty';
            empty.innerHTML = SVG.empty + '<div class="sn-em-tx">东西还是记下来吧~别忘了</div>';
            listEl.appendChild(empty);
        } else {
            state.notes.forEach(function (note) {
                var item = document.createElement('div');
                item.className = 'sn-item' + (note.struck ? ' sn-struck' : '');
                if (note.key === newKey) item.className += ' sn-new';
                item.setAttribute('data-key', note.key);

                var cb = document.createElement('span');
                cb.className = 'sn-cb';
                cb.innerHTML = note.struck ? SVG.cbDone : SVG.cbEmpty;

                var main = document.createElement('div');
                main.className = 'sn-it-main';
                var tx = document.createElement('div'); tx.className = 'sn-tx'; tx.textContent = note.text;
                var meta = document.createElement('div'); meta.className = 'sn-meta';
                meta.innerHTML = '<span class="sn-src"></span> <span class="sn-time"></span>';
                meta.querySelector('.sn-src').textContent = '— ' + note.attr;
                meta.querySelector('.sn-time').textContent = fmtTime(note.ts);
                main.appendChild(tx); main.appendChild(meta);

                item.appendChild(cb); item.appendChild(main);

                item.addEventListener('click', function () {
                    note.struck = !note.struck;
                    item.classList.toggle('sn-struck', note.struck);
                    cb.innerHTML = note.struck ? SVG.cbDone : SVG.cbEmpty;
                    saveState(); updateFoot();
                });
                listEl.appendChild(item);
            });
        }
        updateFoot();
        updateBadges();
    }
    function updateFoot() {
        if (!footEl) return;
        var done = state.notes.filter(function (n) { return n.struck; }).length;
        footEl.textContent = state.notes.length ? ('共 ' + state.notes.length + ' 条 · 已划 ' + done) : '';
    }

    function setBadge(el, n) {
        if (!el) return;
        var b = el.querySelector('.sn-badge'); if (!b) return;
        if (n > 0) { b.textContent = n > 99 ? '99' : n; b.style.display = 'block'; } else b.style.display = 'none';
    }
    function updateBadges() { var n = unreadCount(); setBadge(iconEl, n); setBadge(taskEl, n); }
    function markSeen() { state.seen = state.notes.length; saveState(); updateBadges(); }

    function makeDrag(el, handle, onEnd, guardBtns) {
        var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0, moved = false;
        function down(e) {
            if (e.button !== undefined && e.button !== 0) return;
            if (guardBtns && e.target && e.target.closest && e.target.closest('.sn-tb-btn')) return;
            var p = e.touches ? e.touches[0] : e;
            dragging = true; moved = false;
            sx = p.clientX; sy = p.clientY; ox = el.offsetLeft; oy = el.offsetTop;
            if (el === winEl) focusWin();
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
            document.addEventListener('touchmove', move, { passive: false });
            document.addEventListener('touchend', up);
            if (el === winEl) e.preventDefault();
        }
        function move(e) {
            if (!dragging) return;
            var p = e.touches ? e.touches[0] : e;
            var dx = p.clientX - sx, dy = p.clientY - sy;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
            var host = el.parentElement || document.body;
            var maxL = (host.clientWidth || window.innerWidth) - el.offsetWidth;
            var maxT = (host.clientHeight || window.innerHeight) - 34;
            el.style.left = Math.max(0, Math.min(ox + dx, Math.max(0, maxL))) + 'px';
            el.style.top = Math.max(0, Math.min(oy + dy, Math.max(0, maxT))) + 'px';
            if (e.cancelable) e.preventDefault();
        }
        function up() {
            if (!dragging) return;
            dragging = false;
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
            document.removeEventListener('touchmove', move);
            document.removeEventListener('touchend', up);
            if (moved && onEnd) onEnd();
        }
        handle.addEventListener('mousedown', down);
        handle.addEventListener('touchstart', down, { passive: false });
    }

    function visible(el) {
        if (!el || el.offsetParent === null) return false;
        var win = el;
        while (win && !win.classList.contains('window') && win !== document.body) {
            win = win.parentElement;
        }
        if (win && win.classList.contains('window')) {
            var allWins = document.querySelectorAll('.window');
            var highestZ = -1;
            for (var i = 0; i < allWins.length; i++) {
                if (window.getComputedStyle(allWins[i]).display !== 'none') {
                    var z = parseInt(window.getComputedStyle(allWins[i]).zIndex) || 0;
                    if (z > highestZ) highestZ = z;
                }
            }
            var thisZ = parseInt(window.getComputedStyle(win).zIndex) || 0;
            if (thisZ < highestZ) return false;
        }
        return true;
    }
    function checkTriggers() {
        var ct = document.getElementById('wechat-chat-title');
        if (visible(ct) && (ct.textContent || '').trim() === '月月') addNote('yueyue');
        if (visible(document.getElementById('bilibili-view-web1'))) addNote('diary');
        var pv = document.getElementById('win-photoviewer');
        var pt = document.getElementById('title-photoviewer');
        if (visible(pv) && pt) {
            var t = pt.textContent || '';
            if (t.indexOf('成绩单') !== -1) addNote('chengjidan');
            if (t.indexOf('毕业照') !== -1) addNote('biyezhao');
            if (t.indexOf('日记') !== -1) addNote('merged_pic');
        }
        var np = document.getElementById('win-notepad');
        var nt = document.getElementById('title-notepad');
        if (visible(np) && nt) {
            if ((nt.textContent || '').indexOf('key.txt') !== -1) addNote('key_txt');
        }
        if (visible(document.getElementById('win-hospitalpdf'))) addNote('tijian');
        if (visible(document.getElementById('google-jiangmingyuan-view'))) addNote('google');
    }

    function start() {
        desktop = document.getElementById('desktop') || document.body;
        injectStyle();
        buildIcon();
        buildWindow();
        winEl.style.display = 'none';

        if (state.open) {
            buildTaskItem();
            if (state.min) { winEl.style.display = 'none'; if (taskEl) taskEl.classList.remove('active'); }
            else { winEl.style.display = 'flex'; focusWin(); markSeen(); }
        }
        updateBadges();

        setInterval(checkTriggers, 600);
        document.addEventListener('click', function () {
            setTimeout(checkTriggers, 130);
            setTimeout(checkTriggers, 480);
        }, true);
        checkTriggers();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
