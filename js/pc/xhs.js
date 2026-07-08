(function initXHS() {
 
    const _isZ2 = localStorage.getItem('win10_zhoumu2') === 'true';
    const _isZ3 = localStorage.getItem('win10_zhoumu3') === 'true';
    if (_isZ2 || _isZ3) {
        const icon = document.getElementById('icon-xhs');
        if (icon) icon.style.display = 'none';
        return;
    }
 
    const XHS_KEY = 'xhs_state_v3';
    let xhsState = (() => {
        try { const s = JSON.parse(localStorage.getItem(XHS_KEY)); if (s && s.likes) return s; } catch(e) {}
        return { likes:{}, collected:{}, followed:{}, comments:{} };
    })();
    function xhsSave() { localStorage.setItem(XHS_KEY, JSON.stringify(xhsState)); }
 
    const POSTS = [
        { id:1, title:'没啥大本事，25岁装修100㎡小家普通却温馨', body:'关于我家：\n坐标辽宁，普通高层楼房，南北通透\n建面116平，套内93平，三室两厅一厨一卫\n房子虽然不大，但100平的小家足够两人生活，25岁时拥有装修了这个小家，如今已经住进新家第二年了。\n温馨自由舒服，无论多晚回家，都有一盏灯在为自己点亮，就足够啦\n\n装修感受：\n自己设计的家，没有找装修公司\n风格：简约, ins', imgs:['xhs/xhs7.webp','xhs/xhs8.webp'], author:'惠宝儿', avatar: 'xhs/xhs2.webp', likes:18000, cat:'装修', tags:['装修日记','小户型装修','家居美学'], date:'2020-05-25', h:240 },
        { id:2, title:'短发扎着还是披着，怎么好看怎么来！', body:'短发妹妹的日常造型分享，随手一扎就很清爽，不同场合不同风格，总有一款适合你。日常上班首选低马尾，约会首选半扎发！', imgs:['xhs/xhs15_png.webp'], author:'无敌桃桃', avatar:'桃', likes:3627, cat:'时尚', tags:['短发','日常造型'], date:'2020-05-26', h:300 },
        { id:3, title:'我婆婆迫不及待再来中国', body:'带婆婆走遍了北京的大街小巷，胡同、故宫、颐和园……外国人眼中的中国，比我们想象的更美丽。婆婆已经迫不及待要第二次来了！', imgs:['xhs/xhs17.jpg'], author:'张霖铃', avatar:'张', likes:27000, cat:'旅行', tags:['中国旅游','北京'], date:'2020-05-28', h:260 },
        { id:4, title:'倪妮减肥法5天狂掉13斤 三伏天王炸食谱！', body:'三伏天减脂期间的饮食记录，低卡高蛋白，不节食不饿肚子！跟着名人食谱走，科学减肥不反弹。附详细食谱和热量表。\n\n早餐：燕麦+鸡蛋+蔬菜\n午餐：鸡胸肉+糙米\n晚餐：轻食沙拉', imgs:['xhs/xhs19_png.webp'], author:'五十妞爱养生', avatar:'xhs/xhs37.webp', likes:21000, cat:'美食', tags:['减肥','健康饮食','食谱'], date:'2020-06-2', h:320 },
        { id:5, title:'全村都知道我带爷爷去北京旅游了', body:'带爷爷来北京第一次坐高铁，爷爷开心得像个孩子！在北京南站拍了好多照片，爷爷说这辈子没见过这么大的站，一定要再来一次。', imgs:['xhs/xhs16_png.webp'], author:'唐安妮', avatar:'xhs/xhs24.webp', likes:22000, cat:'旅行', tags:['亲情','旅行','北京'], date:'2020-06-02', h:270 },
        { id:6, title:'从校服到婚纱八年，愿意等我长大', body:'从高中同学到人生伴侣，8年的时光见证了我们的成长。当年的校服少年，如今穿上了婚纱和礼服，感谢你一直等我长大。', imgs:['xhs/xhs14_png.webp'], author:'kk', avatar:'xhs/xhs14_jpg.webp', likes:20000, cat:'生活', tags:['婚纱','爱情故事'], date:'2020-05-28', h:280 },
        { id:8, title:'小小友谊', body:'今天的任务：\n和好朋友一起吃火锅✅\n一起聊天✅\n一起开心✅\n快乐值100分！\n没有什么烦恼是一顿火锅解决不了的', imgs:['xhs/xhs18.webp'], author:'月月', avatar:'image/yueyue.webp', likes:15000, cat:'美食', tags:['火锅','好吃'], date:'2020-05-20', h:360 },
        { id:9, title:'周末在家包饺子', body:'好久没全家一起包饺子了。\n妈妈调的三鲜馅，皮薄馅大，一口一个。\n爸爸负责擀皮，我负责把它们摆得歪歪扭扭。\n冒着热气的一盘端上桌，那一刻觉得，平平淡淡才是最幸福的事。', imgs:['xhs/xhs38.webp'], author:'阿圆的小厨房', avatar:'xhs/xhs38.webp', likes:8624, cat:'美食', tags:['家常菜','饺子','治愈日常'], date:'2020-05-30', h:300 },
    ];
 
    const SEED_COMMENTS = {
        1: [
            { id:101, user:'爱吃西柚', text:'真的九十三嘛为啥看起来这么大', avatar:'xhs/xhs.webp', date:'2020-05-30', likes:12 },
            { id:102, user:'惠宝儿', text:'套内93', date:'2020-05-29', likes:5, isAuthor:true, avatar:'xhs/xhs2.webp' },
            { id:103, user:'橘子汽水', text:'完全看不出来才93，布局太显大了', date:'2020-05-31', likes:8, avatar:'xhs/xhs3.jpg' },
            { id:104, user:'今天也要开心', text:'客厅真的宽敞', date:'2020-05-28', likes:3, avatar:'xhs/xhs4.webp' },
            { id:105, user:'小熊软糖', text:'我家120都没这个视觉效果', date:'2020-06-01', likes:18 },
            { id:106, user:'慢慢来', text:'采光也很好，看着更大', date:'2020-05-27', likes:6, avatar:'xhs/xhs5.webp' },
            { id:107, user:'山茶花', text:'装修风格很加分', date:'2020-05-26', likes:4, avatar:'xhs/xhs6.webp' },
            { id:108, user:'阿白', text:'收纳做得好就显大', date:'2020-05-25', likes:5 },
            { id:109, user:'糯米团子', text:'第一眼以为130平', date:'2020-05-31', likes:14 },
        ],
        2: [
            { id:701, user:'奶茶半糖', text:'短发真的太适合夏天了', avatar:'xhs/xhs18.jpg', date:'2020-05-28', likes:67 },
            { id:704, user:'爱zzq', text:'半扎发那个好温柔啊', avatar:'xhs/xhs19_jpg.webp', date:'2020-06-02', likes:58 },
            { id:705, user:'晚风', text:'终于找到适合短发的教程了', avatar:'xhs/xhs20.webp', date:'2020-06-02', likes:42 },
            { id:706, user:'小兔乖乖', text:'上班这样扎真的显得很利落', avatar:'xhs/xhs23.webp', date:'2020-06-03', likes:25 },
            { id:707, user:'草莓味汽水', text:'求出个视频版教程', avatar:'xhs/xhs22.webp', date:'2020-06-04', likes:31 },
            { id:708, user:'云朵棉花糖', text:'约会用这发型绝了', avatar:'xhs/xhs21.webp', date:'2020-06-05', likes:54 },
        ],
        3: [
            { id:901, user:'张志豪', text:'欢迎婆婆再来中国玩！', avatar:'xhs/xhs30.webp', date:'2020-06-02', likes:116 },
            { id:904, user:'阿豪', text:'中国好玩的地方太多了，北京只是开始', date:'2020-06-03', likes:95 },
            { id:905, user:'Wendy0918', text:'外国长辈喜欢中国美食吗？', date:'2020-06-04', likes:41 },
            { id:906, user:'周同学', text:'颐和园真的很适合带老人慢慢逛', avatar:'xhs/xhs31.jpg', date:'2020-06-04', likes:58 },
            { id:907, user:'Eric', text:'下次可以带婆婆去西安看看', avatar:'xhs/xhs32.webp', date:'2020-06-05', likes:63 },
        ],
        4: [
            { id:401, user:'减肥er', text:'跟了三天掉了2斤', date:'2020-06-04', likes:45 },
            { id:402, user:'samdy', text:'靠谱吗？有没有姐妹说下', avatar:'xhs/xhs10.jpg', date:'2020-06-02', likes:31 },
            { id:403, user:'柠檬不酸', text:'跟着吃了两天，状态不错', avatar:'xhs/xhs11.webp', date:'2020-06-05', likes:34 },
            { id:404, user:'减肥成功版', text:'先收藏，等三伏天开始跟', avatar:'xhs/xhs12.webp', date:'2020-06-03', likes:12 },
        ],
        5: [
            { id:801, user:'陈同学', text:'爷爷笑得好开心，看着好治愈', avatar:'xhs/xhs25.jpg', date:'2020-06-02', likes:128 },
            { id:802, user:'安安', text:'一定要多带老人家出去看看世界', avatar:'xhs/xhs26.webp', date:'2020-06-02', likes:96 },
            { id:804, user:'Kevin', text:'看到爷爷开心我也跟着开心了', avatar:'xhs/xhs27.webp',date:'2020-06-03', likes:88 },
            { id:806, user:'小泽', text:'爷爷有你这样的孙女真幸福', avatar:'xhs/xhs28.webp', date:'2020-06-04', likes:142 },
            { id:807, user:'沈小溪', text:'看得我也想带我爷爷出去玩了', avatar:'xhs/xhs29.webp', date:'2020-06-05', likes:67 },
            { id:808, user:'阿哲', text:'这种陪伴比什么礼物都珍贵', date:'2020-06-05', likes:103 },
        ],
        6: [
            { id:701, user:'幸福的人', text:'好甜啊！祝你们百年好合！', avatar:'xhs/xhs13.webp', date:'2020-05-28', likes:67 },
            { id:702, user:'羡慕', text:'8年！真的太感动了', date:'2020-05-28', likes:89 },
            { id:703, user:'macyc', text:'一定要一直幸福下去呀', avatar:'xhs/xhs15_jpg.webp',date:'2020-06-01', likes:36 },
            { id:704, user:'糖果超甜', text:'这组婚纱照拍得真好看', avatar:'xhs/xhs16_jpg.webp',date:'2020-06-02', likes:58 },
        ],
        8: [
            { id:701, user:'Kiki', text:'快乐就是和朋友一起炫火锅', avatar:'xhs/xhs36.webp', date:'2020-05-28', likes:67 },
            { id:702, user:'周周', text:'聊天配火锅简直满分组合', avatar:'xhs/xhs35.webp', date:'2020-05-28', likes:89 },
            { id:703, user:'Yuki', text:'这样的友谊真的很舒服', avatar:'xhs/xhs34.webp', date:'2020-06-01', likes:36 },
            { id:704, user:'阿豪', text:'看得我也想约朋友吃火锅了', avatar:'xhs/xhs33.webp', date:'2020-06-02', likes:58 },
        ],
        9: [
            { id:910, user:'小满', text:'三鲜馅yyds！看饿了', avatar:'xhs/xhs4.webp', date:'2020-05-31', likes:21 },
            { id:911, user:'今天也要开心', text:'一家人一起包饺子的感觉真好', avatar:'xhs/xhs5.webp', date:'2020-05-31', likes:33 },
            { id:912, user:'橘子汽水', text:'歪歪扭扭的最可爱啦', avatar:'xhs/xhs6.webp', date:'2020-06-01', likes:9 },
            { id:913, user:'阿白', text:'突然好想家', date:'2020-06-02', likes:46 },
        ]
    };
 
    const TABS = ['推荐','生活','装修','美食','时尚','旅行',];
    const SIDE_NAV = [
        { label:'推荐', cat:'', icon:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
        { label:'生活', cat:'生活', icon:'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' },
        { label:'装修', cat:'装修', icon:'M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM3 9V7a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2' },
        { label:'美食', cat:'美食', icon:'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z' },
        { label:'时尚', cat:'时尚', icon:'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
        { label:'旅行', cat:'旅行', icon:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0' },
    ];
    const HOT_TAGS = ['#装修日记','#25岁','#小户型','#减肥打卡','#北京旅游','#校服到婚纱'];
 
    let xhsCat = '', xhsSearch = '', xhsPost = null, xhsImgIdx = 0;
 
    let xhsReplyTo = null;

    const CURRENT_USER = {
        name: '宁宁',
        avatar: 'image/ningning.webp'
    };

    const AVATAR_COLORS = ['#ff2442','#ff7043','#ab47bc','#42a5f5','#26a69a','#e91e63','#ff8f00'];
    function avatarColor(name) { let h=0; for(let c of name) h=(h*31+c.charCodeAt(0))%AVATAR_COLORS.length; return AVATAR_COLORS[Math.abs(h)]; }
    function fmtN(n) { return n >= 10000 ? (n/10000).toFixed(1)+'万' : String(n); }
    function getLikes(id) { return POSTS.find(p=>p.id===id).likes + (xhsState.likes[id] ? 1 : 0); }
 
    function _getAvatarHtml(avatarVal, fallbackName, size, fontSize, extraStyle = '') {
        const isImage = avatarVal && (
            avatarVal.startsWith('http') || 
            avatarVal.startsWith('data:') || 
            avatarVal.includes('/') || 
            avatarVal.includes('.')
        );

        if (isImage) {
            return `<img src="${avatarVal}" style="width:${size}px; height:${size}px; border-radius:50%; object-fit:cover; flex-shrink:0; display:block; ${extraStyle}">`;
        }
        

        let char = fallbackName ? fallbackName[0] : '匿';
        if (avatarVal && !isImage) {
            char = avatarVal[0];
        }
        return `<div style="width:${size}px; height:${size}px; border-radius:50%; background:${avatarColor(fallbackName || '匿')}; color:#fff; font-size:${fontSize}px; font-weight:600; display:flex; align-items:center; justify-content:center; flex-shrink:0; ${extraStyle}">${char}</div>`;
    }

    const SVG = {
        check: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        heart: (filled, color) => `<svg viewBox="0 0 24 24" width="13" height="13" fill="${filled ? color : 'none'}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
        star: (filled) => `<svg viewBox="0 0 24 24" width="13" height="13" fill="${filled ? '#ff8c00' : 'none'}" stroke="${filled ? '#ff8c00' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        share: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
        reply: `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/></svg>`,
        close: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
        x: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
        info: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    };
 
    function xhsBuildStatic() {
        const tabEl = document.getElementById('xhs-tabs');
        if (!tabEl) return;
        TABS.forEach((t, i) => {
            const d = document.createElement('div');
            d.style.cssText = `padding:10px 16px; font-size:13px; color:${i===0?'#ff2442':'#767676'}; cursor:pointer; border-bottom:2px solid ${i===0?'#ff2442':'transparent'}; margin-bottom:-1px; transition:.15s; font-weight:${i===0?'600':'500'}; white-space:nowrap; flex-shrink:0;`;
            d.textContent = t;
            d.onclick = () => {
                tabEl.querySelectorAll('div').forEach(x => { x.style.color='#767676'; x.style.borderBottomColor='transparent'; x.style.fontWeight='500'; });
                d.style.color='#ff2442'; d.style.borderBottomColor='#ff2442'; d.style.fontWeight='600';
                xhsCat = i === 0 ? '' : t;
                _syncSideActive();
                xhsRenderFeed();
            };
            tabEl.appendChild(d);
        });
 
        const sideEl = document.getElementById('xhs-side-items');
        SIDE_NAV.forEach((item, i) => {
            const d = document.createElement('div');
            d.id = `xhs-side-${i}`;
            d.dataset.cat = item.cat;
            d.style.cssText = `display:flex; align-items:center; gap:7px; padding:7px 6px; border-radius:7px; cursor:pointer; font-size:12px; color:${i===0?'#ff2442':'#767676'}; font-weight:500; transition:.15s; background:${i===0?'#fff0f2':'transparent'}; margin-bottom:2px;`;
            d.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${item.icon}"/></svg>${item.label}`;
            d.onmouseenter = () => { if(xhsCat !== item.cat) d.style.background='#f5f5f5'; };
            d.onmouseleave = () => { if(xhsCat !== item.cat) d.style.background='transparent'; };
            d.onclick = () => {
                xhsCat = item.cat;
                _syncSideActive();
                _syncTabActive();
                xhsRenderFeed();
            };
            if (sideEl) sideEl.appendChild(d);
        });
 
        const tagEl = document.getElementById('xhs-side-tags');
        HOT_TAGS.forEach(tag => {
            const s = document.createElement('span');
            s.style.cssText = `display:inline-block; background:#f0f0f0; border-radius:10px; padding:3px 8px; font-size:11px; color:#767676; margin:2px 2px 0 0; cursor:pointer; transition:.15s;`;
            s.textContent = tag;
            s.onmouseenter = () => { s.style.background='#fff0f2'; s.style.color='#ff2442'; };
            s.onmouseleave = () => { s.style.background='#f0f0f0'; s.style.color='#767676'; };
            s.onclick = () => {
                const q = tag.replace('#','');
                const inp = document.getElementById('xhs-search-input');
                if (inp) inp.value = q;
                xhsFilter(q);
            };
            if (tagEl) tagEl.appendChild(s);
        });
 
        xhsRenderFeed();
    }
 
    function _syncSideActive() {
        SIDE_NAV.forEach((item, si) => {
            const sEl = document.getElementById(`xhs-side-${si}`);
            if (sEl) {
                const active = sEl.dataset.cat === xhsCat;
                sEl.style.background = active ? '#fff0f2' : 'transparent';
                sEl.style.color = active ? '#ff2442' : '#767676';
            }
        });
    }
 
    function _syncTabActive() {
        const tabEl = document.getElementById('xhs-tabs');
        if (!tabEl) return;
        tabEl.querySelectorAll('div').forEach((x, xi) => {
            const tabCat = xi === 0 ? '' : TABS[xi];
            const active = tabCat === xhsCat;
            x.style.color = active ? '#ff2442' : '#767676';
            x.style.borderBottomColor = active ? '#ff2442' : 'transparent';
            x.style.fontWeight = active ? '600' : '500';
        });
    }
 
    window.xhsFilter = function(q) {
        xhsSearch = q;
        xhsRenderFeed();
    };
 
    function xhsRenderFeed() {
        const feed = document.getElementById('xhs-feed');
        if (!feed) return;
        let posts = POSTS;
        if (xhsCat) posts = posts.filter(p => p.cat === xhsCat || p.tags.some(t => t.includes(xhsCat)));
        if (xhsSearch) posts = posts.filter(p => p.title.includes(xhsSearch) || p.body.includes(xhsSearch) || p.tags.some(t => t.includes(xhsSearch)));
        feed.innerHTML = '';
        if (!posts.length) {
            feed.style.columns = '1';
            feed.innerHTML = `<div style="text-align:center; padding:60px 20px; color:#b3b3b3; font-size:13px;">没有找到"${xhsSearch}"相关内容</div>`;
            return;
        }
        feed.style.columns = '4';
        posts.forEach(p => {
            const liked = !!xhsState.likes[p.id];
            const lk = getLikes(p.id);
            const d = document.createElement('div');
            d.style.cssText = `break-inside:avoid; margin-bottom:10px; background:#fff; border-radius:10px; overflow:hidden; cursor:pointer; border:1px solid #ebebeb; transition:transform .15s, box-shadow .15s;`;
            d.onmouseenter = () => { d.style.transform='translateY(-2px)'; d.style.boxShadow='0 5px 16px rgba(0,0,0,.1)'; };
            d.onmouseleave = () => { d.style.transform=''; d.style.boxShadow=''; };
 
            const likeBtn = document.createElement('div');
            likeBtn.id = `xhs-like-${p.id}`;
            likeBtn.style.cssText = `display:flex; align-items:center; gap:3px; font-size:11px; color:${liked?'#ff2442':'#b3b3b3'}; cursor:pointer; padding:3px 5px; border-radius:10px; transition:.15s;`;
            likeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="${liked?'#ff2442':'none'}" stroke="${liked?'#ff2442':'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>${fmtN(lk)}`;
            likeBtn.onmouseenter = () => { likeBtn.style.background='#fff0f2'; };
            likeBtn.onmouseleave = () => { likeBtn.style.background='transparent'; };
            likeBtn.onclick = (e) => { e.stopPropagation(); xhsToggleLikeCard(p.id); };
 
            d.innerHTML = `
                <div style="position:relative; height:${p.h}px; background:#f0f0f0; overflow:hidden;">
                    <img src="${p.imgs[0]}" style="width:100%; height:100%; object-fit:cover; display:block; transition:transform .3s;" loading="lazy" onerror="this.style.display='none'" onmouseenter="this.style.transform='scale(1.03)'" onmouseleave="this.style.transform=''">
                    ${p.imgs.length>1 ? `<span style="position:absolute;top:7px;right:7px;background:rgba(0,0,0,.45);color:#fff;border-radius:8px;padding:2px 7px;font-size:10px;">1/${p.imgs.length}</span>` : ''}
                </div>
                <div style="padding:8px 10px 10px;">
                    <div style="font-size:12px; color:#333; line-height:1.5; margin-bottom:7px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${p.title}</div>
                    <div style="display:flex; align-items:center; justify-content:space-between;">
                        <div style="display:flex; align-items:center; gap:4px; font-size:11px; color:#767676;">
                            ${_getAvatarHtml(p.avatar, p.author, 18, 9)}
                            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:60px;">${p.author}</span>
                        </div>
                    </div>
                </div>`;
            const infoRow = d.querySelector('div[style*="justify-content:space-between"]');
            if (infoRow) infoRow.appendChild(likeBtn);
            d.onclick = () => xhsOpenPost(p.id);
            feed.appendChild(d);
        });
    }
 
    window.xhsToggleLikeCard = function(id) {
        if (xhsState.likes[id]) { delete xhsState.likes[id]; } else { xhsState.likes[id] = true; }
        xhsSave();
        const liked = !!xhsState.likes[id];
        const el = document.getElementById(`xhs-like-${id}`);
        if (el) {
            el.style.color = liked ? '#ff2442' : '#b3b3b3';
            el.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="${liked?'#ff2442':'none'}" stroke="${liked?'#ff2442':'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>${fmtN(getLikes(id))}`;
        }
        if (xhsPost && xhsPost.id === id) xhsUpdateModalLike();
        xhsToast(liked ? '已点赞' : '已取消点赞', liked ? 'heart' : 'x');
    };
 
    window.xhsOpenPost = function(id) {
        xhsPost = POSTS.find(p => p.id === id);
        xhsImgIdx = 0;
        xhsReplyTo = null;
        xhsRenderModal();
        const m = document.getElementById('xhs-modal');
        if (m) { m.style.display = 'flex'; }
    };
 
    window.xhsClosePost = function() {
        xhsPost = null;
        xhsReplyTo = null;
        const m = document.getElementById('xhs-modal');
        if (m) m.style.display = 'none';
    };
 
    window.xhsChangeImg = function(dir) {
        if (!xhsPost) return;
        xhsImgIdx = (xhsImgIdx + dir + xhsPost.imgs.length) % xhsPost.imgs.length;
        const img = document.getElementById('xhs-modal-img');
        const ctr = document.getElementById('xhs-img-ctr');
        if (img) img.src = xhsPost.imgs[xhsImgIdx];
        if (ctr) ctr.textContent = `${xhsImgIdx+1}/${xhsPost.imgs.length}`;
    };
 
    window.xhsToggleLikeModal = function() {
        if (!xhsPost) return;
        const id = xhsPost.id;
        if (xhsState.likes[id]) { delete xhsState.likes[id]; } else { xhsState.likes[id] = true; }
        xhsSave();
        const liked = !!xhsState.likes[id];
        xhsUpdateModalLike();
        const el = document.getElementById(`xhs-like-${id}`);
        if (el) {
            el.style.color = liked ? '#ff2442' : '#b3b3b3';
            el.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="${liked?'#ff2442':'none'}" stroke="${liked?'#ff2442':'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>${fmtN(getLikes(id))}`;
        }
        xhsToast(liked ? '已点赞' : '已取消点赞', liked ? 'heart' : 'x');
    };
 
    function xhsUpdateModalLike() {
        if (!xhsPost) return;
        const liked = !!xhsState.likes[xhsPost.id];
        const btn = document.getElementById('xhs-btn-like');
        if (!btn) return;
        btn.style.color = liked ? '#ff2442' : '#767676';
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="17" height="17" fill="${liked?'#ff2442':'none'}" stroke="${liked?'#ff2442':'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> ${fmtN(getLikes(xhsPost.id))}`;
    }
 
    window.xhsToggleCollect = function() {
        if (!xhsPost) return;
        const id = xhsPost.id;
        if (xhsState.collected[id]) { delete xhsState.collected[id]; } else { xhsState.collected[id] = true; }
        xhsSave();
        const coll = !!xhsState.collected[id];
        const btn = document.getElementById('xhs-btn-collect');
        if (btn) {
            btn.style.color = coll ? '#ff8c00' : '#767676';
            btn.innerHTML = `<svg viewBox="0 0 24 24" width="17" height="17" fill="${coll?'#ff8c00':'none'}" stroke="${coll?'#ff8c00':'currentColor'}" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${coll?'已收藏':'收藏'}`;
        }
        xhsToast(coll ? '已收藏' : '取消收藏', coll ? 'star' : 'x');
    };
 
    window.xhsToggleFollow = function(author) {
        if (xhsState.followed[author]) { delete xhsState.followed[author]; } else { xhsState.followed[author] = true; }
        xhsSave();
        const f = !!xhsState.followed[author];
        const btn = document.getElementById('xhs-follow-btn');
        if (btn) {
            btn.textContent = f ? '已关注' : '+ 关注';
            btn.style.background = f ? '#fff' : '#ff2442';
            btn.style.color = f ? '#ff2442' : '#fff';
            btn.style.border = f ? '1.5px solid #ff2442' : 'none';
        }
        xhsToast(f ? `已关注 ${author}` : `已取消关注 ${author}`, f ? 'check' : 'x');
    };
 
    window.xhsSharePost = function() {
        xhsToast('链接已复制', 'check');
    };
 
    window.xhsLikeComment = function(cid) {
        const key = 'clike_' + cid;
        if (xhsState[key]) { delete xhsState[key]; } else { xhsState[key] = true; }
        xhsSave();
        const liked = !!xhsState[key];
        const el = document.getElementById('xhs-clike-' + cid);
        if (el) {
            const allC = _getAllComments(xhsPost?.id);
            const c = allC.find(x => x.id === cid);
            const lk = (c ? c.likes : 0) + (liked ? 1 : 0);
            el.style.color = liked ? '#ff2442' : '#b3b3b3';
            el.innerHTML = `<svg viewBox="0 0 24 24" width="11" height="11" fill="${liked?'#ff2442':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> ${lk}`;
        }
    };
 
    window.xhsStartReply = function(cid, userName) {
        xhsReplyTo = { cid, user: userName };
        const inp = document.getElementById('xhs-cmt-inp');
        const replyBar = document.getElementById('xhs-reply-bar');
        if (replyBar) {
            document.getElementById('xhs-reply-name').textContent = `回复 @${userName}`;
            replyBar.style.display = 'flex';
        }
        if (inp) {
            inp.placeholder = `回复 @${userName}...`;
            inp.focus();
        }
    };
 
    window.xhsCancelReply = function() {
        xhsReplyTo = null;
        const inp = document.getElementById('xhs-cmt-inp');
        const replyBar = document.getElementById('xhs-reply-bar');
        if (replyBar) replyBar.style.display = 'none';
        if (inp) inp.placeholder = '说点什么...';
    };
 
    window.xhsSubmitComment = function() {
        const inp = document.getElementById('xhs-cmt-inp');
        if (!inp || !xhsPost) return;
        const text = inp.value.trim();
        if (!text) { inp.focus(); return; }
        if (!xhsState.comments[xhsPost.id]) xhsState.comments[xhsPost.id] = [];
        const now = new Date();
        const newComment = {
            id: Date.now(),
            user: CURRENT_USER.name, 
            avatar: CURRENT_USER.avatar,  
            text,
            date: now.toISOString().split('T')[0],
            likes: 0,
            replyTo: xhsReplyTo ? xhsReplyTo.user : null,
            parentId: xhsReplyTo ? xhsReplyTo.cid : null,
        };
        xhsState.comments[xhsPost.id].push(newComment);
        xhsSave();
        inp.value = '';
        xhsReplyTo = null;
 
        _appendCommentNode(newComment, xhsPost.id);
        _updateCommentCount(xhsPost.id);
        
        const replyBar = document.getElementById('xhs-reply-bar');
        if (replyBar) replyBar.style.display = 'none';
        inp.placeholder = '说点什么...';
        xhsToast('评论已发布', 'check');
        setTimeout(() => {
            const ms = document.getElementById('xhs-modal-scroll');
            if (ms) ms.scrollTop = ms.scrollHeight;
        }, 80);
    };
 
    function _getAllComments(pid) {
        return [...(SEED_COMMENTS[pid] || []), ...(xhsState.comments[pid] || [])];
    }
 
    function _updateCommentCount(pid) {
        const el = document.getElementById('xhs-cmt-count');
        if (el) el.textContent = `共 ${_getAllComments(pid).length} 条评论`;
    }
 
    function _getRootId(cid, pid) {
        const allC = _getAllComments(pid);
        let currentId = cid;
        while (true) {
            const c = allC.find(x => x.id === currentId);
            if (!c || !c.parentId) break;
            currentId = c.parentId;
        }
        return currentId;
    }

    function _appendCommentNode(c, pid) {
        const container = document.getElementById('xhs-comments-list');
        if (!container) return;
        const node = _buildCommentNode(c, pid);
 
        if (c.parentId) {
            const rootId = _getRootId(c.parentId, pid);
            const rootNode = document.getElementById(`xhs-comment-${rootId}`);
            
            if (rootNode) {
                let repliesBox = document.getElementById(`xhs-replies-${rootId}`);
                if (!repliesBox) {
                    repliesBox = document.createElement('div');
                    repliesBox.id = `xhs-replies-${rootId}`;
                    repliesBox.style.marginBottom = '14px'; 
                    rootNode.style.marginBottom = '8px'; 
                    rootNode.insertAdjacentElement('afterend', repliesBox);
                }
                repliesBox.appendChild(node);
                return;
            }
        }
        
        container.appendChild(node);
    }
 
    function _buildCommentNode(c, pid) {
        const cLiked = !!xhsState['clike_'+c.id];
        const lk = c.likes + (cLiked ? 1 : 0);
        const wrap = document.createElement('div');
        wrap.id = `xhs-comment-${c.id}`;
        wrap.style.cssText = `display:flex; gap:9px; margin-bottom:14px; padding:${c.parentId ? '10px 10px 0 10px' : '0'}; ${c.parentId ? 'background:#fafafa; border-radius:8px; margin-left:37px; margin-bottom:8px;' : ''}`;
 
        const replyTag = c.replyTo ? `<span style="color:#ff2442; font-size:12px; margin-right:2px;">@${c.replyTo}</span> ` : '';
 
        wrap.innerHTML = `
            ${_getAvatarHtml(c.avatar, c.user, 28, 11)}
            <div style="flex:1; min-width:0;">
                <div style="font-size:12px; font-weight:600; color:#333; margin-bottom:3px; display:flex; align-items:center; gap:5px;">
                    ${c.user}
                    ${c.isAuthor ? '<span style="background:#fff0f2;color:#ff2442;border-radius:3px;padding:1px 4px;font-size:10px;font-weight:500;">作者</span>' : ''}
                </div>
                <div style="font-size:13px; color:#333; line-height:1.55;">${replyTag}${c.text}</div>
                <div style="display:flex; gap:14px; align-items:center; margin-top:5px;">
                    <span style="font-size:11px; color:#b3b3b3;">${c.date}</span>
                    <span id="xhs-clike-${c.id}" style="display:flex; align-items:center; gap:3px; font-size:11px; color:${cLiked?'#ff2442':'#b3b3b3'}; cursor:pointer; transition:.15s; user-select:none;">
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="${cLiked?'#ff2442':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                        ${lk}
                    </span>
                    <span style="display:flex; align-items:center; gap:3px; font-size:11px; color:#b3b3b3; cursor:pointer; transition:.15s; user-select:none;" class="xhs-reply-btn" data-cid="${c.id}" data-user="${c.user}">
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/></svg>
                        回复
                    </span>
                </div>
            </div>`;
 
        const likeSpan = wrap.querySelector(`#xhs-clike-${c.id}`);
        if (likeSpan) likeSpan.onclick = (e) => { e.stopPropagation(); xhsLikeComment(c.id); };
 
        const replySpan = wrap.querySelector('.xhs-reply-btn');
        if (replySpan) {
            replySpan.onmouseenter = () => { replySpan.style.color = '#ff2442'; };
            replySpan.onmouseleave = () => { replySpan.style.color = '#b3b3b3'; };
            replySpan.onclick = (e) => { e.stopPropagation(); xhsStartReply(parseInt(replySpan.dataset.cid), replySpan.dataset.user); };
        }
        return wrap;
    }
 
    function xhsRenderModal() {
        const p = xhsPost;
        if (!p) return;
        const inner = document.getElementById('xhs-modal-inner');
        if (!inner) return;
        const liked = !!xhsState.likes[p.id];
        const coll = !!xhsState.collected[p.id];
        const followed = !!xhsState.followed[p.author];
        const allC = _getAllComments(p.id);
 
        inner.innerHTML = `
            <div style="flex:0 0 50%; position:relative; background:#111; overflow:hidden; display:flex; align-items:center; justify-content:center;">
                <img id="xhs-modal-img" src="${p.imgs[xhsImgIdx]}" style="width:100%; height:100%; object-fit:contain; display:block; user-select:none;">
                ${p.imgs.length > 1 ? `
                    <button id="xhs-img-prev" style="position:absolute; top:50%; left:10px; transform:translateY(-50%); background:rgba(255,255,255,.88); border:none; width:32px; height:32px; border-radius:50%; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#333; box-shadow:0 1px 6px rgba(0,0,0,.18); transition:.15s;" onmouseenter="this.style.background='rgba(255,255,255,1)'" onmouseleave="this.style.background='rgba(255,255,255,.88)'">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button id="xhs-img-next" style="position:absolute; top:50%; right:10px; transform:translateY(-50%); background:rgba(255,255,255,.88); border:none; width:32px; height:32px; border-radius:50%; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#333; box-shadow:0 1px 6px rgba(0,0,0,.18); transition:.15s;" onmouseenter="this.style.background='rgba(255,255,255,1)'" onmouseleave="this.style.background='rgba(255,255,255,.88)'">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                    <div style="position:absolute; bottom:12px; left:50%; transform:translateX(-50%); display:flex; gap:5px; align-items:center;">
                        ${p.imgs.map((_, i) => `<div style="width:${i===xhsImgIdx?16:5}px; height:5px; border-radius:3px; background:${i===xhsImgIdx?'#fff':'rgba(255,255,255,.5)'}; transition:.2s;" id="xhs-dot-${i}"></div>`).join('')}
                    </div>` : ''}
            </div>
            <div style="flex:1; display:flex; flex-direction:column; overflow:hidden; min-width:0;">
                <div style="padding:14px 16px 12px; border-bottom:1px solid #f0f0f0; flex-shrink:0; display:flex; align-items:center; gap:10px;">
                    ${_getAvatarHtml(p.avatar, p.author, 36, 14, 'cursor:pointer;')}
                    <div style="flex:1; min-width:0;">
                        <div style="font-size:13px; font-weight:600; color:#333; line-height:1.3;">${p.author}</div>
                        <div style="font-size:11px; color:#b3b3b3; margin-top:2px;">${p.date}</div>
                    </div>
                    <button id="xhs-follow-btn" style="background:${followed?'#fff':'#ff2442'}; color:${followed?'#ff2442':'#fff'}; border:${followed?'1.5px solid #ff2442':'1.5px solid transparent'}; border-radius:16px; padding:5px 13px; font-size:12px; font-weight:600; cursor:pointer; white-space:nowrap; transition:.15s; flex-shrink:0;">${followed?'已关注':'+ 关注'}</button>
                    <button id="xhs-close-btn" style="width:28px; height:28px; background:#f5f5f5; border:none; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#767676; flex-shrink:0; transition:.15s;" onmouseenter="this.style.background='#ebebeb'" onmouseleave="this.style.background='#f5f5f5'">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
 
                <div id="xhs-modal-scroll" style="flex:1; overflow-y:auto; padding:14px 16px 0; scroll-behavior:smooth;">
                    <div style="font-size:15px; font-weight:700; color:#1a1a1a; margin-bottom:9px; line-height:1.5;">${p.title}</div>
                    <div style="font-size:13px; color:#4a4a4a; line-height:1.75; margin-bottom:12px; white-space:pre-line;">${p.body}</div>
                    <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:16px;">
                        ${p.tags.map(t=>`<span style="background:#fff0f2; color:#ff2442; border-radius:10px; padding:3px 9px; font-size:11px; cursor:pointer; font-weight:500; transition:.15s;" onmouseenter="this.style.background='#ffe0e4'" onmouseleave="this.style.background='#fff0f2'">#${t}</span>`).join('')}
                    </div>
                    <div style="border-top:1px solid #f0f0f0; padding-top:12px; padding-bottom:10px;">
                        <div id="xhs-cmt-count" style="font-size:12px; color:#b3b3b3; font-weight:600; margin-bottom:12px;">共 ${allC.length} 条评论</div>
                        <div id="xhs-comments-list"></div>
                        ${allC.length === 0 ? `<div style="text-align:center; padding:20px; color:#b3b3b3; font-size:13px;">还没有评论，来抢首评吧</div>` : ''}
                    </div>
                </div>
 
                <div style="border-top:1px solid #f0f0f0; flex-shrink:0;">

                    <div style="display:flex; align-items:center; gap:4px; padding:7px 14px; border-bottom:1px solid #f0f0f0;">
                        <button id="xhs-btn-like" style="display:flex; align-items:center; gap:5px; background:none; border:none; cursor:pointer; color:${liked?'#ff2442':'#767676'}; font-size:12px; padding:5px 9px; border-radius:14px; transition:.15s; font-family:inherit;" onmouseenter="this.style.background='#f5f5f5'" onmouseleave="this.style.background='none'">
                            <svg viewBox="0 0 24 24" width="17" height="17" fill="${liked?'#ff2442':'none'}" stroke="${liked?'#ff2442':'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                            ${fmtN(getLikes(p.id))}
                        </button>
                        <button id="xhs-btn-collect" style="display:flex; align-items:center; gap:5px; background:none; border:none; cursor:pointer; color:${coll?'#ff8c00':'#767676'}; font-size:12px; padding:5px 9px; border-radius:14px; transition:.15s; font-family:inherit;" onmouseenter="this.style.background='#f5f5f5'" onmouseleave="this.style.background='none'">
                            <svg viewBox="0 0 24 24" width="17" height="17" fill="${coll?'#ff8c00':'none'}" stroke="${coll?'#ff8c00':'currentColor'}" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            ${coll ? '已收藏' : '收藏'}
                        </button>
                        <button id="xhs-btn-share" style="display:flex; align-items:center; gap:5px; background:none; border:none; cursor:pointer; color:#767676; font-size:12px; padding:5px 9px; border-radius:14px; transition:.15s; font-family:inherit;" onmouseenter="this.style.background='#f5f5f5'" onmouseleave="this.style.background='none'">
                            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                            分享
                        </button>
                    </div>
                    <div id="xhs-reply-bar" style="display:none; align-items:center; justify-content:space-between; padding:5px 16px; background:#fff8f8; border-bottom:1px solid #f0f0f0;">
                        <span id="xhs-reply-name" style="font-size:12px; color:#ff2442; font-weight:500;"></span>
                        <button id="xhs-cancel-reply-btn" style="background:none; border:none; cursor:pointer; color:#b3b3b3; font-size:11px; display:flex; align-items:center; gap:3px; padding:3px 6px; border-radius:8px; transition:.15s;" onmouseenter="this.style.color='#767676'" onmouseleave="this.style.color='#b3b3b3'">
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            取消回复
                        </button>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; padding:9px 14px;">
                        ${_getAvatarHtml(CURRENT_USER.avatar, CURRENT_USER.name, 26, 11)}
                        <input id="xhs-cmt-inp" placeholder="说点什么..." maxlength="200" style="flex:1; background:#f5f5f5; border:1.5px solid transparent; border-radius:16px; padding:7px 12px; font-size:12px; color:#333; outline:none; font-family:inherit; transition:.2s; min-width:0;" onfocus="this.style.borderColor='#ff2442';this.style.background='#fff'" onblur="this.style.borderColor='transparent';this.style.background='#f5f5f5'">
                        <button id="xhs-submit-btn" style="background:#ff2442; color:#fff; border:none; border-radius:16px; padding:7px 14px; font-size:12px; font-weight:600; cursor:pointer; white-space:nowrap; transition:.15s; flex-shrink:0;" onmouseenter="this.style.opacity='.85'" onmouseleave="this.style.opacity='1'">发送</button>
                    </div>
                </div>
            </div>`;
 
        inner.querySelector('#xhs-close-btn').onclick = (e) => { e.stopPropagation(); xhsClosePost(); };
        inner.querySelector('#xhs-follow-btn').onclick = (e) => { e.stopPropagation(); xhsToggleFollow(p.author); };
        inner.querySelector('#xhs-btn-like').onclick = (e) => { e.stopPropagation(); xhsToggleLikeModal(); };
        inner.querySelector('#xhs-btn-collect').onclick = (e) => { e.stopPropagation(); xhsToggleCollect(); };
        inner.querySelector('#xhs-btn-share').onclick = (e) => { e.stopPropagation(); xhsSharePost(); };
        inner.querySelector('#xhs-submit-btn').onclick = (e) => { e.stopPropagation(); xhsSubmitComment(); };
        inner.querySelector('#xhs-cancel-reply-btn').onclick = (e) => { e.stopPropagation(); xhsCancelReply(); };
        inner.querySelector('#xhs-cmt-inp').onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); xhsSubmitComment(); } };
 
        if (p.imgs.length > 1) {
            inner.querySelector('#xhs-img-prev').onclick = (e) => { e.stopPropagation(); _changeImgWithDots(-1); };
            inner.querySelector('#xhs-img-next').onclick = (e) => { e.stopPropagation(); _changeImgWithDots(1); };
        }
 
        const listEl = inner.querySelector('#xhs-comments-list');
        if (listEl) {
            listEl.innerHTML = ''; 
            const roots = allC.filter(c => !c.parentId);
            const replies = allC.filter(c => c.parentId);
            roots.forEach(c => _appendCommentNode(c, p.id));
            replies.forEach(c => _appendCommentNode(c, p.id));
        }
    }
 
    function _changeImgWithDots(dir) {
        if (!xhsPost) return;
        const prev = xhsImgIdx;
        xhsImgIdx = (xhsImgIdx + dir + xhsPost.imgs.length) % xhsPost.imgs.length;
        const img = document.getElementById('xhs-modal-img');
        if (img) img.src = xhsPost.imgs[xhsImgIdx];
        const prevDot = document.getElementById(`xhs-dot-${prev}`);
        const curDot = document.getElementById(`xhs-dot-${xhsImgIdx}`);
        if (prevDot) { prevDot.style.width = '5px'; prevDot.style.background = 'rgba(255,255,255,.5)'; }
        if (curDot) { curDot.style.width = '16px'; curDot.style.background = '#fff'; }
    }
 
    let _xhsToastTimer;
    window.xhsToast = function(msg, type) {
        const win = document.getElementById('win-xhs');
        if (!win) return;
 
        let el = win.querySelector('#xhs-toast-inner');
        if (!el) {
            el = document.createElement('div');
            el.id = 'xhs-toast-inner';
            el.style.cssText = `position:absolute; bottom:22px; left:50%; transform:translateX(-50%); background:rgba(30,30,30,.85); color:#fff; padding:8px 16px 8px 13px; border-radius:20px; font-size:12px; z-index:200; pointer-events:none; font-family:'PingFang SC','Microsoft YaHei',sans-serif; display:flex; align-items:center; gap:7px; white-space:nowrap; backdrop-filter:blur(4px); box-shadow:0 2px 12px rgba(0,0,0,.18);`;
            win.appendChild(el);
        }
 
        const iconMap = {
            check: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
            heart: `<svg viewBox="0 0 24 24" width="13" height="13" fill="#ff6b81" stroke="#ff6b81" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
            star: `<svg viewBox="0 0 24 24" width="13" height="13" fill="#fbbf24" stroke="#fbbf24" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
            x: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#9ca3af" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
            info: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        };
        const icon = iconMap[type] || iconMap.info;
        el.innerHTML = `${icon}<span>${msg}</span>`;
        el.style.opacity = '1';
        el.style.display = 'flex';
 
        clearTimeout(_xhsToastTimer);
        _xhsToastTimer = setTimeout(() => {
            el.style.transition = 'opacity .3s';
            el.style.opacity = '0';
            setTimeout(() => { el.style.display = 'none'; el.style.transition = ''; }, 320);
        }, 2200);
    };
 
    const modal = document.getElementById('xhs-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) xhsClosePost();
        });
        const inner = document.getElementById('xhs-modal-inner');
        if (inner) {
            inner.addEventListener('click', function(e) { e.stopPropagation(); });
        }
    }
 
    function tryInitXHS() {
        if (document.getElementById('xhs-tabs')) {
            xhsBuildStatic();
        } else {
            setTimeout(tryInitXHS, 300);
        }
    }
 
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInitXHS);
    } else {
        tryInitXHS();
    }
 
})();
