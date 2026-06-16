const fs = require('fs');
let pcHtml = fs.readFileSync('pc.html', 'utf8');

const iconVideoplayerStr = `\n        <div class="desktop-icon" id="icon-videoplayer" data-app="videoplayer" style="display: none; top: 115px; left: 175px;">\n            <div class="icon-img"><img src="image/video.png" alt="电影和电视" onerror="this.src='image/app.png'"></div><div class="icon-text">电影和电视</div>\n        </div>\n\n`; 

pcHtml = pcHtml.replace(
    '<div class="window" id="win-xhs"', 
    iconVideoplayerStr + '<div class="window" id="win-xhs"'
);
fs.writeFileSync('pc.html', pcHtml);
console.log('icon replaced:', pcHtml.includes('icon-videoplayer'));
