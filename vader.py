from vaderSentiment.vaderSentiment import sentiment as vaderSentiment 
import sys

for arg in sys.argv[1:]:
  print arg
  vs = vaderSentiment(arg)
  print "\n\t" + str(vs)
