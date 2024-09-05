import {
  algebraicFunctions,
  collectionFunctions,
  dateFunctions,
  utilitiesFunctions,
} from "./configFormulaFunctions.js";

const $ = selector => document.querySelector(selector);
const $formula = $("#formula");
const $lists = $("#lists");

const functions = [
  { name: "Algebraic Functions", data: algebraicFunctions },
  { name: "Collections Functions", data: collectionFunctions },
  { name: "Date Functions", data: dateFunctions },
  { name: "Utilities Functions", data: utilitiesFunctions },
];

functions.forEach(({name, data}) => createListFunction(name, data));

function createListFunction(name, data) {

  const $ul = document.createElement("ul");
  $ul.innerHTML = `<li>${name}</li>`;

  data.forEach((operation) => {
    $ul.appendChild(createLi(operation));
  });

  $lists.appendChild($ul);
}

function createLi({name, description, use, example}) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <label>${name}: <span>${example.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</span></label>
    <p>${description}</p>
  `;
  $li.addEventListener("click", (ev) => {
    ev.preventDefault();
    selectFunction(use);
  })
  return $li;
}

function selectFunction(functionUse) {

  const { selectionStart, selectionEnd } = $formula;

  console.debug("🚀🚀🚀 -------------------------------------------------------------------------------------🚀🚀🚀");
  console.log("🚀🚀🚀 ~ selectFunction ~ selectionStart, selectionEnd:", selectionStart, selectionEnd);
  console.debug("🚀🚀🚀 -------------------------------------------------------------------------------------🚀🚀🚀");

  const currentValue = $formula.value;
  const firstPart = currentValue.slice(0, $formula.selectionStart);
  const secondPart = currentValue.slice($formula.selectionStart, currentValue.length);
  
  const newValue = `${firstPart}${functionUse}${secondPart}`;
  const indexOf = newValue.indexOf("$$");

  $formula.value = newValue.replace("$$", "");
  $formula.selectionStart = indexOf;
  $formula.selectionEnd = indexOf;
  $formula.focus();
}


