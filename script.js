var currentTape = "";
var currentWord = "";
var currentTapePosition = 0;
var currentState = "idle";
var endState = "q14";
var initialState = "q0";
var lastState = "";

const states = {
  q0: {
    id: "q0",
    prevId: [],
    possibleNext: [{ nextState: "q1", pre: ["B"], action: "R", write: "_" }],
  },
  q1: {
    id: "q1",
    prevId: ["q0"],
    possibleNext: [
      { nextState: "q2", pre: "P", action: "R", write: "P" },
      { nextState: "q2", pre: "T", action: "R", write: "T" },
    ],
  },

  q2: {
    id: "q2",
    prevId: ["q1"],
    possibleNext: [{ nextState: "q3", pre: "B", action: "R", write: "_" }],
  },
  q3: {
    id: "q3",
    prevId: ["q2"],
    possibleNext: [
      { nextState: "q4", pre: "T", action: "R", write: "_" },
      { nextState: "q6", pre: "P", action: "R", write: "_" },
    ],
  },
  q4: {
    id: "q4",
    prevId: ["q4"],
    possibleNext: [
      { nextState: "q4", pre: "S", action: "R", write: "_" },
      { nextState: "q5", pre: "X", action: "R", write: "_" },
    ],
  },
  q5: {
    id: "q5",
    prevId: ["q4", "q7"],
    possibleNext: [
      { nextState: "q6", pre: "X", action: "R", write: "_" },
      { nextState: "q8", pre: "S", action: "R", write: "_" },
    ],
  },
  q6: {
    id: "q6",
    prevId: ["q3", "q5"],
    possibleNext: [
      { nextState: "q6", pre: "T", action: "R", write: "_" },
      { nextState: "q7", pre: "V", action: "R", write: "_" },
    ],
  },
  q7: {
    id: "q7",
    prevId: ["q6"],
    possibleNext: [
      { nextState: "q5", pre: "P", action: "R", write: "_" },
      { nextState: "q8", pre: "V", action: "R", write: "_" },
    ],
  },
  q8: {
    id: "q8",
    prevId: ["q5", "q7"],
    possibleNext: [{ nextState: "q9", pre: "E", action: "R", write: "_" }],
  },
  q9: {
    id: "q9",
    prevId: ["q8"],
    possibleNext: [
      { nextState: "q10", pre: "P", action: "R", write: "_" },
      { nextState: "q12", pre: "T", action: "R", write: "_" },
    ],
  },
  q10: {
    id: "q10",
    prevId: ["q9"],
    possibleNext: [{ nextState: "q11", pre: "E", action: "R", write: "__" }],
  },
  q11: {
    id: "q11",
    prevId: ["q10"],
    possibleNext: [
      { nextState: "q14", pre: "P", action: "R", write: "R" },
      { nextState: "q11", pre: "_", action: "L", write: "_" },
    ],
  },
  q12: {
    id: "q12",
    prevId: ["q9"],
    possibleNext: [{ nextState: "q13", pre: "E", action: "R", write: "__" }],
  },
  q13: {
    id: "q13",
    prevId: ["q12"],
    possibleNext: [
      { nextState: "q14", pre: "T", action: "R", write: "T" },
      { nextState: "q13", pre: "_", action: "L", write: "_" },
    ],
  },
  q14: {
    id: "q14",
    prevId: ["q11", "q13"],
    possibleNext: [],
  },
};

const createCorrectWord = () => {
  var current = "B";
  var possibleNextLeft = ["T", "P"];
  var next =
    possibleNextLeft[Math.floor(Math.random() * possibleNextLeft.length)];
  var prefix = current + next;
  var suffix = "";
  if (next === "T") {
    suffix = "TE";
  } else {
    suffix = "PE";
  }
  return prefix + createInner() + suffix;
};
const setTape = (value) => {
  document.getElementById("tape").innerHTML = "Tape: " + value;
};
const setTapeWithPos = (value, pos) => {
  var inner = "";
  var chars = value.split("");
  chars.forEach((element, i) => {
    if (i == pos) {
      inner += `<span class="selected">${element}</span>`;
    } else {
      inner += `<span>${element}</span>`;
    }
  });
  document.getElementById("tape").innerHTML = inner;
};

const makeViolet = (id) => {
  document.getElementById(id).style.fill = "#ab55cc";
};

const resetCircle = (id) => {
  document.getElementById(id).style.fill = "#ffe0f9";
};

const onValid = () => {
  var word = createCorrectWord();
  document.getElementById("insertWord").value = word;
  setTape(word);
};

/**
 * @param {string} word
 */
const playfn = async (word) => {
  currentWord = word;
  currentTape = word;
  const timeOut = 1 + document.getElementById("aRange").value * 1000;

  while (currentState != endState) {
    if (lastState != "") {
      resetCircle(lastState);
      resetRow(lastState);
    }
    setRow(currentState);
    makeViolet(currentState);
    await new Promise((r) => setTimeout(r, timeOut));

    let curChar = word.charAt(currentTapePosition);
    let foundState = false;
    for (let i = 0; i < states[currentState].possibleNext.length; i++) {
      let next = states[currentState].possibleNext.find(
        (x) => x.pre == curChar
      );
      if (!next) {
        throw new Error("No successor found");
      }
      for (let j = 0; j < next.pre.length; j++)
        if (next.pre[j] != curChar) {
          continue;
        }
      foundState = true;
      lastState = currentState;

      currentState = next.nextState;
      if (Array.isArray(next.write)) {
        var idx = next.pre.findIndex((x) => x == curChar);
        var toWrite = next.write[idx];
        word = word.replaceAt(currentTapePosition, toWrite);
      } else {
        word = word.replaceAt(currentTapePosition, next.write);
      }
      if (next.action == "R") {
        currentTapePosition++;
        setTapeWithPos(word, currentTapePosition);
        if (currentState == "q14") {
          resetCircle("q11");
          resetCircle("q13");
          resetRow();
          setRow("q14");
          makeViolet("q14");
        }
      } else {
        console.log(currentTapePosition);
        console.log(word.charAt(currentTapePosition));
        console.log(word);
        currentTapePosition--;
        setTapeWithPos(word, currentTapePosition);
      }
      break;
    }
    if (!foundState) {
      throw new Error();
    }
  }

  currentWord = "";
};
const setupButtonsForPlay = () => {
  disable("play");
  disable("help");
  disable("doku");
  disable("aRange");
  enable("reset");
};

const setupButtonsForReady = () => {
  enable("play");
  enable("help");
  enable("doku");
  enable("aRange");
  disable("reset");
};

const onInvalid = () =>
  (document.getElementById("insertWord").value = createCorrectWord()
    .replace("X", "T")
    .replace("V", "S"));
const onPlay = async () => {
  setupButtonsForPlay();
  currentState = initialState;
  if (document.getElementById("insertWord").value.length <= 0) {
    alert("Need an input");
    setupButtonsForReady();
    return;
  }
  await playfn(document.getElementById("insertWord").value);
  setupButtonsForReady();
};

const onForward = () => {};
const onInputchanged = (value) => {
  setTape(value);
  currentTape = value;
};
