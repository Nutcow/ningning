const fs = require('fs');
let pcHtml = fs.readFileSync('pc.html', 'utf8');
const iconGoogleStr = `<div class="desktop-icon" id="icon-google" data-app="google" style="display: none; top: 315px; left: 95px;">\n            <div class="icon-img">\n                <img src="image/google.png" alt="Google" style="width: 100%; height: 100%; object-fit: contain;">\n            </div>\n            <div class="icon-text">Chrome</div>\n        </div>`;
const iconVideoplayerStr = `\n\n        <div class="desktop-icon" id="icon-videoplayer" data-app="videoplayer" style="display: none; top: 115px; left: 175px;">\n            <div class="icon-img"><img src="image/video.png" alt="电影和电视" onerror="this.src='image/app.png'"></div><div class="icon-text">电影和电视</div>\n        </div>`;
pcHtml = pcHtml.replace(iconGoogleStr, iconGoogleStr + iconVideoplayerStr);
console.log('icon replaced', pcHtml.includes('icon-videoplayer'));

const winGoogleStr = `<div class="window" id="win-google" data-app="google" style="width:900px; height:620px; position:absolute; isolation:isolate;">`;
const winVideoplayerStr = `\n        <div class="window" id="win-videoplayer" data-app="videoplayer" style="width:840px; height:660px; background:#000; border-color:#222; position:relative;">\n            <div class="title-bar" style="background:#111; color:#fff; border-bottom:1px solid #333;">\n                <div class="title-text" id="title-videoplayer" style="display:flex; align-items:center; gap:6px;">\n                    <svg width="14" height="14" viewBox="0 0 16 16" fill="white" style="margin-right:8px;"><path d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM4 4h2v2H4V4zm0 3h2v2H4V7zm0 3h2v2H4V10zM12 12h-2v-2h2v2zm0-3h-2V7h2v2zm0-3h-2V4h2v2z"/></svg> 电影和电视\n                </div>\n                <div class="window-controls">\n                    <button class="btn-min" data-app="videoplayer" style="color:#fff;">—</button>\n                    <button class="btn-max" data-app="videoplayer" style="color:#fff;">▖</button>\n                    <button class="btn-close" data-app="videoplayer" style="color:#fff;">✕</button>\n                </div>\n            </div>\n            <div class="window-content" style="position:relative; width:100%; height:calc(100% - 30px); background:#000; overflow:hidden;">\n                <iframe src="tuzi.html" style="width:100%; height:100%; border:none;"></iframe>\n            </div>\n        </div>\n`;
pcHtml = pcHtml.replace(winGoogleStr, winVideoplayerStr + winGoogleStr);
console.log('window replaced', pcHtml.includes('win-videoplayer'));
fs.writeFileSync('pc.html', pcHtml);
console.log('pc.html updated');
let mainJs = fs.readFileSync('js/pc/main.js', 'utf8');
mainJs = mainJs.replace(
    "'news': { icon: 'image/新闻.png', name: '每日新闳' },",
    "'news': { icon: 'image/新闻.png', name: '每日新闻' },\n        'videoplayer': { icon: 'image/video.png', name: '电影和电视' },"
);
mainJs = mainJs.replace(
    "if (isZhoumu3) {\r\n            for (let i = 1; i <= 9; i++) {",
    "if (isZhoumu3) {\r\n            const vpIcon = document.getElementById('icon-videoplayer');\r\n            if (vpIcon) vpIcon.style.display = 'flex';\r\n            for (let i = 1; i <= 9; i++) {"
);
mainJs = mainJs.replace(
    "if (isZhoumu3) {\n            for (let i = 1; i <= 9; i++) {",
    "if (isZhoumu3) {\n            const vpIcon = document.getElementById('icon-videoplayer');\n            if (vpIcon) vpIcon.style.display = 'flex';\n            for (let i = 1; i <= 9; i++) {"
);
fs.writeFileSync('js/pc/main.js', mainJs);
console.log('main.js updated');