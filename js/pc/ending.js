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

function showEndingScreen(type = 1, skipIntro = false) {
    if (document.getElementById('ending-screen')) return;

    document.body.style.background = '#000';
    document.body.style.overflow = 'hidden';

    if (!document.getElementById('ending-anim-style')) {
        const st = document.createElement('style');
        st.id = 'ending-anim-style';
        st.textContent = `
            #ending-message{scrollbar-width:thin;scrollbar-color:#333 transparent;}
            #ending-message::-webkit-scrollbar{width:4px;}
            #ending-message::-webkit-scrollbar-thumb{background:#333;border-radius:2px;}
            #ending-message::-webkit-scrollbar-track{background:transparent;}
        `;
        document.head.appendChild(st);
    }

    const endingDiv = document.createElement('div');
    endingDiv.id = 'ending-screen';
    endingDiv.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000; z-index: 999999; pointer-events: all; overflow: hidden;
    `;

    const titleEl = document.createElement('div');
    titleEl.id = 'ending-title';
    titleEl.style.cssText = `
        position: absolute; top: clamp(20px, 6vh, 70px); left: 50%; transform: translateX(-50%);
        font-family: 'SimSun', '宋体', serif; font-size: clamp(16px, 3vh, 24px);
        letter-spacing: clamp(4px, 1.2vw, 12px); color: #e0e0e0;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.2); opacity: 0;
        transition: opacity 3s ease-in-out; user-select: none; white-space: nowrap; max-width: 96vw;
    `;
    titleEl.textContent = type == 3 ? 'True Ending ：我没有忘'
        : (type == 1 ? 'Bad Ending ：你和我' : 'Open Ending ：无事发生');

    // 全文一次性整体渐显在屏幕中央;排版由 fitEndingLayout 按窗口自动决定
    // 字号与分栏(宽屏长文用双栏,保证字号舒适且全文完整可见)
    const msgWrap = document.createElement('div');
    msgWrap.id = 'ending-msg-wrap';
    msgWrap.style.cssText = `
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        display: flex; justify-content: center; align-items: center;
        padding: clamp(64px, 13vh, 120px) 20px clamp(44px, 10vh, 80px);
        box-sizing: border-box; overflow: hidden;
    `;

    const msgEl = document.createElement('div');
    msgEl.id = 'ending-message';
    msgEl.style.cssText = `
        max-width: min(620px, 92vw); max-height: 100%; overflow-y: auto;
        flex-shrink: 0; font-family: 'SimSun', '宋体', serif; font-size: 16px;
        color: #b0b0b0; line-height: 2.1; letter-spacing: 3px; text-align: left;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.1); opacity: 0;
    `;
    msgWrap.appendChild(msgEl);

    const hintEl = document.createElement('div');
    hintEl.id = 'ending-hint';
    hintEl.style.cssText = `
        position: absolute; bottom: clamp(12px, 3.5vh, 30px); left: 0; width: 100%;
        text-align: center; font-family: 'SimSun', '宋体', serif; font-size: 12px;
        color: #5f5f5f; letter-spacing: 6px; opacity: 0;
        transition: opacity 1.5s ease; user-select: none; pointer-events: none;
    `;
    hintEl.textContent = '单击继续';

    const restartWrap = document.createElement('div');
    restartWrap.id = 'ending-restart-wrap';
    restartWrap.style.cssText = `
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        opacity: 0; transition: opacity 2.5s ease-in-out; pointer-events: none;
        display: flex; flex-direction: column; align-items: center; gap: clamp(20px, 5vh, 40px);
    `;

    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = `position: relative; width: min(400px, 82vw, 53vh); aspect-ratio: 4 / 3;`;

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
    endingDiv.appendChild(msgWrap);
    endingDiv.appendChild(hintEl);
    endingDiv.appendChild(restartWrap);
    document.body.appendChild(endingDiv);

    function revealRestart() {
        msgWrap.style.display = 'none';
        hintEl.style.display = 'none';
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
    }

    // 重新进入已通关的存档时(比如玩到 true ending 后直接关掉页面,再点链接进来),
    // 不再重播整段字幕,直接跳到结局最终画面并立刻给出"重新开始"按钮,避免卡住。
    if (skipIntro) {
        titleEl.style.transition = 'none';
        titleEl.style.opacity = '1';
        revealRestart();
        return;
    }

    setTimeout(() => { titleEl.style.opacity = '1'; }, 500);

    setTimeout(() => {
        const fullText = buildEndingMessage(type);
        renderEndingLines(msgEl, fullText);
        const refit = () => {
            fitEndingLayout(msgEl, msgWrap, fullText);
            // 已显示"单击继续"提示后窗口又变化的话,同步刷新提示文案
            if (hintEl.style.opacity === '0.55') {
                hintEl.textContent = msgEl.scrollHeight > msgEl.clientHeight + 4
                    ? '滚动回看 · 单击继续' : '单击继续';
            }
        };
        refit();
        window.addEventListener('resize', refit);
        // 有些环境窗口/缩放变化不派发 resize,用 ResizeObserver 兜底
        let ro = null;
        if (typeof ResizeObserver === 'function') {
            let first = true;
            ro = new ResizeObserver(() => {
                if (first) { first = false; return; }
                refit();
            });
            ro.observe(endingDiv);
        }

        presentEndingText(endingDiv, msgEl, hintEl, () => {
            // 玩家读完并单击后,字幕整体淡出,再显示照片和重新开始
            window.removeEventListener('resize', refit);
            if (ro) ro.disconnect();
            msgWrap.style.transition = 'opacity 1.2s ease';
            msgWrap.style.opacity = '0';
            setTimeout(() => { revealRestart(); }, 1400);
        });
    }, 2800);
}

// 每行一个块级 div(空行占位),分栏时 break-inside 避免一行被拆到两栏
function renderEndingLines(msgEl, fullText) {
    msgEl.textContent = '';
    fullText.split('\n').forEach(line => {
        const div = document.createElement('div');
        div.textContent = line === '' ? ' ' : line;
        div.style.breakInside = 'avoid';
        msgEl.appendChild(div);
    });
}

// 自动排版:从大到小试字号,每档先试单栏再试双栏,选出能把全文完整
// 放进当前窗口的最大字号方案(长文在宽屏会自然落到 18px 双栏,而不是
// 单栏挤成 12px)。极小窗口全部放不下时保底 12px,由内部滚动兜底。
function fitEndingLayout(msgEl, msgWrap, fullText) {
    const steps = [[18, 2.2], [17, 2.1], [16, 2.0], [15, 1.95], [14, 1.9], [13, 1.8], [12, 1.7]];
    const GAP = 64;
    const LS = 3; // 与 letter-spacing: 3px 保持一致
    const cs = getComputedStyle(msgWrap);
    const availH = msgWrap.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const availW = msgWrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);

    const probe = msgEl.cloneNode(false);
    probe.removeAttribute('id');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.maxHeight = 'none';
    probe.style.maxWidth = 'none';
    probe.style.overflowY = 'visible';
    fullText.split('\n').forEach(line => {
        const d = document.createElement('div');
        d.textContent = line === '' ? ' ' : line;
        d.style.breakInside = 'avoid';
        probe.appendChild(d);
    });
    msgWrap.appendChild(probe);

    // 最长一行在指定字号下的实际渲染宽度
    function longestLineWidth(font) {
        probe.style.fontSize = font + 'px';
        probe.style.whiteSpace = 'nowrap';
        probe.style.width = 'max-content';
        probe.style.columnCount = 'auto';
        const w = probe.offsetWidth;
        probe.style.whiteSpace = '';
        probe.style.width = '';
        return w;
    }

    let chosen = null;
    outer:
    for (const [font, lh] of steps) {
        // 单栏栏宽取最长行,超长的行(上限 26 字)允许折行
        const colW = Math.min(longestLineWidth(font), Math.round(26 * (font + LS)));
        for (const cols of [1, 2]) {
            const blockW = cols * colW + (cols - 1) * GAP;
            if (blockW > availW) continue;
            probe.style.fontSize = font + 'px';
            probe.style.lineHeight = String(lh);
            probe.style.width = blockW + 'px';
            probe.style.columnCount = cols > 1 ? String(cols) : 'auto';
            probe.style.columnGap = GAP + 'px';
            if (probe.offsetHeight <= availH - 8) {
                chosen = { font: font, lh: lh, cols: cols, blockW: blockW };
                break outer;
            }
        }
    }
    if (!chosen) {
        const colW = Math.min(longestLineWidth(12), Math.round(26 * (12 + LS)), availW);
        chosen = { font: 12, lh: 1.7, cols: 1, blockW: colW };
    }
    probe.remove();

    msgEl.style.fontSize = chosen.font + 'px';
    msgEl.style.lineHeight = String(chosen.lh);
    msgEl.style.width = chosen.blockW + 'px';
    msgEl.style.maxWidth = 'none';
    // 单栏走普通文档流:多栏布局在内容超高时会把溢出内容排进右侧
    // 看不见的"溢出栏",纵向滚动兜底就失效了
    msgEl.style.columnCount = chosen.cols > 1 ? String(chosen.cols) : 'auto';
    msgEl.style.columnGap = GAP + 'px';
    msgEl.style.columnRule = chosen.cols > 1 ? '1px solid #222' : 'none';
}

// 全文整体缓缓渐显,显示完成后停在屏幕上不消失,等玩家单击/空格/回车。
// 渐显途中单击 = 立即完全显示。窗口放不下时容器内可滚动回看。
function presentEndingText(rootEl, msgEl, hintEl, onFinished) {
    let phase = 'appearing';
    let clickGuardUntil = 0;
    let shownTimer = 0;

    msgEl.style.opacity = '0';
    msgEl.style.transform = 'translateY(14px)';
    void msgEl.offsetWidth;
    msgEl.style.transition = 'opacity 3s ease, transform 3.2s ease-out';
    msgEl.style.opacity = '1';
    msgEl.style.transform = 'translateY(0)';
    shownTimer = setTimeout(enterWaiting, 3400);

    function enterWaiting() {
        if (phase !== 'appearing') return;
        phase = 'waiting';
        clearTimeout(shownTimer);
        // 刚显示完的一瞬间不响应点击,避免误触直接跳过
        clickGuardUntil = performance.now() + 600;
        hintEl.textContent = msgEl.scrollHeight > msgEl.clientHeight + 4
            ? '滚动回看 · 单击继续' : '单击继续';
        hintEl.style.opacity = '0.55';
    }

    function onAdvance() {
        if (phase === 'appearing') {
            msgEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease-out';
            msgEl.style.opacity = '1';
            msgEl.style.transform = 'translateY(0)';
            enterWaiting();
        } else if (phase === 'waiting') {
            if (performance.now() < clickGuardUntil) return;
            phase = 'done';
            rootEl.removeEventListener('click', onAdvance);
            document.removeEventListener('keydown', onKey);
            hintEl.style.opacity = '0';
            if (typeof onFinished === 'function') onFinished();
        }
    }

    function onKey(e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            onAdvance();
        }
    }

    rootEl.addEventListener('click', onAdvance);
    document.addEventListener('keydown', onKey);
}

function buildEndingMessage(type) {
    if (type == 3) {
        return `奇怪的声音又出现了，
学着哥哥说话的腔调，
一遍又一遍地呼喊着我的名字。
我屏住呼吸踮着脚，一点点靠近猫眼，
门外忽然安静了下来。
我贴近猫眼，向外望去
猫眼外空无一人
我刚松了一口气，
门外却突然响起急促的敲门声
但这一次，我并没有开门。`;
    }
    if (type == 2) {
        return `6月16日

今天的风不冷，也不暖。
我一个人在阳台上站了许久，
看着天上的云朵慢慢地飘过。
它们一会儿像小兔子，
一会儿像大白熊，
一会儿又变成了一座软绵绵的城堡。
“唉，云朵到底是什么味道的呢？”
“是甜甜的棉花糖味吗？”
“是香香的蛋糕味？”
“还是冰凉的牛奶味？”
我想着
直到身后传来妈妈的声音：
“宁宁，吃饭啦”
“好！”
我跑到餐桌前，看见桌上摆着许多美味的食物
有金黄的鸡蛋
绿油油的青菜
还有一碗热气腾腾的米饭
妈妈夹了一块白白软软的豆腐放进我的碗里
“快尝尝，这是你最喜欢吃的。”
我轻轻咬了一口。
豆腐软绵绵的,
带着淡淡的香味。
“我知道了！”
“妈妈，我知道云朵是什么味道的了！”
妈妈好奇地问：“是什么味道？”
“云朵就是豆腐的味道！白白的，软软的，还带着妈妈做饭的香味！”
哥哥听了，忍不住笑了起来。
我也笑了。
这时，窗外的云朵还在慢慢地飘着。
我想，也许每个人心里的云朵，都有不一样的味道。
而我心里的云朵，是幸福的味道。`;
    }
    return `宁宁睡着了。
她最近总是睡得很晚。
也时常一个人趴在窗边
静静地望着远处的灯，
一盏一盏的熄灭。
她问我：“其他人都去哪儿了？”
“睡着了。”我说。
她又问：“为什么家里越来越安静？”
我告诉她：“因为你长大了
长大了就会这样的。”
她信了。
她一直都很相信我。
相信妈妈还会回来
相信爸爸只是暂时离开，
相信哥哥不过是出了趟远门。
相信明天醒来。
一切都会变回原来的样子。
可我知道。
明天不会。
后天不会。
以后也不会。
因为这个世界。
已经只剩下我们两个了`;
}
