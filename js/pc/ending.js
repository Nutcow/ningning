function startStaticEffect() {
    if (typeof window.stopDesktopVideoAudio === 'function') window.stopDesktopVideoAudio();
    localStorage.setItem('win10_ending_reached', 'true');
    localStorage.setItem('win10_ending_type', '1');

    const canvas = document.createElement('canvas');
    canvas.id = 'static-canvas';
    canvas.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 999999; pointer-events: all; opacity: 0;
        transition: opacity 1.5s ease-in;
    `;
    document.body.appendChild(canvas);

    const blackBg = document.createElement('div');
    blackBg.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000; z-index: 999998; pointer-events: all; opacity: 0;
        transition: opacity 1.5s ease-in;
    `;
    document.body.appendChild(blackBg);

    requestAnimationFrame(() => {
        canvas.style.opacity = '1';
        blackBg.style.opacity = '1';
    });

    const ctx = canvas.getContext('2d');
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawStatic(intensity) {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const val = Math.random() < intensity ? 255 : 0;
            data[i] = val; data[i + 1] = val; data[i + 2] = val; data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    const buildDuration = 2500; 
    const fadeDuration = 2000;  
    const startTime = Date.now();
    let animFrame;

    function animateStatic() {
        const elapsed = Date.now() - startTime;
        if (elapsed < buildDuration) {
            const progress = elapsed / buildDuration;
            drawStatic(0.15 + progress * 0.85);
            animFrame = requestAnimationFrame(animateStatic);
        } else if (elapsed < buildDuration + fadeDuration) {
            if (canvas.style.transition !== 'opacity 2s ease-in-out') {
                canvas.style.transition = 'opacity 2s ease-in-out';
                canvas.style.opacity = '0'; 
            }
            drawStatic(1.0); 
            animFrame = requestAnimationFrame(animateStatic);
        } else {
            cancelAnimationFrame(animFrame);
            canvas.remove();
            blackBg.remove();
            document.body.style.background = '#000';
            showEndingScreen(1); 
        }
    }
    animateStatic();
}

function startEnding2Effect() {
    if (typeof window.stopDesktopVideoAudio === 'function') window.stopDesktopVideoAudio();
    localStorage.setItem('win10_ending_reached', 'true');
    localStorage.setItem('win10_ending_type', '2');

    const blackBg = document.createElement('div');
    blackBg.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000; z-index: 999999; opacity: 0;
        transition: opacity 3s ease-in-out; pointer-events: all;
    `;
    document.body.appendChild(blackBg);

    requestAnimationFrame(() => {
        blackBg.style.opacity = '1';
    });

    setTimeout(() => {
        document.body.style.background = '#000';
        blackBg.remove();
        showEndingScreen(2);
    }, 3500);
}

function startEnding3Effect() {
    if (typeof window.stopDesktopVideoAudio === 'function') window.stopDesktopVideoAudio();
    localStorage.setItem('win10_ending_reached', 'true');
    localStorage.setItem('win10_ending_type', '3');

    const wake = document.createElement('div');
    wake.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #fff; z-index: 999999; opacity: 0; pointer-events: all;
        transition: opacity 0.25s ease-out;
    `;
    document.body.appendChild(wake);

    const blackBg = document.createElement('div');
    blackBg.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000; z-index: 999998; opacity: 0; pointer-events: all;
        transition: opacity 2.5s ease-in-out;
    `;
    document.body.appendChild(blackBg);

    requestAnimationFrame(() => { blackBg.style.opacity = '1'; });

    setTimeout(() => { wake.style.opacity = '1'; }, 700);
    setTimeout(() => { wake.style.transition = 'opacity 2.6s ease-in-out'; wake.style.opacity = '0'; }, 1050);

    setTimeout(() => {
        document.body.style.background = '#000';
        wake.remove();
        blackBg.remove();
        showEndingScreen(3);
    }, 3800);
}

function showEndingScreen(type = 1) {
    if (document.getElementById('ending-screen')) return;

    document.body.style.background = '#000';
    document.body.style.overflow = 'hidden';

    const endingDiv = document.createElement('div');
    endingDiv.id = 'ending-screen';
    endingDiv.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000; z-index: 999999; display: flex; flex-direction: column;
        justify-content: center; align-items: center; pointer-events: all; overflow: hidden;
    `;

    const titleEl = document.createElement('div');
    titleEl.id = 'ending-title';
    titleEl.style.cssText = `
        position: absolute; top: 80px; font-family: 'SimSun', '宋体', serif;
        font-size: 24px; letter-spacing: 12px; color: #e0e0e0;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.2); opacity: 0;
        transition: opacity 3s ease-in-out; user-select: none; white-space: nowrap;
    `;
    titleEl.textContent = type == 3 ? 'True Ending ：我没有忘'
        : (type == 1 ? 'Bad Ending ：你和我' : 'Open Ending ：无事发生');

    const scrollWrap = document.createElement('div');
    scrollWrap.style.cssText = `position: absolute; bottom: 0; width: 100%; display: flex; flex-direction: column; align-items: center;`;

    const msgEl = document.createElement('div');
    msgEl.id = 'ending-message';
    msgEl.style.cssText = `
        max-width: 480px; width: 86%; font-family: 'SimSun', '宋体', serif;
        font-size: 15px; color: #b0b0b0; line-height: 2.6; letter-spacing: 3px;
        text-align: left; white-space: pre-wrap; text-shadow: 0 0 8px rgba(255, 255, 255, 0.1);
        opacity: 0; transition: opacity 2s ease-in-out; transform: translateY(60px);
    `;
    scrollWrap.appendChild(msgEl);

    const restartWrap = document.createElement('div');
    restartWrap.id = 'ending-restart-wrap';
    restartWrap.style.cssText = `
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        opacity: 0; transition: opacity 2.5s ease-in-out; pointer-events: none;
        display: flex; flex-direction: column; align-items: center; gap: 40px; 
    `;

    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = `position: relative; width: 400px; height: 300px;`;

    const customImg1 = document.createElement('img');
    customImg1.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity 2s ease-in-out;`;

    const customImg2 = document.createElement('img');
    customImg2.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity 2s ease-in-out;`;

    if (type == 1) {
        customImg1.src = 'image/生日.webp';
        customImg2.src = 'image/生日2.webp';
    } else if (type == 2) {
        customImg1.src = 'image/小时候.webp';
        customImg2.style.display = 'none';
    } else if (type == 3) {
        customImg1.src = 'image/荡秋千.webp';
        customImg2.style.display = 'none';
    }

    imgContainer.appendChild(customImg1);
    imgContainer.appendChild(customImg2);

    const btnHtml = `
        <button id="ending-restart-btn" style="
            background: transparent; border: 1px solid #444; color: #888;
            font-size: 14px; letter-spacing: 5px; padding: 14px 40px;
            cursor: pointer; font-family: 'SimSun', '宋体', serif;
            transition: all 0.5s ease; outline: none;
        ">重新开始</button>
    `;
    
    restartWrap.innerHTML = btnHtml;
    restartWrap.prepend(imgContainer);

    endingDiv.appendChild(titleEl);
    endingDiv.appendChild(scrollWrap);
    endingDiv.appendChild(restartWrap);
    document.body.appendChild(endingDiv);

    setTimeout(() => { titleEl.style.opacity = '1'; }, 500);

    setTimeout(() => {
        msgEl.style.opacity = '1';
        const fullText = buildEndingMessage(type);

        typewriterEffect(msgEl, fullText, 55, () => {
            
            setTimeout(() => {
                scrollWrap.style.transition = 'opacity 2.5s ease-in-out';
                scrollWrap.style.opacity = '0';
                
                setTimeout(() => {
                    scrollWrap.style.display = 'none';
                    restartWrap.style.opacity = '1';
                    restartWrap.style.pointerEvents = 'all';
                    
                    if (type == 1) {
                        customImg1.style.opacity = '1';
                        setTimeout(() => {
                            customImg2.style.opacity = '1';
                            customImg1.style.opacity = '0';
                        }, 4500);
                    } else if (type == 2) {
                        customImg1.style.opacity = '1';
                    } else if (type == 3) {
                        customImg1.style.opacity = '1';
                    }

                    const btn = document.getElementById('ending-restart-btn');
                    if (btn) {
                        btn.onmouseenter = () => {
                            btn.style.color = '#fff'; btn.style.borderColor = '#aaa';
                            btn.style.boxShadow = '0 0 15px rgba(255,255,255,0.1)';
                        };
                        btn.onmouseleave = () => {
                            btn.style.color = '#888'; btn.style.borderColor = '#444';
                            btn.style.boxShadow = 'none';
                        };
                        btn.onclick = () => {
                            document.body.style.opacity = '0';
                            document.body.style.transition = 'opacity 1s ease';
                            setTimeout(() => {
                                localStorage.clear();
                                window.location.replace('index.html');
                            }, 1000);
                        };
                    }
                }, 2500);
            }, 6000); 
        });
        scrollMsgUp(msgEl, scrollWrap);
    }, 3500);
}

function scrollMsgUp(msgEl, scrollWrap) {
    scrollWrap.style.transition = 'transform 22s cubic-bezier(0.25, 0.1, 0.25, 1)';
    scrollWrap.style.transform = 'translateY(-180px)';
}

function buildEndingMessage(type) {
    if (type == 3) {
        return `
声音又出现了。
学着哥哥的腔调，
一遍又一遍，喊我的名字。
可这一次，我并没有开门。
`;
    }
    if (type == 2) {
        return `
哥哥，今天吃什么呀？我说。
“昨天的面条还有一点，我再给你煎个蛋吧。”
“好，谢谢哥哥。”
窗外的风吹进来，不冷，也不暖。
我吃完了。
“我下午可以去找月月玩吗？”我问道。
“可以。”
就这样。
又过了一天。`;
    }

    return `
宁宁睡着了。
她最近总是睡得很晚。
夜晚看着窗外的光，
一点一点暗下去。
她问我其他人去哪了。
睡着了，我答复。
她问我，为什么家里越来越安静。
我说，因为你长大了。
长大了就会这样的。
她信了。
她一直都很相信我。
就像相信妈妈会回来。
相信爸爸会回来。
相信哥哥只是出了趟远门。
相信明天醒来。
一切都会变回原来的样子。
可我知道。
明天不会。
后天不会。
以后也不会。
因为这个世界。
已经只剩下我们两个了`;
}

function typewriterEffect(el, text, speed, onComplete) {
    let i = 0;
    el.textContent = '';
    function type() {
        if (i < text.length) {
            el.textContent += text[i];
            i++;
            const char = text[i - 1];
            let delay = speed;
            if (char === '\n') delay = speed * 6;
            else if (char === '。' || char === '，') delay = speed * 4;
            else if (char === '—') delay = speed * 2;

            setTimeout(type, delay);
        } else {
            if (typeof onComplete === 'function') onComplete();
        }
    }
    type();
}
