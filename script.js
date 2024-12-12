const textAreaSchoolOption = document.getElementById("schoolOption");
const textAreaDiscountOption = document.getElementById("discountOption");
const textAreaCounterCharacter = document.getElementById("counterCharacter");
const textAreaCounterLine = document.getElementById("counterLine");

textAreaSchoolOption.innerHTML = "";
textAreaDiscountOption.innerHTML = "";

textAreaSchoolOption.addEventListener("keyup", counterRemainingCharacter);
textAreaDiscountOption.addEventListener("keyup", counterRemainingLine);

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
