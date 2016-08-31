import json
import sys
import re

obj = json.load(sys.stdin)

ignore = map(re.compile, filter(None, sys.argv[1].split(",")))

for page in obj["pages"]:
    for artboard in page["artboards"]:
        name = page["name"] + "/" + artboard["name"]
        if len(ignore) == 0 or all(regex.match(name) == None for regex in ignore):
            print artboard["name"]
