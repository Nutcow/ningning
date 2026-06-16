import codecs
p = "js/pc/main.js"
c = codecs.open(p, "r", "utf-8").read()
o = "if (isZhoumu2 && localStorage.getItem('win10_creepy_spawned') === 'true') {"
n = "if (isZhoumu2 && !isZhoumu3 && localStorage.getItem('win10_creepy_spawned') === 'true') {"
c = c.replace(o, n)
codecs.open(p, "w", "utf-8").write(c)
