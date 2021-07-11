const createInner = () => {
  var word = "";
  var currentState = "q0";
  while (currentState != "q7") {
    if (currentState == "q0") {
      currentState = "q1";
      word += "B";
      continue;
    }
    if (currentState == "q1") {
      var possiblenext = ["T", "P"];
      var next = possiblenext[Math.floor(Math.random() * possiblenext.length)];
      word += next;
      if (next == "T") {
        currentState = "q2";
        continue;
      } else {
        currentState = "q3";
        continue;
      }
    }
    if (currentState == "q2") {
      var possiblenext = ["S", "X"];
      var next = possiblenext[Math.floor(Math.random() * possiblenext.length)];
      word += next;
      if (next == "S") {
        currentState = "q2";
        continue;
      } else {
        currentState = "q5";
        continue;
      }
    }
    if (currentState == "q3") {
      var possiblenext = ["T", "V"];
      var next = possiblenext[Math.floor(Math.random() * possiblenext.length)];
      word += next;
      if (next == "T") {
        currentState = "q3";
        continue;
      } else {
        currentState = "q4";
        continue;
      }
    }
    if (currentState == "q4") {
      var possiblenext = ["P", "V"];
      var next = possiblenext[Math.floor(Math.random() * possiblenext.length)];
      word += next;
      if (next == "P") {
        currentState = "q5";
        continue;
      } else {
        currentState = "q6";
        continue;
      }
    }
    if (currentState == "q5") {
      var possiblenext = ["X", "S"];
      var next = possiblenext[Math.floor(Math.random() * possiblenext.length)];
      word += next;
      if (next == "X") {
        currentState = "q3";
        continue;
      } else {
        currentState = "q6";
        continue;
      }
    }
    if (currentState == "q6") {
      word += "E";
      currentState = "q7";
    }
  }
  currentState = null;
  return word;
};
