//var lingo = require('lingo.js');

function countSyllables(word) {
  word = word.toLowerCase();
  if(word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  return word.match(/[aeiouy]{1,2}/g).length;
};

var lingoUse = function(word) {
  return (lingo.indexOf(word) > -1 ? true : false);
  //Level of freshness
  //Level of originality(use %)
  //Retrieve data from urbanxxx 
};

function readability(metrics) {
  var results = {
    fleshKincaid: 0,
    gunningFog: 0,
    colemanLiau: 0,
    SMOG: 0,
    ARI: 0
  };

  results.fleshKincaid = 0.39 * (metrics.words / metrics.sentences) + 11.8 * (metrics.syllables / metrics.words) - 15.69;
  results.gunningFog = 0.4 * ((metrics.words / metrics.sentences) + 100 * (metrics.polySyllables / metrics.words));
  //Need review
  results.colemanLiau = 0.0588 * (100 * metrics.letters / metrics.words) - 0.296 * (100 * metrics.sentences / metrics.words) - 15.8
  results.SMOG = 1.0430 * Math.sqrt(metrics.polySyllables * 30 / metrics.sentences) + 3.1291;
  results.ARI = 4.71 * (metrics.letters / metrics.words) + 0.5 * (metrics.words / metrics.sentences) - 21.43;
  return results;
};

function readAge(metrics) {
  var age = 0;
  
  for (i in metrics) {
    age += metrics[i];
  };
  return (Math.round(age / Object.keys(metrics).length + 5));
};

var analyzeComplexity = function(text) {
  var metrics = {
    words: 0,
    syllables: 0,
    polySyllables: 0,
    sentences: 0,
    complexWords: 0,
    letters: 0
  };

  text.replace(/([ .,;]+)/g,'$1§sep§').split('§sep§').forEach(function(el) {
    metrics.words++;
    currentSy = countSyllables(el);
    if (currentSy >= 3)
      metrics.polySyllables++;
    metrics.syllables += currentSy;
  });
  metrics.letters = text.replace(/[^A-Z]/gi, "").length
  metrics.sentences = text.split('.').length;
  console.log(metrics);
  var readScore = readability(metrics);
  console.log(readAge(readScore));
};

analyzeComplexity(process.argv[2]);
