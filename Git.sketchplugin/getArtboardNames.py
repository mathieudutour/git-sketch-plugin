import json
import sys
import re

obj = json.load(sys.stdin)

ignore = map(re.compile, filter(None, sys.argv[1].split(",")))

for page in obj["pages"]:
    for artboard in page["artboards"]:
        # For Unicode error
        pageName = page["name"].encode("utf-8")
        artboardName = artboard["name"].encode("utf-8")

        name = pageName + "/" + artboardName
        if len(ignore) == 0 or all(regex.match(name) == None for regex in ignore):
            print(artboardName)
