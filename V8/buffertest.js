var LONG_STRING = "qwertyuiop";

for (var i = 0; i < 13; i++) LONG_STRING += LONG_STRING;

// force cons-string flattening outside of timed loop.
LONG_STRING.charCodeAt();

console.log("LONG_STRING is %s chars long", LONG_STRING.length);

function Str2BufferJS(s) {
  var length = s.length;
  var b = new Buffer(length);
  for (var i = 0; i < length; i++) b[i] = s.charCodeAt(i);
  return b;
}

function Str2BufferNative(s) {
  var length = s.length;
  var b = new Buffer(length);
  b.asciiWrite(s, 0);
  return b;
}

var N = 1000;

function LoopAndTime(name, f) {
 var start = Date.now();
 for (var i = 0; i < N; i++) f();
 var end = Date.now();
 console.log("%s took %s ms per %s calls", name, end - start, N);
}

LoopAndTime("Str2BufferNative", function() { Str2BufferNative(LONG_STRING); });
LoopAndTime("Str2BufferJS", function() { Str2BufferJS(LONG_STRING); })
