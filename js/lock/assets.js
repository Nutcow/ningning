// 第一档：进游戏前必须就位的资源(UI图标/头像/开局音效, ~630KB) — OOBE 的“接受”按钮只等这一档
window.LOCK_ASSETS_TIER1 = [
    // 桌面/任务栏图标
    'image/myPc.png', 'image/recycleEmpty.png', 'image/folder.png', 'image/wechat.png',
    'image/zipfolder.png', 'image/app.webp', 'image/drive.png', 'image/新闻.webp',
    'image/google.webp', 'image/zilizili.png', 'image/pdf.png',
    'image/video.png', 'image/小红书.png', 'image/exe.png', 'image/file.png',
    'image/image.png', 'image/db.webp', 'image/redpacket.png',

    // 微信头像 + 表情包(聊天界面第一眼)
    'image/ningning.webp', 'image/yueyue.webp', 'image/anmo.webp', 'image/baba.webp',
    'image/gege.webp', 'image/mama.webp', 'image/user.png', 'image/user2.jpg',
    'image/ming.webp', 'image/wechatfile.jpeg', 'image/zilizili.webp',
    'image/雨雨.webp', 'image/小兔子.webp',
    'image/emoji.jpg', 'image/emoji2.jpg', 'image/emoji10.jpg', 'image/emoji11.jpg',
    'image/catemoji.png',

    // 开局就会响的音效
    'audio/windows10_sound.mp3', 'audio/message.mp3',
];

// 第二档：按剧情顺序后台静默下载，不挡玩家进游戏
window.LOCK_ASSETS_TIER2 = [
    // 微信聊天里最先看到的照片
    'image/睡觉.webp', 'image/dog.webp', 'image/mianmian.webp', 'image/mianmian2.webp',
    'image/bql.webp', 'image/bql1.webp', 'image/吃饭.webp', 'image/tv.webp',
    'image/兔子.webp', 'image/兔子先生.webp',
    'hands/s0.webp', 'hands/s1.webp', 'hands/s2.webp',
    'image/生日.webp', 'image/生日2.webp', 'image/小时候.webp', 'image/野餐.webp',
    'image/全家图.webp', 'image/全家图1.webp', 'image/全家图2.webp',

    // 剧情中段照片 + 文档
    'image/zoo.webp', 'image/zoo1.webp', 'image/水族馆.webp', 'image/水族馆1.webp',
    'image/山上.webp', 'image/山上1.webp', 'image/毕业照.webp', 'image/成绩单.webp',
    'image/证件照.webp', 'image/对照表.webp',
    'image/日记1.webp', 'image/日记二.webp', 'image/日记三.webp', 'image/日记四.webp',

    // 朋友圈
    'pyq/pyq1.webp', 'pyq/pyq2.png', 'image/pyq3.jpg',

    // 新闻 app + 学校网页
    'image/xw2.webp', 'image/xw3.webp', 'image/xw4.webp', 'image/xw5.webp',
    'image/xw6.webp', 'image/xw7.webp', 'image/xw8.webp',
    'image/学校背景.webp', 'image/校徽.webp',

    // 中段音效
    'audio/morse.wav', 'audio/windowsError.mp3',

    // 小红书(需要解锁后才会打开)
    'xhs/xhs.webp', 'xhs/xhs2.webp', 'xhs/xhs3.webp', 'xhs/xhs4.webp', 'xhs/xhs5.webp',
    'xhs/xhs6.webp', 'xhs/xhs7.webp', 'xhs/xhs8.webp', 'xhs/xhs10.jpg', 'xhs/xhs11.webp',
    'xhs/xhs12.webp', 'xhs/xhs13.webp', 'xhs/xhs14_png.webp', 'xhs/xhs14_jpg.webp', 'xhs/xhs15_png.webp',
    'xhs/xhs15_jpg.webp', 'xhs/xhs16_png.webp', 'xhs/xhs16_jpg.webp', 'xhs/xhs17.webp', 'xhs/xhs18.webp',
    'xhs/xhs18.jpg', 'xhs/xhs19_png.webp', 'xhs/xhs19_jpg.webp', 'xhs/xhs20.webp', 'xhs/xhs21.webp',
    'xhs/xhs22.webp', 'xhs/xhs23.webp', 'xhs/xhs24.webp', 'xhs/xhs25.webp', 'xhs/xhs26.webp',
    'xhs/xhs27.webp', 'xhs/xhs28.webp', 'xhs/xhs29.webp', 'xhs/xhs30.webp', 'xhs/xhs31.webp',
    'xhs/xhs32.webp', 'xhs/xhs33.webp', 'xhs/xhs34.webp', 'xhs/xhs35.webp', 'xhs/xhs36.webp',
    'xhs/xhs37.webp', 'xhs/xhs38.webp',

    // 拼图 + 手势 + 兔子动图(后期解谜)
    'pt/1.png', 'pt/2.png', 'pt/3.png', 'pt/4.png', 'pt/5.png',
    'pt/6.png', 'pt/7.png', 'pt/8.png', 'pt/9.png', 'pt/fullpt.webp',
    'hands/l.gif', 'hands/u.gif', 'hands/f.gif', 'hands/w.gif', 'hands/a.gif',
    'rabbit/rabbit.gif', 'rabbit/rabbit1.gif', 'rabbit/rabbit3.gif',
    'rabbit/bighug.gif', 'rabbit/good.gif',

    // 结局相关(最晚用到)
    'image/医院.webp', 'image/医院报告.webp', 'image/医院报告2.webp', 'image/医院报告3.webp',
    'image/野餐2.webp', 'image/野餐3.webp',
    'audio/windows-10-bsod-sound.mp3', 'audio/windows-10-foreground-earrape.mp3',
];

// 兼容旧引用
window.LOCK_ASSETS_TO_LOAD = window.LOCK_ASSETS_TIER1.concat(window.LOCK_ASSETS_TIER2);
