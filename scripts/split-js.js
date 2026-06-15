const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pc = fs.readFileSync(path.join(root, 'pc.js'), 'utf8').split(/\r?\n/);

const slices = {
  'js/pc/main.js': [[1, 1107], [2030, 3876]],
  'js/pc/google.js': [[1108, 2028]],
  'js/pc/bilibili.js': [[3878, 3986]],
  'js/pc/pdf.js': [[3988, 4095]],
  'js/pc/ending-check.js': [[4098, 4113]],
  'js/pc/ending.js': [[4115, 4408]],
  'js/pc/xhs.js': [[4410, 5109]],
  'js/pc/video.js': [[5111, 5238]],
  'js/pc/news.js': [[5240, 5578]],
};

for (const [file, ranges] of Object.entries(slices)) {
  const fullPath = path.join(root, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  const content = ranges.map(([start, end]) => pc.slice(start - 1, end).join('\n')).join('\n\n');
  fs.writeFileSync(fullPath, content + '\n', 'utf8');
  console.log('Wrote', file);
}

const lock = fs.readFileSync(path.join(root, 'lock.js'), 'utf8').split(/\r?\n/);
fs.mkdirSync(path.join(root, 'js/lock'), { recursive: true });
fs.writeFileSync(path.join(root, 'js/lock/oobe.js'), lock.slice(0, 157).join('\n') + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'js/lock/login.js'), lock.slice(158).join('\n') + '\n', 'utf8');
console.log('Wrote js/lock/oobe.js and login.js');

const bootCheck = `var isSkip = localStorage.getItem('win10_zhoumu2') === 'true' || 
                 localStorage.getItem('win10_zhoumu3') === 'true' || 
                 localStorage.getItem('win10_first_boot_done') === 'true';
                 
if (!isSkip) {
    document.write('<style id="first-boot-style">#lockscreen, .login-screen { display: none !important; } #win10-oobe-screen { display: flex !important; }</style>');
}
`;

const theme = `const userNameEl = document.getElementById('user-name');

if (localStorage.getItem('win10_zhoumu3') === 'true') {
    document.body.classList.add('zhoumu3');
    if (userNameEl) {
        userNameEl.innerText = '若宁';
    }
} else if (localStorage.getItem('win10_zhoumu2') === 'true') {
    document.body.classList.add('zhoumu3');
    document.body.classList.add('zhoumu2');
}
`;

// Fix theme.js - I made a mistake copying zhoumu2 logic
const themeFixed = `const userNameEl = document.getElementById('user-name');

if (localStorage.getItem('win10_zhoumu3') === 'true') {
    document.body.classList.add('zhoumu3');
    if (userNameEl) {
        userNameEl.innerText = '若宁';
    }
} else if (localStorage.getItem('win10_zhoumu2') === 'true') {
    document.body.classList.add('zhoumu2');
}
`;

fs.writeFileSync(path.join(root, 'js/lock/boot-check.js'), bootCheck, 'utf8');
fs.writeFileSync(path.join(root, 'js/lock/theme.js'), themeFixed, 'utf8');

const bluescreen = `history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

let progress = parseInt(localStorage.getItem('win10_bsod_progress')) || 0;
const percentageEl = document.getElementById('percentage');
percentageEl.innerText = progress;

const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5; 
    if (progress >= 100) progress = 100;
    
    percentageEl.innerText = progress;
    localStorage.setItem('win10_bsod_progress', progress);

    if (progress >= 100) {
        clearInterval(interval);
        
        localStorage.setItem('win10_zhoumu2', 'true');
        localStorage.removeItem('win10_bsod_progress');
        
        localStorage.removeItem('win10_windows');
        
        setTimeout(() => {
            window.location.replace('index.html');
        }, 1000);
    }
}, 450);
`;

fs.writeFileSync(path.join(root, 'js/bluescreen.js'), bluescreen, 'utf8');
console.log('All files split successfully');
