import sys
import subprocess
p = subprocess.Popen('youtube-dl -f "(mp4)[height<720][protocol=https]" --get-url https://www.youtube.com/watch?v='+sys.argv[1], shell=True, stdout=subprocess.PIPE,stderr=subprocess.PIPE)
out, err = p.communicate()
if out:
    print out
else:
    print err
