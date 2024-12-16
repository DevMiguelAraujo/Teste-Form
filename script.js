const textAreaSchoolOption = document.getElementById("schoolOption");
const textAreaDiscountOption = document.getElementById("discountOption");
const textAreaCounterCharacter = document.getElementById("counterCharacter");
const textAreaCounterLine = document.getElementById("counterLine");
const accordionButtons = Array.from(
  document.querySelectorAll(".accordion-button")
);
const selectButtons = Array.from(document.querySelectorAll("select"));
const textAreas = Array.from(document.querySelectorAll("textarea"));
const inputs = Array.from(document.querySelectorAll("input"));
const saveButton = document.querySelector(".save");
const inputsfile = Array.from(document.querySelectorAll(".inputsFile input"));
const nameInputsfile = Array.from(document.querySelectorAll(".fileUpdated"));

inputsfile.forEach((i) => i.addEventListener("change", saveAnswer));

function getLocalStorage(localStorage) {
  for (const property in localStorage) {
    if (property === "yn") {
      document.getElementById(localStorage[property]).click();
      return;
    }
    document.getElementById(property).value = localStorage[property];
  }
}

function saveAnswer() {
  inputs.map((item) => {
    if (
      item.value !== "" &&
      item.id !== "yes" &&
      item.id !== "no" &&
      item.id !== "fileRent" &&
      item.id !== "fileDeclarations" &&
      item.id !== "fileID"
    ) {
      localStorage.setItem(item.id, item.value);
    }
  });
  selectButtons.map((item) => {
    localStorage.setItem(item.id, item.value);
  });
  const radioButtons = document.querySelector('input[name="yn"]:checked');
  if (radioButtons.value !== "null") {
    localStorage.setItem("yn", radioButtons.value);
  }
  textAreas.forEach((text) => {
    localStorage.setItem(text.id, text.value);
  });
  nameInputsfile.forEach(
    (element) => (element.innerHTML = element.previousElementSibling.value)
  );
}

function toggleAccordion(button) {
  button.target.nextElementSibling.classList.toggle("close");
  button.target.classList.toggle("ativo");
  saveAnswer();
}

function counterRemainingCharacter() {
  const limit = 600;
  const textAnswerLength = textAreaSchoolOption.value.length;
  textAreaCounterCharacter.innerHTML =
    "Caracteres restantes: " + (limit - textAnswerLength);
}

function counterRemainingLine() {
  const limit = 20;
  const textAnswer = textAreaDiscountOption.value;
  remainingLines = limit - textAnswer.split(/\r\n|\r|\n/).length;

  if (remainingLines >= 0) {
    textAreaCounterLine.style.color = "black";
    textAreaCounterLine.innerHTML = "Linhas restantes: " + remainingLines;
  } else {
    textAreaCounterLine.style.color = "red";
    textAreaCounterLine.innerHTML = "Excedeu o limite de linhas!";
  }
}

function zipFiles() {
  var filesInput = document.getElementById("fileInput");
  var files = filesInput.files;
  var zip = new JSZip();

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    zip.file(file.name, file);
  }

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "files.zip");
  });
}

textAreaSchoolOption.innerHTML = "";
textAreaDiscountOption.innerHTML = "";

textAreaSchoolOption.addEventListener("keyup", counterRemainingCharacter);
textAreaDiscountOption.addEventListener("keyup", counterRemainingLine);
saveButton.addEventListener("click", saveAnswer);

accordionButtons.forEach((button) => {
  button.addEventListener("click", toggleAccordion);
});

getLocalStorage({ ...localStorage });
