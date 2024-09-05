import Formula from "https://cdn.jsdelivr.net/npm/fparser@3.1.0/+esm";
import {
  configFormulaFunctions,
 } from "./configFormulaFunctions.js";

let formula = new Formula();
configFormulaFunctions(formula);

const $ = selector => document.querySelector(selector);

const $formula = $("#formula");
const $result = $("#result");

export function evaluateFormula() {
  const variablesValues = getVariablesValues();
  console.log("🚀🚀🚀 ~ evaluateFormula ~ variablesValues:", variablesValues);
  tryEvaluate(variablesValues);
}

function getVariablesValues() {
  const form = new FormData($("#formVariables"));
  const variablesValues = Object.fromEntries(
    form.entries().map(([key, value]) => [key, Number(value) || value])
  );
  return variablesValues;
}

function setResult(result) {
  $result.innerHTML = result;
}

function tryEvaluate(variablesValues) {
  try {
    const result = formula.evaluate(variablesValues);
    setResult(`Result: ${result}`);
  }
  catch(error) {
    setResult(`!ERROR: ${error.message} || Formula: ${formula.getExpressionString()}`);
  }
}

$formula.addEventListener("input", formulaChanged);
$formula.addEventListener("change", formulaChanged);

function formulaChanged() {
  try {
    const formulaExpression = $formula.value;
    if (!formulaExpression.trim()) {
      setResult("");
      setVariablesInputVisibility(false);
      return;
    }

    formula.setFormula(formulaExpression);
    const variables = formula.getVariables().filter(variableName => Boolean(variableName.trim()));

    if(variables.length) {
      createInputVariables(variables);
    }
    else {
      tryEvaluate();
    }
  }
  catch(error) {
    createInputVariables([]);
  }
}

function setVariablesInputVisibility(visibility) {
  if(visibility) {
    $(".variables").style.display = "block";
  }else {
    $(".variables").style.display = "none";
  }
}

function createInputVariables(variables) {
  if (!variables.length) {
    setVariablesInputVisibility(false);
    return;
  }

  $("#variablesInput").innerHTML = "";
  for (const variableName of variables) {
    if (!variableName.trim()) continue;
    $("#variablesInput").innerHTML += `
      <div style="margin-bottom: .5rem;">
        <label>
          <input type="text" name="${variableName}" oninput="evaluateFormula()" placeholder="${variableName}"/>
        </label>
      </div>
    `;
  }
  $(".variables").style.display = "block";
}
