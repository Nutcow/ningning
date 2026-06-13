document.addEventListener("DOMContentLoaded", () => {
    
    let zIndexCounter = 10;
    
    const GRID_W = 80;
    const GRID_H = 100;
    const OFFSET_X = 15;
    const OFFSET_Y = 15;
    

    const appInfo = {
        'pc': { icon: 'image/myPc.png', name: '此电脑' },
        'bin': { icon: 'image/recycleEmpty.png', name: '回收站' },
        'wechat': { icon: 'image/wechat.png', name: '微信' }, 
        'docs': { icon: 'image/folder.png', name: '文档' },
        'pics': { icon: 'image/folder.png', name: '图片' },
        'secret': { icon: 'image/zipfolder.png', name: '记录日常' }, 
        'notepad': { icon: 'image/file.png', name: '记事本' }, 
        'photoviewer': { icon: 'image/image.png', name: '照片查看器' },
        'cmd': { icon: 'image/app.png', name: 'unknown.exe' },
        'search': { icon: 'image/drive.png', name: '本地磁盘 (C:)' },
        'bilibili': { icon: 'image/zilizili.png', name: '小辰 - ZiliZili' },
        'google': { icon: 'image/google.png', name: 'chrome' },
        'pdfviewer': { icon: 'image/pdf.png', name: '20200615.pdf' },
        'videoplayer': { icon: 'image/video.png', name: '电影和电视' },
        'xhs': { icon: 'image/小红书.png', name: '小红书' },
        'hospitalpdf': { icon: 'image/pdf.png', name: '江建国体检报告.pdf' },
        'news': { icon: 'image/新闻.png', name: '每日新闻' },
        
        
        'cpic1': { icon: 'pt/1.png', name: '你.png' },
        'cpic2': { icon: 'pt/2.png', name: '离.png' },
        'cpic3': { icon: 'pt/3.png', name: '我.png' },
        'cpic4': { icon: 'pt/4.png', name: '又.png' },
        'cpic5': { icon: 'pt/5.png', name: '近.png' },
        'cpic6': { icon: 'pt/6.png', name: '了.png' },
        'cpic7': { icon: 'pt/7.png', name: '一.png' },
        'cpic8': { icon: 'pt/8.png', name: '步.png' },
        'cpic9': { icon: 'pt/9.png', name: '呢.png' },
        'merged_pic': { icon: 'pt/fullpt.jpg', name: '日记.png' }
    };

    const isZhoumu3 = localStorage.getItem('win10_zhoumu3') === 'true';
    const isZhoumu2 = localStorage.getItem('win10_zhoumu2') === 'true';

    if (isZhoumu2 || isZhoumu3) {
        appInfo['docs'].name = '日记';
        appInfo['docs'].icon = 'image/zipfolder.png';
        appInfo['cmd'].name = isZhoumu3 ? '兔先生.exe' : '你为什么要删掉我.exe';
    }


    const zhoumu1Moments = [
        {
            id: 'm1', authorName: '妈妈', authorAvatar: 'image/mama.png',
            text: '给两个宝贝包了三鲜馅水饺',
            images: ['pyq/pyq1.png'],
            time: '2020年6月2号 早上9:12', likes: ['哥哥', '宁宁'], 
            comments: [
                { name: '宁宁', text: '妈妈包的真好吃！' }
            ]
        },
        {
            id: 'm2', authorName: '妈妈', authorAvatar: 'image/mama.png',
            text: '时间过得真快，一转眼小家伙们都长大了！',
            time: '2020年6月1号 晚上8:09', likes: ['哥哥', '宁宁','爸爸']
        },
        {
            id: 'm3', authorName: '月月', authorAvatar: 'image/yueyue.jpg',
            text: '在上十年学我才23岁...好痛苦还有那么多要学',
            time: '2020年6月1号 早上11:07', likes: ['宁宁'], 
        },
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            text: '对不起，各位网上的哥哥姐姐，其实我一直在欺骗你们，我假装自己已经是个大人了，但是现在看看自己伪装成熟的样子真的好累，所以我现在说出真相，我其实今年刚上小学，再过几天儿童节了，可以送我礼物么',
            time: '2020年5月27号 晚上7:12', likes: ['哥哥', '月月', '安沫'], 
            comments: [
                { name: '安沫', text: '可以的' }
            ]
        },
        {
            id: 'm5', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            text: '我的世界在下雨',
            time: '2020年5月27号 晚上7:08', likes: ['安沫'], 
            comments: [
                { name: '月月', text: '？' }
            ]
        },
        {
            id: 'm6', authorName: '安沫', authorAvatar: 'image/anmo.jpg',
            text: 'intp-a',
            images: ['pyq/pyq2.png'],
            time: '2020年5月25号 晚上10:21', likes: ['宁宁', '月月', '安沫'], 
        },
        {
            id: 'm7', authorName: '哥哥', authorAvatar: 'image/gege.jpg',
            text: '还剩两年就步入大学了，时间过得好快啊',
            time: '2020年5月27号 晚上7:08', likes: ['宁宁'], 
            comments: [
                { name: '宁宁', text: '哥哥加油！' }
            ]
        },
        {
            id: 'm8', authorName: '爸爸', authorAvatar: 'image/baba.png',
            text: '回首向来萧瑟处，也无风雨也无晴',
            time: '2020年5月25号 早上6:28', likes: ['宁宁']
        },
    ];

    const zhoumu2Moments = [
        {
            id: 'm1', authorName: '妈妈', authorAvatar: 'image/mama.png',
            text: '给宝贝包了三鲜馅水饺',
            images: ['pyq/pyq1.png'],
            time: '2020年6月2号 早上9:12', likes: ['宁宁'], 
            comments: [
                { name: '宁宁', text: '妈妈包的真好吃！' }
            ]
        },
        {
            id: 'm2', authorName: '妈妈', authorAvatar: 'image/mama.png',
            text: '时间过得真快，一转眼小家伙们都长大了！',
            time: '2020年6月1号 晚上8:09', likes: ['宁宁','爸爸']
        },
        {
            id: 'm3', authorName: '月月', authorAvatar: 'image/yueyue.jpg',
            text: '在上十年学我才23岁...好痛苦还有那么多要学',
            time: '2020年6月1号 早上11:07', likes: ['宁宁'], 
        },
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            text: '对不起，各位网上的哥哥姐姐，其实我一直在欺骗你们，我假装自己已经是个大人了，但是现在看看自己伪装成熟的样子真的好累，所以我现在说出真相，我其实今年刚上小学，再过几天儿童节了，可以送我礼物么',
            time: '2020年5月27号 晚上7:12', likes: ['月月', '安沫'], 
            comments: [
                { name: '安沫', text: '可以的' }
            ]
        },
        {
            id: 'm5', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            text: '我的世界在下雨',
            time: '2020年5月27号 晚上7:08', likes: ['安沫'], 
            comments: [
                { name: '月月', text: '？' }
            ]
        },
        {
            id: 'm6', authorName: '安沫', authorAvatar: 'image/anmo.jpg',
            text: 'intp-a',
            images: ['pyq/pyq2.png'],
            time: '2020年5月25号 晚上10:21', likes: ['宁宁', '月月', '安沫'], 
        },
        {
            id: 'm8', authorName: '爸爸', authorAvatar: 'image/baba.png',
            text: '回首向来萧瑟处，也无风雨也无晴',
            time: '2020年5月25号 早上6:28', likes: ['宁宁'], 
        },
    ];

    const zhoumu3Moments = [
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            images: ['hands/l.gif'],
            time: '2020年5月27号 晚上7:13', likes: [], 
            comments: [
            ]
        },
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            images: ['hands/u.gif'],
            time: '2020年5月27号 晚上7:13', likes: [], 
            comments: [
                { name: '安沫', text: '宁宁? 你是不是最近身体不舒服？' },
            ]
        },
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            images: ['hands/f.gif'],
            time: '2020年5月27号 晚上7:13', likes: [], 
            comments: [
            ]
        },
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            images: ['hands/w.gif'],
            time: '2020年5月27号 晚上7:12', likes: [], 
            comments: [
                { name: '安沫', text: '宁宁？' },
            ]
        },
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            images: ['hands/a.gif'],
            time: '2020年5月27号 晚上7:12', likes: [], 
            comments: [
                { name: '安沫', text: '宁宁？' },
                { name: '月月', text: '?' },
            ]
        },
    ];

    let currentMoments = isZhoumu3 ? zhoumu3Moments : (isZhoumu2 ? zhoumu2Moments : zhoumu1Moments);

    
    const originalWechatData = {
        'family': { 
            name: '相亲相爱的一家人 (4)', 
            members: ['me', 'mom', 'dad', 'brother'], 
            messages: [
                { time: '2020年6月3日 08:12', text: '哥哥和宁宁', sender: '妈妈', isMine: false , type: 'redpacket'},
                { time: '', text: '哥哥这几天照顾好宁宁，妈妈和爸爸有事会不在家', sender: '妈妈', isMine: false },
                { time: '', text: '你们在姥姥家要听话，听到了没有', sender: '妈妈', isMine: false },
                { time: '', text: '知道了妈，你放心吧', sender: '哥哥', isMine: false },
                { time: '2020年6月3日 08:14', text: '你每次回的都很好听，行这钱给你俩买好吃的', sender: '妈妈', isMine: false},
                { time: '', text: '妈妈你会去多久啊', sender: '宁宁', isMine: true},
                { time: '', text: '我可以去找曲奇玩吗？', sender: '宁宁', isMine: true},
                { time: '2020年6月3日 08:17', text: '大概一周就回来了，回来给宁宁买好吃的好不好？', sender: '爸爸', isMine: false},
                { time: '', text: '还有就是你和哥哥在姥姥家要多注意安全，知道了吗', sender: '爸爸', isMine: false},
                { time: '', text: '小曲奇现在在舅舅家', sender: '爸爸', isMine: false},
                { time: '', text: '我和爸爸很快就会回来乖乖', sender: '妈妈', isMine: false},
                { time: '2020年6月3日 08:18', text: '妈妈包了很多饺子你们到时候可以慢慢吃', sender: '妈妈', isMine: false},
                { time: '', text: '姥姥也包了很多你俩爱吃的包子', sender: '妈妈', isMine: false},
                { time: '', text: '好哦，但是我吃不了那么多', sender: '宁宁', isMine: true},
                { time: '', text: '再过两天就是哥哥生日了', sender: '爸爸', isMine: false},
                { time: '', text: '今年又不能陪你过生日了', sender: '爸爸', isMine: false},
                { time: '', text: '哥哥生日快乐', sender: '爸爸', isMine: false, type: 'redpacket'},
                { time: '', text: '没事的爸爸，你们忙，也不差这次生日', sender: '哥哥', isMine: false},
                { time: '', text: '谢谢爸爸！', sender: '哥哥', isMine: false},
                { time: '', text: '爸爸，宁宁也要一个红包', sender: '宁宁', isMine: true},
                { time: '', text: '行，等爸爸回来，爸爸给宁宁一个大大的红包', sender: '爸爸', isMine: false},
                { time: '', text: '就你爹宠你俩 🤭', sender: '妈妈', isMine: false },
                { time: '', text: '好哎！', sender: '宁宁', isMine: true},
                { time: '', text: '爱你爸爸妈妈', sender: '宁宁', isMine: true}
            ] 
        },
        'me': { name: '宁宁', avatar: 'image/ningning.jpg', hidden: true },
        'mom': { 
            name: '妈妈', avatar: 'image/mama.png', 
            messages: [
                { time: '2020年5月28日 17:21', text: '妈妈，今天姥姥带曲奇去理发了哎', sender: '宁宁', isMine: true},
                { time: '', text: '曲奇好可爱，可以带它来我们家玩两天吗？', sender: '宁宁', isMine: true},
                { time: '',content: 'image/dog.png', sender: '宁宁', isMine: true,type: 'img' },
                { time: '2020年5月28日 17:36', text: '可以呀宝贝，但是你可以照顾好小曲奇吗？', isMine: false },
                { time: '', text: '可以可以！曲奇好乖！', sender: '宁宁', isMine: true},
                { time: '', text: '超级听话，我给它吃了很多小零食！', sender: '宁宁', isMine: true},
                { time: '', text: '但是它好像不喜欢吃，只是嗷呜嗷呜的', sender: '宁宁', isMine: true},
                { time: '', text: '宁宁，狗狗可不能吃我们吃的零食，会生病的', isMine: false },
                { time: '', text: '可以给曲奇吃姥姥买给它的食物', isMine: false },
                { time: '', text: '好哦，我知道了', sender: '宁宁', isMine: true},
                { time: '2020年6月1日 09:32', text: '宝贝六一快乐！', isMine: false },
                { time: '', text: '祝宁宁宝贝六一快乐！', isMine: false, type: 'redpacket'},
                { time: '', text: '谢谢妈妈！！！我爱你', sender: '宁宁', isMine: true},
                { time: '', text: '妈妈你也快乐！', sender: '宁宁', isMine: true},
                { time: '2020年6月1日 09:33', text: '谢谢宝贝，你明年再过一次可就是小大人了', isMine: false },
                { time: '', text: '妈妈真为你开心', isMine: false },
                { time: '', text: '是不是明年过后就不能再过了', sender: '宁宁', isMine: true},
                { time: '', text: '我好难过...', sender: '宁宁', isMine: true },
                { time: '', text: '这是什么话？你永远都是妈妈心里的宝贝', isMine: false },
                { time: '', text: '那哥哥呢...', sender: '宁宁', isMine: true},
                { time: '', text: '哥哥和你都是妈妈爸爸的宝贝', isMine: false },
            ] 
        },
        'dad': { 
            name: '爸爸', avatar: 'image/baba.png', 
            messages: [
                { time: '2020年6月2日 11:26', text: '宁宁，缺零用钱跟老爸说，别老让你哥花钱', isMine: false },
                { time: '', text: '零花钱', isMine: false, type: 'redpacket' },
                { time: '', text: '谢谢爸爸！我知道啦', sender: '宁宁', isMine: true},
                { time: '', text: '等我长大，我一定要和爸爸一样做老师', sender: '宁宁', isMine: true},
                { time: '', text: '赚好多好多的钱！给你和妈妈用', sender: '宁宁', isMine: true},
                { time: '', text: '你这孩子，能让爸爸省心已经是对爸爸最好的礼物了', isMine: false },
                { time: '', text: '等爸爸妈妈回来，就带你和哥哥去动物园玩好不好？', isMine: false },
                { time: '', text: '不想去动物园，好热的', isMine: true },
                { time: '', text: '我想去书店里看上次的百科全书', sender: '宁宁', isMine: true},
                { time: '2020年6月2日 11:31', text: '好', isMine: false },
                { time: '', text: '爸爸再给你买几本', isMine: false },
                { time: '', text: '谢谢爸爸！顺便我们还能吃小蛋糕', sender: '宁宁', isMine: true},
                { time: '', text: '您说是不是啊', sender: '宁宁', isMine: true},
                { time: '',content: 'image/emoji.jpg', sender: '宁宁', isMine: true,type: 'img' },
                { time: '', text: '你这孩子', isMine: false },
                { time: '', text: '给你买个草莓味的', isMine: false },
                { time: '', text: '太好啦！', sender: '宁宁', isMine: true},
            ] 
        },
        'brother': { 
            name: '哥哥', avatar: 'image/gege.jpg', 
            messages: [
                { time: '2020年5月18日 18:02', text: '宁宁你今晚要吃什么', isMine: false },
                { time: '2020年5月18日 18:03', text: '我不饿', isMine: true },
                { time: '', text: '对了哥哥', isMine: true },
                { time: '', text: '过几天你能带我去外面吃饭不？', isMine: true },
                { time: '', text: '可以呀，你要吃什么？', isMine: false },
                { time: '', text: '还没决定好，到时候带上月月我们一起去吧', isMine: true },
                { time: '', text: '行不？', isMine: true },
                { time: '', text: '可以到时候跟我讲哦', isMine: false },
                { time: '', text: '嗯嗯！', isMine: true },
                { time: '2020年6月3日 15:11', text: '哥哥还有两天就是你的生日了，你要什么礼物呀', sender: '宁宁', isMine: true },
                { time: '', text: '我现在有钱，我给你买个', sender: '宁宁', isMine: true},
                { time: '', text: '宁，哥不要什么礼物，我可以自己买',  isMine: false},
                { time: '', text: '加上爸妈不是给了一些钱了嘛',  isMine: false},
                { time: '', text: '我完全够买一台主机',  isMine: false},
                { time: '', text: '你留着买点吃的吧',  isMine: false},
                { time: '', text: '你要什么礼物吗？',  isMine: false},
                { time: '', text: '但这不是你的生日吗？', sender: '宁宁', isMine: true},
                { time: '', text: '为什么要给我买礼物？', sender: '宁宁', isMine: true},
                { time: '', text: '因为你之前说，加上儿童节哥也没给你买东西',  isMine: false},
                { time: '', text: '算是补上的',  isMine: false},
                { time: '', text: '真的吗！！谢谢哥哥！！', sender: '宁宁', isMine: true},
                { time: '2020年6月3日 15:12', text: '嘻嘻，我把我的零花钱给你吧，反正爸爸会带我吃蛋糕', sender: '宁宁', isMine: true},
                { time: '', text: '能吃蛋糕就够了', sender: '宁宁', isMine: true},
                { time: '', text: '你自己留着吧',  isMine: false},
                { time: '', text: '这样你还能多买些蛋糕',  isMine: false},
                { time: '', text: '我生日蛋糕，也选了你最喜欢的口味',  isMine: false},
                { time: '', text: '蛋糕这种东西，估计也就你心心念念了',  isMine: false},
                { time: '', text: '？', sender: '宁宁', isMine: true},
                { time: '', text: '也没有吧',  sender: '宁宁', isMine: true},
                { time: '', text: '嘻嘻',  sender: '宁宁', isMine: true},
                { time: '2020年6月3日 18:29',content: 'image/兔子.png', isMine: false,type: 'img' },
                { time: '', text: '是这个吗？',  isMine: false},
                { time: '', text: '幸亏买的快，不然就没了',  isMine: false},
                { time: '2020年6月3日 18:31', text: '对对对！！谢谢哥哥！！！！',  sender: '宁宁', isMine: true},
                { time: '', text: '不用谢，我的电脑也给你了', isMine: false},
                { time: '', text: '我买新的去', isMine: false},
                { time: '', text: '我就知道，我哥对我天下第一好！',  sender: '宁宁', isMine: true},
                { time: '', text: '谢谢哥哥！！！',  sender: '宁宁', isMine: true},
            ] 
        },
        'yueyue': { 
            name: '月月', avatar: 'image/yueyue.jpg', 
            messages: [
                { time: '2020年6月4日 08:12', text: '月月，你猜猜看我哥哥给我买了什么？',  sender: '宁宁', isMine: true },
                { time: '2020年6月4日 08:16', text: '什么东西神神秘秘的呀', isMine: false},
                { time: '', text: '新的发夹吗？', isMine: false},
                { time: '', text: '不是',  sender: '宁宁', isMine: true },
                { time: '', text: '新的衣服？', isMine: false},
                { time: '', text: '也不是',  sender: '宁宁', isMine: true },
                { time: '', text: '那会是什么？猜不到', isMine: false},
                { time: '', text: '嘻嘻，也没啥就是电视里的玩偶罢了',  sender: '宁宁', isMine: true },
                { time: '', text: '什么玩偶呀？', isMine: false },
                { time: '', text: '就是兔子先生里的吗？', isMine: false },
                { time: '', text: '对对对！！我叫它棉棉，我跟你讲它老可爱了',  sender: '宁宁', isMine: true },
                { time: '2020年6月4日 08:21', text: '那你可以带到我家里玩吗？', isMine: false},
                { time: '', text: '我想抱抱看！看看是不是像电视机里那么神奇', isMine: false},
                { time: '', text: '哦对了，还有吗？我也想买一个', isMine: false},
                { time: '', text: '没啦，我哥说这是店里最后一个',  sender: '宁宁', isMine: true },
                { time: '', text: '我哥还送我他的电脑',  sender: '宁宁', isMine: true },
                { time: '', text: '他要买新的',  sender: '宁宁', isMine: true },
                { time: '', text: '你哥对你真好', isMine: false},
                { time: '', text: '好羡慕', isMine: false},
                { time: '', text: '话说周六你能来我家吗？', isMine: false},
                { time: '', text: '不行，得要到下周，我这几天会在姥姥家',  sender: '宁宁', isMine: true },
                { time: '', text: '没人带我去你家玩',  sender: '宁宁', isMine: true },
                { time: '', text: '那好吧', isMine: false},
                { time: '', text: '那我下周四去你家？', isMine: false},
                { time: '', text: '可以不?', isMine: false},
                { time: '', text: '当然啦',  sender: '宁宁', isMine: true },
                { time: '2020年6月13日 12:03', text: '月月你个坏蛋', isMine: true},
                { time: '', text: '哈哈哈哈，我又怎么你了？', isMine: false},
                { time: '', text: '...你把我日记密码改了是不是', isMine: true},
                { time: '', text: '好不容易你哥带我们去吃纪念一下嘛', isMine: false},
                { time: '', text: '就是我们去吃饭的日子', isMine: false},
                { time: '', text: '加上你的岁数呀', isMine: false},
                { time: '2020年6月13日 12:05', text: '坏蛋来的', isMine: true},
                { time: '', text: '嘻嘻嘻', isMine: false},
            ] 
        },
        'anmo': { name: '安沫', avatar: 'image/anmo.jpg', messages: [
                { time: '2020年6月2日 10:26', text: '宁宁，下周你有空吗？',  isMine: false },
                { time: '2020年6月2日 10:27', text: '怎么了呀 安沫？', isMine: true},
                { time: '', text: '找你玩羽毛球呗',  isMine: false },
                { time: '', text: '不然还能有什么呀',  isMine: false },
                { time: '',content: 'image/catemoji.png',  isMine: false, type: 'img' },
                { time: '', text: '可以啊', isMine: true},
                { time: '', text: '什么时候？', isMine: true},
                { time: '', text: '不知道，大概下周二三吧',  isMine: false },
                { time: '', text: '行，到时候我叫我哥带我去', isMine: true},
                { time: '', text: '好呀，那就不见不散',  isMine: false },
                { time: '', text: 'kk', isMine: true},
                { time: '2020年6月3日 12:07', text: '安沫，我没办法去了', isMine: true},
                { time: '', text: '我爸妈有事出差了几天', isMine: true},
                { time: '', text: '我可能要在我姥姥家待一周', isMine: true},
                { time: '2020年6月3日 12:28', text: '没事呀',  isMine: false },
                { time: '', text: '你姥姥家在哪里？',  isMine: false },
                { time: '', text: '我叫我爸爸开车过去找你玩吧',  isMine: false },
                { time: '', text: '算了吧，从我家到我姥姥家得2小时路程', isMine: true},
                { time: '', text: '要不下次我们叫上月月一起玩？', isMine: true},
                { time: '', text: '好呀', isMine: false},
            ] 
        },
        'wechatfile': { name: '文件传输', avatar: 'image/wechatfile.jpeg', messages: [
                { time: '2020年5月29日 21:18', text: 'https://space.bilibili.com/3546600750188698?spm_id_from=333.1007.0.0', isMine: true },
                { time: '', text: '我已经分享了这个链接，参与了抽奖，你也能参与！只要点击链接就能参与活动！', isMine: true },
            ] }
        
    };

   const zhoumu2WechatData = {
        'family': { name: '相亲相爱的一家人 (3)', members: ['me', 'mom', 'dad'], messages: [
                { time: '2020年6月3日 08:12', text: '宁宁', sender: '妈妈', isMine: false , type: 'redpacket'},
                { time: '', text: '宁宁这几天照顾好自己，妈妈和爸爸有事会不在家', sender: '妈妈', isMine: false },
                { time: '', text: '你在姥姥家要听话，听到了没有', sender: '妈妈', isMine: false },
                { time: '', text: '知道了妈妈，我一定会听话的', sender: '宁宁', isMine: true},
                { time: '2020年6月3日 08:14', text: '你每次回的都很好听，行这钱给你买好吃的', sender: '妈妈', isMine: false},
                { time: '', text: '妈妈你会去多久啊', sender: '宁宁', isMine: true},
                { time: '', text: '我可以去找曲奇玩吗？', sender: '宁宁', isMine: true},
                { time: '2020年6月3日 08:17', text: '大概一周就回来了，回来给宁宁买好吃的好不好？', sender: '爸爸', isMine: false},
                { time: '', text: '还有就是你在姥姥家要多注意安全，知道了吗', sender: '爸爸', isMine: false},
                { time: '', text: '小曲奇现在在舅舅家', sender: '爸爸', isMine: false},
                { time: '', text: '我和爸爸很快就会回来乖乖', sender: '妈妈', isMine: false},
                { time: '2020年6月3日 08:18', text: '妈妈包了很多饺子你到时候可以慢慢吃', sender: '妈妈', isMine: false},
                { time: '', text: '姥姥也包了很多你爱吃的包子', sender: '妈妈', isMine: false},
                { time: '', text: '好哦，但是我吃不了那么多', sender: '宁宁', isMine: true},
                { time: '', text: '再过两天就是宁宁的生日了', sender: '爸爸', isMine: false},
                { time: '', text: '今年又不能陪你过生日了', sender: '爸爸', isMine: false},
                { time: '', text: '宁宁生日快乐', sender: '爸爸', isMine: false, type: 'redpacket'},
                { time: '', text: '爸爸？你记错了吧，我生日在11月...', sender: '宁宁', isMine: true},
                { time: '', text: '哈哈哈，你爹老是记不住自己孩子的生日', sender: '妈妈', isMine: false },
                { time: '', text: '生日容易忘，但重要的人不会忘', sender: '爸爸', isMine: false},
                { time: '', text: '好哦！谢谢爸爸的红包！', sender: '宁宁', isMine: true},
                { time: '', text: '行，等爸爸回来，爸爸再给宁宁一个大大的红包', sender: '爸爸', isMine: false},
                { time: '', text: '就你爹宠你 🤭', sender: '妈妈', isMine: false },
                { time: '', text: '好哎！', sender: '宁宁', isMine: true},
                { time: '', text: '爱你爸爸妈妈', sender: '宁宁', isMine: true},
                { time: '2020年6月15日 20:19', text: '妈妈爸爸你们今晚不在家吗？', sender: '宁宁',isMine: true},
                { time: '', text: '妈妈等会就回家，宁宁你早点睡吧', sender: '妈妈', isMine: false },
                { time: '2020年6月15日 20:19', text: '好的妈妈', sender: '宁宁',isMine: true},
        ] },
        'me': { name: '宁宁', avatar: 'image/ningning.jpg', hidden: true },
        'mom': { name: '妈妈', avatar: 'image/mama.png', messages: [
                { time: '2020年5月28日 17:21', text: '妈妈，今天姥姥带曲奇去理发了哎', sender: '宁宁', isMine: true},
                { time: '', text: '曲奇好可爱，可以带它来我们家玩两天吗？', sender: '宁宁', isMine: true},
                { time: '',content: 'image/dog.png', sender: '宁宁', isMine: true,type: 'img' },
                { time: '2020年5月28日 17:36', text: '可以呀宝贝，但是你可以照顾好小曲奇吗？', isMine: false },
                { time: '', text: '可以可以！曲奇好乖！', sender: '宁宁', isMine: true},
                { time: '', text: '超级听话，我给它吃了很多小零食！', sender: '宁宁', isMine: true},
                { time: '', text: '但是它好像不喜欢吃，只是嗷呜嗷呜的', sender: '宁宁', isMine: true},
                { time: '', text: '宁宁，狗狗可不能吃我们吃的零食，会生病的', isMine: false },
                { time: '', text: '可以给曲奇吃姥姥买给它的食物', isMine: false },
                { time: '', text: '好哦，我知道了', sender: '宁宁', isMine: true},
                { time: '2020年6月1日 09:32', text: '宝贝六一快乐！', isMine: false },
                { time: '', text: '祝宁宁宝贝六一快乐！', isMine: false, type: 'redpacket'},
                { time: '', text: '谢谢妈妈！！！我爱你', sender: '宁宁', isMine: true},
                { time: '', text: '妈妈你也快乐！', sender: '宁宁', isMine: true},
                { time: '2020年6月1日 09:33', text: '谢谢宝贝，你明年再过一次可就是小大人了', isMine: false },
                { time: '', text: '妈妈真为你开心', isMine: false },
                { time: '', text: '是不是明年过后就不能再过了', sender: '宁宁', isMine: true},
                { time: '', text: '我好难过...', sender: '宁宁', isMine: true },
                { time: '', text: '这是什么话？你永远都是妈妈心里的宝贝', isMine: false },
                { time: '', text: '那哥哥呢...', sender: '宁宁', isMine: true},
                { time: '', text: '哪个哥哥呀宁宁', isMine: false },
                { time: '', text: '我打错了妈妈，嘻嘻嘻', sender: '宁宁', isMine: true},
                { time: '',content: 'image/emoji2.jpg', sender: '宁宁', isMine: true,type: 'img' },
                { time: '', text: '好吧，爱你宝贝', isMine: false },
        ] },
        'dad': { name: '爸爸', avatar: 'image/baba.png', messages: [
                { time: '2020年6月2日 11:26', text: '宁宁，缺零用钱跟老爸说，别老让你妈花钱', isMine: false },
                { time: '', text: '零花钱', isMine: false, type: 'redpacket' },
                { time: '', text: '谢谢爸爸！我知道啦', sender: '宁宁', isMine: true},
                { time: '', text: '等我长大，我一定要和爸爸一样做老师', sender: '宁宁', isMine: true},
                { time: '', text: '赚好多好多的钱！给你和妈妈用', sender: '宁宁', isMine: true},
                { time: '', text: '你这孩子，能让爸爸省心已经是对爸爸最好的礼物了', isMine: false },
                { time: '', text: '等爸爸妈妈回来，就带你去动物园玩好不好？', isMine: false },
                { time: '', text: '不想去动物园，好热的', isMine: true },
                { time: '', text: '我想去书店里看上次的百科全书', sender: '宁宁', isMine: true},
                { time: '2020年6月2日 11:31', text: '好', isMine: false },
                { time: '', text: '爸爸再给你买几本', isMine: false },
                { time: '', text: '谢谢爸爸！顺便我们还能吃小蛋糕', sender: '宁宁', isMine: true},
                { time: '', text: '您说是不是啊', sender: '宁宁', isMine: true},
                { time: '',content: 'image/emoji.jpg', sender: '宁宁', isMine: true,type: 'img' },
                { time: '', text: '你这孩子', isMine: false },
                { time: '', text: '给你买个草莓味的', isMine: false },
                { time: '', text: '太好啦！', sender: '宁宁', isMine: true},
        ] },
        'brother': { name: '用户不存在', avatar: 'image/user2.jpg', messages: [
        ] },
        'yueyue': { name: '月月', avatar: 'image/yueyue.jpg', messages: [
                { time: '2020年6月4日 08:12', text: '月月，你猜猜看我买了什么？',  sender: '宁宁', isMine: true },
                { time: '2020年6月4日 08:16', text: '什么东西神神秘秘的呀', isMine: false},
                { time: '', text: '新的发夹吗？', isMine: false},
                { time: '', text: '不是',  sender: '宁宁', isMine: true },
                { time: '', text: '新的衣服？', isMine: false},
                { time: '', text: '也不是',  sender: '宁宁', isMine: true },
                { time: '', text: '那会是什么？猜不到', isMine: false},
                { time: '', text: '嘻嘻，也没啥就是电视里的玩偶罢了',  sender: '宁宁', isMine: true },
                { time: '', text: '什么玩偶呀？', isMine: false },
                { time: '', text: '就是兔子先生里的吗？', isMine: false },
                { time: '', text: '对对对！！我叫它棉棉，我跟你讲它老可爱了',  sender: '宁宁', isMine: true },
                { time: '2020年6月4日 08:21', text: '那你可以带到我家里玩吗？', isMine: false},
                { time: '', text: '我想抱抱看！看看是不是像电视机里那么神奇', isMine: false},
                { time: '', text: '哦对了，还有吗？我也想买一个', isMine: false},
                { time: '', text: '没啦，这是店里最后一个',  sender: '宁宁', isMine: true },
                { time: '', text: '我哥还送我他的电脑',  sender: '宁宁', isMine: true },
                { time: '', text: '他要买新的',  sender: '宁宁', isMine: true },
                { time: '', text: '你哥对你真好', isMine: false},
                { time: '', text: '话说我从来都没见过你哥哎', isMine: false},
                { time: '', text: '好羡慕', isMine: false},
                { time: '', text: '哦哦哦，打错是我爸爸',  sender: '宁宁', isMine: true },
                { time: '', text: '哈哈哈哈', isMine: false},
                { time: '', text: '话说周六你能来我家吗？', isMine: false},
                { time: '', text: '不行，得要到下周，我这几天会在姥姥家',  sender: '宁宁', isMine: true },
                { time: '', text: '没人带我去你家玩',  sender: '宁宁', isMine: true },
                { time: '', text: '那好吧', isMine: false},
                { time: '', text: '那我下周四去你家？', isMine: false},
                { time: '', text: '可以不?', isMine: false},
                { time: '', text: '当然啦',  sender: '宁宁', isMine: true },
                { time: '2020年6月13日 12:03', text: '月月你个坏蛋', isMine: true},
                { time: '', text: '哈哈哈哈，我又怎么你了？', isMine: false},
                { time: '', text: '...你把我日记密码改了是不是', isMine: true},
                { time: '', text: '我没改呀', isMine: false},
                { time: '', text: '我连你电脑密码是什么都不知道', isMine: false},
                { time: '', text: '要怎么改', isMine: false},
                { time: '2020年6月13日 12:05', text: '那...', isMine: true},
                { time: '', text: '没事了', isMine: true},
                { time: '', text: '哈哈哈，自己忘了赖我', isMine: false},
                { time: '2020年6月15日 12:12', text: '月月', sender: '宁宁',isMine: true},
                { time: '', text: '我感觉我的电脑有问题', sender: '宁宁',isMine: true},
                { time: '2020年6月15日 12:15', text: '发生了什么了？', isMine: false},
                { time: '', text: '就是', sender: '宁宁',isMine: true},
                { time: '', text: '不知道我从哪里多了一个联系人', sender: '宁宁',isMine: true},
                { time: '', text: '他好像发过我东西', sender: '宁宁',isMine: true},
                { time: '', text: '但是都被删了', sender: '宁宁',isMine: true},
                { time: '', text: '真奇怪', isMine: false},
                { time: '', text: '你是下载了什么奇奇怪怪的东西了吗', isMine: false},
                { time: '', text: '没有', sender: '宁宁',isMine: true},
                { time: '', text: '我爸爸给我这台电脑的时候就是这样的', sender: '宁宁',isMine: true},
                { time: '', text: '没看明白', isMine: false},
                { time: '', text: '为什么发你的东西要都删掉', isMine: false},
                { time: '', text: '也许电脑里会有记录吗？', isMine: false},
                { time: '', text: '我之前也好像有过这样，但是我忘了怎么做了', isMine: false},
                { time: '', text: '嗯，我试试看', sender: '宁宁',isMine: true},
                { time: '', text: '好哦，等你的好消息', isMine: false},
                { time: '2020年6月15日 21:42', text: '月月我今晚一个人在家', sender: '宁宁',isMine: true},
                { time: '', text: '有点不敢睡觉，感觉屋子外面有吱吱喳喳的声音', sender: '宁宁',isMine: true},
                { time: '2020年6月15日 21:44', text: '可能是什么虫子吧', isMine: false},
                { time: '', text: '没事的我在这里陪你', isMine: false},
        ] },
        'anmo': { name: '安沫', avatar: 'image/anmo.jpg', messages: [
                { time: '2020年6月2日 10:26', text: '宁宁，下周你有空吗？',  isMine: false },
                { time: '2020年6月2日 10:27', text: '怎么了呀 安沫？', isMine: true},
                { time: '', text: '找你玩羽毛球呗',  isMine: false },
                { time: '', text: '不然还能有什么呀',  isMine: false },
                { time: '',content: 'image/catemoji.png',  isMine: false, type: 'img' },
                { time: '', text: '可以啊', isMine: true},
                { time: '', text: '什么时候？', isMine: true},
                { time: '', text: '不知道，大概下周二三吧',  isMine: false },
                { time: '', text: '行，到时候我叫我爸带我去', isMine: true},
                { time: '', text: '好呀，那就不见不散',  isMine: false },
                { time: '', text: 'kk', isMine: true},
                { time: '2020年6月3日 12:07', text: '安沫，我没办法去了', isMine: true},
                { time: '', text: '我爸妈有事出差了几天', isMine: true},
                { time: '', text: '我可能要在我姥姥家待一周', isMine: true},
                { time: '2020年6月3日 12:28', text: '没事呀',  isMine: false },
                { time: '', text: '你姥姥家在哪里？',  isMine: false },
                { time: '', text: '我叫我爸爸开车过去找你玩吧',  isMine: false },
                { time: '', text: '还是别了吧，从我家到我姥姥家得2小时路程', isMine: true},
                { time: '', text: '我们下次再玩吧', isMine: true},
                { time: '', text: '嗯嗯', isMine: false},
        ] },
        'wechatfile': { name: '文件传输', avatar: 'image/wechatfile.jpeg', messages: [
                { time: '2020年5月29日 21:18', text: 'https://space.bilibili.com/3546600750188698?spm_id_from=333.1007.0.0', isMine: true },
                { time: '', text: '我已经分享了这个链接，参与了抽奖，你也能参与！只要点击链接就能参与活动！', isMine: true },
        ] }
    };

    const zhoumu3WechatData = {
        'family': { name: '相亲相爱的一家人 (3)', members: ['me'],hidden: true,messages: [
        ] },
        'me': { name: '若宁', avatar: 'image/ningning.jpg', hidden: true },
        'mom': { name: '用户不存在', avatar: 'image/user2.jpg',hidden: true, messages: [] },
        'dad': { name: '用户不存在', avatar: 'image/user2.jpg', hidden: true, messages: [] },
        'brother': { name: '用户不存在', avatar: 'image/user2.jpg', hidden: true, messages: [] },
        'yueyue': { name: '月月', avatar: 'image/yueyue.jpg', messages: [
                { time: '2020年6月4日 08:12', text: '月月，你猜猜看我姥姥给我买了什么？',  sender: '宁宁', isMine: true },
                { time: '2020年6月4日 08:16', text: '什么东西神神秘秘的呀', isMine: false},
                { time: '', text: '新的发夹吗？', isMine: false},
                { time: '', text: '不是',  sender: '宁宁', isMine: true },
                { time: '', text: '新的衣服？', isMine: false},
                { time: '', text: '也不是',  sender: '宁宁', isMine: true },
                { time: '', text: '那会是什么？猜不到', isMine: false},
                { time: '', text: '嘻嘻，也没啥就是电视里的玩偶罢了',  sender: '宁宁', isMine: true },
                { time: '', text: '什么玩偶呀？', isMine: false },
                { time: '', text: '就是兔子先生里的吗？', isMine: false },
                { time: '', text: '对对对！！我叫它棉棉，我跟你讲它老可爱了',  sender: '宁宁', isMine: true },
                { time: '2020年6月4日 08:21', text: '那你可以带到我家里玩吗？', isMine: false},
                { time: '', text: '我想抱抱看！看看是不是像电视机里那么神奇', isMine: false},
                { time: '', text: '哦对了，还有吗？我也想买一个', isMine: false},
                { time: '', text: '没啦，这是店里最后一个',  sender: '宁宁', isMine: true },
                { time: '', text: '额...',  sender: '宁宁', isMine: true },
                { time: '', text: '你姥姥对你真好', isMine: false},
                { time: '', text: '嗯？怎么了吗', isMine: false},
                { time: '', text: '没事',  sender: '宁宁', isMine: true },
                { time: '', text: '好吧', isMine: false},
                { time: '', text: '话说周六你能来我家吗？', isMine: false},
                { time: '', text: '不行，得要到下周，我这几天会在姥姥家',  sender: '宁宁', isMine: true },
                { time: '', text: '嗯？你不是一直都在姥姥家吗？', isMine: false},
                { time: '', text: '哦哦哦，我的意思是在过几天我们就能玩啦',  sender: '宁宁', isMine: true },
                { time: '', text: '好哦', isMine: false},
                { time: '', text: '那我下周四去你家？', isMine: false},
                { time: '', text: '可以不?', isMine: false},
                { time: '', text: '当然啦',  sender: '宁宁', isMine: true },
                { time: '', text: '爱你哦',  sender: '宁宁', isMine: true },
                { time: '', text: '我也爱你哦 闺蜜', isMine: false},
                { time: '2020年6月13日 12:03', text: '月月你个坏蛋', isMine: true},
                { time: '', text: '哈哈哈哈，我又怎么你了？', isMine: false},
                { time: '', text: '没事呀，我好无聊', isMine: true},
                { time: '', text: '你要我找你玩吗？', isMine: false},
                { time: '2020年6月13日 12:05', text: '我开玩笑的啦', isMine: true},
                { time: '', text: '嘻嘻', isMine: true},
                { time: '', text: '哈哈哈', isMine: false},
                { time: '2020年6月15日 12:12', text: '月月', sender: '宁宁',isMine: true},
                { time: '', text: '我感觉最近好空虚，好无聊', sender: '宁宁',isMine: true},
                { time: '2020年6月15日 12:15', text: '那你可以来找我玩呀', isMine: false},
                { time: '', text: '好！', isMine: true},
                { time: '2020年6月15日 21:42', text: '月月我今晚一个人在家', sender: '宁宁',isMine: true},
                { time: '2020年6月15日 21:42', text: '有点不敢睡觉，感觉屋子外面有吱吱喳喳的声音', sender: '宁宁',isMine: true},
                { time: '2020年6月15日 21:44', text: '可能是什么虫子吧', isMine: false},
                { time: '2020年6月15日 21:44', text: '没事的我在这里陪你', isMine: false},
        ] },
        'anmo': { name: '安沫', avatar: 'image/anmo.jpg', messages: [
                { time: '2020年6月2日 10:26', text: '宁宁，下周你有空吗？',  isMine: false },
                { time: '2020年6月2日 10:27', text: '怎么了呀 安沫？', isMine: true},
                { time: '', text: '找你玩羽毛球呗',  isMine: false },
                { time: '', text: '不然还能有什么呀',  isMine: false },
                { time: '',content: 'image/catemoji.png',  isMine: false, type: 'img' },
                { time: '', text: '可以啊', isMine: true},
                { time: '', text: '什么时候？', isMine: true},
                { time: '', text: '不知道，大概下周二三吧',  isMine: false },
                { time: '', text: '行，到时候我叫上我..', isMine: true},
                { time: '', text: '哦对了，你可以叫你爸爸来我姥姥家接我吗？', isMine: true},
                { time: '', text: '好呀，那就不见不散',  isMine: false },
                { time: '', text: 'kk', isMine: true}
        ] },
        'wechatfile': { name: '文件传输', avatar: 'image/wechatfile.jpeg', messages: [
                { time: '2020年5月29日 21:18', text: '[链接已过期]', isMine: true },
                { time: '', text: '我已经分享了这个链接，参与了抽奖，你也能参与！只要点击链接就能参与活动！', isMine: true },
            ] }
    };

   let previousWechatData = JSON.parse(localStorage.getItem('win10_wechat_data')) || {};
    const systemContacts = ['family', 'me', 'mom', 'dad', 'brother', 'yueyue', 'anmo', 'wechatfile'];

    function mergeCustomFriends(targetData) {
        for (let key in previousWechatData) {
            if (!systemContacts.includes(key)) {
                targetData[key] = previousWechatData[key];
            }
        }
        return targetData;
    }

    let wechatData;
    if (isZhoumu3) {
        if (localStorage.getItem('win10_wechat_zhoumu3_inited') !== 'true') {
            wechatData = mergeCustomFriends(zhoumu3WechatData);
            localStorage.setItem('win10_wechat_data', JSON.stringify(wechatData));
            localStorage.setItem('win10_wechat_zhoumu3_inited', 'true');
        } else {
            wechatData = JSON.parse(localStorage.getItem('win10_wechat_data')) || zhoumu3WechatData;
        }
    } else if (isZhoumu2) {
        if (localStorage.getItem('win10_wechat_zhoumu2_inited') !== 'true') {
            wechatData = mergeCustomFriends(zhoumu2WechatData);
            localStorage.setItem('win10_wechat_data', JSON.stringify(wechatData));
            localStorage.setItem('win10_wechat_zhoumu2_inited', 'true');
        } else {
            wechatData = JSON.parse(localStorage.getItem('win10_wechat_data')) || zhoumu2WechatData;
        }
    } else {
        wechatData = JSON.parse(localStorage.getItem('win10_wechat_data')) || originalWechatData;
    }
    
    let activeWeChatContact = 'family'; 

   if (wechatData[activeWeChatContact] && wechatData[activeWeChatContact].hidden) {
       for (let id in wechatData) {
           if (!wechatData[id].hidden && id !== 'me') {
               activeWeChatContact = id;
               break; 
           }
       }
   }

   function saveWeChat() { localStorage.setItem('win10_wechat_data', JSON.stringify(wechatData)); }

   const wechatLoginView = document.getElementById('wechat-login-view');
    const wechatMainUi = document.getElementById('wechat-main-ui');
    const wechatPwdInput = document.getElementById('wechat-pwd-input');
    const wechatLoginBtn = document.getElementById('wechat-login-btn');
    const wechatPwdError = document.getElementById('wechat-pwd-error');

    let isWechatLoggedIn = localStorage.getItem('win10_wechat_logged_in') === 'true';

    if (!isZhoumu2 && !isZhoumu3) {
        if (!isWechatLoggedIn) {
            if (wechatLoginView) wechatLoginView.style.display = 'flex';
            if (wechatMainUi) wechatMainUi.style.display = 'none';
        } else {
            if (wechatLoginView) wechatLoginView.style.display = 'none';
            if (wechatMainUi) wechatMainUi.style.display = 'flex';
        }
    } else {
        if (wechatLoginView) wechatLoginView.style.display = 'none';
        if (wechatMainUi) wechatMainUi.style.display = 'flex';
    }

    function doWechatLogin() {
        if (wechatPwdInput.value === '1120') {
            localStorage.setItem('win10_wechat_logged_in', 'true');
            wechatLoginView.style.display = 'none';
            wechatMainUi.style.display = 'flex';
            wechatPwdError.style.visibility = 'hidden';
            renderWeChat();
        } else {
            wechatPwdError.style.visibility = 'visible';
            wechatPwdInput.value = '';
            wechatPwdInput.focus();
        }
    }

    if (wechatLoginBtn) {
        wechatLoginBtn.onclick = doWechatLogin;
    }
    if (wechatPwdInput) {
        wechatPwdInput.onkeydown = (e) => {
            if (e.key === 'Enter') doWechatLogin();
        };
    }

    const originalVFS = {
        docs: [
            { id: 'd0', name: '日常密码.txt', content: '日常的密码被月月这个坏蛋改了', type: 'text' },
            { id: 'd1', name: '对照表.png', content: 'image/对照表.png', type: 'img' },
            { id: 'd2', name: '对照表.txt', content: '对照表是月月照着兔子先生动画写下来的，她说也许有天我会用到', type: 'text' },
            { id: 'd0', name: '微信.txt', content: '微信密码是：1120', type: 'text' },
        ],
        pics: [
            { id: 'p1', name: '海滩.png', content: 'image/全家图.png', type: 'img' },
            { id: 'p2', name: '动物园.png', content: 'image/zoo.png', type: 'img' },
            { id: 'p3', name: '水族馆.png', content: 'image/水族馆.png', type: 'img' },
            { id: 'p4', name: '山上.png', content: 'image/山上.png', type: 'img' },
            { id: 'p5', name: '文字.txt', content: '这些照片是两年前拍的', type: 'text' },
        ],
        secret: [ 
            { id: 's0', name: '文字.txt', content: '妈妈周三下午就回来了，比我想的要快很多！妈妈和爸爸给我买了一个小蛋糕！！！超级好吃！！奶油特别绵密，上面摆满了草莓。可惜中间的猕猴桃有点酸，我都挑出来了……我拿到蛋糕后切了一块分享给哥哥，但是感觉他不是那么想吃。他就连自己生日的蛋糕，最后还是我帮忙吃完的……哼，没品的家伙。算了，不和他一般见识。对了，月月明天就要来我家了，我得准备一下房间……', type: 'text' },
            { id: 's1', name: '文字(1).txt', content: '月月周四来我家玩啦！！！我超开心！她爸爸送她来的。哥哥带我们在外面玩了一会儿羽毛球，后来我们一起看了电视，还吃了妈妈之前包的饺子。真好吃！真希望月月能够住在我家一段时间！这样我们就可以一直玩啦！！到了晚餐时间，我妈妈居然同意月月来我家过夜！！！晚上，月月拉着我一起看《兔子先生》，还在我电脑里下载了一些东西，也不知道是什么。然后我们不知不觉就看到了很晚，还被妈妈说了……不过我又不是每天都看那么晚嘛！但不管怎么说，起码我能和月月待在一起。', type: 'text' },
            { id: 's1', name: '文字(2).txt', content: '月月一直在我家待到周六才被爸爸妈妈接走。我恳求妈妈让月月再待一会儿，但是被她无情地拒绝了。我好难过……', type: 'text' },
            { id: 's3', name: '兔兔先生.png', content: 'image/tv.png', type: 'img' },
            { id: 's4', name: 'unknown.exe', content: '', type: 'exe' }
        ],
        bin: [] 
    };

    const zhoumu2VFS = {
        docs: [
            { id: 'd9', name: '日记密码.txt', content: '我把日记的密码设置为了1314，嘻嘻嘻多好的寓意呀，也许这样我就不会忘记了吧，还是把它锁起来安全点', type: 'text' },
            { id: 'd10', name: '文字.txt', content: '妈妈周三下午就回来了，比我想的要快很多！妈妈和爸爸给我买了一个小蛋糕！！！超级好吃！！好绵密的奶油，上面摆满了草莓，可惜中间的猕猴桃有点酸，我都挑出来了……我拿到蛋糕后切了一块分享给了……我……忘记自己分享给了谁…………对了月月明天就要来我家了，我得准备一下房间……', type: 'text' },
            { id: 'd11', name: '文字(1).txt', content: '月月周四来我家玩啦！！！我超开心，她爸爸送她来的。爸爸……还带我们去外面玩羽毛球的呢，后来我们一起看了电视，和吃妈妈之前包的饺子，真好吃，妈妈做了多余的一份！！这样我和月月还能吃夜宵……哎真希望月月能够住在我家一段时间！这样我们就可以一直玩啦！！于是我去问了妈妈，妈妈居然同意了月月来我家过夜！！！本来晚上月月拉着我一起看《兔子先生》……结果《兔子先生》好像停播了真可惜，但是还好爸爸给我买到了最后一个周边兔兔，不然可就买不到了，然后我们不知不觉看到了好晚还被妈妈说了……但我又不是每天都看那么晚，但是不管怎么说我起码和月月能待在一起。', type: 'text' },
            { id: 'd12', name: '文字(2).txt', content: '月月一直在我家待到周六才被爸爸妈妈接走。我恳求妈妈让月月再待一会儿，但是被她无情地拒绝了。我好难过……', type: 'text' },
            { id: 'd12', name: '文字(3).txt', content: '。。。。。最近几天我感觉自己玩得好累哦 =v=……我真的需要好好休息一下了。。。。。哦，对了，为了防止我忘记，昨天月月走前在我的电脑里放了一个文件。她说什么如果我以后忘记什么的话，可以看一下。我问她是什么意思，她却没正面回答我。真讨厌啊，干嘛神神秘秘的……不过嘛，她走后我还是打开看了一眼。结果也不知道她是从哪里找到的，是爸爸，妈妈和我一起吃饭的照片。我还以为又是什么不得了的东西呢……但是不知道为什么，自己的眼角湿润了', type: 'text' },
            { id: 'd13', name: '文字(4).txt', content: '...', type: 'text' },
            { id: 'd13', name: '晚餐.png', content: 'image/吃饭.png', type: 'img' }
        ],
        pics: [
            { id: 'p1', name: '海滩.png', content: 'image/全家图1.png', type: 'img' },
            { id: 'p2', name: '动物园.png', content: 'image/zoo.png', type: 'img' },
            { id: 'p3', name: '水族馆.png', content: 'image/水族馆1.png', type: 'img' },
            { id: 'p4', name: '山上.png', content: 'image/山上1.png', type: 'img' },
            { id: 'p5', name: '文字.txt', content: '这些图片是两年前拍的，那时候的我好小', type: 'text' },
        ],
        secret: [], 
        bin: []
    };
    const zhoumu3VFS = {
        docs: [
            { id: 'p6', name: '密码.txt', content: 'A -> S, L -> A, K -> L, U -> i, Q -> W, P -> Q', type: 'text' },
            { id: 'p6', name: '文字.txt', content: '我叫若宁。从小到大，我都和姥姥住在一起。她总爱牵着我的手去街上，说是让我看看外面，也总是给我买各种好吃的。那时候的日子，是那么无忧无虑。但最近……不知道怎么了，脑海里总是浮现出一些陌生人的脸。总是那么模糊，却又如此真实。我尝试着去触摸他们，但我摸不到……他们太高了……每次快要摸到的时候，我就会失去平衡摔倒……就这样，摔了一次又一次……我不知道为什么……我要这样做。', type: 'text' },
            { id: 'd99', name: '文字(1).txt', content: '月月周四来我姥姥家玩了，我很开心……是她爸爸送她来的……我们一起去外面打了羽毛球，看了电视，还吃了饺子。饺子真好吃……晚上月月就被她爸爸接回家了。', type: 'text' },
            { id: 'd98', name: '文字(2).txt', content: '……', type: 'text' },
            { id: 'd97', name: '文字(3).txt', content: '……', type: 'text' },
            { id: 'd96', name: '文字(4).txt', content: '……', type: 'text' },
            { id: 'v1', name: '视频.mp4', content: 'video/video.mp4', type: 'video' },
        ],
        pics: [
            { id: 'p1', name: '海滩.png', content: 'image/全家图2.png', type: 'img' },
            { id: 'p2', name: '动物园.png', content: 'image/zoo1.png', type: 'img' },
            { id: 'p3', name: '水族馆.png', content: 'image/水族馆1.png', type: 'img' },
            { id: 'p4', name: '山上.png', content: 'image/兔子先生.png', type: 'img' },
            { id: 'p5', name: '文字.txt', content: '...这些照片是两年前拍的', type: 'text' },
        ],
        secret: [], 
        bin: []
    };

    let vfs;
    if (isZhoumu3) {
        if (localStorage.getItem('win10_vfs_zhoumu3_inited') !== 'true') {
            vfs = zhoumu3VFS;
            localStorage.setItem('win10_vfs', JSON.stringify(vfs));
            localStorage.setItem('win10_vfs_zhoumu3_inited', 'true');
        } else {
            vfs = JSON.parse(localStorage.getItem('win10_vfs')) || zhoumu3VFS;
        }
    } else if (isZhoumu2) {
        if (localStorage.getItem('win10_vfs_zhoumu2_inited') !== 'true') {
            vfs = zhoumu2VFS;
            localStorage.setItem('win10_vfs', JSON.stringify(vfs));
            localStorage.setItem('win10_vfs_zhoumu2_inited', 'true');
        } else {
            vfs = JSON.parse(localStorage.getItem('win10_vfs')) || zhoumu2VFS;
        }
    } else {
        vfs = JSON.parse(localStorage.getItem('win10_vfs')) || originalVFS;
    }

    let selectedFiles = { docs: null, pics: null, secret: null, bin: null }; 
    let currentEditingFile = null;

    
    let isSecretUnlocked = localStorage.getItem('win10_secret_unlocked') === 'true';
    let isDocsUnlocked = localStorage.getItem('win10_docs_unlocked') === 'true'; 
    let isDocsUnlockedZ3 = localStorage.getItem('win10_docs_unlocked_z3') === 'true'; 

    function saveVFS() { localStorage.setItem('win10_vfs', JSON.stringify(vfs)); }
    const searchableItems = [
        { id: 'sch0', name: '成绩单.png', content: 'image/成绩单.png', type: 'img' },
        { id: 'sch1', name: '哥哥.db', content: 'Error: database disk image is malformed', type: 'text', icon: 'image/db.png'},
        { id: 'sch2', name: '2018毕业照.png', content: 'image/毕业照.png', type: 'img' },
        { id: 'sch3', name: '未命名.bat', content: '[已被篡改]', type: 'text',icon: 'image/db.png'},
        { id: 'sch4', name: 'key.txt', content: 'RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT', type: 'text',icon: 'image/file.png'}
    ];

    const cDriveFolders = [
        { name: 'Program Files', type: 'folder' },
        { name: 'Program Files (x86)', type: 'folder' },
        { name: 'Users', type: 'folder' },
        { name: 'Wechat', type: 'folder' },
        { name: 'Windows', type: 'folder' }
    ];

    function renderSearchView(keyword = '') {
        const container = document.getElementById('content-search');
        const countSpan = document.getElementById('search-item-count');
        if (!container) return;
        container.innerHTML = '';

        if (!keyword) {
            cDriveFolders.forEach(folder => {
                const div = document.createElement('div');
                div.className = 'file-item';
                div.innerHTML = `<div class="file-icon"><img src="image/folder.png"></div><div class="file-name">${folder.name}</div>`;
                div.onclick = (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('#content-search .file-item').forEach(el => el.classList.remove('selected'));
                    div.classList.add('selected');
                };
                div.ondblclick = () => {
                    const modal = document.getElementById('win-modal');
                    const textEl = modal.querySelector('.modal-text');
                    if (textEl) textEl.innerText = "路径已被破坏，无法访问。";
                    modal.style.display = 'flex';
                };
                container.appendChild(div);
            });
            if (countSpan) countSpan.innerText = cDriveFolders.length + " 个项目";
        } else {
            const results = searchableItems.filter(item => {
                const nameLower = item.name.toLowerCase();
                const keyLower = keyword.toLowerCase();
                const nameWithoutExt = nameLower.includes('.') ? nameLower.substring(0, nameLower.lastIndexOf('.')) : nameLower;
                if (keyLower === '兔子先生') {
                    return item.id === 'sch4';
                }
                if (keyLower === '江明远') {
                    return item.id === 'sch3';
                }
                if (keyLower === '哥哥' && (item.id === 'sch0' || item.id === 'sch1' || item.id === 'sch2')) {
                    return true;
                }

                return keyLower === nameLower || keyLower === nameWithoutExt;
            });

            if (results.length > 0) {
                results.forEach(file => {
                    const div = document.createElement('div');
                    
                    div.className = 'file-item'; 
                    
                    let iconHTML = '';
                    if (file.icon) iconHTML = `<img src="${file.icon}">`;
                    else if (file.type === 'img') iconHTML = `<img src="${file.content}" style="object-fit: cover;">`;
                    else if (file.type === 'exe') iconHTML = `<img src="image/exe.png">`;
                    else iconHTML = `<img src="image/file.png">`;
                    
                    div.innerHTML = `<div class="file-icon">${iconHTML}</div><div class="file-name">${file.name}</div>`;
                    
                    div.onclick = (e) => {
                        e.stopPropagation();
                        document.querySelectorAll('#content-search .file-item').forEach(el => el.classList.remove('selected'));
                        div.classList.add('selected');
                    };
                    div.ondblclick = () => openFile(file, 'search');
                    container.appendChild(div);
                });
                if (countSpan) countSpan.innerText = results.length + " 个项目";
            } else {
                container.innerHTML = `<div style="width:100%; padding-top: 30px; text-align: center; color: #666; font-size: 14px;">
                    找不到与 "${keyword}" 匹配的项目。<br><br><span style="font-size:12px;color:#999;">请检查拼写或尝试使用其他搜索内容。</span>
                </div>`;
                if (countSpan) countSpan.innerText = "0 个项目";
            }
        }
    }

    const sysSearchInput = document.getElementById('sys-search-input');
    if (sysSearchInput) {
        sysSearchInput.addEventListener('input', (e) => {
            renderSearchView(e.target.value.trim());
        });
    }

    const searchContent = document.getElementById('content-search');
    if (searchContent) {
        searchContent.onclick = () => {
            document.querySelectorAll('#content-search .file-item').forEach(el => el.classList.remove('selected'));
        };
    }

    let windowsState = JSON.parse(localStorage.getItem('win10_windows')) || {};
    for (let k in appInfo) if (!windowsState[k]) windowsState[k] = { isOpen: false, isMinimized: false };
    function saveWindowsState() { localStorage.setItem('win10_windows', JSON.stringify(windowsState)); }
    
    function saveIconsPosition() {
        const state = {};
        document.querySelectorAll('.desktop-icon').forEach(icon => state[icon.id] = { left: icon.style.left, top: icon.style.top });
        localStorage.setItem('win10_icons', JSON.stringify(state));
    }

    function createCreepyPicElement(appId) {
        if (document.getElementById(`icon-${appId}`)) return; 
        const desktop = document.getElementById('desktop');
        const picIcon = document.createElement('div');
        picIcon.className = 'desktop-icon';
        picIcon.id = `icon-${appId}`;
        picIcon.setAttribute('data-app', appId);
        picIcon.innerHTML = `<div class="icon-img"><img src="${appInfo[appId].icon}" style="object-fit: cover;"></div><div class="icon-text">${appInfo[appId].name}</div>`;
        desktop.appendChild(picIcon);
        
        makeDraggable(picIcon, picIcon); 
        
        picIcon.ondblclick = () => {
            document.getElementById('title-photoviewer').innerText = `${appInfo[appId].name} - 照片查看器`;
            document.getElementById('viewer-img').src = appInfo[appId].icon;
            openApp('photoviewer');
        };
    }

    function loadSystemData() {
        if (isZhoumu2 && localStorage.getItem('win10_creepy_spawned') === 'true') {
            if (localStorage.getItem('win10_creepy_puzzle_solved') === 'true') {
                createCreepyPicElement('merged_pic');
            } else {
                for (let i = 1; i <= 9; i++) {
                    createCreepyPicElement(`cpic${i}`);
                }
            }
        }

        const savedIcons = JSON.parse(localStorage.getItem('win10_icons'));
        if (savedIcons) {
            for (let id in savedIcons) {
                const icon = document.getElementById(id);
                if (icon) { icon.style.left = savedIcons[id].left; icon.style.top = savedIcons[id].top; }
            }
        }

        if (isZhoumu2 && localStorage.getItem('win10_creepy_spawned') === 'true') {
            for (let i = 1; i <= 9; i++) {
                const inBin = vfs.bin.find(item => item.isApp && item.id === `cpic${i}`);
                if (inBin) {
                    const icon = document.getElementById(`icon-cpic${i}`);
                    if (icon) icon.style.display = 'none';
                }
            }
        }

        if (isZhoumu3) {
            for (let i = 1; i <= 9; i++) {
                const icon = document.getElementById(`icon-cpic${i}`);
                if (icon) icon.style.display = 'none';
            }
            
            const newsIcon = document.getElementById('icon-news');
            if (newsIcon) newsIcon.style.display = 'none';

            const searchIcon = document.getElementById('icon-search');
            if (searchIcon) searchIcon.style.display = 'none';

            const iconHospPdf = document.getElementById('icon-hospitalpdf');
            if (iconHospPdf) iconHospPdf.style.display = 'none';

            const secretIcon = document.getElementById('icon-secret');
            if (secretIcon) secretIcon.style.display = 'none';
            const docsIconImg = document.querySelector('#icon-docs img');
            if (docsIconImg) docsIconImg.src = 'image/zipfolder.png';
            const docsIconText = document.querySelector('#icon-docs .icon-text');
            if (docsIconText) docsIconText.innerText = '未命名';
            document.getElementById('win-docs-title').innerText = '未命名';
            document.getElementById('win-docs-path').innerText = '> 此电脑 > 日记';

            const cmdIconText = document.querySelector('#icon-cmd .icon-text');
            if (cmdIconText) cmdIconText.innerText = '兔先生.exe';
            const cmdWinTitle = document.getElementById('win-cmd-title');
            if (cmdWinTitle) cmdWinTitle.innerText = '管理员: 兔先生.exe';
            const cmdHeader = document.getElementById('cmd-header');
            if (cmdHeader) cmdHeader.innerText = '兔先生 [版本 0.0.19045.2965]';

            const pdfIcon = document.getElementById('icon-pdfviewer');
            if (pdfIcon) pdfIcon.style.display = 'flex';

            if (isDocsUnlockedZ3) {
                if (docsIconImg) docsIconImg.src = 'image/folder.png';
                appInfo['docs'].icon = 'image/folder.png';
            }

        }

        else if (isZhoumu2) {

            const newsIcon = document.getElementById('icon-news');
            if (newsIcon) newsIcon.style.display = 'none';

            const secretIcon = document.getElementById('icon-secret');
            if (secretIcon) secretIcon.style.display = 'none';

            const deskPicIcon = document.getElementById('icon-desktop-pic');
            if (deskPicIcon) deskPicIcon.style.display = 'flex';

            const searchIcon = document.getElementById('icon-search');
            if (searchIcon) searchIcon.style.display = 'flex';

            const docsIconImg = document.querySelector('#icon-docs img');
            if (docsIconImg) docsIconImg.src = 'image/zipfolder.png';
            const docsIconText = document.querySelector('#icon-docs .icon-text');
            if (docsIconText) docsIconText.innerText = '日记';
            document.getElementById('win-docs-title').innerText = '日记';
            document.getElementById('win-docs-path').innerText = '> 此电脑 > 日记';

            const cmdIconText = document.querySelector('#icon-cmd .icon-text');
            if (cmdIconText) cmdIconText.innerText = '兔先生.exe';
            const cmdWinTitle = document.getElementById('win-cmd-title');
            if (cmdWinTitle) cmdWinTitle.innerText = '管理员: 兔先生.exe';
            const cmdHeader = document.getElementById('cmd-header');
            if (cmdHeader) cmdHeader.innerText = '兔先生 [版本 0.0.19045.2965]';

            if (isDocsUnlocked) {
                if (docsIconImg) docsIconImg.src = 'image/folder.png';
                appInfo['docs'].icon = 'image/folder.png';
            }

            const googleIcon = document.getElementById('icon-google');
            if (googleIcon) googleIcon.style.display = 'flex';  

        } else if (isSecretUnlocked) {
            appInfo['secret'].icon = 'image/folder.png';
            document.getElementById('img-secret').src = 'image/folder.png';
        }

        renderFolder('docs');
        renderFolder('pics');
        renderFolder('secret');
        renderBin();
        renderWeChat();
        renderSearchView();

        if (localStorage.getItem('win10_cmd_downloaded') === 'true') {
            const iconCmd = document.getElementById('icon-cmd');
            const inBin = vfs.bin.find(item => item.isApp && item.id === 'cmd');
            if (iconCmd && !inBin) {
                iconCmd.style.display = 'flex';
            }
        }

        if (localStorage.getItem('win10_hospital_pdf_downloaded') === 'true' && !isZhoumu3) {
            const iconHospPdf = document.getElementById('icon-hospitalpdf');
            const inBin = vfs.bin.find(item => item.isApp && item.id === 'hospitalpdf');
            if (iconHospPdf && !inBin) {
                iconHospPdf.style.display = 'flex';
            }
        }

        for (let appId in windowsState) {
            if (windowsState[appId].isOpen && appInfo[appId]) {
                const win = document.getElementById(`win-${appId}`);
                if (win) {
                    createTaskbarItem(appId);
                    if (!windowsState[appId].isMinimized) {
                        win.style.display = "flex";
                        if (appId === 'google') {
                            requestAnimationFrame(() => {
                                if (typeof showGoogleHome === 'function') showGoogleHome();
                            });
                        }
                    }
                }
            }
        }
    }


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
                    desc: '提供完整的ASCII码表，包括26个英文字母的大写与小写、十进制、十六进制 (Hex) 以及二进制转换数值，方便开发者快速查阅。',
                    favicon: 'alphabet'
                }
            ]
        },
        {
            id: 'password',
            matched: ['密码', '口令', '解压', '压缩密码', 'password', '忘记密码', '找回密码', '日记密码', '锁', '破解', '维吉尼亚'],
            results: [
                {
                    title: '什么是维吉尼亚密码？原理及加密解密过程详解 - 知乎',
                    url: 'zhihu.xyzz/question/vigenere-cipher',
                    displayUrl: 'www.zhihu.xyzz › question › 维吉尼亚密码',
                    desc: '维吉尼亚密码（Vigenère cipher）是一种多表密码，使用一系列交错的恺撒密码对字母进行加密。加密和解密时需要依靠一个给定的密钥（Key）以及一个26x26的字母方阵。相比简单的单表代换密码，它能有效隐藏字母频率。',
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
                    desc: '《兔子先生》已于2020年6月起暂停更新。该动画讲述了一只可爱的兔子的动画故事。停播原因官方未作说明。与之相关内容已从平台下架。',
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
        }
    ];

    const TRENDING = ['字母表', '地图', '密码', '维吉尼亚', '失踪', '遗忘'];
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
            bili:  `<svg width="14" height="14" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#FB7299"/><text x="5" y="17" fill="white" font-size="13" font-weight="bold" font-family="arial">B</text></svg>`,
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

            if (avatar) avatar.src = 'image/ming.png'; 
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
            content: url('image/ming.png') !important;
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
            el.src = 'image/ming.png';
        }
    });

    const positions = [
        [8,  10], [55, 5],  [80, 15], [15, 55],
        [45, 60], [70, 45], [30, 80], [85, 70]
    ];
    positions.forEach(([top, left]) => {
        const f = document.createElement('img');
        f.className = 'jmy-ming-float';
        f.src = 'image/ming.png';
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

    loadSystemData();

    setInterval(() => {
        const now = new Date();
        document.getElementById('sys-time').innerText = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }, 1000);

    function isGridOccupied(x, y, ignoreId) {
        let occupied = false;
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            if (icon.id !== ignoreId && icon.style.display !== 'none') {
                if (Math.abs(parseInt(icon.style.left || 0) - x) < 10 && Math.abs(parseInt(icon.style.top || 0) - y) < 10) occupied = true;
            }
        });
        return occupied;
    }

    function getEmptyGridPos(ignoreId) {
        let maxCols = Math.floor((window.innerWidth - GRID_W) / GRID_W);
        let maxRows = Math.floor((window.innerHeight - GRID_H - 40) / GRID_H);
        for (let c = 0; c <= maxCols; c++) {
            for (let r = 0; r <= maxRows; r++) {
                let x = c * GRID_W + OFFSET_X;
                let y = r * GRID_H + OFFSET_Y;
                if (!isGridOccupied(x, y, ignoreId)) return { x, y };
            }
        }
        return { x: OFFSET_X, y: OFFSET_Y }; 
    }

    function getRandomEmptyGridPos(ignoreId) {
        let maxCols = Math.floor((window.innerWidth - GRID_W) / GRID_W);
        let maxRows = Math.floor((window.innerHeight - GRID_H - 40) / GRID_H);
        let emptySpots = [];
        for (let c = 0; c <= maxCols; c++) {
            for (let r = 0; r <= maxRows; r++) {
                let x = c * GRID_W + OFFSET_X;
                let y = r * GRID_H + OFFSET_Y;
                if (!isGridOccupied(x, y, ignoreId)) {
                    emptySpots.push({ x, y });
                }
            }
        }
        if (emptySpots.length > 0) {
            return emptySpots[Math.floor(Math.random() * emptySpots.length)];
        }
        return { x: OFFSET_X, y: OFFSET_Y }; 
    }

    const glitchChars = ['æØÞÆø', 'ÐÆ₳₳₳', 'ï»¿ï»¿', '̴̴̴', '▒▒▒▒▒▒', '§§§§§', '┼┼┼┼┼', '☠☠☠☠☠', '■■■■■', '¿¿¿¿¿','我会见到你的'];
    let glitchInterval = null;

    function executeGlitchState() {
        const startTimeStr = localStorage.getItem('win10_glitch_start');
        if (!startTimeStr) return;
        
        const startTime = parseInt(startTimeStr, 10);
        const now = Date.now();
        const elapsed = now - startTime;
        
        const totalDuration = 6000;
        const waitTime = 1000;     
        
        if (elapsed >= totalDuration) {
            finishGlitch();
            return;
        }

        const desktop = document.getElementById('desktop');
        const icons = document.querySelectorAll('.desktop-icon .icon-text');
        
        icons.forEach(el => {
            if (!el.hasAttribute('data-orig-name')) {
                el.setAttribute('data-orig-name', el.innerText);
            }
        });

        function startRedAndGlitch() {
            desktop.style.transition = 'none'; 
            desktop.style.backgroundImage = 'none';
            desktop.style.backgroundColor = '#6e0000';
            
            if (glitchInterval) clearInterval(glitchInterval);
            glitchInterval = setInterval(() => {
                icons.forEach(el => {
                    el.innerText = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                });
            }, 80);
        }

        if (elapsed < waitTime) {
            setTimeout(() => {
                startRedAndGlitch();
                setTimeout(finishGlitch, totalDuration - waitTime);
            }, waitTime - elapsed);
        } else {
            startRedAndGlitch();
            setTimeout(finishGlitch, totalDuration - elapsed);
        }
    }
    function finishGlitch() {
        if (glitchInterval) {
            clearInterval(glitchInterval);
            glitchInterval = null;
        }
        localStorage.removeItem('win10_glitch_start');
        
        const desktop = document.getElementById('desktop');
        desktop.style.backgroundColor = '';
        desktop.style.backgroundImage = '';
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            const appId = icon.getAttribute('data-app');
            const textEl = icon.querySelector('.icon-text');
            
            if (appId && appId.startsWith('cpic')) {
                const num = appId.replace('cpic', '');
                textEl.innerText = `${num}.png`;
                if(appInfo[appId]) appInfo[appId].name = `${num}.png`;
            } else {
                if (textEl.hasAttribute('data-orig-name')) {
                    textEl.innerText = textEl.getAttribute('data-orig-name');
                } else if (appInfo[appId]) {
                    textEl.innerText = appInfo[appId].name;
                }
            }
        });
    }

    function checkCreepyPuzzle() {
        if (localStorage.getItem('win10_creepy_puzzle_solved') === 'true') return;

        const pieces = [];
        for (let i = 1; i <= 9; i++) {
            const el = document.getElementById(`icon-cpic${i}`);
            if (!el || el.style.display === 'none') return;
            pieces.push(el);
        }

        const baseLeft = parseInt(pieces[0].style.left, 10);
        const baseTop = parseInt(pieces[0].style.top, 10);

        let isSolved = true;
        for (let i = 0; i < 9; i++) {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const expectedLeft = baseLeft + col * GRID_W;
            const expectedTop = baseTop + row * GRID_H;

            const actualLeft = parseInt(pieces[i].style.left, 10);
            const actualTop = parseInt(pieces[i].style.top, 10);
            if (actualLeft !== expectedLeft || actualTop !== expectedTop) {
                isSolved = false;
                break;
            }
        }

        if (isSolved) {
            localStorage.setItem('win10_creepy_puzzle_solved', 'true');
            
            pieces.forEach(el => el.style.display = 'none');

            createCreepyPicElement('merged_pic');
            
            const mergedIcon = document.getElementById('icon-merged_pic');
            if (mergedIcon) {
                mergedIcon.style.left = (baseLeft + GRID_W) + "px";
                mergedIcon.style.top = (baseTop + GRID_H) + "px";
            }
            
            saveIconsPosition();
        }
    }

    executeGlitchState();

    function isIntersecting(el1, el2) {
        const r1 = el1.getBoundingClientRect(); const r2 = el2.getBoundingClientRect();
        return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
    }

    function makeDraggable(element, handleElement) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, startX = 0, startY = 0;
        handleElement.onmousedown = (e) => {
            e.preventDefault();
            pos3 = e.clientX; pos4 = e.clientY;
            startX = element.offsetLeft; startY = element.offsetTop;
            document.onmouseup = closeDragElement; document.onmousemove = elementDrag;
            if (element.classList.contains('window')) bringToFront(element.getAttribute('data-app'));
            else element.style.zIndex = 999; 
        };
        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
            pos3 = e.clientX; pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px"; element.style.left = (element.offsetLeft - pos1) + "px";
        }
        function closeDragElement() {
            document.onmouseup = null; document.onmousemove = null;
            if (element.classList.contains('desktop-icon')) {
                element.style.zIndex = 1;
                const binEl = document.getElementById('icon-bin');
                if (element.id !== 'icon-bin' && isIntersecting(element, binEl)) {
                    const dragId = element.getAttribute('data-app');
                    if(dragId !== 'desktop-pic' && dragId !== 'search') {
                        moveToBin_App(dragId); return; 
                    }
                }
                
                let snapLeft = Math.round((element.offsetLeft - OFFSET_X) / GRID_W) * GRID_W + OFFSET_X;
                let snapTop = Math.round((element.offsetTop - OFFSET_Y) / GRID_H) * GRID_H + OFFSET_Y;
                
                let maxLeft = window.innerWidth - GRID_W; 
                let maxTop = window.innerHeight - GRID_H - 40;
                
                snapLeft = Math.max(OFFSET_X, Math.min(snapLeft, maxLeft)); 
                snapTop = Math.max(OFFSET_Y, Math.min(snapTop, maxTop));
                
                if (isGridOccupied(snapLeft, snapTop, element.id)) { element.style.left = startX + "px"; element.style.top = startY + "px"; }
                else { element.style.left = snapLeft + "px"; element.style.top = snapTop + "px"; }
                
                saveIconsPosition();

                checkCreepyPuzzle();
            }
        }
    }

    let currentUnlockTarget = null;

    document.querySelectorAll('.desktop-icon').forEach(icon => {
        makeDraggable(icon, icon);
        icon.ondblclick = () => {
            const appId = icon.getAttribute('data-app');

            if (appId === 'secret' && !isSecretUnlocked) {
                currentUnlockTarget = 'secret';
                document.getElementById('pwd-modal').style.display = 'flex';
                document.getElementById('zip-pwd-input').value = '';
                document.getElementById('pwd-error').style.display = 'none';
                document.getElementById('zip-pwd-input').focus();
            }else if (appId === 'docs' && isZhoumu3 && !isDocsUnlockedZ3) {
                currentUnlockTarget = 'docs_z3';
                document.getElementById('pwd-modal').style.display = 'flex';
                document.getElementById('zip-pwd-input').value = '';
                document.getElementById('pwd-error').style.display = 'none';
                document.getElementById('zip-pwd-input').focus();
            }
            else if (appId === 'docs' && isZhoumu2 && !isZhoumu3 && !isDocsUnlocked) {
                currentUnlockTarget = 'docs';
                document.getElementById('pwd-modal').style.display = 'flex';
                document.getElementById('zip-pwd-input').value = '';
                document.getElementById('pwd-error').style.display = 'none';
                document.getElementById('zip-pwd-input').focus();
            } 
            else if (appId.startsWith('cpic')) {
                document.getElementById('title-photoviewer').innerText = `${appInfo[appId].name} - 照片查看器`;
                document.getElementById('viewer-img').src = appInfo[appId].icon;
                openApp('photoviewer');
            } 
            else {
                openApp(appId);
            }
        };
    });

    document.querySelectorAll('.window').forEach(win => {
        makeDraggable(win, win.querySelector('.title-bar'));
        win.onmousedown = () => bringToFront(win.getAttribute('data-app'));
    });

    const pwdModal = document.getElementById('pwd-modal');
    const pwdInput = document.getElementById('zip-pwd-input');
    const pwdError = document.getElementById('pwd-error');

    function checkPassword() {
        if (currentUnlockTarget === 'secret') {
            if (pwdInput.value === '052012') {
                pwdError.style.display = 'block';
                pwdInput.focus();
                if (!isZhoumu2 && !isZhoumu3 && localStorage.getItem('win10_event_anmo_fake_pwd') !== 'true') {
                    localStorage.setItem('win10_event_anmo_fake_pwd', 'true');
                    
                    const chatSequenceAnmo = [
                        { text: '你在干嘛呀宁宁？', delay: 3000, isMine: false },
                        { text: '没事呀', delay: 2000, isMine: true },
                        { text: '怎么了', delay: 2000, isMine: true },
                        { text: '嗯...我只是有点联系不到月月了', delay: 3000, isMine: false },
                        { text: '她在你那边吗？', delay: 2000, isMine: false },
                        { text: '她昨天就回家了', delay: 3000, isMine: true },
                        { text: '...', delay: 1000, isMine: true },
                        { text: '我打视频看看', delay: 2000, isMine: true },
                        { text: '好！', delay: 1000, isMine: false },
                        { text: '到时候她告诉你什么', delay: 3000, isMine: false },
                        { text: '要和我讲哦', delay: 2000, isMine: false },
                        { text: '好！', delay: 1000, isMine: true },
                    ];

                    let toastTimeoutAnmo;
                    const runSequenceAnmo = async () => {
                        for (let i = 0; i < chatSequenceAnmo.length; i++) {
                            const msg = chatSequenceAnmo[i];
                            await new Promise(r => setTimeout(r, msg.delay));

                            const now = new Date();
                            const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

                            wechatData['anmo'].messages.push({ time: timeStr, text: msg.text, isMine: msg.isMine });

                            if (!msg.isMine) {
                                wechatData['anmo'].unread = true;
                                
                                const audio = document.getElementById('msg-sound');
                                if (audio) {
                                    audio.currentTime = 0;
                                    audio.play().catch(e => console.log('浏览器阻止了自动播放'));
                                }
                                
                                const toast = document.getElementById('win-toast');
                                if (toast) {
                                    const toastImgs = toast.querySelectorAll('img');
                                    if(toastImgs.length > 1) toastImgs[1].src = 'image/anmo.jpg';
                                    const nameDiv = toast.querySelector('div[style*="font-weight: bold"]');
                                    if(nameDiv) nameDiv.innerText = '安沫';

                                    document.getElementById('toast-body').innerText = msg.text;
                                    
                                    toast.onclick = () => {
                                        openApp('wechat');
                                        toast.style.right = '-350px';
                                        activeWeChatContact = 'anmo';
                                        renderWeChat();
                                    };

                                    toast.style.right = '20px';
                                    clearTimeout(toastTimeoutAnmo);
                                    toastTimeoutAnmo = setTimeout(() => {
                                        toast.style.right = '-350px';
                                    }, 4000); 
                                }
                            }
                            saveWeChat();
                            renderWeChat(); 
                        }
                    };
                    runSequenceAnmo();
                }
            } else if (pwdInput.value === 'yueyue12') {
                isSecretUnlocked = true;
                localStorage.setItem('win10_secret_unlocked', 'true');
                pwdModal.style.display = 'none';
                document.getElementById('img-secret').src = 'image/folder.png';
                appInfo['secret'].icon = 'image/folder.png';
                openApp('secret');
            } else {
  
                pwdError.style.display = 'block';
                pwdInput.focus();
            }
        } else if (currentUnlockTarget === 'docs_z3') {
            if (pwdInput.value === 'awful' || pwdInput.value === 'AWFUL') {
                isDocsUnlockedZ3 = true;
                localStorage.setItem('win10_docs_unlocked_z3', 'true');
                pwdModal.style.display = 'none';
                const docsIconImg = document.querySelector('#icon-docs img');
                if (docsIconImg) docsIconImg.src = 'image/folder.png';
                appInfo['docs'].icon = 'image/folder.png';
                openApp('docs');
            } else {
                pwdError.style.display = 'block';
                pwdInput.focus();
            }
        }
        else if (currentUnlockTarget === 'docs') {
            if (pwdInput.value === '1314') {
                isDocsUnlocked = true;
                localStorage.setItem('win10_docs_unlocked', 'true');
                pwdModal.style.display = 'none';
                const docsIconImg = document.querySelector('#icon-docs img');
                if (docsIconImg) docsIconImg.src = 'image/folder.png';
                appInfo['docs'].icon = 'image/folder.png';
                openApp('docs');

                if (isZhoumu2 && localStorage.getItem('win10_event_dad_diary') !== 'true') {
                    localStorage.setItem('win10_event_dad_diary', 'true');
                    
                    const chatSequenceDad = [
                        { text: '宁宁，你在看什么？', delay: 3000, isMine: false },
                        { text: '妈妈不是说过了吗早点睡觉吗？', delay: 3500, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 4000, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false },
                        { text: '你是个听话的孩子，对吧？', delay: 100, isMine: false }
                    ];

                    let toastTimeoutDad;
                    let addedMsgCount = 0; 
                    const runSequenceDad = async () => {
                        for (let i = 0; i < chatSequenceDad.length; i++) {
                            const msg = chatSequenceDad[i];
                            
                            await new Promise(r => setTimeout(r, msg.delay));
                            
                            const now = new Date();
                            const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
                            
                            wechatData['dad'].messages.push({ time: timeStr, text: msg.text, isMine: msg.isMine });
                            addedMsgCount++;
                            
                            if (!msg.isMine) {
                                wechatData['dad'].unread = true;
                                
                                const audio = document.getElementById('msg-sound');
                                if (audio) {
                                    audio.currentTime = 0;
                                    audio.play().catch(e => console.log('浏览器阻止了自动播放'));
                                }
                                
                                const toast = document.getElementById('win-toast');
                                if (toast) {
                                    const toastImgs = toast.querySelectorAll('img');
                                    if(toastImgs.length > 1) toastImgs[1].src = 'image/baba.png';
                                    const nameDiv = toast.querySelector('div[style*="font-weight: bold"]');
                                    if(nameDiv) nameDiv.innerText = '爸爸';

                                    document.getElementById('toast-body').innerText = msg.text;
                                    
                                    toast.onclick = () => {
                                        openApp('wechat');
                                        toast.style.right = '-350px';
                                        activeWeChatContact = 'dad';
                                        renderWeChat();
                                    };

                                    toast.style.right = '20px';
                                    clearTimeout(toastTimeoutDad);
                                    toastTimeoutDad = setTimeout(() => {
                                        toast.style.right = '-350px';
                                    }, 4000); 
                                }
                            }
                            saveWeChat();
                            renderWeChat();
                        }

                        const checkReadInterval = setInterval(() => {
                            const wechatWin = document.getElementById('win-wechat');
                            if (wechatWin && wechatWin.style.display !== 'none' && activeWeChatContact === 'dad') {
                                clearInterval(checkReadInterval);
                                
                                setTimeout(async () => {
                                    const messages = wechatData['dad'].messages;
                                    const startIndex = messages.length - addedMsgCount;
                                    
                                    for (let i = messages.length - 1; i >= Math.max(0, startIndex); i--) {
                                        messages[i].type = 'recall';
                                        messages[i].text = '"爸爸" 撤回了一条消息'; 
                                        
                                        saveWeChat();
                                        if (activeWeChatContact === 'dad') renderWeChat();
                                        
                                        await new Promise(r => setTimeout(r, 150)); 
                                    }

                                }, 2500);
                            }
                        }, 500); 
                    };

                    runSequenceDad();
                }

            } else {
                pwdError.style.display = 'block';
                pwdInput.focus();
            }
        }
    }

    document.getElementById('pwd-ok-btn').onclick = checkPassword;
    pwdInput.onkeydown = (e) => { if (e.key === 'Enter') checkPassword(); };
    document.getElementById('pwd-close-x').onclick = () => pwdModal.style.display = 'none';
    document.getElementById('pwd-cancel-btn').onclick = () => pwdModal.style.display = 'none';

    const searchableFriendsDB = {
        'bcmh': {
            id: 'bcmh',
            name: '明安教育',
            avatar: 'image/校徽.png',
            region: '明安',
            sign: '明安教育官方公众号 - mingan.edu.xyzz',
            messages: [
                { time: '刚刚', text: '感谢关注【明安七中】官方微信公众号。这里将为您提供校园新闻、通知公告、招生资讯、德育活动、教学成果等内容。如有疑问，请联系学校办公室。愿第一次相遇，成最好的结果。', sender: 'bcmh', isMine: false, type: 'text' },
            ]
        }
    };

    const wcSearchInput = document.getElementById('wechat-search-input');
    const wcSearchDropdown = document.getElementById('wechat-search-dropdown');
    const wcChatPanel = document.getElementById('wechat-chat-panel');
    const wcProfilePanel = document.getElementById('wechat-profile-panel');

    if (wcSearchInput) {
        wcSearchInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (val) {
                wcSearchDropdown.style.display = 'block';
                let match = searchableFriendsDB[val];
                
                if (match) {
                    wcSearchDropdown.innerHTML = `
                        <div style="padding: 10px 15px; font-size: 12px; color: #999;">网络查找</div>
                        <div id="wc-search-res-item" style="padding: 12px 15px; display: flex; align-items: center; gap: 12px; cursor: pointer; background: #ebebeb; transition: 0.2s;" onmouseenter="this.style.background='#d9d9d9'" onmouseleave="this.style.background='#ebebeb'">
                            <div style="width: 40px; height: 40px; background: #07c160; border-radius: 4px; display: flex; justify-content: center; align-items: center;">
                                <svg viewBox="0 0 1024 1024" width="22" height="22" fill="#fff"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.6-87.9-212.1C567.5 143.3 492.2 112 412 112c-80.2 0-155.6 31.3-212.1 87.9C143.3 256.4 112 331.8 112 412c0 80.2 31.3 155.6 87.9 212.1C256.4 680.7 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a40.2 40.2 0 0 0 56.8-56.8zM412 640c-125.7 0-228-102.3-228-228s102.3-228 228-228 228 102.3 228 228-102.3 228-228 228z"/></svg>
                            </div>
                            <div style="font-size: 14px; color: #000;">搜一搜：<span style="color: #07c160;">${val}</span></div>
                        </div>
                    `;
                    document.getElementById('wc-search-res-item').onclick = () => {
                        showProfileView(match);
                        wcSearchDropdown.style.display = 'none';
                        wcSearchInput.value = '';
                    };
                } else {
                    wcSearchDropdown.innerHTML = `
                        <div style="padding: 20px; text-align: center; font-size: 13px; color: #999;">
                            该用户不存在
                        </div>
                    `;
                }
            } else {
                wcSearchDropdown.style.display = 'none';
            }
        });
    }
    function showProfileView(friendData) {
        if(wcChatPanel) wcChatPanel.style.display = 'none';
        if(wcProfilePanel) wcProfilePanel.style.display = 'flex';
        
        document.getElementById('profile-avatar').src = friendData.avatar;
        document.getElementById('profile-name').innerText = friendData.name;
        document.getElementById('profile-nickname').innerText = friendData.name; 
        document.getElementById('profile-wechat-id').innerText = friendData.id;
        document.getElementById('profile-region').innerText = friendData.region;
        document.getElementById('profile-sign').innerText = friendData.sign; 

        const btnAdd = document.getElementById('profile-add-btn');
        const btnChat = document.getElementById('profile-chat-btn');

        const existingKey = Object.keys(wechatData).find(k => wechatData[k].name === friendData.name && !wechatData[k].hidden);
        
        if (existingKey) {
            btnAdd.style.display = 'none';
            btnChat.style.display = 'block';
            btnChat.onclick = () => {
                wcProfilePanel.style.display = 'none';
                wcChatPanel.style.display = 'flex';
                activeWeChatContact = existingKey;
                renderWeChat();
            };
        } else {
            btnAdd.style.display = 'block';
            btnChat.style.display = 'none';
            btnAdd.innerText = '添加到通讯录';
            btnAdd.onclick = () => {
                const newKey = friendData.id; 
                wechatData[newKey] = {
                    name: friendData.name,
                    avatar: friendData.avatar,
                    messages: friendData.messages ? JSON.parse(JSON.stringify(friendData.messages)) : []
                };
                saveWeChat();
                renderWeChat();
                
                btnAdd.innerText = '已添加';
                setTimeout(() => {
                    btnAdd.style.display = 'none';
                    btnChat.style.display = 'block';
                }, 400);

                btnChat.onclick = () => {
                    wcProfilePanel.style.display = 'none';
                    wcChatPanel.style.display = 'flex';
                    activeWeChatContact = newKey;
                    renderWeChat();
                };
            };
        }
    }

    function generateWeChatAvatarHTML(contact) {
        if (contact.members && contact.members.length > 1) {
            const count = contact.members.length;
            const avatars = contact.members.map(m => wechatData[m] ? (wechatData[m].avatar || 'image/image.png') : 'image/image.png');
            let innerHTML = '';
            
            if (count === 2) {
                innerHTML = `
                    <img src="${avatars[0]}" style="width:17px; height:100%; object-fit:cover;">
                    <img src="${avatars[1]}" style="width:17px; height:100%; object-fit:cover;">
                `;
                return `<div style="width:40px; height:40px; border-radius:4px; background:#dddddd; display:flex; justify-content:center; align-items:center; gap:2px; overflow:hidden;">${innerHTML}</div>`;
            } else if (count === 3) {
                innerHTML = `
                    <div style="width:100%; display:flex; justify-content:center;">
                        <img src="${avatars[0]}" style="width:17px; height:17px; object-fit:cover;">
                    </div>
                    <div style="width:100%; display:flex; justify-content:center; gap:2px;">
                        <img src="${avatars[1]}" style="width:17px; height:17px; object-fit:cover;">
                        <img src="${avatars[2]}" style="width:17px; height:17px; object-fit:cover;">
                    </div>
                `;
                return `<div style="width:40px; height:40px; border-radius:4px; background:#dddddd; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:2px; overflow:hidden;">${innerHTML}</div>`;
            } else {
                innerHTML = `
                    <div style="width:100%; display:flex; justify-content:center; gap:2px;">
                        <img src="${avatars[0]}" style="width:17px; height:17px; object-fit:cover;">
                        <img src="${avatars[1]}" style="width:17px; height:17px; object-fit:cover;">
                    </div>
                    <div style="width:100%; display:flex; justify-content:center; gap:2px;">
                        <img src="${avatars[2]}" style="width:17px; height:17px; object-fit:cover;">
                        <img src="${avatars[3] || 'image/image.png'}" style="width:17px; height:17px; object-fit:cover;">
                    </div>
                `;
                return `<div style="width:40px; height:40px; border-radius:4px; background:#dddddd; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:2px; overflow:hidden;">${innerHTML}</div>`;
            }
        }
        return `<img src="${contact.avatar || 'image/image.png'}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;">`;
    }

    function renderWeChat() {
        const contactList = document.getElementById('wechat-contact-list');
        const chatTitle = document.getElementById('wechat-chat-title');
        const msgList = document.getElementById('wechat-msg-list');
        
        if (!contactList || !chatTitle || !msgList) return;

        contactList.innerHTML = '';
        for (let id in wechatData) {
            const contact = wechatData[id];
            
            if (contact.hidden) continue;

            const isActive = id === activeWeChatContact;
            const div = document.createElement('div');
            
            div.style.padding = '12px 15px';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '10px';
            div.style.cursor = 'pointer';
            div.style.background = isActive ? '#c6c6c6' : 'transparent';
            
            div.onmouseenter = () => { if (!isActive) div.style.background = '#d9d9d9'; };
            div.onmouseleave = () => { if (!isActive) div.style.background = 'transparent'; };
            
            const dynamicAvatarHTML = generateWeChatAvatarHTML(contact);
            
            const unreadBadge = contact.unread ? `<div style="position: absolute; top: -2px; right: -2px; width: 8px; height: 8px; background: #ff3b30; border-radius: 50%;"></div>` : '';
            const avatarContainer = `<div style="position: relative; display: flex; flex-shrink: 0;">${dynamicAvatarHTML}${unreadBadge}</div>`;

            let lastMsgText = '';
            let lastMsgTime = '';
            if (contact.messages && contact.messages.length > 0) {
                const lastMsg = contact.messages[contact.messages.length - 1];
                if (lastMsg.type === 'img') lastMsgText = '[图片]';
                else if (lastMsg.type === 'redpacket') lastMsgText = '[微信红包]';
                else if (lastMsg.type === 'recall') lastMsgText = lastMsg.text;
                else lastMsgText = lastMsg.text || '';

                for (let i = contact.messages.length - 1; i >= 0; i--) {
                    if (contact.messages[i].time) {
                        let t = contact.messages[i].time;
                        let parts = t.split(' ');
                        if (parts.length > 1) {
                            lastMsgTime = parts[0].replace('2020年', '');
                        } else {
                            lastMsgTime = t;
                        }
                        break;
                    }
                }
            }

            const infoContainer = `
                <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: center;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <div style="font-size: 14px; color: #000; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 110px;">${contact.name}</div>
                        <div style="font-size: 11px; color: #b2b2b2; flex-shrink: 0; margin-left: 5px;">${lastMsgTime}</div>
                    </div>
                                        <div style="font-size: 12px; color: #999; white-space: nowrap; overflow: hidden; -webkit-mask-image: linear-gradient(to right, #000 70%, transparent 100%); mask-image: linear-gradient(to right, #000 70%, transparent 100%);">${lastMsgText}</div>
                </div>
            `;

            div.innerHTML = `${avatarContainer} ${infoContainer}`;
            
            div.onclick = () => { 
                activeWeChatContact = id; 
                if (wechatData[id].unread) {
                    wechatData[id].unread = false;
                    saveWeChat();
                }

                const cp = document.getElementById('wechat-chat-panel');
                const pp = document.getElementById('wechat-profile-panel');
                if (cp) cp.style.display = 'flex';
                if (pp) pp.style.display = 'none';

                renderWeChat(); 
            };
            contactList.appendChild(div);
        }

        const currentData = wechatData[activeWeChatContact];
        chatTitle.innerText = currentData.name;
        msgList.innerHTML = '';
        
        let lastTime = '';

        currentData.messages.forEach(msg => {
            let timeHtml = '';
            if (msg.time && msg.time !== lastTime) {
                timeHtml = `<div style="text-align: center; color: #b2b2b2; font-size: 12px; margin-bottom: 10px;">${msg.time}</div>`;
                lastTime = msg.time; 
            }

            if (msg.type === 'recall') {
                msgList.innerHTML += `
                    <div style="display: flex; flex-direction: column; margin-bottom: 15px;">
                        ${timeHtml}
                        <div style="text-align: center; color: #b2b2b2; font-size: 12px; margin: 5px 0;">
                            ${msg.text}
                        </div>
                    </div>
                `;
                return; 
            }

            const isGroupChat = currentData.members && currentData.members.length > 1;
            const showName = isGroupChat && !msg.isMine;
            const senderNameHtml = showName ? `<div style="font-size:12px; color:#999; margin-bottom:4px;">${msg.sender || ''}</div>` : '';
            
            const align = msg.isMine ? 'row-reverse' : 'row';
            const bgColor = msg.isMine ? '#95ec69' : '#ffffff';
            const borderRadius = msg.isMine ? '4px 0px 4px 4px' : '0px 4px 4px 4px';
            
            let msgAvatar = msg.isMine ? 'image/ningning.jpg' : (currentData.avatar || 'image/image.png');
            if (isGroupChat && !msg.isMine && msg.sender) {
                for (let key in wechatData) {
                    if (wechatData[key].name === msg.sender) {
                        msgAvatar = wechatData[key].avatar || 'image/image.png';
                        break;
                    }
                }
            }

            let messageContentHtml = '';
            if (msg.type === 'img') {
                messageContentHtml = `<img src="${msg.content}" style="max-width: 200px; border-radius: 4px; border: 1px solid #e0e0e0; cursor: pointer;">`;
            } else if (msg.type === 'redpacket') {
                messageContentHtml = `
                    <div style="background: #f89c42; width: 220px; border-radius: ${borderRadius}; display: flex; flex-direction: column; overflow: hidden; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: center; padding: 12px 15px; gap: 10px;">
                            <img src="image/redpacket.png" alt="红包" style="width: 32px; height: 32px; object-fit: contain;">
                            <div style="color: white; font-size: 15px; flex: 1; word-break: break-all;">${msg.text || '恭喜发财，大吉大利'}</div>
                        </div>
                        <div style="background: #ffffff; color: #999; font-size: 11px; padding: 4px 15px; text-align: left;">微信红包</div>
                    </div>
                `;
            } else {
                let textContent = msg.text;
                if (textContent.includes('space.bilibili.com')) {
                    textContent = `<a href="#" onclick="openApp('bilibili'); return false;" style="color: #576b95; text-decoration: none; border-bottom: 1px solid #576b95; word-break: break-all;">${textContent}</a>`;
                }
                messageContentHtml = `<div style="background: ${bgColor}; padding: 10px 14px; border-radius: ${borderRadius}; font-size: 14px; max-width: 250px; word-break: break-word; line-height: 1.4; box-shadow: 0 1px 3px rgba(0,0,0,0.05); color: #000;">${textContent}</div>`;
            }

            msgList.innerHTML += `
                <div style="display: flex; flex-direction: column; margin-bottom: 15px;">
                    ${timeHtml}
                    <div style="display: flex; gap: 10px; align-items: flex-start; flex-direction: ${align};">
                        <img src="${msgAvatar}" style="width: 36px; height: 36px; border-radius: 4px; flex-shrink: 0; object-fit: cover;">
                        <div style="display:flex; flex-direction:column; align-items: ${msg.isMine ? 'flex-end' : 'flex-start'};">
                            ${senderNameHtml}
                            ${messageContentHtml}
                        </div>
                    </div>
                </div>
            `;
        });
        
        msgList.scrollTop = msgList.scrollHeight;
    }

    
    const btnChat = document.getElementById('btn-wechat-chat');
    const btnMoments = document.getElementById('btn-wechat-moments');
    const viewChat = document.getElementById('wechat-chat-view');
    const viewMoments = document.getElementById('wechat-moments-view');
    const momentsList = document.getElementById('moments-list');

    btnChat.onclick = () => {
        btnChat.style.background = '#4a4a4a';
        btnMoments.style.background = 'transparent';
        viewChat.style.display = 'flex';
        viewMoments.style.display = 'none';
    };

    btnMoments.onclick = () => {
        btnMoments.style.background = '#4a4a4a';
        btnChat.style.background = 'transparent';
        viewMoments.style.display = 'flex';
        viewChat.style.display = 'none';
        renderMoments();
    };
    function renderMoments() {
        if (!momentsList) return;
        momentsList.innerHTML = '';

        currentMoments.forEach((post) => {
            let imagesHtml = '';
            if (post.images && post.images.length > 0) {
                if (post.images.length === 1) {
                    imagesHtml = `<img src="${post.images[0]}" 
                        onclick="document.getElementById('title-photoviewer').innerText='朋友圈照片 - 照片查看器'; document.getElementById('viewer-img').src='${post.images[0]}'; openApp('photoviewer');" 
                        style="max-width: 250px; max-height: 200px; object-fit: contain; margin-top: 8px; cursor: zoom-in;">`;
                } else {
                    imagesHtml = `<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; max-width: 260px;">`;
                    post.images.forEach(img => {
                        imagesHtml += `<img src="${img}" 
                            onclick="document.getElementById('title-photoviewer').innerText='朋友圈照片 - 照片查看器'; document.getElementById('viewer-img').src='${img}'; openApp('photoviewer');" 
                            style="width: 80px; height: 80px; object-fit: cover; cursor: zoom-in;">`;
                    });
                    imagesHtml += `</div>`;
                }
            }

            let likesHtml = '';
            if (post.likes && post.likes.length > 0) {
                likesHtml = `
                    <div style="font-size: 13px; color: #576b95; padding: 4px 0 4px 8px; font-weight: 500; border-bottom: ${post.comments && post.comments.length > 0 ? '1px solid #e2e2e2' : 'none'};">
                        <span style="font-size: 12px; margin-right: 4px;">♡</span> ${post.likes.join(', ')}
                    </div>
                `;
            }

            let commentsHtml = '';
            if (post.comments && post.comments.length > 0) {
                commentsHtml = `<div style="padding: 4px 8px;">`;
                post.comments.forEach(c => {
                    commentsHtml += `<div style="font-size: 13px; margin-bottom: 2px; line-height: 1.4;"><span style="color: #576b95; font-weight: 500; cursor: pointer;">${c.name}</span>: <span style="color: #333;">${c.text}</span></div>`;
                });
                commentsHtml += `</div>`;
            }

            let interactionBox = '';
            if (likesHtml || commentsHtml) {
                interactionBox = `
                    <div style="background: #f3f3f5; margin-top: 12px; border-radius: 2px; position: relative;">
                        <div style="position: absolute; top: -10px; left: 12px; border-width: 5px; border-style: solid; border-color: transparent transparent #f3f3f5 transparent;"></div>
                        ${likesHtml}
                        ${commentsHtml}
                    </div>
                `;
            }

            const postElement = document.createElement('div');
            postElement.style.display = 'flex';
            postElement.style.marginBottom = '20px';
            postElement.style.paddingBottom = '15px';
            postElement.style.borderBottom = '1px solid #f0f0f0';

            postElement.innerHTML = `
                <img src="${post.authorAvatar}" style="width: 42px; height: 42px; border-radius: 4px; object-fit: cover; margin-right: 12px; flex-shrink: 0; cursor: pointer;">
                
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <div style="color: #576b95; font-size: 15px; font-weight: bold; margin-bottom: 2px; cursor: pointer;">${post.authorName}</div>
                    
                    ${post.text ? `<div style="color: #222; font-size: 14px; line-height: 1.6; word-wrap: break-word;">${post.text}</div>` : ''}
                    
                    ${imagesHtml}
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                        <span style="color: #b2b2b2; font-size: 12px;">${post.time}</span>
                        <div style="background: #f1f1f1; border-radius: 2px; padding: 0 6px; height: 16px; display: flex; justify-content: center; align-items: center; cursor: pointer;">
                            <span style="display: inline-block; width: 3px; height: 3px; border-radius: 50%; background: #576b95; margin-right: 3px;"></span>
                            <span style="display: inline-block; width: 3px; height: 3px; border-radius: 50%; background: #576b95;"></span>
                        </div>
                    </div>
                    
                    ${interactionBox}
                </div>
            `;
            momentsList.appendChild(postElement);
        });

        momentsList.innerHTML += `<div style="text-align: center; color: #b2b2b2; font-size: 12px; margin-top: 20px;">已经到底了</div>`;
    }

    const wechatInput = document.getElementById('wechat-input');
    const wechatSendBtn = document.getElementById('wechat-send-btn');
    
    function sendWeChatMsg() {
        if(!wechatInput) return;
        const text = wechatInput.value.trim();
        if(text) {
            const now = new Date();
            const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            wechatData[activeWeChatContact].messages.push({ time: timeStr, text: text, isMine: true, type: 'text' });
            saveWeChat();
            wechatInput.value = '';
            renderWeChat();

            const cleanText = text.toLowerCase().replace(/\s+/g, '');
            const hasClue = cleanText.includes('imfine') || cleanText.includes("i'mfine") || cleanText.includes('iamfine')|| cleanText.includes("i'm fine") ;
            
            if (activeWeChatContact === 'anmo' && hasClue && localStorage.getItem('win10_event_anmo_morse') !== 'true') {
                localStorage.setItem('win10_event_anmo_morse', 'true');
                
                const anmoSequence = [
                    { text: 'im fine?', delay: 2000, isMine: false },
                    { text: '笑死我了, 这个月月', delay: 2500, isMine: false },
                    { text: '哦对了，有件事情要和你讲一下', delay: 3500, isMine: false },
                    { text: '月月说什么日记密码是 yueyue12 什么的', delay: 3000, isMine: false },
                    { text: '她叫我告诉你', delay: 1000, isMine: false },
                    { text: '但我一直忘', delay: 1000, isMine: false },
                    { text: '认真吗？', delay: 2000, isMine: true },
                    { text: '行吧这个月月...', delay: 2000, isMine: true },
                    { text: '哈哈哈', delay: 2000, isMine: false },
                ];
                
                let toastTimeoutAnmoMorse;
                const runSequenceAnmoMorse = async () => {
                    for (let i = 0; i < anmoSequence.length; i++) {
                        const msg = anmoSequence[i];
                        await new Promise(r => setTimeout(r, msg.delay));
                        
                        const replyTime = new Date();
                        const replyTimeStr = replyTime.getHours().toString().padStart(2, '0') + ':' + replyTime.getMinutes().toString().padStart(2, '0');
                        
                        wechatData['anmo'].messages.push({ time: replyTimeStr, text: msg.text, isMine: msg.isMine });
                        
                        if (!msg.isMine) {
                            wechatData['anmo'].unread = true;
                            
                            const audio = document.getElementById('msg-sound');
                            if (audio) {
                                audio.currentTime = 0;
                                audio.play().catch(e => console.log('浏览器阻止了自动播放'));
                            }
                            
                            const toast = document.getElementById('win-toast');
                            if (toast) {
                                const toastImgs = toast.querySelectorAll('img');
                                if(toastImgs.length > 1) toastImgs[1].src = 'image/anmo.jpg';
                                const nameDiv = toast.querySelector('div[style*="font-weight: bold"]');
                                if(nameDiv) nameDiv.innerText = '安沫';

                                document.getElementById('toast-body').innerText = msg.text;
                                
                                toast.onclick = () => {
                                    openApp('wechat');
                                    toast.style.right = '-350px';
                                    activeWeChatContact = 'anmo';
                                    renderWeChat();
                                };

                                toast.style.right = '20px';
                                clearTimeout(toastTimeoutAnmoMorse);
                                toastTimeoutAnmoMorse = setTimeout(() => {
                                    toast.style.right = '-350px';
                                }, 4000); 
                            }
                        }
                        saveWeChat();
                        if (activeWeChatContact === 'anmo') renderWeChat();
                    }
                };
                runSequenceAnmoMorse();
            }

            if (isZhoumu2 && activeWeChatContact === 'brother') {
                setTimeout(() => {
                    const replyTime = new Date();
                    const replyTimeStr = replyTime.getHours().toString().padStart(2, '0') + ':' + replyTime.getMinutes().toString().padStart(2, '0');
                    wechatData['brother'].messages.push({ 
                        time: replyTimeStr, 
                        text: '系统：由于对方账号异常，你的消息没有送达', 
                        isMine: false, 
                        sender: '系统' 
                    });
                    saveWeChat();
                    if (activeWeChatContact === 'brother') {
                        renderWeChat();
                    }
                }, 500);
            }

            if (activeWeChatContact === 'bcmh') {
                setTimeout(() => {
                    const replyTime = new Date();
                    const replyTimeStr = replyTime.getHours().toString().padStart(2, '0') + ':' + replyTime.getMinutes().toString().padStart(2, '0');
                    wechatData['bcmh'].messages.push({ 
                        time: replyTimeStr, 
                        text: '自动回复：168/366',
                        isMine: false, 
                        sender: '不吃米糊ovo'
                    });
                    saveWeChat();
                    
                    if (activeWeChatContact === 'bcmh') {
                        renderWeChat();
                    }
                }, 1000);
            }
        }
    }

    if (wechatSendBtn) {
        wechatSendBtn.onmouseenter = () => wechatSendBtn.style.background = '#d2d2d2';
        wechatSendBtn.onmouseleave = () => wechatSendBtn.style.background = '#e9e9e9';
        wechatSendBtn.onclick = sendWeChatMsg;
    }
    
    if (wechatInput) {
        wechatInput.onkeydown = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { 
                e.preventDefault(); 
                sendWeChatMsg(); 
            }
        };
    }

    function renderFolder(folderName) {
        if(!vfs[folderName]) return;
        const container = document.getElementById(`content-${folderName}`);
        if(!container) return;
        container.innerHTML = '';
        vfs[folderName].forEach(file => {
            const div = document.createElement('div');
            div.className = 'file-item';
            div.id = `file-${file.id}`;
            
            let iconHTML = '';
            if (file.type === 'img') iconHTML = `<img src="${file.content}" style="object-fit: cover;">`;
            else if (file.type === 'exe') iconHTML = `<img src="image/exe.png">`;
            else if (file.type === 'video') iconHTML = `<img src="image/video.png">`;
            else iconHTML = `<img src="image/file.png">`;
            
            div.innerHTML = `<div class="file-icon">${iconHTML}</div><div class="file-name">${file.name}</div>`;
            
            div.onclick = (e) => {
                e.stopPropagation(); 
                document.querySelectorAll(`#content-${folderName} .file-item`).forEach(el => el.classList.remove('selected'));
                div.classList.add('selected');
                selectedFiles[folderName] = file.id;
            };

            div.ondblclick = () => openFile(file, folderName);
            container.appendChild(div);
        });

        container.onclick = () => {
            document.querySelectorAll(`#content-${folderName} .file-item`).forEach(el => el.classList.remove('selected'));
            selectedFiles[folderName] = null;
        };

        const countSpan = document.getElementById(`${folderName}-item-count`);
        if (countSpan) countSpan.innerText = vfs[folderName].length + " 个项目";
    }

    const dlModal = document.getElementById('download-modal');
    
    document.getElementById('dl-ok-btn').onclick = () => {
        dlModal.style.display = 'none';
        localStorage.setItem('win10_cmd_downloaded', 'true');
        
        const iconCmd = document.getElementById('icon-cmd');
        if (iconCmd) {
            iconCmd.style.display = 'flex';
            let pos = getEmptyGridPos('icon-cmd');
            iconCmd.style.left = pos.x + "px"; iconCmd.style.top = pos.y + "px";
            saveIconsPosition();
        }
    };
    
    document.getElementById('dl-cancel-btn').onclick = () => dlModal.style.display = 'none';

    const btnDownloadHospPdf = document.getElementById('btn-download-hosp-pdf');
    const chromeDownloadFlyout = document.getElementById('chrome-download-flyout');
    const dlStatus = document.getElementById('chrome-dl-status');
    const dlProgressBar = document.getElementById('chrome-dl-progress-bar');
    const dlProgressFill = document.getElementById('chrome-dl-progress-fill');
    const dlIconBox = document.getElementById('chrome-dl-icon-box');

    if (btnDownloadHospPdf) {
        btnDownloadHospPdf.onclick = () => {
            if (chromeDownloadFlyout) {
                chromeDownloadFlyout.style.display = 'block';
                if(dlStatus) dlStatus.innerText = '0.0 MB / 2.4 MB，剩余 3 秒';
                if(dlStatus) dlStatus.style.color = '#5f6368';
                if(dlProgressBar) dlProgressBar.style.display = 'block';
                if(dlProgressFill) dlProgressFill.style.width = '0%';
                if(dlIconBox) dlIconBox.style.opacity = '0.5';
                btnDownloadHospPdf.disabled = true;
                btnDownloadHospPdf.style.opacity = '0.6';
                btnDownloadHospPdf.innerHTML = `正在下载...`;

                let progress = 0;
                
                let downloadTimer = setInterval(() => {
                    progress += Math.random() * 20 + 10; 
                    
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(downloadTimer);
                        
                        if(dlStatus) dlStatus.innerText = '2.4 MB • 下载完成';
                        if(dlProgressBar) dlProgressBar.style.display = 'none';
                        if(dlIconBox) dlIconBox.style.opacity = '1';
                        
                        btnDownloadHospPdf.disabled = false;
                        btnDownloadHospPdf.style.opacity = '1';
                        btnDownloadHospPdf.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 重新下载`;
                        
                        localStorage.setItem('win10_hospital_pdf_downloaded', 'true');
                        if (!isZhoumu3) {
                            const iconHospPdf = document.getElementById('icon-hospitalpdf');
                            if (iconHospPdf) {
                                iconHospPdf.style.display = 'flex';
                                let pos = getEmptyGridPos('icon-hospitalpdf');
                                iconHospPdf.style.left = pos.x + "px"; 
                                iconHospPdf.style.top = pos.y + "px";
                                saveIconsPosition(); 
                            }
                        }

                        setTimeout(() => {
                            if (chromeDownloadFlyout) chromeDownloadFlyout.style.display = 'none';
                        }, 3000);
                    }
                    
                    if(dlProgressFill) dlProgressFill.style.width = progress + '%';
                    if (progress < 100 && dlStatus) {
                        dlStatus.innerText = `${(progress * 0.024).toFixed(1)} MB / 2.4 MB，正在下载...`;
                    }
                }, 300);
            }
        };
    }

    document.getElementById('dl-close-x').onclick = () => dlModal.style.display = 'none';

    function openFile(file, folderName) {
        if (file.type === 'text') {
            document.getElementById('title-notepad').innerText = ` ${file.name} - 记事本`;
            document.getElementById('notepad-input').value = file.content;
            currentEditingFile = file; 
            openApp('notepad');

            if (file.name === '未命名.bat' && isZhoumu2) {
                if (localStorage.getItem('win10_creepy_spawned') !== 'true') {
                    localStorage.setItem('win10_creepy_spawned', 'true');
                    
                    for (let i = 1; i <= 9; i++) {
                        const appId = `cpic${i}`;
                        createCreepyPicElement(appId);
                        
                        const icon = document.getElementById(`icon-${appId}`);
                        let pos = getRandomEmptyGridPos(`icon-${appId}`);
                        icon.style.left = pos.x + "px";
                        icon.style.top = pos.y + "px";
                    }
                    
                    saveIconsPosition(); 
                }
            }

            if (file.name === '文字(2).txt' && !isZhoumu2 && localStorage.getItem('win10_event_yueyue_msg') !== 'true') {
                localStorage.setItem('win10_event_yueyue_msg', 'true');
                
                const chatSequence = [
                    { text: '宁宁，你在吗？', delay: 5000, isMine: false },
                    { text: '今晚兔兔先生好像停播了', delay: 4000, isMine: false },
                    { text: '但是明明我们周四还在看，好奇怪', delay: 3000, isMine: false },
                    { text: '算啦，我先去休息了，你也早点休息呀', delay: 2000, isMine: false },
                    { text: '对了', delay: 1000, isMine: false },
                    { text: '日记的事，你不要生我的气哦', delay: 2000, isMine: false },
                    { text: '嘻嘻', delay: 2000, isMine: false },
                    { content: 'image/emoji10.jpg', delay: 1000, isMine: false, type: 'img' },
                ];

                let toastTimeout;
                
                const runSequence = async () => {
                    for (let i = 0; i < chatSequence.length; i++) {
                        const msg = chatSequence[i];
                        
                        await new Promise(r => setTimeout(r, msg.delay));
                        
                        const now = new Date();
                        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
                        
                        wechatData['yueyue'].messages.push({ 
                            time: timeStr, 
                            text: msg.text, 
                            content: msg.content, 
                            type: msg.type || 'text',
                            isMine: msg.isMine 
                        });
                        
                        if (!msg.isMine) {
                            wechatData['yueyue'].unread = true;
                            
                            const audio = document.getElementById('msg-sound');
                            if (audio) {
                                audio.currentTime = 0;
                                audio.play().catch(e => console.log('浏览器阻止了自动播放'));
                            }
                            
                            const toast = document.getElementById('win-toast');
                            document.getElementById('toast-body').innerText = msg.type === 'img' ? '[图片]' : msg.text;

                            if (toast) {
                                toast.style.right = '20px';
                                clearTimeout(toastTimeout);
                                toastTimeout = setTimeout(() => {
                                    toast.style.right = '-350px';
                                }, 4000); 
                            }
                        }
                        saveWeChat();
                        renderWeChat();
                    }
                };

                runSequence();
            }

        if (file.name === '哥哥.db' && isZhoumu2 && localStorage.getItem('win10_event_brother_msg') !== 'true') {
                localStorage.setItem('win10_event_brother_msg', 'true');
                
                const chatSequence2 = [
                    { text: '宁宁', delay: 3000, isMine: false },
                    { text: '你找到什么线索了吗？', delay: 2500, isMine: false },
                    { text: '电脑里好像什么都没有...', delay: 5000, isMine: true },
                    { text: '除了一些照片', delay: 3500, isMine: true },
                    { text: '好陌生', delay: 2500, isMine: true },
                    { text: '那好吧', delay: 1000, isMine: false },
                    { text: '找到了什么的话要和我说哦', delay: 1500, isMine: false },
                    { text: '嗯嗯', delay: 3000, isMine: true },
                ];

                let toastTimeout2;
                
                const runSequence2 = async () => {
                    for (let i = 0; i < chatSequence2.length; i++) {
                        const msg = chatSequence2[i];
                        
                        await new Promise(r => setTimeout(r, msg.delay));
                        
                        const now = new Date();
                        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
                        
                        wechatData['yueyue'].messages.push({ time: timeStr, text: msg.text, isMine: msg.isMine });
                        
                        if (!msg.isMine) {
                            wechatData['yueyue'].unread = true;
                            
                            const audio = document.getElementById('msg-sound');
                            if (audio) {
                                audio.currentTime = 0;
                                audio.play().catch(e => console.log('浏览器阻止了自动播放'));
                            }
                            
                            const toast = document.getElementById('win-toast');
                            document.getElementById('toast-body').innerText = msg.text;
                            if (toast) {
                                toast.style.right = '20px';
                                clearTimeout(toastTimeout2);
                                toastTimeout2 = setTimeout(() => {
                                    toast.style.right = '-350px';
                                }, 4000); 
                            }
                        }
                        saveWeChat();
                        renderWeChat();
                    }
                };

                runSequence2();
            }

            if (file.name === '哥哥.db' && isZhoumu2) {
                if (wechatData['brother']) {
                    wechatData['brother'].hidden = true;
                    
                    if (activeWeChatContact === 'brother') {
                        activeWeChatContact = 'family';
                    }
                    
                    saveWeChat();
                    renderWeChat();
                }
            }

        } else if (file.type === 'img') {
            document.getElementById('title-photoviewer').innerText = `${file.name} - 照片查看器`;
            document.getElementById('viewer-img').src = file.content;
            openApp('photoviewer');
        } else if (file.type === 'exe') {
            dlModal.style.display = 'flex';
        }else if (file.type === 'video') {
            const titleEl = document.getElementById('title-videoplayer');
            if (titleEl) {
                titleEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="white" style="margin-right:8px;"><path d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM4 4h2v2H4V4zm0 3h2v2H4V7zm0 3h2v2H4v-2zM12 12h-2v-2h2v2zm0-3h-2V7h2v2zm0-3h-2V4h2v2z"/></svg>${file.name} - 电影和电视`;
            }
            const videoEl = document.getElementById('win10-video-element');
            if (videoEl) {
                videoEl.src = file.content; 
                videoEl.currentTime = 0;
                document.getElementById('icon-play').style.display = 'block';
                document.getElementById('icon-pause').style.display = 'none';
            }
            openApp('videoplayer');
        }
    }

    document.getElementById('notepad-input').addEventListener('input', (e) => {
        if (currentEditingFile) {
            currentEditingFile.content = e.target.value;
            saveVFS(); 
        }
    });

    function moveToBin_App(appId) {
        document.getElementById(`icon-${appId}`).style.display = 'none';
        closeApp(appId); 
        if (!vfs.bin.find(item => item.isApp && item.id === appId)) {
            vfs.bin.push({ isApp: true, id: appId });
            saveVFS(); saveIconsPosition(); renderBin();
        }
    }
    
    document.querySelectorAll('.btn-del-file').forEach(btn => {
        btn.onclick = () => {
            const folder = btn.getAttribute('data-folder');
            const fileId = selectedFiles[folder];
            if (fileId) {
                const fileIndex = vfs[folder].findIndex(f => f.id === fileId);
                const file = vfs[folder].splice(fileIndex, 1)[0];
                vfs.bin.push({ isApp: false, folder: folder, file: file });
                selectedFiles[folder] = null;
                saveVFS(); renderFolder(folder); renderBin();
            }
        };
    });

    function renderBin() {
        const container = document.getElementById('bin-content');
        container.innerHTML = '';
        vfs.bin.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'file-item';
            div.title = "双击还原";
            const countSpan = document.getElementById('bin-item-count');
            if (countSpan) countSpan.innerText = vfs.bin.length + " 个项目";
            if (item.isApp) {
                if(!appInfo[item.id]) {
                    vfs.bin.splice(index, 1);
                    return;
                }
                const iconEl = document.getElementById(`icon-${item.id}`);
                if (iconEl) iconEl.style.display = 'none';
                div.innerHTML = `<div class="file-icon"><img src="${appInfo[item.id].icon}"></div><div class="file-name">${appInfo[item.id].name}</div>`;
                div.ondblclick = () => restoreApp(item.id, index);
            } else {
                
                let iconHTML = '';
                if (item.file.type === 'img') {
                    iconHTML = `<img src="${item.file.content}" style="object-fit:cover;">`;
                } else if (item.file.type === 'exe') {
                    iconHTML = `<img src="image/exe.png">`;
                } else {
                    iconHTML = `<img src="image/file.png">`;
                }
                
                div.innerHTML = `<div class="file-icon">${iconHTML}</div><div class="file-name">${item.file.name}</div>`;
                div.ondblclick = () => restoreFile(item, index);
            }
            container.appendChild(div);
        });
    }

    function restoreApp(appId, binIndex) {
        vfs.bin.splice(binIndex, 1); saveVFS(); renderBin();
        const icon = document.getElementById(`icon-${appId}`);
        if(icon) {
            icon.style.display = 'flex';
            let pos = getEmptyGridPos(`icon-${appId}`); 
            icon.style.left = pos.x + "px"; icon.style.top = pos.y + "px";
            saveIconsPosition();
        }
    }

    function restoreFile(binItem, binIndex) {
        vfs[binItem.folder].push(binItem.file); 
        vfs.bin.splice(binIndex, 1); saveVFS();
        renderBin(); renderFolder(binItem.folder);
    }

    const winModal = document.getElementById('win-modal');
    document.getElementById('empty-bin-btn').onclick = () => { 
        if (vfs.bin.length > 0) { 
            const errorSound = new Audio('audio/windowsError.mp3'); 
            errorSound.volume = 0.7; 
            errorSound.play().catch(e => console.log('播放警告音效失败:', e));
            winModal.style.display = 'flex'; 
        } 
    };
    
    document.getElementById('modal-close-x').onclick = () => { 
        winModal.style.display = 'none'; 
        const textEl = winModal.querySelector('.modal-text');
        if (textEl) textEl.innerText = "不能永久删除此文件。系统需要保留以维持正常运行。";
    };
    document.getElementById('modal-ok-btn').onclick = () => { 
        winModal.style.display = 'none'; 
        const textEl = winModal.querySelector('.modal-text');
        if (textEl) textEl.innerText = "不能永久删除此文件。系统需要保留以维持正常运行。";
    };

    const cmdInput = document.getElementById('cmd-input');
    const cmdOutput = document.getElementById('cmd-output');
    const cmdContent = document.getElementById('cmd-content');

    if (cmdInput) {
        cmdInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = cmdInput.value.trim();
                const lowerVal = val.toLowerCase();

                cmdOutput.innerHTML += `<div style="margin-bottom: 5px;">C:\\Users\\NingNing&gt; ${val}</div>`;
                
                if (val) {
                    if (isZhoumu3) {
                        const isZ3Unlocked = localStorage.getItem('win10_docs_unlocked_z3') === 'true';
                        if (isZ3Unlocked) {
                           if (lowerVal === 'imhere') {
                            cmdInput.disabled = true;
                            cmdInput.value = '';

                            setTimeout(() => {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 5px; color: #fff;">...</div>`;
                                cmdContent.scrollTop = cmdContent.scrollHeight;

                                setTimeout(() => {
                                    cmdOutput.innerHTML += `<div style="margin-bottom: 5px; color: #fff;">宁宁，开门</div>`;
                                    cmdContent.scrollTop = cmdContent.scrollHeight;

                                    setTimeout(() => {
                                        cmdOutput.innerHTML += `<div style="margin-bottom: 5px; color: #fff;">我就在门口</div>`;
                                        cmdContent.scrollTop = cmdContent.scrollHeight;

                                        setTimeout(() => {
                                            startStaticEffect();
                                        }, 2000);

                                    }, 1500);
                                }, 1200);
                            }, 1000);

                            return;

                            } else if (lowerVal === 'help') {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4;">兔先生.exe 已接管系统。<br>当前可用指令:<br> - help : 查看系统帮助<br> - clear : 清屏</div>`;
                            } else if (lowerVal === 'clear') {
                                cmdOutput.innerHTML = '';
                            } else if (lowerVal === 'imwatchingyou') {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4; color: #666;">[指令已失效]</div>`;
                            } else if (lowerVal === '0616') {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4; color: #666;">[指令已失效]</div>`;
                            }else {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4;">'${val}' 不是内部或外部命令，也不是可运行的程序。</div>`;
                            }
                        } else {
                            cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4; color:#E81123;">Error: Connection Refused.</div>`;
                        }
                    } 
                    else if (isZhoumu2) {
                        const isDadEventTriggered = localStorage.getItem('win10_event_dad_diary') === 'true';

                        if (isDadEventTriggered) {
                            if (lowerVal === 'lookbehind') {
                                cmdInput.disabled = true;
                                cmdInput.value = '';
                                
                                setTimeout(() => {
                                    cmdOutput.innerHTML += `<div style="margin-bottom: 5px; color: #fff;">离我们见面只剩下一段距离了...宁宁</div>`;
                                    cmdContent.scrollTop = cmdContent.scrollHeight;
                                    
                                    setTimeout(() => {
                                        cmdOutput.innerHTML += `<div style="margin-bottom: 10px; color: #fff;">你非常想见到我的对吧......</div>`;
                                        cmdContent.scrollTop = cmdContent.scrollHeight;
                                        
                                        setTimeout(() => {
                                            localStorage.setItem('win10_zhoumu3', 'true');
                                            window.location.replace('bluescreen.html');
                                        }, 5000);
                                    }, 1500);
                                }, 500);
                                return; 
                            } else if (lowerVal === 'help') {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4;">兔先生.exe 已连接。<br>当前可用指令:<br> - help : 查看系统帮助<br> - clear : 清屏</div>`;
                            } else if (lowerVal === 'clear') {
                                cmdOutput.innerHTML = '';
                            } else if (lowerVal === 'imwatchingyou') {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4; color: #666;">[指令已失效]</div>`;
                            } else if (lowerVal === '0616') {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4; color: #666;">[指令已失效]</div>`;
                            }else {
                                    cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4;">'${val}' 不是内部或外部命令，也不是可运行的程序。</div>`;
                                }
                            } else {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4; color:#E81123;">Error: Connection Refused.</div>`;
                            }
                    } 
                    else {
                        if (lowerVal === 'imwatchingyou') {
                            window.location.replace('bluescreen.html');
                            return;
                        } else if (lowerVal === '0616') {
                            cmdInput.disabled = true;
                            cmdInput.value = '';
                            cmdOutput.innerHTML += `<div style="margin-bottom: 5px; color: #aaa;">指令已确认，系统正在休眠...</div>`;
                            setTimeout(() => {
                                startEnding2Effect();
                            }, 1000);
                            return;
                        } else if (lowerVal === 'help') {
                            cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4;">unknown.exe 已激活。<br>当前可用指令:<br> - help : 查看系统帮助<br> - clear : 清屏</div>`;
                        } else if (lowerVal === 'clear') {
                            cmdOutput.innerHTML = '';
                        } else {
                            cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4;">'${val}' 不是内部或外部命令，也不是可运行的程序。</div>`;
                        }
                    }
                }
                cmdInput.value = '';
                cmdContent.scrollTop = cmdContent.scrollHeight; 
            }
        };
    }
    
    function bringToFront(appId) {
        const win = document.getElementById(`win-${appId}`);
        if(!win) return;
        zIndexCounter++; 
        
        win.style.setProperty('z-index', zIndexCounter, 'important'); 
        
        document.querySelectorAll('.task-item').forEach(item => item.classList.remove('active'));
        const taskItem = document.getElementById(`task-${appId}`);
        if(taskItem) taskItem.classList.add('active');
    }

    function openApp(appId) {
        const win = document.getElementById(`win-${appId}`);
        if(!win) return;
        const state = windowsState[appId];
        if (!state.isOpen) {
            state.isOpen = true; state.isMinimized = false; win.style.display = "flex";
            win.style.left = Math.max(0, (window.innerWidth - (win.offsetWidth || 650)) / 2) + "px";
            win.style.top = Math.max(0, (window.innerHeight - (win.offsetHeight || 450) - 40) / 2) + "px";
            createTaskbarItem(appId);
        } else if (state.isMinimized) {
            state.isMinimized = false; win.style.display = "flex";
        }
        bringToFront(appId); saveWindowsState(); 
        
        if (appId === 'cmd' && cmdInput) {
            cmdInput.focus();
        }
        if (appId === 'search') {
            const sysSearch = document.getElementById('sys-search-input');
            if (sysSearch) sysSearch.focus();
        }
        if (appId === 'google') {
            if (typeof showGoogleHome === 'function') showGoogleHome();
        }if (appId === 'wechat') {
            const pwdInput = document.getElementById('wechat-pwd-input');
            const loginView = document.getElementById('wechat-login-view');
            if (pwdInput && loginView && loginView.style.display !== 'none') {
                setTimeout(() => pwdInput.focus(), 100);
            }
        }
    }

    window.openApp = openApp;

    function minimizeApp(appId) {
        windowsState[appId].isMinimized = true; 
        const win = document.getElementById(`win-${appId}`);
        if(win) win.style.display = "none";
        const taskItem = document.getElementById(`task-${appId}`); if(taskItem) taskItem.classList.remove('active');
        saveWindowsState(); 
    }

    function closeApp(appId) {
        if(!windowsState[appId]) return;
        windowsState[appId].isOpen = false; windowsState[appId].isMinimized = false;
        const win = document.getElementById(`win-${appId}`);
        if(win) {
            win.style.display = "none"; win.classList.remove('maximized'); win.querySelector('.btn-max').innerText = "▢";
        }
        const taskItem = document.getElementById(`task-${appId}`); if (taskItem) taskItem.remove();
        saveWindowsState(); 
        if(appId === 'notepad') currentEditingFile = null; 
    }

    function createTaskbarItem(appId) {
        if (!appInfo[appId] || document.getElementById(`task-${appId}`)) return; 
        const item = document.createElement('div');
        item.className = 'task-item open active'; item.id = `task-${appId}`; item.title = appInfo[appId].name;

       item.innerHTML = `<img src="${appInfo[appId].icon}" alt="${appInfo[appId].name}" style="width: 20px; height: 20px; object-fit: contain;">`;
        
        item.onclick = () => {
            const state = windowsState[appId]; const win = document.getElementById(`win-${appId}`);
            if (state.isMinimized) { state.isMinimized = false; win.style.display = "flex"; bringToFront(appId); saveWindowsState(); }
            else if (win.style.zIndex == zIndexCounter) minimizeApp(appId);
            else bringToFront(appId);
        };
        document.getElementById('taskbar-apps').appendChild(item);
    }

    document.querySelectorAll('.btn-min').forEach(btn => btn.onclick = (e) => { e.stopPropagation(); minimizeApp(btn.getAttribute('data-app')); });
    document.querySelectorAll('.btn-max').forEach(btn => btn.onclick = (e) => { 
        e.stopPropagation(); const win = document.getElementById(`win-${btn.getAttribute('data-app')}`);
        win.classList.toggle('maximized'); btn.innerText = win.classList.contains('maximized') ? "❐" : "▢";
    });
    document.querySelectorAll('.btn-close').forEach(btn => btn.onclick = (e) => { e.stopPropagation(); closeApp(btn.getAttribute('data-app')); });
    
    
    const wechatInputContainer = document.getElementById('wechat-input').parentNode;
    const wechatToolbar = document.createElement('div');
    wechatToolbar.id = 'wechat-call-toolbar';
    wechatToolbar.style.cssText = "display: flex; gap: 18px; margin-bottom: 12px; padding-left: 2px;";
    wechatToolbar.innerHTML = `
        <div id="wechat-call-icon" style="cursor: pointer; display: flex; align-items: center;" title="语音/视频通话">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: 0.2s;">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
        </div>
    `;
    wechatInputContainer.insertBefore(wechatToolbar, document.getElementById('wechat-input'));

    const callIconSvg = wechatToolbar.querySelector('svg');
    wechatToolbar.querySelector('#wechat-call-icon').onmouseenter = () => callIconSvg.style.stroke = '#07c160';
    wechatToolbar.querySelector('#wechat-call-icon').onmouseleave = () => callIconSvg.style.stroke = '#777';

    const titleObserver = new MutationObserver(() => {
        const targetData = wechatData[activeWeChatContact];
        if (!targetData) return;
        const isInvalid = ['wechatfile', 'bcmh', 'family'].includes(activeWeChatContact) || (targetData.members && targetData.members.length > 1);
        wechatToolbar.style.display = isInvalid ? 'none' : 'flex';
    });
    titleObserver.observe(document.getElementById('wechat-chat-title'), { childList: true, characterData: true, subtree: true });

    const wechatMainUI = document.getElementById('wechat-main-ui');
    const callWindow = document.createElement('div');
    callWindow.id = "wechat-call-window";
    callWindow.style.cssText = `
        display: none; position: absolute; width: 280px; height: 400px; background: #222222; 
        border-radius: 4px; box-shadow: 0 4px 24px rgba(0,0,0,0.5); z-index: 9999; 
        top: 80px; left: 220px; flex-direction: column; overflow: hidden;
    `;
    callWindow.innerHTML = `
        <div id="wechat-call-header" style="height: 35px; width: 100%; cursor: move; display: flex; justify-content: flex-end; align-items: center; padding-right: 10px; box-sizing: border-box;">
            <svg id="wechat-call-close-x" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2" style="cursor:pointer; transition: 0.2s;" onmouseover="this.style.stroke='#fff'" onmouseout="this.style.stroke='#888'">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: -15px;">
            <img id="wechat-call-avatar" src="" style="width: 85px; height: 85px; border-radius: 4px; object-fit: cover; margin-bottom: 15px;">
            <div id="wechat-call-name" style="color: #fff; font-size: 18px; margin-bottom: 10px; font-weight: 500; letter-spacing: 1px;"></div>
            <div id="wechat-call-status" style="color: #999; font-size: 13px; text-align: center; line-height: 1.5;">正在等待对方接受邀请...</div>
            <div id="wechat-call-translate-btn" style="display: none; margin-top: 15px; color: #576b95; font-size: 12px; cursor: pointer; border: 1px solid #576b95; padding: 2px 8px; border-radius: 12px; transition: 0.2s;" onmouseover="this.style.background='rgba(87,107,149,0.2)'" onmouseout="this.style.background='transparent'">转语音</div>
        </div>
        <div style="height: 100px; display: flex; align-items: center; justify-content: center;">
            <div id="wechat-call-hangup" style="width: 55px; height: 55px; background: #fa5151; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s;" title="挂断" onmouseover="this.style.background='#c50f1e'" onmouseout="this.style.background='#fa5151'">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>
            </div>
        </div>
    `;
    wechatMainUI.appendChild(callWindow);

    let callPos1 = 0, callPos2 = 0, callPos3 = 0, callPos4 = 0;
    function clampCallWindowBounds() {
        if (callWindow.style.display === 'none') return;
        let newTop = callWindow.offsetTop;
        let newLeft = callWindow.offsetLeft;
        const parentRect = wechatMainUI.getBoundingClientRect();
        
        if (newTop < 0) newTop = 0;
        if (newLeft < 0) newLeft = 0;
        if (newTop + callWindow.offsetHeight > parentRect.height) newTop = Math.max(0, parentRect.height - callWindow.offsetHeight);
        if (newLeft + callWindow.offsetWidth > parentRect.width) newLeft = Math.max(0, parentRect.width - callWindow.offsetWidth);
        
        callWindow.style.top = newTop + "px";
        callWindow.style.left = newLeft + "px";
    }

    const resizeObserver = new ResizeObserver(() => clampCallWindowBounds());
    resizeObserver.observe(wechatMainUI);

    document.getElementById('wechat-call-header').onmousedown = function(e) {
        e.preventDefault();
        callPos3 = e.clientX; callPos4 = e.clientY;
        document.onmouseup = function() { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = function(e) {
            e.preventDefault();
            callPos1 = callPos3 - e.clientX; callPos2 = callPos4 - e.clientY;
            callPos3 = e.clientX; callPos4 = e.clientY;
            
            callWindow.style.top = (callWindow.offsetTop - callPos2) + "px";
            callWindow.style.left = (callWindow.offsetLeft - callPos1) + "px";
            clampCallWindowBounds(); 
        };
    };

    let currentCallAudio = null;
    let callPhaseTimeout1 = null; 
    let callPhaseTimeout2 = null; 

    const translateBtn = document.getElementById('wechat-call-translate-btn');
    const statusText = document.getElementById('wechat-call-status');

    translateBtn.onclick = function() {
        this.style.display = 'none';
        statusText.style.color = '#07c160';
        statusText.style.fontSize = '15px';
        statusText.style.fontWeight = 'bold';
        statusText.innerText = '.. -- ..-. .. -. .';
    };

    function endWeChatCall(chatLogMsg) {
        if (currentCallAudio) {
            currentCallAudio.pause();
            currentCallAudio = null;
        }
        clearTimeout(callPhaseTimeout1);
        clearTimeout(callPhaseTimeout2);
        
        callWindow.style.display = 'none';
        translateBtn.style.display = 'none';
        statusText.style.color = '#999';
        statusText.style.fontSize = '13px';
        statusText.style.fontWeight = 'normal';
        
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        wechatData[activeWeChatContact].messages.push({ 
            time: timeStr, 
            text: `发起视频通话，${chatLogMsg}`, 
            isMine: true, 
            type: 'text' 
        });
        saveWeChat();
        renderWeChat(); 
    }

    document.getElementById('wechat-call-icon').onclick = function() {
        const targetId = activeWeChatContact;
        const targetData = wechatData[targetId];
        if(!targetData) return;

        callWindow.style.display = 'flex';
        clampCallWindowBounds(); 
        
        document.getElementById('wechat-call-avatar').src = targetData.avatar || 'image/image.png';
        document.getElementById('wechat-call-name').innerText = targetData.name;
        statusText.innerText = '正在等待对方接受邀请...';
        
        const isFakePwdTriggered = localStorage.getItem('win10_event_anmo_fake_pwd') === 'true';

        if (targetId === 'yueyue' && isFakePwdTriggered) {
            statusText.innerText = '已接通';
            translateBtn.style.display = 'block'; 
            
            currentCallAudio = new Audio('audio/morse.wav'); 
            currentCallAudio.play().catch(e => console.log('音乐播放失败:', e));
            
            currentCallAudio.onended = () => {
                statusText.innerText = '通话已结束';
                translateBtn.style.display = 'none';
                callPhaseTimeout1 = setTimeout(() => {
                    endWeChatCall("通话时长 00:15"); 
                }, 3000);
            };
            currentCallAudio.onerror = () => {
                callPhaseTimeout1 = setTimeout(() => {
                    endWeChatCall("通话时长 00:15"); 
                }, 15000);
            };
        } else {
            statusText.innerText = '正在等待对方接受邀请...';
            currentCallAudio = new Audio('audio/wechat_ring.mp3'); 
            currentCallAudio.loop = true;
            currentCallAudio.play().catch(e => console.log('铃声播放失败:', e));

            callPhaseTimeout1 = setTimeout(() => {
                if (currentCallAudio) {
                    currentCallAudio.pause();
                    currentCallAudio = null;
                }
                statusText.innerText = '对方无应答';
                callPhaseTimeout2 = setTimeout(() => {
                    endWeChatCall("对方无应答");
                }, 1500);
            }, 5000);
        }
    };

    document.getElementById('wechat-call-hangup').onclick = () => endWeChatCall("已取消");
    document.getElementById('wechat-call-close-x').onclick = () => endWeChatCall("已取消");
});

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

(function initPdfViewer() {
    const PDF_STATE_KEY = 'win10_pdf_state';
    const TOTAL_PAGES = 4;
    let pdfCurrentPage = 1;
    let pdfCurrentZoom = 100;
 
    function pdfSaveState() {
        localStorage.setItem(PDF_STATE_KEY, JSON.stringify({
            page: pdfCurrentPage,
            zoom: pdfCurrentZoom
        }));
    }
 
    function pdfRestoreState() {
        try {
            const s = JSON.parse(localStorage.getItem(PDF_STATE_KEY));
            if (s) {
                pdfCurrentPage = s.page || 1;
                pdfCurrentZoom = s.zoom || 100;
            }
        } catch(e) {}
        pdfApplyPage();
        pdfApplyZoom();
    }
 
    window.pdfGoToPage = function(n) {
        n = Math.max(1, Math.min(TOTAL_PAGES, parseInt(n) || 1));
        pdfCurrentPage = n;
        pdfApplyPage();
        pdfSaveState();
    };
 
    window.pdfChangePage = function(delta) {
        pdfGoToPage(pdfCurrentPage + delta);
    };
 
    window.pdfJumpToPage = function(val) {
        pdfGoToPage(val);
    };
 
    function pdfApplyPage() {
        for (let i = 1; i <= TOTAL_PAGES; i++) {
            const pg = document.getElementById(`pdf-pg-${i}`);
            const th = document.getElementById(`pdf-thumb-${i}`);
            if (!pg || !th) continue;
 
            if (i === pdfCurrentPage) {
                pg.style.display = 'block';
                th.style.borderColor = '#0078d7';
            } else {
                pg.style.display = 'none';
                th.style.borderColor = 'transparent';
            }
        }
 
        const pageInput = document.getElementById('pdf-page-input');
        if (pageInput) pageInput.value = pdfCurrentPage;
 
        const statusPage = document.getElementById('pdf-status-page');
        if (statusPage) statusPage.textContent = `第 ${pdfCurrentPage} / ${TOTAL_PAGES} 页`;

        const activeThumb = document.getElementById(`pdf-thumb-${pdfCurrentPage}`);
        if (activeThumb) activeThumb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
 
    window.pdfChangeZoom = function(delta) {
        pdfCurrentZoom = Math.max(50, Math.min(200, pdfCurrentZoom + delta));
        pdfApplyZoom();
        pdfSaveState();
    };
 
    window.pdfFitWidth = function() {
        pdfCurrentZoom = 100;
        pdfApplyZoom();
        pdfSaveState();
    };
 
    function pdfApplyZoom() {
        const pages = document.querySelectorAll('.pdf-page-el');
        const baseW = 595;
        const scale = pdfCurrentZoom / 100;
        pages.forEach(pg => { pg.style.width = (baseW * scale) + 'px'; });
 
        const zoomLabel = document.getElementById('pdf-zoom-label');
        if (zoomLabel) zoomLabel.textContent = pdfCurrentZoom + '%';
        const statusZoom = document.getElementById('pdf-status-zoom');
        if (statusZoom) statusZoom.textContent = pdfCurrentZoom + '%';
    }

    document.addEventListener('keydown', (e) => {
        const pdfWin = document.getElementById('win-pdfviewer');
        if (!pdfWin || pdfWin.style.display === 'none') return;
        if (['ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); pdfChangePage(1); }
        if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); pdfChangePage(-1); }
    });

    function tryInit() {
        const pg1 = document.getElementById('pdf-pg-1');
        if (!pg1) { setTimeout(tryInit, 300); return; }
        pdfRestoreState();
    }
 
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }
})();


(function checkEndingState() {
    if (localStorage.getItem('win10_ending_reached') === 'true') {
        const type = localStorage.getItem('win10_ending_type') || 1;
        function tryShowEnding() {
            if (document.body) {
                document.body.style.transition = 'background 1s ease';
                document.body.style.background = '#000';
                document.body.style.overflow = 'hidden';
                showEndingScreen(type);
            } else {
                setTimeout(tryShowEnding, 100);
            }
        }
        tryShowEnding();
    }
})();

function startStaticEffect() {
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
    titleEl.textContent = type == 1 ? '结局 2 ：你和我' : '结局 1：无事发生';

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
        customImg1.src = 'image/生日.png'; 
        customImg2.src = 'image/生日2.png'; 
    } else if (type == 2) {
        customImg1.src = 'image/小时候.png'; 
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
    if (type == 2) {
        return `
第二天早上她醒来。
问我：哥哥今天吃什么。
我说，昨天的面条还有一点。
她说，好。
窗外的风吹进来。
不冷，也不暖。
她吃完了。
问我下午能不能出去玩。
我说，可以。
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
        { id:1, title:'没啥大本事，25岁装修100㎡小家普通却温馨', body:'关于我家：\n坐标辽宁，普通高层楼房，南北通透\n建面116平，套内93平，三室两厅一厨一卫\n房子虽然不大，但100平的小家足够两人生活，25岁时拥有装修了这个小家，如今已经住进新家第二年了。\n温馨自由舒服，无论多晚回家，都有一盏灯在为自己点亮，就足够啦\n\n装修感受：\n自己设计的家，没有找装修公司\n风格：简约, ins', imgs:['xhs/xhs7.jpg','xhs/xhs8.jpg'], author:'惠宝儿', avatar: 'xhs/xhs2.jpg', likes:18000, cat:'装修', tags:['装修日记','小户型装修','家居美学'], date:'2020-05-25', h:240 },
        { id:2, title:'短发扎着还是披着，怎么好看怎么来！', body:'短发妹妹的日常造型分享，随手一扎就很清爽，不同场合不同风格，总有一款适合你。日常上班首选低马尾，约会首选半扎发！', imgs:['xhs/xhs15.png'], author:'无敌桃桃', avatar:'桃', likes:3627, cat:'时尚', tags:['短发','日常造型'], date:'2020-05-26', h:300 },
        { id:3, title:'我婆婆迫不及待再来中国', body:'带婆婆走遍了北京的大街小巷，胡同、故宫、颐和园……外国人眼中的中国，比我们想象的更美丽。婆婆已经迫不及待要第二次来了！', imgs:['xhs/xhs17.jpg'], author:'张霖铃', avatar:'张', likes:27000, cat:'旅行', tags:['中国旅游','北京'], date:'2020-05-28', h:260 },
        { id:4, title:'倪妮减肥法5天狂掉13斤 三伏天王炸食谱！', body:'三伏天减脂期间的饮食记录，低卡高蛋白，不节食不饿肚子！跟着名人食谱走，科学减肥不反弹。附详细食谱和热量表。\n\n早餐：燕麦+鸡蛋+蔬菜\n午餐：鸡胸肉+糙米\n晚餐：轻食沙拉', imgs:['xhs/xhs19.png'], author:'五十妞爱养生', avatar:'xhs/xhs37.jpg', likes:21000, cat:'美食', tags:['减肥','健康饮食','食谱'], date:'2020-06-2', h:320 },
        { id:5, title:'全村都知道我带爷爷去北京旅游了', body:'带爷爷来北京第一次坐高铁，爷爷开心得像个孩子！在北京南站拍了好多照片，爷爷说这辈子没见过这么大的站，一定要再来一次。', imgs:['xhs/xhs16.png'], author:'唐安妮', avatar:'xhs/xhs24.jpg', likes:22000, cat:'旅行', tags:['亲情','旅行','北京'], date:'2020-06-02', h:270 },
        { id:6, title:'从校服到婚纱八年，愿意等我长大', body:'从高中同学到人生伴侣，8年的时光见证了我们的成长。当年的校服少年，如今穿上了婚纱和礼服，感谢你一直等我长大。', imgs:['xhs/xhs14.png'], author:'kk', avatar:'xhs/xhs14.jpg', likes:20000, cat:'生活', tags:['婚纱','爱情故事'], date:'2020-05-28', h:280 },
        { id:8, title:'小小友谊', body:'今天的任务：\n和好朋友一起吃火锅✅\n一起聊天✅\n一起开心✅\n快乐值100分！\n没有什么烦恼是一顿火锅解决不了的', imgs:['xhs/xhs18.png'], author:'月月', avatar:'image/yueyue.jpg', likes:15000, cat:'美食', tags:['火锅','好吃'], date:'2020-05-20', h:360 },
    ];
 
    const SEED_COMMENTS = {
        1: [
            { id:101, user:'爱吃西柚', text:'真的九十三嘛为啥看起来这么大', avatar:'xhs/xhs.jpg', date:'2020-05-30', likes:12 },
            { id:102, user:'惠宝儿', text:'套内93', date:'2020-05-29', likes:5, isAuthor:true, avatar:'xhs/xhs2.jpg' },
            { id:103, user:'橘子汽水', text:'完全看不出来才93，布局太显大了', date:'2020-05-31', likes:8, avatar:'xhs/xhs3.jpg' },
            { id:104, user:'今天也要开心', text:'客厅真的宽敞', date:'2020-05-28', likes:3, avatar:'xhs/xhs4.jpg' },
            { id:105, user:'小熊软糖', text:'我家120都没这个视觉效果', date:'2020-06-01', likes:18 },
            { id:106, user:'慢慢来', text:'采光也很好，看着更大', date:'2020-05-27', likes:6, avatar:'xhs/xhs5.jpg' },
            { id:107, user:'山茶花', text:'装修风格很加分', date:'2020-05-26', likes:4, avatar:'xhs/xhs6.jpg' },
            { id:108, user:'阿白', text:'收纳做得好就显大', date:'2020-05-25', likes:5 },
            { id:109, user:'糯米团子', text:'第一眼以为130平', date:'2020-05-31', likes:14 },
        ],
        2: [
            { id:701, user:'奶茶半糖', text:'短发真的太适合夏天了', avatar:'xhs/xhs18.jpg', date:'2020-05-28', likes:67 },
            { id:704, user:'爱zzq', text:'半扎发那个好温柔啊', avatar:'xhs/xhs19.jpg', date:'2020-06-02', likes:58 },
            { id:705, user:'晚风', text:'终于找到适合短发的教程了', avatar:'xhs/xhs20.jpg', date:'2020-06-02', likes:42 },
            { id:706, user:'小兔乖乖', text:'上班这样扎真的显得很利落', avatar:'xhs/xhs23.jpg', date:'2020-06-03', likes:25 },
            { id:707, user:'草莓味汽水', text:'求出个视频版教程', avatar:'xhs/xhs22.jpg', date:'2020-06-04', likes:31 },
            { id:708, user:'云朵棉花糖', text:'约会用这发型绝了', avatar:'xhs/xhs21.jpg', date:'2020-06-05', likes:54 },
        ],
        3: [
            { id:901, user:'张志豪', text:'欢迎婆婆再来中国玩！', avatar:'xhs/xhs30.jpg', date:'2020-06-02', likes:116 },
            { id:904, user:'阿豪', text:'中国好玩的地方太多了，北京只是开始', date:'2020-06-03', likes:95 },
            { id:905, user:'Wendy0918', text:'外国长辈喜欢中国美食吗？', date:'2020-06-04', likes:41 },
            { id:906, user:'周同学', text:'颐和园真的很适合带老人慢慢逛', avatar:'xhs/xhs31.jpg', date:'2020-06-04', likes:58 },
            { id:907, user:'Eric', text:'下次可以带婆婆去西安看看', avatar:'xhs/xhs32.jpg', date:'2020-06-05', likes:63 },
        ],
        4: [
            { id:401, user:'减肥er', text:'跟了三天掉了2斤', date:'2020-06-04', likes:45 },
            { id:402, user:'samdy', text:'靠谱吗？有没有姐妹说下', avatar:'xhs/xhs10.jpg', date:'2020-06-02', likes:31 },
            { id:403, user:'柠檬不酸', text:'跟着吃了两天，状态不错', avatar:'xhs/xhs11.jpg', date:'2020-06-05', likes:34 },
            { id:404, user:'减肥成功版', text:'先收藏，等三伏天开始跟', avatar:'xhs/xhs12.jpg', date:'2020-06-03', likes:12 },
        ],
        5: [
            { id:801, user:'陈同学', text:'爷爷笑得好开心，看着好治愈', avatar:'xhs/xhs25.jpg', date:'2020-06-02', likes:128 },
            { id:802, user:'安安', text:'一定要多带老人家出去看看世界', avatar:'xhs/xhs26.jpg', date:'2020-06-02', likes:96 },
            { id:804, user:'Kevin', text:'看到爷爷开心我也跟着开心了', avatar:'xhs/xhs27.jpg',date:'2020-06-03', likes:88 },
            { id:806, user:'小泽', text:'爷爷有你这样的孙女真幸福', avatar:'xhs/xhs28.jpg', date:'2020-06-04', likes:142 },
            { id:807, user:'沈小溪', text:'看得我也想带我爷爷出去玩了', avatar:'xhs/xhs29.jpg', date:'2020-06-05', likes:67 },
            { id:808, user:'阿哲', text:'这种陪伴比什么礼物都珍贵', date:'2020-06-05', likes:103 },
        ],
        6: [
            { id:701, user:'幸福的人', text:'好甜啊！祝你们百年好合！', avatar:'xhs/xhs13.jpg', date:'2020-05-28', likes:67 },
            { id:702, user:'羡慕', text:'8年！真的太感动了', date:'2020-05-28', likes:89 },
            { id:703, user:'macyc', text:'一定要一直幸福下去呀', avatar:'xhs/xhs15.jpg',date:'2020-06-01', likes:36 },
            { id:704, user:'糖果超甜', text:'这组婚纱照拍得真好看', avatar:'xhs/xhs16.jpg',date:'2020-06-02', likes:58 },
        ],
        8: [
            { id:701, user:'Kiki', text:'快乐就是和朋友一起炫火锅', avatar:'xhs/xhs36.jpg', date:'2020-05-28', likes:67 },
            { id:702, user:'周周', text:'聊天配火锅简直满分组合', avatar:'xhs/xhs35.jpg', date:'2020-05-28', likes:89 },
            { id:703, user:'Yuki', text:'这样的友谊真的很舒服', avatar:'xhs/xhs34.jpg', date:'2020-06-01', likes:36 },
            { id:704, user:'阿豪', text:'看得我也想约朋友吃火锅了', avatar:'xhs/xhs33.jpg', date:'2020-06-02', likes:58 },
        ],
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
        avatar: 'image/ningning.jpg'
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

(function initVideoPlayer() {
    const video = document.getElementById('win10-video-element');
    const container = document.getElementById('video-content-area');
    const controls = document.getElementById('win10-video-controls');
    
    if (!video || !controls) return;

    const btnPlay = document.getElementById('video-btn-play');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');
    const btnMute = document.getElementById('video-btn-mute');
    const volumeSlider = document.getElementById('video-volume-slider');
    const btnFullscreen = document.getElementById('video-btn-fullscreen');
    
    const timeCurrent = document.getElementById('video-time-current');
    const timeTotal = document.getElementById('video-time-total');
    const progressContainer = document.getElementById('video-progress-container');
    const progressFill = document.getElementById('video-progress-fill');
    const progressThumb = document.getElementById('video-progress-thumb');

    let controlsTimeout;
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return "00:00";
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function togglePlay() {
        if (video.paused) {
            video.play();
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        } else {
            video.pause();
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
        }
    }

    btnPlay.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
    video.addEventListener('click', togglePlay);

    video.addEventListener('loadedmetadata', () => {
        timeTotal.textContent = formatTime(video.duration);
    });

    video.addEventListener('timeupdate', () => {
        timeCurrent.textContent = formatTime(video.currentTime);
        const progress = (video.currentTime / video.duration) * 100;
        progressFill.style.width = `${progress}%`;
        progressThumb.style.left = `${progress}%`;
    });

    video.addEventListener('ended', () => {
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        controls.style.opacity = '1';
    });

    progressContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });

    progressContainer.addEventListener('mouseenter', () => {
        progressThumb.style.opacity = '1';
        progressContainer.style.height = '6px';
    });
    progressContainer.addEventListener('mouseleave', () => {
        progressThumb.style.opacity = '0';
        progressContainer.style.height = '4px';
    });

    volumeSlider.addEventListener('input', (e) => {
        e.stopPropagation();
        video.volume = e.target.value;
        video.muted = (video.volume === 0);
    });

    btnMute.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (video.muted) {
            volumeSlider.value = 0;
        } else {
            volumeSlider.value = video.volume > 0 ? video.volume : 0.5;
            video.volume = volumeSlider.value;
        }
    });

    btnFullscreen.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => console.log(err));
        } else {
            document.exitFullscreen();
        }
    });

    function showControls() {
        controls.style.opacity = '1';
        container.style.cursor = 'default';
        clearTimeout(controlsTimeout);
        if (!video.paused) {
            controlsTimeout = setTimeout(() => {
                controls.style.opacity = '0';
                container.style.cursor = 'none';
            }, 2500);
        }
    }

    container.addEventListener('mousemove', showControls);
    container.addEventListener('mouseleave', () => {
        if (!video.paused) controls.style.opacity = '0';
    });
    
    document.querySelectorAll('.btn-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-app') === 'videoplayer') {
                video.pause();
            }
        });
    });
})();

(function initDailyNews() {
    let NEWS_DATA = [
        {
            id: 1,
            title: '明安市人口数量连续下降',
            source: '明安日报讯',
            comments: 99,
            time: '2020年4月6日',
            hasImage: false,
            tag: '置顶',
            content: "近日，明安市统计事务中心发布《2020年度人口发展简报》。数据显示，截至去年11月底，全市登记人口为1,237,614人，较去年同期减少约1.8%。这是明安市连续第三年出现人口负增长现象。根据公开资料显示，2017年至2019年期间，明安市常住人口数量始终保持稳定增长。然而自2020年初开始，人口总量出现持续下降趋势。统计数据显示，近三年来全市人口累计减少超过五万人。针对人口减少问题，相关部门已组织多次专项调查。调查结果显示，目前尚未发现大规模人口迁出情况。全市户籍迁移、就业流动以及升学迁出等数据均处于正常范围内，与往年相比并无明显异常。与此同时，死亡率、出生率等关键指标也未出现显著变化。“从现有数据来看，我们暂时无法将人口变化归因于单一因素。”市统计事务中心负责人在接受采访时表示，“有关部门仍在进一步核查相关资料。”消息公布后，引发部分市民讨论。市民李先生表示，自己居住在城西社区已经十余年，最近两年确实感觉周围居民数量有所减少。“以前晚上广场上特别热闹，现在明显安静了不少。”他说。也有市民认为，这可能只是正常的人口流动现象。不过记者在采访过程中发现，多个社区工作人员均提到类似情况。一些小区物业表示，部分住宅长期处于无人居住状态，但相关房屋并未办理出售、出租或迁出登记手续。对此，市住房管理部门表示，目前暂未发现异常情况。据了解，市政府已成立专项工作组，对相关数据进行复核。工作组负责人表示，人口统计是一项复杂工作，不排除存在登记误差、信息同步延迟等技术性原因。截至发稿前，专项调查工作仍在进行中。有关部门呼吁市民理性看待统计结果，不信谣、不传谣，一切信息以官方发布内容为准。根据计划，下一阶段调查报告预计将在明年第一季度向社会公布。"
        },
        {
            id: 2,
            title: '市博物馆举办老照片征集活动',
            source: '明安文化社',
            comments: 13,
            time: '2020年4月5日',
            hasImage: false,
            tag: '热点',
            content: '为记录城市发展历程，保存珍贵城市记忆，市博物馆近日正式启动“记忆中的明安”老照片征集活动。本次活动面向全体市民开放，征集内容包括家庭生活照片、校园活动照片、城市街景照片以及具有历史价值的影像资料和相关文献记录。博物馆方面表示，希望通过此次活动进一步丰富馆藏内容，整理和保存反映明安市发展变迁的重要历史资料。据介绍，征集作品时间范围主要覆盖上世纪八十年代至本世纪初，重点关注城市建设、居民生活、文化活动以及重要历史事件等内容。活动期间，博物馆将安排专业人员对征集到的照片进行数字化整理和信息归档，确保珍贵资料得到妥善保存。工作人员表示，部分入选作品将在年底举办的专题展览中向公众展示，同时永久收录至城市档案馆进行保存，为后续历史研究和文化传承提供参考。市博物馆呼吁广大市民积极参与活动，共同记录城市发展的点滴变化，让更多珍贵记忆得以延续和传承。目前征集活动已正式开始，相关报名及提交方式可通过博物馆服务大厅和官方网站进行查询。'
        },
        {
            id: 3,
            title: '城南公交线路优化调整 方便居民日常出行',
            source: '明安日报讯',
            comments: 1303,
            time: '2020年4月5日',
            hasImage: true,
            imgSrc: 'image/xw2.png',
            content: '市交通运输部门近日发布公告，自8月1日起将对13路、18路公交线路进行优化调整。其中13路公交车将新增和平社区站和城南市场站两个停靠站点，18路公交车则将延长运营时间至晚上10时。相关负责人表示，本次调整主要根据市民出行需求以及近期客流调查结果制定，预计将惠及周边近两万名居民。目前各项准备工作已基本完成，新的线路信息将在各公交站台陆续更新。'
        },
        {
            id: 4,
            title: '市图书馆举办暑期阅读活动 多项公益项目面向市民开放',
            source: '明安光明网',
            comments: 12,
            time: '2020年4月4日',
            hasImage: true,
            imgSrc: 'image/xw3.png',
            content: '近日，市图书馆正式公布2020年“暑期阅读月”活动计划。本次活动将于6月18日至7月1日期间举行，面向全市市民免费开放，旨在进一步丰富群众文化生活，培养青少年阅读习惯，营造良好的全民阅读氛围。据了解，本次活动将推出读书分享会、亲子阅读课堂、优秀图书展览、儿童故事会以及阅读知识讲座等多个项目。其中，亲子阅读课堂将邀请教育工作者和儿童文学研究人员参与，通过互动交流、绘本讲解等形式帮助家长提高家庭阅读质量。市图书馆负责人表示，近年来到馆读者数量持续增长，尤其是在暑假期间，许多学生会利用假期前来借阅图书和参加文化活动。为满足不同年龄群体的阅读需求，图书馆已提前完成部分馆藏更新工作，新购入文学、历史、科学及少儿读物等图书两千余册。此外，活动期间图书馆还将开放部分平时较少对外展示的历史文献资料，并设置专题展区，向市民介绍明安市的发展历程和地方文化特色。工作人员表示，希望通过此次活动让更多年轻人了解阅读的乐趣，同时增强对本地历史文化的认识。据了解，去年暑期阅读活动累计吸引超过五千名市民参与。今年主办方预计参与人数将进一步增长。目前，各项活动报名工作已经启动，市民可通过图书馆服务大厅或官方网站进行预约登记。市图书馆提醒广大读者，在参加活动期间请遵守馆内秩序，共同维护安静舒适的阅读环境。相关活动安排及时间表将在近期陆续公布。'
        },
        {
            id: 5,
            title: '魔法兔兔？',
            source: '明安日娱乐网',
            comments: 18,
            time: '2020年4月4日',
            hasImage: true,
            imgSrc: 'image/xw4.png',
            content: '近日，一款名为“魔法兔兔”的毛绒玩偶在明安市儿童群体中迅速走红。凭借可爱的外观设计和丰富的周边故事设定，该玩偶受到许多家长和孩子的喜爱。作为一部最早可追溯至2000年的动画作品，《魔法兔兔》凭借温馨治愈的故事内容和充满想象力的世界观，陪伴了许多孩子的成长。据了解，《魔法兔兔》最初于2000年在部分地区播出，随后逐渐积累起稳定的观众群体。近年来，随着网络平台的发展，不少年轻家长重新接触到这部童年时期的动画，并将其推荐给下一代观看。记者在明安市多所学校附近采访时发现，许多儿童都对动画中的角色和故事情节十分熟悉。一位家长表示，自己小时候就看过《魔法兔兔》，如今孩子也成为了这部作品的忠实观众。“感觉像是两代人在看同一部动画。”该家长说道。文化研究人士认为，《魔法兔兔》能够持续受到关注，与其轻松温暖的叙事风格以及对友情、勇气和成长主题的描绘密不可分。尽管距离首播已经过去二十余年，但这部作品依然保持着相当高的人气。目前，《魔法兔兔》已成为今年明安市讨论度最高的经典动画作品之一。'
        }
    ];

    const HIDDEN_NEWS = [
        {
            id: 999,
            title: '"魔法兔兔"的作者至今无人知晓',
            source: '明安市教育监督网',
            comments: 842,
            time: '2019-11-21',
            hasImage: false,
            tag: '独家暗访',
            content: '"魔法兔兔" 兔先生的作者至今无人知晓。\n\n根据现有公开记录，该作品最早出现于2000年代后期，但无论是出版社档案、教育系统资料还是网络早期备份，都无法找到明确的作者信息。作品署名长期为空白，部分版本甚至不存在版权页。\n\n多位研究者曾尝试追查其来源，却发现相关记录存在不同程度的缺失与矛盾。有人声称见过作者本人，也有人坚称作者从未真实存在过。\n\n截至目前，兔先生究竟出自何人之手，仍是一个未被解开的谜题。'
        },
        {
            id: 998,
            title: '明安市',
            source: '明安教育监督网',
            comments: 2011,
            time: '2018-02-12',
            hasImage: true,
            imgSrc: 'image/xw5.png',
            content: '明安市，简称“明”，位于中国东部地区，是一座兼具历史底蕴与现代活力的区域中心城市。全市总面积约5800平方公里，下辖5个区、3个县及1个县级市，常住人口约420万人。作为省内重要的教育、文化和交通枢纽，明安市连续多年入选全国文明城市建设试点名单。明安市建城历史可追溯至明代中期。因城区最初位于明河两岸，且当地百姓素有“崇文尚学、以德为明”的传统，故得名“明安”。在漫长的发展过程中，明安市逐渐由农业聚落发展为区域贸易中心，并于二十世纪中后期完成工业化转型。改革开放后，明安市依托优越的区位条件，大力发展制造业、教育产业和现代服务业，城市规模迅速扩大。进入二十一世纪后，明安市开始推进智慧城市建设和产业升级，逐步形成以科技创新、文化创意和现代教育为特色的发展格局。明安市地处平原与丘陵交汇地带，气候温和湿润，四季分明。境内河流众多，其中明河、青水河和南溪河贯穿城区，为城市发展提供了丰富的水资源。城区绿化覆盖率较高，拥有多个大型城市公园和生态保护区。每年春季，明河沿岸盛开的樱花和海棠花吸引大量游客前来观赏。教育一直是明安市最具代表性的城市名片之一。全市现有普通中小学两百余所，高等院校十余所。其中，明安第一中学、明安实验中学、明安区第七中学等学校在省内具有较高知名度。近年来，明安市持续加大教育投入，推进智慧校园建设，完善城乡教育资源配置，努力为学生创造更加优质的学习环境。明安市拥有丰富的文化资源和独特的地方传统。每年举办的明安文化艺术节、明河灯会以及青云书展等活动吸引了众多市民参与。与此同时，儿童文学、动画创作和青少年文化产业在明安市发展迅速。许多具有影响力的儿童读物、动画作品以及校园文化活动均诞生于此，为城市增添了浓厚的人文气息。目前，明安市已形成电子制造、新能源、新材料、现代物流和文化创意产业共同发展的经济结构。市高新技术产业开发区聚集了大量创新型企业，为区域经济增长提供了重要动力。根据近年统计数据，明安市地区生产总值保持稳定增长，居民生活水平不断提高，城市综合竞争力持续增强。未来，明安市将继续坚持“创新、开放、绿色、共享”的发展理念，努力建设成为宜居、宜业、宜学的现代化城市，为市民创造更加美好的生活环境。这座不断发展的城市，正以开放包容的姿态迎接来自全国各地的人们，共同书写属于新时代的明安故事。'
        }
    ];

    const HOT_NEWS = [
        "市博物馆启动老照片征集活动",
        "武汉市委书记走访三民小区：人命关天的事决不能麻痹大意",
        "最新多地开学时间表公布！家长直呼终于等到了",
        "A股三大股指全线飘红，科技板块领涨",
        "明安市人口数量连续第三年下降",
    ];

    let myNewsPosts = [];
    try {
        myNewsPosts = JSON.parse(localStorage.getItem('win10_news_my_posts')) || [];
    } catch(e) {}
    
    NEWS_DATA = [...myNewsPosts, ...NEWS_DATA];
    let currentNewsList = [...NEWS_DATA];
    let isShowingSearchResults = false;

    window.newsShowToast = function(msg) {
        const toast = document.getElementById('news-toast');
        if (!toast) return;
        toast.innerText = msg;
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.opacity = '0'; }, 3000);
    };

    window.newsSubmitPost = function() {
        const isNewsLogged = localStorage.getItem('win10_news_logged_in') === 'true';
        if (!isNewsLogged) {
            newsShowToast('请先登录账号');
            return;
        }

        const inputEl = document.getElementById('news-post-input');
        if (!inputEl) return;
        const text = inputEl.value.trim();

        if (!text) {
            newsShowToast('发布内容不能为空！');
            inputEl.focus();
            return;
        }
        const newPost = {
            id: Date.now(),
            title: text.length > 25 ? text.substring(0, 25) + '...' : text,
            source: '宁宁',
            comments: 0,
            time: '刚刚',
            hasImage: false,
            tag: '微头条',
            content: text
        };

        myNewsPosts.unshift(newPost);
        localStorage.setItem('win10_news_my_posts', JSON.stringify(myNewsPosts));

        NEWS_DATA.unshift(newPost);
        
        inputEl.value = '';
        newsUpdateAuthUI();
        
        if (isShowingSearchResults) {
            newsClearSearch();
        } else {
            currentNewsList = [...NEWS_DATA];
            renderNewsFeed();
            document.getElementById('news-main-scroll').scrollTop = 0;
        }

        newsShowToast('发布成功！');
    };
    window.newsTriggerLogin = function() {
        const isWechatLogged = localStorage.getItem('win10_wechat_logged_in') === 'true';
        if (isWechatLogged) {
            localStorage.setItem('win10_news_logged_in', 'true');
            newsShowToast('微信授权登录成功！');
            newsUpdateAuthUI();
        } else {
            newsShowToast('请先登入微信');
        }
    };

    function newsUpdateAuthUI() {
        const isNewsLogged = localStorage.getItem('win10_news_logged_in') === 'true';
        const unloggedUI = document.getElementById('news-unlogged-ui');
        const loggedUI = document.getElementById('news-logged-ui');
        if (unloggedUI && loggedUI) {
            if (isNewsLogged) {
                unloggedUI.style.display = 'none';
                loggedUI.style.display = 'flex';
                const countEl = document.getElementById('news-my-dynamics-count');
                if (countEl) countEl.innerText = myNewsPosts.length;
            } else {
                unloggedUI.style.display = 'block';
                loggedUI.style.display = 'none';
            }
        }
    }

    function renderNewsFeed(searchQuery = '') {
        const container = document.getElementById('news-feed-container');
        if (!container) return;
        container.innerHTML = '';

        if (searchQuery !== '') {
            isShowingSearchResults = true;
            const searchHeader = document.createElement('div');
            searchHeader.style.cssText = 'padding: 15px 0 20px 0; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';
            searchHeader.innerHTML = `
                <div style="font-size: 16px; color: #333;">关于 <span style="color:#ed4040; font-weight:bold;">“${searchQuery}”</span> 的搜索结果：共 ${currentNewsList.length} 条</div>
                <button onclick="newsClearSearch()" style="background:#f4f5f6; border:1px solid #e8e8e8; color:#505050; padding:6px 16px; border-radius:4px; cursor:pointer; font-size:13px; transition:0.2s;" onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f4f5f6'">返回推荐首页</button>
            `;
            container.appendChild(searchHeader);
        } else {
            isShowingSearchResults = false;
        }

        if (currentNewsList.length === 0) {
            container.innerHTML += `<div style="text-align:center; padding: 80px 0; color: #999; font-size: 15px;">抱歉，未找到相关资讯。</div>`;
            return;
        }

        currentNewsList.forEach(news => {
            let imgHTML = '';
            if (news.hasImage) {
                imgHTML = `<div style="width: 150px; height: 100px; background: #f0f0f0; flex-shrink: 0; margin-right: 18px; overflow: hidden; border: 1px solid #f0f0f0;">
                                <img src="${news.imgSrc}" style="width: 100%; height: 100%; object-fit: cover; transition: 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                           </div>`;
            }

            let tagHTML = '';
            if (news.tag) {
                tagHTML = `<span style="border: 1px solid #ed4040; color: #ed4040; padding: 1px 4px; border-radius: 2px; font-size: 12px; margin-right: 8px;">${news.tag}</span>`;
            }

            const item = document.createElement('div');
            item.style.cssText = 'display: flex; padding: 18px 0; border-bottom: 1px solid #f0f0f0; cursor: pointer; position: relative;';
            item.innerHTML = `
                ${imgHTML}
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-right: 20px;">
                    <div style="font-size: 20px; font-weight: bold; color: #222; margin-bottom: 12px; line-height: 1.4; transition: color 0.2s;" onmouseover="this.style.color='#135bb5'" onmouseout="this.style.color='#222'">${news.title}</div>
                    <div style="display: flex; align-items: center; font-size: 13px; color: #999;">
                        ${tagHTML}
                        <span style="display: flex; align-items: center; gap: 4px; margin-right: 15px;">
                            ${news.source.includes('央视') ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="#ed4040"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>' : ''}
                            ${news.source}
                        </span>
                        <span style="margin-right: 15px;">${news.comments} 评论</span>
                        <span>${news.time}</span>
                    </div>
                </div>
                <div style="position: absolute; right: 0; bottom: 25px; color: #ccc; padding: 4px; cursor: pointer;" onmouseover="this.style.color='#ed4040'" onmouseout="this.style.color='#ccc'" onclick="event.stopPropagation(); this.parentNode.style.display='none';">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
            `;
            item.onclick = () => newsOpenArticle(news.id);
            container.appendChild(item);
        });
    }

    function renderHotNews() {
        const container = document.getElementById('news-hot-list');
        if (!container) return;
        container.innerHTML = '';
        HOT_NEWS.forEach((title, index) => {
            const div = document.createElement('div');
            div.style.cssText = 'display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #333; line-height: 1.5; cursor: pointer;';
            div.innerHTML = `
                <div style="width: 18px; height: 18px; background: ${index < 3 ? '#ed4040' : '#d8d8d8'}; color: #fff; border-radius: 2px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; margin-top: 2px;">${index + 1}</div>
                <div style="transition: color 0.2s;" onmouseover="this.style.color='#ed4040'" onmouseout="this.style.color='#333'">${title}</div>
            `;
            container.appendChild(div);
        });
    }
    window.newsDoSearch = function() {
        const isNewsLogged = localStorage.getItem('win10_news_logged_in') === 'true';
        if (!isNewsLogged) {
            newsShowToast('请先登录账号');
            document.getElementById('news-search-input').value = '';
            return;
        }

        const query = document.getElementById('news-search-input').value.trim().toLowerCase();
        if (query === '') {
            newsShowToast('请输入要搜索的内容。');
            return;
        }

        let results = NEWS_DATA.filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query));

        if (query.includes('兔先生') || query.includes('兔') || query.includes('兔子先生') || query.includes('魔法兔兔')) {
            results.unshift(HIDDEN_NEWS[0]);
        }
        if (query.includes('明安') || query.includes('明安市') || query.includes('明安区')) {
            results.unshift(HIDDEN_NEWS[1]);
        }

        currentNewsList = results;
        newsBackToList();
        renderNewsFeed(query);
    };

    window.newsClearSearch = function() {
        document.getElementById('news-search-input').value = '';
        currentNewsList = [...NEWS_DATA];
        newsBackToList();
        renderNewsFeed();
    };

    document.getElementById('news-search-input')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') newsDoSearch();
    });

    window.newsOpenArticle = function(id) {
        let news = NEWS_DATA.find(n => n.id === id) || HIDDEN_NEWS.find(n => n.id === id);
        if (!news) return;

        document.getElementById('news-list-view').style.display = 'none';
        document.getElementById('news-detail-view').style.display = 'block';
        
        document.getElementById('news-detail-title').innerText = news.title;
        document.getElementById('news-detail-source').innerText = news.source;
        document.getElementById('news-detail-time').innerText = news.time;
        
        const formattedContent = news.content.split('\n').map(p => {
            if(!p.trim()) return '';
            return `<p style="margin-bottom: 20px; text-indent: 2em;">${p}</p>`;
        }).join('');
        document.getElementById('news-detail-content').innerHTML = formattedContent;

        document.getElementById('news-main-scroll').scrollTop = 0;
    };

    window.newsBackToList = function() {
        document.getElementById('news-detail-view').style.display = 'none';
        document.getElementById('news-list-view').style.display = 'block';
        document.getElementById('news-main-scroll').scrollTop = 0;
    };

    const origOpenApp = window.openApp;
    window.openApp = function(appId) {
        origOpenApp(appId);
        if (appId === 'news') {
            newsUpdateAuthUI();
            newsClearSearch();
            renderHotNews();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            renderNewsFeed();
            renderHotNews();
            newsUpdateAuthUI();
        });
    } else {
        renderNewsFeed();
        renderHotNews();
        newsUpdateAuthUI();
    }

    
})();


// localStorage.clear();