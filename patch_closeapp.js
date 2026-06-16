const fs = require('fs');

let content = fs.readFileSync('js/pc/main.js', 'utf8');

const oldStr = `    function closeApp(appId) {
        if(!windowsState[appId]) return;
        windowsState[appId].isOpen = false; windowsState[appId].isMinimized = false;
        const win = document.getElementById(\`win-\${appId}\`);
        if(win) {
            win.style.display = "none"; win.classList.remove('maximized'); win.querySelector('.btn-max').innerText = "▢";
        }
        const taskItem = document.getElementById(\`task-\${appId}\`); if (taskItem) taskItem.remove();
        saveWindowsState();
        if(appId === 'notepad') currentEditingFile = null;
    }`;

const newStr = `    function closeApp(appId) {
        if(!windowsState[appId]) return;
        windowsState[appId].isOpen = false; windowsState[appId].isMinimized = false;
        const win = document.getElementById(\`win-\${appId}\`);
        if(win) {
            win.style.display = "none"; win.classList.remove('maximized'); win.querySelector('.btn-max').innerText = "▢";
        }
        const taskItem = document.getElementById(\`task-\${appId}\`); if (taskItem) taskItem.remove();
        saveWindowsState();
        if(appId === 'notepad') currentEditingFile = null;

        if (appId === 'photoviewer' && window.yueyueSpecialPicOpen) {
            window.yueyueSpecialPicOpen = false;
            if (wechatData && wechatData['yueyue'] && wechatData['yueyue'].messages) {
                const messages = wechatData['yueyue'].messages;
                const targetMsg = messages.find(m => m.content === 'image/全家图2.png' && m.type === 'img');
                if (targetMsg) {
                    targetMsg.type = 'recall';
                    targetMsg.text = '月月 撤回了一条消息';
                    targetMsg.content = undefined;
                    saveWeChat();
                    if (typeof activeWeChatContact !== 'undefined' && activeWeChatContact === 'yueyue') {
                        renderWeChat();
                    }
                }
            }
        }
    }`;

content = content.replace(oldStr, newStr);

fs.writeFileSync('js/pc/main.js', content, 'utf8');
console.log('Replaced successfully');