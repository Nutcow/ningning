import codecs
path = "tuzi.html"
c = codecs.open(path, "r", "utf-8").read()
old_html = """  <div id="win404">
    <div class="w-win">
      <div class="w-title"><span class="w-tname">forestchannel.tv — 找不到页面</span><span class="w-ctrls"><b>—</b><b>□</b><b class="w-x">✕</b></span></div>
      <div class="w-bar"><span class="w-nav">←</span><span class="w-nav dim">→</span><span class="w-nav">⟳</span><div class="w-url">forestchannel.tv/mr-rabbit/reel1.html</div></div>
      <div class="w-body">
        <div class="w-h">找不到此页面</div>
        <div class="w-p">你要找的内容 <b>「UNGWEW」</b> 已经不在这里了。
        <div class="w-code">HTTP ERROR 404 · FOREST_NOT_FOUND</div>
        <button class="w-btn" id="w404btn">返回</button>
      </div>
    </div></div>"""
new_html = """  <div id="win404">
    <div class="w-win" style="background:#000; color:#fff;">
      <div class="w-title" style="background:#000; color:#fff; border-bottom: none;"><span class="w-tname" style="color:#fff;"><svg width="14" height="14" viewBox="0 0 16 16" fill="white" style="margin-right:8px;vertical-align:text-bottom;"><path d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM4 4h2v2H4V4zm0 3h2v2H4V7zm0 3h2v2H4v-2zM12 12h-2v-2h2v2zm0-3h-2V7h2v2zm0-3h-2V4h2v2z"/></svg>电影和电视</span><span class="w-ctrls"><b style="color:#fff;">—</b><b style="color:#fff;">□</b><b class="w-x" style="color:#fff;">✕</b></span></div>
      <div class="w-body" style="padding: 0 15%; align-items: center; text-align: center; justify-content: center;">
        <div class="w-h" style="font-weight: normal; font-size: 3.5vmin;">无法播放</div>
        <div class="w-p" style="color: #ccc;">请确保你的电脑声卡和视频卡没有问题，并且安装了最新的驱动程序，然后重试。</div>
        <div class="w-code" style="color:#888; margin-top:1.5vmin;">0xc00d36fa</div>
        <button class="w-btn" id="w404btn" style="background:#333; border: 2px solid #555; align-self: center; margin-top: 5vmin;">关闭</button>
      </div>
    </div></div>"""
c = c.replace(old_html, new_html)
c = c.replace(old_html.replace("\n", "\r\n"), new_html.replace("\n", "\r\n"))
codecs.open(path, "w", "utf-8").write(c)
