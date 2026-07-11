// Service Worker: 让二刷/周目切换/弱网时资源直接走本地缓存
// 注意: 若同名替换了图片/音频/视频内容, 把下面版本号 +1, 玩家端才会重新下载
const CACHE_VERSION = 'ningning-v1';

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)));
        await self.clients.claim();
    })());
});

// 把缓存里的完整响应切成 206 分段响应(音频/视频元素常用 Range 请求)
async function rangeResponse(req, fullRes) {
    const buf = await fullRes.arrayBuffer();
    const m = /bytes=(\d+)-(\d*)/.exec(req.headers.get('range') || '');
    if (!m) return new Response(buf, { headers: { 'Content-Type': fullRes.headers.get('Content-Type') || '' } });
    const start = Number(m[1]);
    const end = m[2] ? Math.min(Number(m[2]), buf.byteLength - 1) : buf.byteLength - 1;
    return new Response(buf.slice(start, end + 1), {
        status: 206,
        statusText: 'Partial Content',
        headers: {
            'Content-Type': fullRes.headers.get('Content-Type') || '',
            'Content-Range': 'bytes ' + start + '-' + end + '/' + buf.byteLength,
            'Content-Length': String(end - start + 1),
            'Accept-Ranges': 'bytes',
        },
    });
}

// 媒体资源: 缓存优先 — 命中零网络请求; 未命中拉全量入缓存
async function handleMedia(req) {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(req.url);
    if (cached) {
        return req.headers.has('range') ? rangeResponse(req, cached) : cached;
    }
    if (req.headers.has('range')) {
        try {
            const full = await fetch(req.url);
            if (full.ok) {
                await cache.put(req.url, full.clone());
                return rangeResponse(req, full);
            }
        } catch (e) { /* 落到透传 */ }
        return fetch(req);
    }
    const res = await fetch(req);
    if (res.ok && res.type === 'basic') {
        cache.put(req.url, res.clone());
    }
    return res;
}

// 代码/页面: 网络优先(保证更新及时生效), 断网时回退缓存
async function handleCode(req) {
    try {
        const res = await fetch(req);
        if (res.ok && res.type === 'basic') {
            const cache = await caches.open(CACHE_VERSION);
            cache.put(req, res.clone());
        }
        return res;
    } catch (err) {
        const cached = await caches.match(req, { cacheName: CACHE_VERSION });
        if (cached) return cached;
        throw err;
    }
}

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;
    const path = url.pathname.toLowerCase();

    if (/\.(webp|png|jpe?g|gif|mp3|wav|mp4|woff2?|ico)$/.test(path)) {
        event.respondWith(handleMedia(req));
    } else if (req.mode === 'navigate' || /\.(html|js|css)$/.test(path)) {
        event.respondWith(handleCode(req));
    }
});
