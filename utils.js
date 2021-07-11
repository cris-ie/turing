String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

const enable = (id) => {
  document.getElementById(id).disabled = false;
};
const disable = (id) => {
  document.getElementById(id).disabled = true;
};

const resetRow = () => {
  var rows = document.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    var item = rows.item(i);
    item.classList.remove("selected");
  }
};

const setRow = (r) => {
  var rows = document.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    var item = rows.item(i);
    if (item.id == "r" + r) item.classList.add("selected");
  }
};

async function onHelp() {
  introJs()
    .setOptions({
      steps: [
        {
          intro:
            "Diese Applikation validiert Reberwörter mit Hilfe einer Turing Maschine",
        },
        {
          element: document.querySelector("#insertWord"),
          intro: "Hier kann ein Wort eingegeben werden",
        },
        {
          element: document.querySelector("#correctWord"),
          intro: "Hier kann ein korrektes Wort generiert werden",
        },
        {
          element: document.querySelector("#incorrectWord"),
          intro: "Hier kann ein inkorrektes Wort generiert werden",
        },
        {
          element: document.querySelector("#tape"),
          intro: "Aktueller Zustand des Bandes",
        },
        {
          element: document.querySelector("#graph"),
          intro: "Ausführungsgraph der Turing Maschine",
        },
        {
          element: document.querySelector("#table"),
          intro: "Überführungs Regeln der Turing Machine",
        },
        {
          element: document.querySelector("#play"),
          intro: "Startet die automatische Simulation",
        },
        {
          element: document.querySelector("#reset"),
          intro: "Zurücksetzen der Anwendung",
        },
        {
          element: document.querySelector("#forward"),
          intro: "Startet die schrittweise Ausführung der Simulation",
        },
        {
          element: document.querySelector("#help"),
          intro: "Öffnet diese Hilfe",
        },
        {
          element: document.querySelector("#doku"),
          intro: "Öffnet die Dokumentation",
        },
        {
          element: document.querySelector("#aRange"),
          intro: "Regelt die Geschwindikeit der Simultation",
        },
      ],
    })
    .start();
}
