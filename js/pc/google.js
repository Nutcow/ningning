(function initGoogleSearch() {

    const GOOGLE_SEARCH_DB = [
        {
            id: 'jiangjianguo',
            matched: ['江建国', '建国'],
            results: [
                {
                    title: '江建国 - 明安区第七中学',
                    url: 'action:show-jiangjianguo',
                    displayUrl: 'mingan.edu.xyzz › 江建国',
                    desc: '江建国，男，1971年生，明安区本地人，中共党员，中学高级教师职称。1996年起任教于明安区第七中学历史教研组，长期承担初中及高中历史课程的教学工作，现兼任历史教研组备课组组长',
                    favicon: 'alphabet'
                },
                {
                    title: '江建国 检验报告查询明细 - 明安市第一人民医院',
                    url: 'action:show-hospital',
                    displayUrl: 'mingan-hospital.gov.xyzz › report › detail',
                    desc: '明安市第一人民医院电子健康档案系统。姓名：江建国，性别：男。查看综合体检报告、门诊记录及相关检验结果（PDF格式下载）。',
                    favicon: 'map'
                },
            ]
        },
        {
            id: 'jiangmingyuan',
            matched: ['明远', '江明远'],
            results: (() => {
                const isCorrupted = localStorage.getItem('win10_jmy_corrupted') === 'true';
                return [
                    {
                        title: isCorrupted ? '████████████' : '江明远 - 博客',
                        url: 'action:show-jiangmingyuan',
                        displayUrl: isCorrupted ? '██████████████████' : 'mingyuanbk.xyzz › 江明远',
                        desc: isCorrupted
                            ? '██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████'
                            : '三年真的好快，感觉昨天才刚进校门。今天整理东西，翻出了好多以前的合影，突然就有点想哭了。',
                        favicon: 'alphabet'
                    }
                ];
            })()
        },

        {
            id: 'alphabet',
            matched: ['字母表格', '字母表', 'alphabet', '密码', '加密'],
            results: [
                {
                    title: '字母表 (A-Z 数字编码对照表)',
                    url: 'action:show-alphabet',
                    displayUrl: 'alphabet.xyzz › 字母表',
                    desc: '标准字母表数据 ©2020。提供英文字母 A-Z 对应的 0-25 完整映射关系。',
                    favicon: 'alphabet'
                },
                {
                    title: '英文字母表 A-Z 完整发音与书写教学',
                    url: 'learn/english/alphabet-a-z',
                    displayUrl: 'english-learning.xyzz › alphabet',
                    desc: '包含26个英文字母的大小写标准书写规范、美式/英式发音音频，以及配套的少儿英语启蒙顺口溜。',
                    favicon: 'book'
                },
                {
                    title: 'ASCII码对照表 - 26个英文字母数值',
                    url: 'tools/ascii-table',
                    displayUrl: 'dev-tools.xyzz › ascii',
                    desc: '提供英文字母 A-Z 与数字的对应表：A=0、B=1、C=2 …… 一直到 Z=25。常用于把一串数字，按字母表“翻”回单词。',
                    favicon: 'alphabet'
                }
            ]
        },
        {
            id: 'password',
            matched: ['密码', '口令', '解压', '压缩密码', 'password', '忘记密码', '找回密码', '日记密码', '锁', '破解'],
            results: [
                {
                    title: '日记锁/压缩包忘了密码？先从“有意义的数字”想起 - 知乎',
                    url: 'zhihu.xyzz/question/lock-password-recall',
                    displayUrl: 'www.zhihu.xyzz › question › 密码找回',
                    desc: '忘记密码时，先别急着用工具破解。最该回忆的，是那串数字对当事人意味着什么——某个生日、某个纪念日，或者一句只有你们两个人才懂的话。锁住一本日记的，往往不是技术，是心事。',
                    favicon: 'zhihu'
                },
                {
                    title: '压缩文件忘记密码怎么办？常见找回方法汇总 - 知乎',
                    url: 'zhihu.xyzz/question/zip-password-recovery',
                    displayUrl: 'www.zhihu.xyzz › question › 压缩文件密码找回',
                    desc: '如果忘记了压缩包密码，可以尝试以下方法：1. 回忆密码的设置思路（生日、纪念日、有特殊含义的数字组合）；2. 尝试常用数字如520、1234；3. 使用与文件内容相关的日期。',
                    favicon: 'zhihu'
                },
                {
                    title: '日记锁的常见密码设置规律 - 百度贴吧',
                    url: 'tieba.baidu.xyzz/p/diary-lock-password',
                    displayUrl: 'tieba.baidu.xyzz › p › 日记锁密码',
                    desc: '很多人习惯把日记密码设置为有感情意义的数字，例如"0520"（我爱你）、重要纪念日等。这类密码往往只有设置者自己能理解其背后的含义。',
                    favicon: 'baidu'
                },
                {
                    title: '数字谐音含义大全：520、1314 都代表什么？ - 百度知道',
                    url: 'zhidao.baidu.xyzz/question/number-romance',
                    displayUrl: 'zhidao.baidu.xyzz › question › 数字谐音',
                    desc: '常见数字谐音：520=我爱你，521=我愿意，1314=一生一世，0527=我爱妻……很多人喜欢用这些有寓意的数字做纪念日或密码，既简单又好记。也有人会把名字拼音和这类数字拼在一起，作为更"私人"的密码。',
                    favicon: 'baidu'
                }
            ]
        },
        {
            id: 'answer',
            matched: ['答案', '真相', '发生了什么', '怎么了', '秘密', '兔子先生', '兔兔先生', 'answer', 'truth', '为什么', '失踪', '消失', '忘记', '遗忘', '记忆'],
            results: [
                {
                    title: '《兔子先生》动画停播原因 — 官方说明 - 哔哩哔哩',
                    url: 'ZiliZili.xyzz/read/cv12345678',
                    displayUrl: 'ZiliZili.xyzz › read › 兔子先生停播说明',
                    desc: '《兔子先生》已于2020年6月起暂停更新。该动画讲述了一只可爱的兔子的动画故事。停播原因官方未作说明。与之相关内容已从平台下架。有的人电脑上也许还有该动画片的记录。',
                    favicon: 'bili'
                },
                {
                    title: '为什么人会选择性遗忘？防御性遗忘机制解析 - 知乎',
                    url: 'zhihu.xyzz/question/defensive-forgetting-mechanism',
                    displayUrl: 'www.zhihu.xyzz › question › 遗忘机制',
                    desc: '防御性遗忘是一种心理自我保护机制。当大脑判断某段记忆会造成持续的心理创伤时，会主动屏蔽相关信息的提取路径。这类遗忘往往在特定刺激（如气味、声音、场景）下突然被唤醒。',
                    favicon: 'zhihu'
                },
                {
                    title: '【科普】曼德拉效应：是谁篡改了我们的集体记忆？ - 哔哩哔哩',
                    url: 'ZiliZili.xyzz/video/BV1xK4y1P7zQ',
                    displayUrl: 'ZiliZili.xyzz › video › 曼德拉效应',
                    desc: '为什么成千上万的人会共同拥有一段根本不存在的记忆？比如从来没出过某部动画，大家却都记得主角的名字。是大脑的集体错乱，还是信息传播产生的认知偏差？本期视频为你解析。',
                    favicon: 'bili'
                }
            ]
        },
        {
            id: 'mingan2zx',
            matched: ['明安二中', '二中', '2021届', '明安2中', '明安市第二中学'],
            results: [
                {
                    title: '明安市第二中学 - 2021届毕业生名单公示',
                    url: 'mingan2zx.edu.xyzz/graduates/2021',
                    displayUrl: 'mingan2zx.edu.xyzz › graduates › 2021',
                    desc: '明安二中2021届毕业生名单（三班）。其中三班 第17号 学生信息显示：【该条记录已注销，数据缺失】。如对名单有疑问，请联系教务处核实。备注：本届个别学生学籍状态异常，正在核查。',
                    favicon: 'map'
                },
                {
                    title: '明安二中贴吧 - 有人记得三班那个画画很好的男生吗？',
                    url: 'tieba.baidu.xyzz/p/mingan2zx-class3',
                    displayUrl: 'tieba.baidu.xyzz › p › 明安二中三班',
                    desc: '楼主：翻同学录的时候，发现三班有个座位上的名字被涂黑了，可我明明记得他坐那儿……有没有人记得他叫什么？1L：谁啊？2L：我们班不是一直只有41个人吗。3L：别问了，我妈说，问多了对你不好。',
                    favicon: 'baidu'
                }
            ]
        },
        {
            id: 'missing',
            matched: ['寻人', '寻人启事', '失踪', '人口', '下降', '找人', '不见了'],
            results: [
                {
                    title: '明安市寻人启事汇总（持续更新） - 明安便民网',
                    url: 'mingan-life.xyzz/missing',
                    displayUrl: 'mingan-life.xyzz › 寻人',
                    desc: '本页汇总近期明安市走失人员信息。奇怪的是，多条启事的家属在登记后又主动撤回，称"家里其实并没有少人"。还有部分启事的照片栏与姓名栏，在提交后变成了空白。',
                    favicon: 'map'
                },
                {
                    title: '明安市常住人口为何连续三年下降？ - 知乎',
                    url: 'zhihu.xyzz/question/mingan-population',
                    displayUrl: 'www.zhihu.xyzz › question › 明安人口',
                    desc: '官方数据显示明安市人口连续三年负增长，却查不到大规模迁出记录。有网友提出一个令人不安的猜想：会不会有些人，不是"离开"了，而是从一开始就被从所有记录里抹去了？',
                    favicon: 'zhihu'
                }
            ]
        }
    ];

    const TRENDING = ['字母表', '地图', '密码', '纪念日', '失踪', '遗忘'];
    const KEY_HISTORY = 'win10_google_search_history';

    function getHistory() { try { return JSON.parse(localStorage.getItem(KEY_HISTORY)) || []; } catch(e) { return []; } }
    function saveHistory(query) {
        if (!query || !query.trim()) return;
        let h = getHistory().filter(q => q !== query.trim());
        h.unshift(query.trim());
        if (h.length > 12) h = h.slice(0, 12);
        localStorage.setItem(KEY_HISTORY, JSON.stringify(h));
    }

    function getFaviconSVG(type) {
        const map = {
            map:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
            zhihu: `<svg width="14" height="14" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#056DE8"/><text x="4" y="17" fill="white" font-size="12" font-weight="bold" font-family="arial">知</text></svg>`,
            baidu: `<svg width="14" height="14" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#2932E1"/><text x="4" y="17" fill="white" font-size="12" font-weight="bold" font-family="arial">百</text></svg>`,
            bili:  `<svg width="14" height="14" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#FB7299"/><text x="5" y="17" fill="white" font-size="13" font-weight="bold" font-family="arial">Z</text></svg>`,
            alphabet: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20L12 4l6 16M9 12h6"/></svg>`,
        };
        return map[type] || `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;
    }

    function renderDropdown(boxId, wrapperId, query, onSelect) {
        const box     = document.getElementById(boxId);
        const wrapper = document.getElementById(wrapperId);
        if (!box) return;

        const history  = getHistory();
        const qLow     = (query || '').toLowerCase().trim();
        const hasQuery = qLow.length > 0;

        const histMatched = hasQuery ? history.filter(h => h.toLowerCase().includes(qLow)).slice(0, 5) : history.slice(0, 5);
        const trendFiltered = TRENDING.filter(t => (!hasQuery || t.toLowerCase().includes(qLow)) && !histMatched.includes(t)).slice(0, hasQuery ? 3 : 4);
        const totalItems = histMatched.length + trendFiltered.length;

        if (totalItems === 0 && hasQuery) {
            box.innerHTML = `
                <div id="_gdrop_direct" style="display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;font-size:15px;color:#202124;"
                    onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2" style="flex-shrink:0;"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                    <span>${query}</span>
                </div>`;
            box.querySelector('#_gdrop_direct').onclick = () => { closeDrop(boxId, wrapperId); onSelect(query); };
            openDrop(box, wrapper);
            return;
        }

        if (totalItems === 0) { closeDrop(boxId, wrapperId); return; }

        let html = '';
        if (histMatched.length > 0) {
            histMatched.forEach((item, i) => {
                const bold = hasQuery ? item.replace(new RegExp(`(${query})`, 'gi'), '<strong>$1</strong>') : item;
                html += `
                    <div data-gdrop-idx="${i}" style="display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;font-size:15px;color:#202124;"
                        onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2" style="flex-shrink:0;"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                        <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${bold}</span>
                        <span style="font-size:11px; color:#bdc1c6; flex-shrink:0;">搜索历史</span>
                    </div>`;
            });
        }
        if (histMatched.length > 0 && trendFiltered.length > 0) html += `<div style="height:1px; background:#f1f3f4; margin:4px 0;"></div>`;
        if (trendFiltered.length > 0) {
            if (!hasQuery) html += `<div style="padding:8px 16px 4px; font-size:12px; color:#70757a; font-weight:500; letter-spacing:.3px;">大家都在搜</div>`;
            trendFiltered.forEach((item, i) => {
                const bold = hasQuery ? item.replace(new RegExp(`(${query})`, 'gi'), '<strong>$1</strong>') : item;
                html += `
                    <div data-gdrop-trend="${i}" style="display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;font-size:15px;color:#202124;"
                        onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="1.5" style="flex-shrink:0;"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                        <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${bold}</span>
                        ${!hasQuery ? `<span style="font-size:11px; color:#bdc1c6; flex-shrink:0;">热门</span>` : ''}
                    </div>`;
            });
        }
        box.innerHTML = html;
        box.querySelectorAll('[data-gdrop-idx]').forEach((el, i) => { el.onclick = () => { closeDrop(boxId, wrapperId); onSelect(histMatched[i]); }; });
        box.querySelectorAll('[data-gdrop-trend]').forEach((el, i) => { el.onclick = () => { closeDrop(boxId, wrapperId); onSelect(trendFiltered[i]); }; });
        openDrop(box, wrapper);
    }

    function openDrop(box, wrapper) {
        if (box) { box.style.display = 'block'; box.style.borderTop = 'none'; box.style.boxShadow = '0 4px 6px rgba(32,33,36,.2)'; box.style.marginTop = '-1px'; }
        if (wrapper) { wrapper.style.borderRadius = '24px 24px 0 0'; wrapper.style.borderBottomColor = 'transparent'; wrapper.style.boxShadow = 'none'; }
    }

    function closeDrop(boxId, wrapperId) {
        const box = document.getElementById(boxId);
        const wrapper = document.getElementById(wrapperId);
        if (box) { box.style.display = 'none'; box.style.marginTop = '0'; }
        if (wrapper) { wrapper.style.borderRadius = '24px'; wrapper.style.borderBottomColor = '#dfe1e5'; wrapper.style.boxShadow = '0 1px 6px rgba(32,33,36,.1)'; }
    }


    window.showGoogleHome = function() {
        const homeView   = document.getElementById('google-home-view');
        const resultView = document.getElementById('google-result-view');
        const alphabetView= document.getElementById('google-alphabet-view');
        const navBar     = document.getElementById('google-nav-bar');
        const footer     = document.getElementById('google-footer');
        const homeInput  = document.getElementById('google-home-input');
        const navInput   = document.getElementById('google-nav-input');
        const jjView     = document.getElementById('google-jiangjianguo-view');
        const hospView   = document.getElementById('google-hospital-view');

        const jmyView    = document.getElementById('google-jiangmingyuan-view');
        if (jmyView)    jmyView.style.display = 'none';

        if (hospView)   hospView.style.display = 'none';
        if (homeView)   homeView.style.display = 'flex';
        if (resultView) resultView.style.display = 'none';
        if (alphabetView) alphabetView.style.display = 'none';
        if (navBar)     navBar.style.display = 'none';
        if (footer)     footer.style.display = 'flex';
        if (jjView)     jjView.style.display = 'none';

        const backBtn = document.getElementById('google-back-btn');
        if (backBtn) { backBtn.style.opacity = '0.35'; backBtn.style.cursor = 'default'; }

        closeDrop('google-home-suggest-box', 'google-home-search-wrapper');
        closeDrop('google-nav-suggest-box',  'google-nav-search-wrapper');

        if (navInput)  navInput.value = '';

        const scrollArea = document.getElementById('google-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;

        if (homeInput) {
            homeInput.value = '';
            setTimeout(() => {
                homeInput.focus();
                renderDropdown('google-home-suggest-box', 'google-home-search-wrapper', '', performGoogleSearch);
            }, 60);
        }
    };

    window.showGoogleAlphabet = function() {
        document.getElementById('google-home-view').style.display = 'none';
        document.getElementById('google-result-view').style.display = 'none';
        document.getElementById('google-alphabet-view').style.display = 'flex';
        document.getElementById('google-address-text').innerText = 'alphabet.xyzz/a-z-mapping-table';

        const backBtn = document.getElementById('google-back-btn');
        if(backBtn) {
            backBtn.style.opacity = '1';
            backBtn.style.cursor = 'pointer';
        }

        const scrollArea = document.getElementById('google-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;
    };


    window.verifyHospitalAuth = function() {
    const pwdInput = document.getElementById('hospital-pwd-input');
    const errTip = document.getElementById('hospital-pwd-error');

    if (pwdInput.value === 'jianguo0527') {
        errTip.style.display = 'none';
        document.getElementById('hospital-auth-view').style.display = 'none';
        document.getElementById('hospital-main-content').style.display = 'flex';
        localStorage.setItem('win10_hosp_auth', 'true');
    } else {
        errTip.style.display = 'block';
        pwdInput.value = '';
        pwdInput.focus();
    }
    };

    window.showGoogleHospital = function() {
        document.getElementById('google-home-view').style.display = 'none';
        document.getElementById('google-result-view').style.display = 'none';

        const alphabetView = document.getElementById('google-alphabet-view');
        if (alphabetView) alphabetView.style.display = 'none';
        const jjView = document.getElementById('google-jiangjianguo-view');
        if (jjView) jjView.style.display = 'none';

        document.getElementById('google-hospital-view').style.display = 'flex';
        document.getElementById('google-address-text').innerText = 'mingan-hospital.gov.xyzz/report/detail';

        if (localStorage.getItem('win10_hosp_auth') === 'true') {
            document.getElementById('hospital-auth-view').style.display = 'none';
            document.getElementById('hospital-main-content').style.display = 'flex';
        } else {
            document.getElementById('hospital-auth-view').style.display = 'flex';
            document.getElementById('hospital-main-content').style.display = 'none';
        }

        const backBtn = document.getElementById('google-back-btn');
        if(backBtn) {
            backBtn.style.opacity = '1';
            backBtn.style.cursor = 'pointer';
        }

        const scrollArea = document.getElementById('google-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;
    };

    window.showGoogleJiangmingyuan = function() {
        document.getElementById('google-home-view').style.display = 'none';
        document.getElementById('google-result-view').style.display = 'none';

        const alphabetView = document.getElementById('google-alphabet-view');
        if (alphabetView) alphabetView.style.display = 'none';
        const jjView = document.getElementById('google-jiangjianguo-view');
        if (jjView) jjView.style.display = 'none';
        const hospView = document.getElementById('google-hospital-view');
        if (hospView) hospView.style.display = 'none';

        const jmyView = document.getElementById('google-jiangmingyuan-view');
        if (jmyView) jmyView.style.display = 'flex';
        document.getElementById('google-address-text').innerText = 'jiangmingyuan.mingan2zx.edu.xyzz';

        const backBtn = document.getElementById('google-back-btn');
        if(backBtn) {
            backBtn.style.opacity = '1';
            backBtn.style.cursor = 'pointer';
        }

        const scrollArea = document.getElementById('google-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;

        const isCorrupted = localStorage.getItem('win10_jmy_corrupted') === 'true';
        updateJmyBlogState(isCorrupted);

        if (!isCorrupted) {
            setTimeout(() => {
                const bsodAudio = new Audio('audio/windows-10-bsod-sound.mp3');

                bsodAudio.volume = 0;

                bsodAudio.onended = () => {
                    endJmyGlitchEffect();
                };

                bsodAudio.play().then(() => {
                    setTimeout(() => {
                        bsodAudio.volume = 1.0;
                        startJmyGlitchEffect();
                    }, 3000);
                }).catch(e => {
                    console.log('音频播放被拦截:', e);
                    setTimeout(() => {
                        startJmyGlitchEffect();
                        setTimeout(endJmyGlitchEffect, 4000);
                    }, 3000);
                });
            }, 800);
        }
    };
    function updateJmyBlogState(isCorrupted) {
        const bgFilter = document.getElementById('jmy-bg-filter');
        const blogTitle = document.getElementById('jmy-blog-title');

        const postsContainer = document.getElementById('jmy-posts-container');
        const emptyState = document.getElementById('jmy-empty-state');
        const emptyText = document.getElementById('jmy-empty-text');

        const avatar = document.getElementById('jmy-avatar');
        const nameEl = document.getElementById('jmy-name');
        const bioEl = document.getElementById('jmy-bio');

        const popularList = document.getElementById('jmy-popular-list');
        const popularEmpty = document.getElementById('jmy-popular-empty');
        const tagCloud = document.getElementById('jmy-tag-cloud');
        const tagEmpty = document.getElementById('jmy-tag-empty');

        if (isCorrupted) {
            if (bgFilter) {
                bgFilter.style.background = 'rgba(0, 0, 0, 0.6)';
                bgFilter.style.backdropFilter = 'grayscale(100%)';
            }
            if (blogTitle) blogTitle.innerText = '个人博客';

            if (postsContainer) postsContainer.style.display = 'none';
            if (emptyState) emptyState.style.display = 'flex';
            if (emptyText) emptyText.innerText = '这里空空如也~';

            if (avatar) avatar.src = 'image/user.png';
            if (nameEl) {
                nameEl.innerText = '此用户不存在';
                nameEl.style.color = '#999';
            }
            if (bioEl) bioEl.innerText = '这个人很懒，什么都没留下';

            if (popularList) popularList.style.display = 'none';
            if (popularEmpty) popularEmpty.style.display = 'block';
            if (tagCloud) tagCloud.style.display = 'none';
            if (tagEmpty) tagEmpty.style.display = 'block';

        } else {
            if (bgFilter) {
                bgFilter.style.background = 'transparent';
                bgFilter.style.backdropFilter = 'none';
            }
            if (blogTitle) blogTitle.innerText = '江明远的个人博客';

            if (postsContainer) postsContainer.style.display = 'block';
            if (emptyState) emptyState.style.display = 'none';

            if (avatar) avatar.src = 'image/ming.webp';
            if (nameEl) {
                nameEl.innerText = '江明远';
                nameEl.style.color = '#333';
            }
            if (bioEl) bioEl.innerHTML = '热爱计算机与数字媒体<br>明安二中2021届毕业生';

            if (popularList) popularList.style.display = 'flex';
            if (popularEmpty) popularEmpty.style.display = 'none';
            if (tagCloud) tagCloud.style.display = 'flex';
            if (tagEmpty) tagEmpty.style.display = 'none';
        }
    }

    function startJmyGlitchEffect() {
    const style = document.createElement('style');
    style.id = 'jmy-glitch-css';

    style.innerHTML = `
        @keyframes creepingDread {
            0%   { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }
            48%  { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }
            50%  { filter: brightness(0.6) contrast(1.5) sepia(1) hue-rotate(315deg); transform: translate(-2px, 2px) skew(1deg); }
            52%  { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }
            85%  { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }
            87%  { filter: brightness(0.5) contrast(2.0) grayscale(0.8); transform: translate(3px, -1px) skew(-2deg); }
            89%  { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }
            100% { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }
        }

        @keyframes cursedText {
            0%, 100% { text-shadow: 2px 0 rgba(139,0,0,0.8), -2px 0 rgba(0,0,50,0.6); opacity: 0.9; transform: translate(0,0); }
            25%      { text-shadow: -2px 0 rgba(139,0,0,0.8), 2px 0 rgba(0,0,50,0.6); opacity: 0.8; }
            50%      { text-shadow: 2px 2px rgba(139,0,0,0.8), -2px -2px rgba(0,0,50,0.6); opacity: 1; }
            75%      { text-shadow: none; opacity: 0.6; color: #500; transform: translate(-1px, 1px); }
            95%      { color: #8b0000; transform: translate(1px, -1px); }
        }

        @keyframes cursedImgFlicker {
            0%, 100% { filter: grayscale(0.9) contrast(1.8) brightness(0.6); transform: scale(1) rotate(calc(var(--r,0) * 1deg)); }
            10%      { filter: grayscale(1) contrast(2.5) brightness(0.8); transform: scale(1.02) rotate(calc(var(--r,0) * 1deg)); }
            45%      { filter: sepia(1) hue-rotate(320deg) contrast(1.5) brightness(0.5) saturate(300%); }
            47%      { filter: grayscale(0.9) contrast(1.8) brightness(0.6); }
            80%      { filter: grayscale(0.8) contrast(2) brightness(0.4) invert(0.1); transform: scale(0.98) rotate(calc(var(--r,0) * 1deg)); }
        }

        @keyframes scanlines {
            0%   { background-position: 0 0;     }
            100% { background-position: 0 100px; }
        }

        @keyframes noisePulse {
            0%,100% { opacity: 0.15; }
            50%     { opacity: 0.25; }
            80%     { opacity: 0.10; }
        }

        body *:not(#jmy-glitch-overlay):not(#jmy-glitch-scanlines):not(#jmy-glitch-removed-text):not(img):not(.jmy-ming-float) {
            animation: cursedText 4s infinite !important;
            font-size: calc(18px + 2.5vw) !important;
            line-height: 0.55 !important;
            font-weight: 900 !important;
            font-family: 'Courier New', monospace !important;
            color: #8b0000 !important;
            background-color: transparent !important;
            border: 1px dashed rgba(50, 50, 100, 0.4) !important;
            border-radius: 0 !important;
            position: static !important;
            float: left !important;
            display: inline-block !important;
            width: auto !important;
            height: auto !important;
            max-width: none !important;
            max-height: none !important;
            margin: -6px !important;
            padding: 8px !important;
            overflow: visible !important;
            box-shadow: none !important;
            letter-spacing: -4px !important;
            word-break: break-all !important;
            outline: none !important;
            transition: none !important;
            z-index: auto !important;
            visibility: visible !important;
            transform: rotate(calc(var(--r, 0) * 1deg)) !important;
        }

        img {
            content: url('image/ming.webp') !important;
            width: 90px !important;
            height: 90px !important;
            object-fit: cover !important;
            display: inline-block !important;
            float: none !important;
            position: static !important;
            mix-blend-mode: normal !important;
            background: #000 !important;
            border: 1px solid #333 !important;
            outline: none !important;
            box-shadow: 0 0 15px rgba(0,0,0,0.8) !important;
            animation: cursedImgFlicker 3s infinite !important;
            transform: rotate(calc(var(--r, 0) * 1deg)) !important;
        }

        .jmy-ming-float {
            position: fixed !important;
            object-fit: cover !important;
            mix-blend-mode: normal !important;
            background: #000 !important;
            border: 1px solid rgba(139,0,0,0.5) !important;
            box-shadow: 0 0 20px rgba(0,0,0,0.9), 0 0 10px rgba(139,0,0,0.4) !important;
            outline: none !important;
            pointer-events: none !important;
            z-index: 9999998 !important;
            float: none !important;
            display: block !important;
            animation: cursedImgFlicker 3s infinite !important;
            transform: rotate(calc(var(--r, 0) * 1deg)) !important;
        }

        body {
            background: #050505 !important;
            animation: creepingDread 5s infinite !important;
            overflow: hidden !important;
        }
        #jmy-glitch-overlay {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            pointer-events: none !important;
            z-index: 9999995 !important;
            background: radial-gradient(circle at center, transparent 30%, rgba(30,0,0,0.85) 100%) !important;
            mix-blend-mode: multiply !important;
            animation: none !important;
            border: none !important;
        }

        #jmy-glitch-scanlines {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            pointer-events: none !important;
            z-index: 9999996 !important;
            background: repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 2px,
                rgba(0,0,0,0.3) 2px,
                rgba(0,0,0,0.3) 4px
            ) !important;
            animation: scanlines 0.5s linear infinite, noisePulse 0.15s steps(1) infinite !important;
            border: none !important;
            mix-blend-mode: normal !important;
        }

        #jmy-glitch-removed-text {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 9999999 !important;
            font-size: 15vw !important;
            font-family: 'Microsoft YaHei', '黑体', sans-serif !important;
            font-weight: 900 !important;
            color: #4a0000 !important;
            white-space: nowrap !important;
            letter-spacing: 2vw !important;
            pointer-events: none !important;
            text-shadow: 3px 3px 0 #000;
            opacity: 0.8 !important;
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('body *').forEach(el => {
        if (Math.random() > 0.5) {
            el.style.setProperty('--r', (Math.random() * 10 - 5).toString());
        }
        if (el.tagName === 'IMG' && !el.classList.contains('jmy-ming-float')) {
            el.dataset.originalSrc = el.src;
            el.src = 'image/ming.webp';
        }
    });

    const positions = [
        [8,  10], [55, 5],  [80, 15], [15, 55],
        [45, 60], [70, 45], [30, 80], [85, 70]
    ];
    positions.forEach(([top, left]) => {
        const f = document.createElement('img');
        f.className = 'jmy-ming-float';
        f.src = 'image/ming.webp';
        const size = 60 + Math.floor(Math.random() * 40);
        f.style.width  = size + 'px';
        f.style.height = size + 'px';
        f.style.top    = top  + 'vh';
        f.style.left   = left + 'vw';
        f.style.setProperty('--r', (Math.random() * 20 - 10).toString());
        document.body.appendChild(f);
    });

    const overlay = document.createElement('div');
    overlay.id = 'jmy-glitch-overlay';
    document.body.appendChild(overlay);

    const scanlines = document.createElement('div');
    scanlines.id = 'jmy-glitch-scanlines';
    document.body.appendChild(scanlines);

    const removedText = document.createElement('div');
    removedText.id = 'jmy-glitch-removed-text';
    removedText.innerText = '';
    document.body.appendChild(removedText);
}


function endJmyGlitchEffect() {
    const style = document.getElementById('jmy-glitch-css');
    if (style) style.remove();
    const overlay = document.getElementById('jmy-glitch-overlay');
    if (overlay) overlay.remove();
    const scanlines = document.getElementById('jmy-glitch-scanlines');
    if (scanlines) scanlines.remove();
    const removedText = document.getElementById('jmy-glitch-removed-text');
    if (removedText) removedText.remove();

    document.querySelectorAll('.jmy-ming-float').forEach(el => el.remove());

    document.querySelectorAll('body *').forEach(el => {
        el.style.removeProperty('--r');
        el.style.removeProperty('--img-hue');
        if (el.tagName === 'IMG' && el.dataset.originalSrc) {
            el.src = el.dataset.originalSrc;
            delete el.dataset.originalSrc;
        }
    });

    localStorage.setItem('win10_jmy_corrupted', 'true');
    updateJmyBlogState(true);

    const jmyEntry = GOOGLE_SEARCH_DB.find(item => item.id === 'jiangmingyuan');
    if (jmyEntry) {
        jmyEntry.results[0].title      = '████████████';
        jmyEntry.results[0].displayUrl = '████████████████ › ██████';
        jmyEntry.results[0].desc       = '████████████████████████████████████████████████████████████████████████████████████';
    }

    const navInput = document.getElementById('google-nav-input');
    if (navInput && navInput.value) {
        performGoogleSearch(navInput.value);
        document.getElementById('google-result-view').style.display = 'none';
        const jmyView = document.getElementById('google-jiangmingyuan-view');
        if (jmyView) jmyView.style.display = 'flex';
    }
}

    window.showGoogleJiangjianguo = function() {
        document.getElementById('google-home-view').style.display = 'none';
        document.getElementById('google-result-view').style.display = 'none';

        const alphabetView = document.getElementById('google-alphabet-view');
        if (alphabetView) alphabetView.style.display = 'none';

        document.getElementById('google-jiangjianguo-view').style.display = 'flex';
        document.getElementById('google-address-text').innerText = 'mingan.edu.xyzz/teachers/jiangjianguo';

        const backBtn = document.getElementById('google-back-btn');
        if(backBtn) {
            backBtn.style.opacity = '1';
            backBtn.style.cursor = 'pointer';
        }

        const scrollArea = document.getElementById('google-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;
    };

    window.performGoogleSearch = function(query) {
        if (!query || !query.trim()) return;
        query = query.trim();
        saveHistory(query);

        const homeView   = document.getElementById('google-home-view');
        const resultView = document.getElementById('google-result-view');
        const alphabetView= document.getElementById('google-alphabet-view');
        const navBar     = document.getElementById('google-nav-bar');
        const footer     = document.getElementById('google-footer');
        const navInput   = document.getElementById('google-nav-input');
        const addrText   = document.getElementById('google-address-text');
        const stats      = document.getElementById('google-result-stats');
        const resultList = document.getElementById('google-result-list');
        const homeInput  = document.getElementById('google-home-input');
        const hospView = document.getElementById('google-hospital-view');
        const jmyView = document.getElementById('google-jiangmingyuan-view');

        closeDrop('google-home-suggest-box', 'google-home-search-wrapper');
        closeDrop('google-nav-suggest-box',  'google-nav-search-wrapper');

        if (hospView) hospView.style.display = 'none';
        if (jmyView) jmyView.style.display = 'none';
        if (homeView)   homeView.style.display = 'none';
        if (alphabetView) alphabetView.style.display = 'none';
        const jjView = document.getElementById('google-jiangjianguo-view');
        if (jjView) jjView.style.display = 'none';
        if (resultView) resultView.style.display = 'block';
        if (navBar)     navBar.style.display = 'flex';
        if (footer)     footer.style.display = 'none';

        if (navInput)   navInput.value = query;
        if (addrText)   addrText.innerText = 'www.google.com/search?q=' + encodeURIComponent(query);
        if (homeInput)  homeInput.value = '';

        const backBtn = document.getElementById('google-back-btn');
        if (backBtn) { backBtn.style.opacity = '0.35'; backBtn.style.cursor = 'default'; }

        const qLow = query.toLowerCase();
        let matched = null;
        for (const entry of GOOGLE_SEARCH_DB) {
            if (entry.matched.some(kw => qLow.includes(kw.toLowerCase()) || kw.toLowerCase().includes(qLow))) {
                matched = entry;
                break;
            }
        }

        if (!resultList) return;
        resultList.innerHTML = '';

        if (matched) {
            const count = (Math.floor(Math.random() * 90000000) + 10000000).toLocaleString();
            const sec   = (Math.random() * 0.3 + 0.18).toFixed(2);
            if (stats) stats.innerHTML = `找到约 <strong style="color:#202124;">${count}</strong> 条结果（用时 ${sec} 秒）`;

            matched.results.forEach(r => {
                const div = document.createElement('div');
                div.style.cssText = 'margin-bottom:32px; max-width:680px;';

                div.innerHTML = `
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
                        <div style="width:18px;height:18px;background:#f8f9fa;border:1px solid #e8eaed;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${getFaviconSVG(r.favicon)}</div>
                        <span style="font-size:13px;color:#202124;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${r.displayUrl}</span>
                    </div>
                    <a href="#" data-action="${r.url}" class="google-result-link" style="display:block;font-size:20px;color:#1a0dab;text-decoration:none;line-height:1.3;margin-bottom:5px;word-break:break-word;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${r.title}</a>
                    <div style="font-size:14px;color:#4d5156;line-height:1.58;word-break:break-word;">${r.desc}</div>
                `;
                resultList.appendChild(div);
            });
        } else {
            if (stats) stats.innerHTML = '';
            resultList.innerHTML = `
                <div style="padding:12px 0; max-width:680px;">
                    <p style="font-size:16px;color:#202124;margin:0 0 16px;">找不到和您查询的"<strong>${query}</strong>"相符的内容。</p>
                    <p style="font-size:14px;color:#5f6368;margin:0 0 6px;font-weight:500;">建议：</p>
                    <ul style="font-size:14px;color:#5f6368;line-height:1.8;margin:0;padding-left:20px;">
                        <li>请检查字词有无错别字。</li>
                        <li>尝试使用其他关键词搜索。</li>
                    </ul>
                </div>`;
        }

        const scrollArea = document.getElementById('google-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;
    };

    function bindEvents() {
        const homeInput = document.getElementById('google-home-input');
        const navInput  = document.getElementById('google-nav-input');
        const searchBtn = document.getElementById('google-search-btn');
        const navIcon   = document.getElementById('google-nav-search-icon');
        const resultList = document.getElementById('google-result-list');
        const backBtn   = document.getElementById('google-back-btn');

        if (!homeInput) { setTimeout(bindEvents, 200); return; }

        const alphabetGrid = document.getElementById('google-alphabet-grid');
        if (alphabetGrid && alphabetGrid.innerHTML.trim() === '') {
            let gridHtml = '';
            for (let i = 0; i < 26; i++) {
                const letter = String.fromCharCode(65 + i);
                gridHtml += `
                    <div style="background: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px 0; text-align: center; transition: 0.2s; cursor: default; box-shadow: 0 1px 2px rgba(0,0,0,0.02);"
                         onmouseover="this.style.background='#f1f3f4';this.style.borderColor='#bdc1c6';this.style.transform='translateY(-2px)';"
                         onmouseout="this.style.background='#fdfdfd';this.style.borderColor='#e0e0e0';this.style.transform='translateY(0)';">
                        <div style="font-size: 20px; font-weight: bold; color: #1a73e8; margin-bottom: 2px;">${letter}</div>
                        <div style="font-size: 15px; color: #5f6368; font-family: 'Consolas', monospace; font-weight: 500;">${i}</div>
                    </div>
                `;
            }
            alphabetGrid.innerHTML = gridHtml;
        }

        if (resultList) {
            resultList.onclick = (e) => {
                const link = e.target.closest('.google-result-link');
                if (link) {
                    e.preventDefault();
                    const action = link.getAttribute('data-action');
                    if (action === 'action:show-alphabet') {
                        showGoogleAlphabet();
                    } else if (action === 'action:show-jiangjianguo') {
                        showGoogleJiangjianguo();
                    } else if (action === 'action:show-hospital') {
                        showGoogleHospital();
                    }else if (action === 'action:show-jiangmingyuan') {
                        showGoogleJiangmingyuan();
                    }
                }
            };
        }
        if (backBtn) {
            backBtn.onclick = () => {
                if (backBtn.style.cursor === 'pointer') {
                    const alphabetView = document.getElementById('google-alphabet-view');
                    if (alphabetView) alphabetView.style.display = 'none';

                    const jjView = document.getElementById('google-jiangjianguo-view');
                    if (jjView) jjView.style.display = 'none';
                    const hospView = document.getElementById('google-hospital-view');
                    if (hospView) hospView.style.display = 'none';

                    const jmyView = document.getElementById('google-jiangmingyuan-view');
                    if (jmyView) jmyView.style.display = 'none';

                    document.getElementById('google-result-view').style.display = 'block';

                    const currentQuery = navInput ? navInput.value : '';
                    document.getElementById('google-address-text').innerText = 'www.google.com/search?q=' + encodeURIComponent(currentQuery);

                    backBtn.style.opacity = '0.35';
                    backBtn.style.cursor = 'default';
                }
            };
        }

        homeInput.addEventListener('focus', () => { renderDropdown('google-home-suggest-box', 'google-home-search-wrapper', homeInput.value.trim(), performGoogleSearch); });
        homeInput.addEventListener('input', () => { renderDropdown('google-home-suggest-box', 'google-home-search-wrapper', homeInput.value.trim(), performGoogleSearch); });
        homeInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const q = homeInput.value.trim();
                if (q) performGoogleSearch(q); else closeDrop('google-home-suggest-box', 'google-home-search-wrapper');
            }
            if (e.key === 'Escape') closeDrop('google-home-suggest-box', 'google-home-search-wrapper');
        });

        if (navInput) {
            navInput.addEventListener('focus', () => {
                renderDropdown('google-nav-suggest-box', 'google-nav-search-wrapper', navInput.value.trim(), (q) => { navInput.value = q; performGoogleSearch(q); });
            });
            navInput.addEventListener('input', () => {
                renderDropdown('google-nav-suggest-box', 'google-nav-search-wrapper', navInput.value.trim(), (q) => { navInput.value = q; performGoogleSearch(q); });
            });
            navInput.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    const q = navInput.value.trim();
                    if (q) performGoogleSearch(q);
                    closeDrop('google-nav-suggest-box', 'google-nav-search-wrapper');
                }
                if (e.key === 'Escape') closeDrop('google-nav-suggest-box', 'google-nav-search-wrapper');
            });
        }

        if (searchBtn) searchBtn.onclick = () => { const q = homeInput.value.trim(); if (q) performGoogleSearch(q); };
        if (navIcon) navIcon.onclick = () => { const q = navInput ? navInput.value.trim() : ''; if (q) performGoogleSearch(q); };

        document.addEventListener('mousedown', e => {
            const homeBox  = document.getElementById('google-home-suggest-box');
            const navBox   = document.getElementById('google-nav-suggest-box');
            const homeWrap = document.getElementById('google-home-search-wrapper');
            const navWrap  = document.getElementById('google-nav-search-wrapper');
            if (homeBox && homeBox.style.display !== 'none') {
                if (!homeBox.contains(e.target) && !homeWrap.contains(e.target)) closeDrop('google-home-suggest-box', 'google-home-search-wrapper');
            }
            if (navBox && navBox.style.display !== 'none') {
                if (!navBox.contains(e.target) && navWrap && !navWrap.contains(e.target)) closeDrop('google-nav-suggest-box', 'google-nav-search-wrapper');
            }
        });
    }

    const _origOpen = window.openApp;
    window.openApp = function(appId) {
        _origOpen(appId);
        if (appId === 'google') {
            requestAnimationFrame(() => {
                if (typeof showGoogleHome === 'function') showGoogleHome();
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindEvents);
    } else {
        bindEvents();
    }

})();
