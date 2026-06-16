import codecs
path = "tuzi.html"
c = codecs.open(path, "r", "utf-8").read()
old_html = """  <div id="win404">\n    <div class="w-win" style="background:#000; color:#fff;">\n      <div class="w-title" style="background:#000; color:#fff; border-bottom: none;"><span class="w-tname" style="color:#fff;"><svg width="14" height="14" viewBox="0 0 16 16" fill="white" style="margin-right:8px;vertical-align:text-bottom;"><path d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM4 4h2v2H4V4zm0 3h2v2H4V7zm0 3h2v2H4v-2zM12 12h-2v-2h2v2zm0-3h-2V7h2v2zm0-3h-2V4h2v2z"/></svg>电影和电视</span><span class="w-ctrls"><b style="color:#fff;">—</b><b style="color:#fff;">□</b><b class="w-x" style="color:#fff;">✕</b></span></div>\n      <div class="w-body" style="padding: 0 15%; align-items: center; text-align: center; justify-content: center;">"""
new_html = """  <div id="win404">\n    <div class="w-win" style="background:#000; color:#fff;">\n      <div class="w-body" style="padding: 0 15%; align-items: center; text-align: center; justify-content: center;">"""
c = c.replace(old_html.replace("\n", "\r\n"), new_html.replace("\n", "\r\n"))
c = c.replace(old_html, new_html)
codecs.open(path, "w", "utf-8").write(c)
