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
        'xhs': { icon: 'image/小红书.png', name: '小红书' },
        'hospitalpdf': { icon: 'image/pdf.png', name: '江建国体检报告.pdf' },
        'news': { icon: 'image/新闻.png', name: '每日新闻' },
        'videoplayer': { icon: 'image/video.png', name: '电影和电视' },
        
        
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
            id: 'm9', authorName: '哥哥', authorAvatar: 'image/gege.jpg',
            text: '用了三年的电脑，该退役啦。',
            time: '2020年6月1号 晚上10:45', likes: ['宁宁', '月月'],
            comments: [
                { name: '宁宁', text: '哥哥要买新的啦？那旧的给我嘛！' },
                { name: '哥哥', text: '行，等我生日过完就给你。' }
            ]
        },
        {
            id: 'm2', authorName: '妈妈', authorAvatar: 'image/mama.png',
            text: '时间过得真快，一转眼小家伙们都长大了！',
            time: '2020年6月1号 晚上8:09', likes: ['哥哥', '宁宁','爸爸']
        },
        {
            id: 'm3', authorName: '月月', authorAvatar: 'image/yueyue.jpg',
            text: '再上十年学我才23岁...好痛苦还有那么多要学',
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
            text: '还剩一年就步入大学了，时间过得好快啊',
            time: '2020年5月25号 晚上7:08', likes: ['宁宁'], 
            comments: [
                { name: '宁宁', text: '哥哥加油！' }
            ]
        },
        {
            id: 'm8', authorName: '爸爸', authorAvatar: 'image/baba.png',
            text: '回首向来萧瑟处，也无风雨也无晴',
            time: '2020年5月24号 早上6:28', likes: ['宁宁']
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
            text: '再上十年学我才23岁...好痛苦还有那么多要学',
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
            images: ['hands/s0.png'],
            time: '2020年5月27号 晚上7:13', likes: [], 
            comments: [
                { name: '安沫', text: '宁宁? 你是不是最近身体不舒服？' },
            ]
        },
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            images: ['hands/s2.png'],
            time: '2020年5月27号 晚上7:13', likes: [], 
            comments: [
            ]
        },
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            images: ['hands/s1.png'],
            time: '2020年5月27号 晚上7:12', likes: [], 
            comments: [
                { name: '安沫', text: '宁宁？' },
            ]
        },
        {
            id: 'm4', authorName: '宁宁', authorAvatar: 'image/ningning.jpg',
            images: ['hands/s1.png'],
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
                { time: '2020年6月14日 19:33', text: '晚上我和爸妈出去一会', isMine: false},
                { time: '', text: '家钥匙我就带着了', isMine: false},
                { time: '', text: '你一个人在家早点睡', isMine: false},
                { time: '2020年6月14日 19:36', text: '知道啦', sender: '宁宁', isMine: true},
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
                { time: '2020年6月14日 19:36', text: '妈妈爸爸你们今晚不在家吗？', sender: '宁宁',isMine: true},
                { time: '', text: '妈妈等会就回家，宁宁你早点睡吧', sender: '妈妈', isMine: false },
                { time: '2020年6月14日 19:38', text: '好的妈妈', sender: '宁宁',isMine: true},
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
                { time: '2020年6月4日 08:12', text: '月月，你猜猜我爸给我买了什么？',  sender: '宁宁', isMine: true },
                { time: '2020年6月4日 08:16', text: '什么东西', isMine: false},
                { time: '', text: '神神秘秘的呀', isMine: false},
                { time: '', text: '新的发夹吗？', isMine: false},
                { time: '', text: '不是',  sender: '宁宁', isMine: true },
                { time: '', text: '新的衣服？', isMine: false},
                { time: '', text: '也不是',  sender: '宁宁', isMine: true },
                { time: '', text: '那会是什么？猜不到', isMine: false},
                { time: '', text: '嘻嘻，没啥',  sender: '宁宁', isMine: true },
                { time: '',content: 'image/mianmian.png', sender: '宁宁', isMine: true,type: 'img' },
                { time: '', text: '我去！', isMine: false },
                { time: '', text: '好可爱啊', isMine: false },
                { time: '',content: 'image/emoji11.jpg', isMine: false,type: 'img' },
                { time: '2020年6月4日 08:21', text: '你可以带兔兔到我家里玩吗？', isMine: false},
                { time: '', text: '我想抱抱看！', isMine: false},
                { time: '', text: '哦对了，还有吗？我也想买一个', isMine: false},
                { time: '', text: '没啦，这是店里最后一个',  sender: '宁宁', isMine: true },
                { time: '', text: '被我爸爸买了',  sender: '宁宁', isMine: true },
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
                { time: '2020年6月14日 12:12', text: '月月', sender: '宁宁',isMine: true},
                { time: '', text: '我电脑出问题了', sender: '宁宁',isMine: true},
                { time: '2020年6月14日 12:15', text: '发生了什么了？', isMine: false},
                { time: '', text: '就是', sender: '宁宁',isMine: true},
                { time: '', text: '我多了一个联系人', sender: '宁宁',isMine: true},
                { time: '', text: '但我完全没有印象', sender: '宁宁',isMine: true},
                { time: '', text: '真奇怪', isMine: false},
                { time: '', text: '你是下载了什么奇奇怪怪的东西了吗', isMine: false},
                { time: '', text: '没有', sender: '宁宁',isMine: true},
                { time: '', text: '我爸爸给我这台电脑的时候就是这样的', sender: '宁宁',isMine: true},
                { time: '', text: '啊？', isMine: false},
                { time: '', text: '也许电脑里会有记录吗？', isMine: false},
                { time: '', text: '你找找看', isMine: false},
                { time: '', text: '我之前也好像有过这样，但是我忘了怎么做了', isMine: false},
                { time: '', text: '嗯，我试试看', sender: '宁宁',isMine: true},
                { time: '', text: '好哦，等你的好消息', isMine: false},
                { time: '2020年6月14日 21:42', text: '月月我今晚一个人在家', sender: '宁宁',isMine: true},
                { time: '', text: '有点不敢睡觉，屋外有吱吱喳喳的声音', sender: '宁宁',isMine: true},
                { time: '', text: '像有人说话在说话', sender: '宁宁',isMine: true},
                { time: '',content: 'image/睡觉.png', isMine: true,type: 'img' },
                { time: '2020年6月14日 21:44', text: '嗯？', isMine: false},
                { time: '2020年6月14日 21:44', text: '是虫子吧？', isMine: false},
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
                { time: '2020年6月14日 10:34', text: '在吗在吗？', isMine: false},
                { time: '2020年6月14日 10:39', text: '咋啦，安沫？', sender: '宁宁',isMine: true},
                { time: '', text: '你三号没和我玩，十号没和我玩，今天总得和我玩羽毛球了吧', isMine: false},
                { time: '', text: '哦哦哦！', sender: '宁宁',isMine: true},
                { time: '', text: '最近老是忘事', sender: '宁宁',isMine: true},
                { time: '', text: '那叫你爸爸来接我吧', sender: '宁宁',isMine: true},
                { time: '', text: '好哦！', isMine: false},
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
                { time: '',content: 'image/mianmian2.png', sender: '宁宁', isMine: true,type: 'img' },
                { time: '', text: '我去！', isMine: false },
                { time: '', text: '好可爱啊', isMine: false },
                { time: '',content: 'image/emoji11.jpg', isMine: false,type: 'img' },
                { time: '2020年6月4日 08:21', text: '你可以带兔兔到我家里玩吗？', isMine: false},
                { time: '', text: '我想抱抱看！', isMine: false},
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
                { time: '2020年6月11日 19:30', text: '在吗在吗？ 和你说件事呗', isMine: false},
                { time: '', text: '怎么了', isMine: true},
                { time: '', text: '就是上次我们去吃的那家店，这周末打折你要去吗？', isMine: false},
                { time: '', text: '去呀！', isMine: true},
                { time: '', text: '那家虾滑和羊肉卷超好吃', isMine: false},
                { time: '', text: '嗯...', sender: '宁宁', isMine: true},
                { time: '', text: '但我好像不记得了', sender: '宁宁', isMine: true},
                { time: '', text: '我总感觉少了点什么', sender: '宁宁', isMine: true},
                { time: '', text: '别管那么多了，就这样定了！', isMine: false},
                { time: '2020年6月11日 19:32', content: 'image/bql.png', isMine: false, type: 'img'},
                { time: '', text: '笑死我了，这还是我拍的冰淇淋', isMine: false},
                { time: '', text: '但我打不开', isMine: false},
                { time: '', text: '算了啦，以后咱们多拍几张', isMine: false},
                { time: '', text: '好~', sender: '宁宁', isMine: true},
                { time: '2020年6月13日 12:03', text: '月月你个坏蛋', isMine: true},
                { time: '', text: '哈哈哈哈，我又怎么你了？', isMine: false},
                { time: '', text: '没事呀，我只是有点无聊罢了', isMine: true},
                { time: '', text: '那我去找你玩吧', isMine: false},
                { time: '2020年6月13日 12:05', text: '我开玩笑的啦', isMine: true},
                { time: '', text: '你不用真来', isMine: true},
                { time: '', text: '哈哈哈', isMine: false},
                { time: '2020年6月15日 21:42', text: '月月我今晚一个人在家', sender: '宁宁',isMine: true},
                { time: '', text: '有点不敢睡觉，感觉屋子外面有吱吱喳喳的声音', sender: '宁宁',isMine: true},
                { time: '2020年6月15日 21:44', text: '可能是什么虫子吧', isMine: false},
                { time: '', text: '没事的我在这里陪你', isMine: false},
                { time: '', text: '月月 撤回了一条消息', isMine: false, type: 'recall'},
                { time: '', text: '但我好像听到了我的名字', isMine: true},
                { time: '', text: '怎么会呢，好好休息一下', isMine: false},
                { time: '', text: '明天我找你玩！', isMine: false},
                { time: '', text: '嗯嗯', isMine: true},
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
                { time: '', text: 'kk', isMine: true},
                { time: '2020年6月12日 16:40', text: '若宁 周末的羽毛球还去吗', isMine: false},
                { time: '', text: '想去 但是没人送我', sender: '宁宁', isMine: true},
                { time: '', text: '让你爸送啊 他周末又不上课', isMine: false},
                { time: '', text: '我爸……?', sender: '宁宁', isMine: true},
                { time: '', text: '对啊，江老师', isMine: false},
                { time: '', text: '安沫？你在说些什么？', sender: '宁宁', isMine: true},
                { time: '', text: '啊？', isMine: false},
                { time: '', text: '我记错了吗？ 我最近老把事情记串', isMine: false},
                { time: '', text: '对不起', isMine: false},
                { time: '', text: '没事没事，那周末叫你爸爸来接我吧', sender: '宁宁', isMine: true},
                { time: '', text: '好呀', isMine: false}
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
            { id: 's1', name: '文字(1).txt', content: '月月周四来我家玩啦！！！我超开心！她爸爸送她来的。哥哥带我们在外面玩了一会儿羽毛球，后来我们一起看了电视，还吃了妈妈之前包的饺子。真好吃！真希望月月能够住在我家一段时间！这样我们就可以一直玩啦！！到了晚餐时间，我妈妈居然同意月月来我家过夜！！！晚上，月月拉着我一起看《兔子先生》，还被妈妈说了……不过我又不是每天都看那么晚嘛！但不管怎么说，起码我能和月月待在一起。', type: 'text' },
            { id: 's1', name: '文字(2).txt', content: '月月一直在我家待到周六才被爸爸妈妈接走。我恳求妈妈让月月再待一会儿，但是被她无情地拒绝了。我好难过……', type: 'text' },
            { id: 's5', name: '文字(3).txt', content: '晚上月月抱着棉棉玩了一会说棉棉的眼睛好神奇好像会跟着人转。其实我早就知道了，我把它放到了客厅。结果第二天早上，它又回到了我的床头……一定是哥哥半夜帮我捡回来的吧。嘻嘻。明天一定要好好谢谢哥哥！', type: 'text' },
            { id: 's3', name: '兔子玩偶.png', content: 'image/tv.png', type: 'img' },
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
            { id: 'd13', name: '晚餐.png', content: 'image/吃饭.png', type: 'img' },
            { id: 'd21', name: '文字(5).txt', content: '今晚我又一个人在家。屋外时不时传来的声音，让我翻来覆去怎么也睡不着。明明平时也是这样的夜晚，为什么妈妈在家就不会有这种声音呢？', type: 'text' }
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
            { id: 'z3txt', name: '文字.txt', content: '我叫若宁。从小到大，我都和姥姥住在一起。她总爱牵着我的手去街上，说是让我看看外面，也总是给我买各种好吃的。那时候的日子，是那么无忧无虑。但最近……不知道怎么了，脑海里总是浮现出一些陌生人的脸。总是那么模糊，却又如此真实。我尝试着去触摸他们，但我摸不到……', type: 'text' },
            { id: 'd99', name: '文字2.txt', content: '安沫周四来我姥姥家玩了，我很开心……是她爸爸送她来的……我们一起去外面打了羽毛球，看了电视，还吃了饺子。饺子真好吃……晚上安沫就被她爸爸接回家了。', type: 'text' },
            { id: 'd98', name: '文字3.txt', content: '……', type: 'text' },
            { id: 'd97', name: '文字4.txt', content: '……', type: 'text' },
            { id: 'd96', name: '文字5.txt', content: '……', type: 'text' },
            { id: 'd95', name: '文字6.txt', content: 'A -> S, O -> P, Q -> W, M -> Z, V -> B', type: 'text' },
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
        { id: 'sch4', name: 'key.txt', content: 'RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT,RABBIT', type: 'text',icon: 'image/file.png'},
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
                if (keyLower === '哥哥' && (item.id === 'sch0' || item.id === 'sch1' || item.id === 'sch2' || item.id === 'sch5')) {
                    return true;
                }
                if ((keyLower === '同学录' || keyLower === '名单' || keyLower === '名字') && item.id === 'sch5') {
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
        if (isZhoumu3) { const vp = document.getElementById('icon-videoplayer'); if (vp) vp.style.display = 'flex'; }
        if (isZhoumu2 && !isZhoumu3 && localStorage.getItem('win10_creepy_spawned') === 'true') {
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

        if (isZhoumu2 && !isZhoumu3 && localStorage.getItem('win10_creepy_spawned') === 'true') {
            for (let i = 1; i <= 9; i++) {
                const inBin = vfs.bin.find(item => item.isApp && item.id === `cpic${i}`);
                if (inBin) {
                    const icon = document.getElementById(`icon-cpic${i}`);
                    if (icon) icon.style.display = 'none';
                }
            }
        }

        if (isZhoumu3) {
            const vpIcon = document.getElementById('icon-videoplayer');
            if (vpIcon) vpIcon.style.display = 'flex';
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
                        { text: '我打她视频看看', delay: 2000, isMine: true },
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
            if (pwdInput.value === '1120') {
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

    function blurYueyueName(text, vanished) {
        if (!vanished || !text) return text;
        return String(text).split('月月').join('<span style="filter:blur(4px); display:inline-block;">月月</span>');
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

            if (msg.type === 'recall' || msg.type === 'system') {
                msgList.innerHTML += `
                    <div style="display: flex; flex-direction: column; margin-bottom: 15px;">
                        ${timeHtml}
                        <div style="text-align: center; color: #b2b2b2; font-size: 12px; margin: 5px 0;">
                            ${blurYueyueName(msg.text, currentData.vanished)}
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
                let extraClick = '';
                if (msg.content === 'image/bql.png' && activeWeChatContact === 'yueyue' && typeof isZhoumu3 !== 'undefined' && isZhoumu3) {
                    extraClick = `onclick="openYueyueGlitchPhoto()"`;
                } else {
                    extraClick = `onclick="document.getElementById('title-photoviewer').innerText='照片查看器'; document.getElementById('viewer-img').src='${msg.content}'; openApp('photoviewer');"`;
                }
                messageContentHtml = `<img src="${msg.content}" ${extraClick} style="max-width: 200px; border-radius: 4px; border: 1px solid #e0e0e0; cursor: pointer;">`;
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
                } else {
                    textContent = blurYueyueName(textContent, currentData.vanished);
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

        const vanished = !!(wechatData['yueyue'] && wechatData['yueyue'].vanished);

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
                        <span style="font-size: 12px; margin-right: 4px;">♡</span> ${blurYueyueName(post.likes.join(', '), vanished)}
                    </div>
                `;
            }

            let commentsHtml = '';
            if (post.comments && post.comments.length > 0) {
                commentsHtml = `<div style="padding: 4px 8px;">`;
                post.comments.forEach(c => {
                    commentsHtml += `<div style="font-size: 13px; margin-bottom: 2px; line-height: 1.4;"><span style="color: #576b95; font-weight: 500; cursor: pointer;">${blurYueyueName(c.name, vanished)}</span>: <span style="color: #333;">${blurYueyueName(c.text, vanished)}</span></div>`;
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
                    <div style="color: #576b95; font-size: 15px; font-weight: bold; margin-bottom: 2px; cursor: pointer;">${blurYueyueName(post.authorName, vanished)}</div>
                    
                    ${post.text ? `<div style="color: #222; font-size: 14px; line-height: 1.6; word-wrap: break-word;">${blurYueyueName(post.text, vanished)}</div>` : ''}
                    
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

            if (activeWeChatContact === 'yueyue' && wechatData['yueyue'] && wechatData['yueyue'].vanished) {
                setTimeout(() => {
                    const replyTime = new Date();
                    const replyTimeStr = replyTime.getHours().toString().padStart(2, '0') + ':' + replyTime.getMinutes().toString().padStart(2, '0');
                    wechatData['yueyue'].messages.push({
                        time: replyTimeStr,
                        text: '系统回复：该用户不存在，发送的消息无法送达',
                        isMine: false,
                        sender: '系统',
                        type: 'system'
                    });
                    saveWeChat();
                    if (activeWeChatContact === 'yueyue') {
                        renderWeChat();
                    }
                }, 500);
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

            if (file.name === '勿读.txt' && isZhoumu3 && localStorage.getItem('win10_event_z3_wudu') !== 'true') {
                localStorage.setItem('win10_event_z3_wudu', 'true');

                const seqWudu = [
                    { text: '若宁，你是不是又在看那本打不开的日记。', delay: 3000 },
                    { text: '那一页……我这边也跳出来了，全是乱码。', delay: 2800 },
                    { text: '别去读上面那串字，求你了。', delay: 3000 },
                    { text: '上次你把那个名字念出声的那天晚上，你说你哥在敲门。', delay: 3800 },
                    { text: '可第二天，就再没人记得，你有过一个哥哥。', delay: 3600 }
                ];

                let toastTimeoutWudu;
                const runSeqWudu = async () => {
                    for (let i = 0; i < seqWudu.length; i++) {
                        const msg = seqWudu[i];
                        await new Promise(r => setTimeout(r, msg.delay));
                        if (!wechatData['anmo']) continue;

                        const now = new Date();
                        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
                        wechatData['anmo'].messages.push({ time: timeStr, text: msg.text, isMine: false });
                        wechatData['anmo'].unread = true;

                        const audio = document.getElementById('msg-sound');
                        if (audio) { audio.currentTime = 0; audio.play().catch(e => {}); }

                        const toast = document.getElementById('win-toast');
                        if (toast) {
                            const toastImgs = toast.querySelectorAll('img');
                            if (toastImgs.length > 1) toastImgs[1].src = 'image/anmo.jpg';
                            const nameDiv = toast.querySelector('div[style*="font-weight: bold"]');
                            if (nameDiv) nameDiv.innerText = '安沫';
                            document.getElementById('toast-body').innerText = msg.text;
                            toast.onclick = () => { openApp('wechat'); toast.style.right = '-350px'; activeWeChatContact = 'anmo'; renderWeChat(); };
                            toast.style.right = '20px';
                            clearTimeout(toastTimeoutWudu);
                            toastTimeoutWudu = setTimeout(() => { toast.style.right = '-350px'; }, 4000);
                        }
                        saveWeChat();
                        renderWeChat();
                    }
                };
                runSeqWudu();
            }

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

                            if (toast) {
                                const toastImgs = toast.querySelectorAll('img');
                                if(toastImgs.length > 1) toastImgs[1].src = 'image/yueyue.jpg';
                                const nameDiv = toast.querySelector('div[style*="font-weight: bold"]');
                                if(nameDiv) nameDiv.innerText = '月月';
                                
                                document.getElementById('toast-body').innerText = msg.type === 'img' ? '[图片]' : msg.text;

                                toast.onclick = () => {
                                    openApp('wechat');
                                    toast.style.right = '-350px';
                                    activeWeChatContact = 'yueyue';
                                    renderWeChat();
                                };

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
                    { text: '除了一些陌生的照片', delay: 3500, isMine: true },
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
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4;">兔先生.exe 已接管系统。<br>当前可用指令:<br> - help : 查看系统帮助<br> - clear : 清屏<br> - wakeup : 清醒<br> - whoami : 我是谁<br></div>`;
                            } else if (lowerVal === 'clear') {
                                cmdOutput.innerHTML = '';
                            } else if (lowerVal === 'whoami') {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.6;">正在确认当前用户<br>用户：若宁<br>上次登录：2020-06-16 03:17<br>当前在线：2</div>`;
                            } else if (lowerVal === 'wakeup' || lowerVal === '醒醒') {
                                localStorage.setItem('win10_z3_wakeup_heard', 'true');
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.6;">jiangmingyuan</div>`;
                            } else if (lowerVal === 'jiangmingyuan' || lowerVal === '江明远' || lowerVal === '哥哥' || lowerVal === 'gege') {
                                const heard = localStorage.getItem('win10_z3_wakeup_heard') === 'true';
                                if (heard) {
                                    cmdInput.disabled = true;
                                    cmdInput.value = '';
                                    setTimeout(() => {
                                        cmdOutput.innerHTML += `<div style="margin-bottom: 5px; ">江明远。</div>`;
                                        cmdContent.scrollTop = cmdContent.scrollHeight;
                                        setTimeout(() => {
                                            cmdOutput.innerHTML += `<div style="margin-bottom: 5px; ">我的哥哥。</div>`;
                                            cmdContent.scrollTop = cmdContent.scrollHeight;
                                            setTimeout(() => {
                                                cmdOutput.innerHTML += `<div style="margin-bottom: 5px;">门外的声音停了。</div>`;
                                                cmdContent.scrollTop = cmdContent.scrollHeight;
                                                setTimeout(() => { startEnding3Effect(); }, 2200);
                                            }, 1600);
                                        }, 1400);
                                    }, 800);
                                    return;
                                } else {
                                    cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.6;">查无此人</div>`;
                                }
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
                                    cmdOutput.innerHTML += `<div style="margin-bottom: 5px; color: #fff;">宁宁</div>`;
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
                            } else if (lowerVal === 'jiangmingyuan' || lowerVal === '江明远') {
                                cmdOutput.innerHTML += `<div style="margin-bottom: 10px; line-height: 1.4; ">查无此人</div>`;
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
                            cmdOutput.innerHTML += `<div style="margin-bottom: 5px; color: #aaa;">指令已确认，系统正在休眠</div>`;
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

    function openYueyueGlitchPhoto() {
        window.yueyueSpecialPicOpen = true;
        const title = document.getElementById('title-photoviewer');
        if (title) title.innerText = '照片查看器';
        const viewer = document.getElementById('viewer-img');
        if (viewer) viewer.src = 'image/bql.png';
        openApp('photoviewer');
        setTimeout(() => {
            const v = document.getElementById('viewer-img');
            if (v) v.src = 'image/bql1.png';
        }, 100);
    }
    window.openYueyueGlitchPhoto = openYueyueGlitchPhoto;

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

        if (appId === 'photoviewer' && window.yueyueSpecialPicOpen) {
            window.yueyueSpecialPicOpen = false;
            try {
                const sfx = new Audio('audio/windows-10-foreground-earrape.mp3');
                sfx.volume = 0.3;
                sfx.play().catch(() => {});
            } catch (e) {}
            if (wechatData && wechatData['yueyue'] && wechatData['yueyue'].messages) {
                const targetMsg = wechatData['yueyue'].messages.find(
                    m => m.type === 'img' && m.content === 'image/bql.png'
                );
                if (targetMsg) {
                    targetMsg.type = 'recall';
                    targetMsg.text = '月月 撤回了一条消息';
                    delete targetMsg.content;
                    wechatData['yueyue'].avatar = 'image/user2.jpg';
                    wechatData['yueyue'].name = '该用户不存在';
                    wechatData['yueyue'].vanished = true;
                    saveWeChat();
                    if (typeof activeWeChatContact !== 'undefined' && activeWeChatContact === 'yueyue') {
                        renderWeChat();
                    }
                }
            }
        }
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