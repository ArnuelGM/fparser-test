export const validateColection = (collection, launchError = true) => {
  if(!collection || collection && !Array.isArray(collection)) {
    if (launchError) throw new Error("No collection provided.");
    else return false;
  }
  return true;
}

export function get(obj, path) {
  // Convertir la ruta a un array si es una cadena
  if (typeof path === 'string') {
    // Manejar la notación de arrays en las rutas de cadena
    path = path.replace(/\[(\w+)\]/g, '.$1').split('.');
  }
  
  // Asegurarse de que la ruta es un array
  if (!Array.isArray(path)) {
    throw new Error('Path should be a string or an array');
  }

  // Recorrer la ruta para obtener el valor
  let result = obj;
  for (let key of path) {
    // Si el resultado es undefined en cualquier punto, salir del bucle
    if (result === undefined || result === null) {
      throw new Error(`${path} does not exists.`);
    }
    result = result[key];
  }

  // Si el resultado es undefined, devolver el valor por defecto
  return result === undefined ? defaultValue : result;
}

export function isNumber(number) {
  console.log(typeof number);
  if (isNaN(number)) return false;
  if (typeof number === "number") return true;
  else return false;
}

export function validateTerms (terms) {
  if (!Array.isArray(terms)) return false;
  if (terms.length < 1) return false;
  const validation = terms.every(isNumber);
  if (!validation) throw new Error("");
  return validation;
}

export const algebraicFunctions = [
  {
    name: "add",
    collection: "",
    description: "Return the result from adding two or more numbers.",
    example: "add(summand_1, summand_2, ...)",
    use: "add($$)",
    func: `(...terms) => {
      const result = terms.reduce((prev, curr) => prev + curr, 0);
      console.log("add", terms, "result: ", result);
      return result;
    }`,
  },
  {
    name: "sub",
    collection: "",
    description: "Return the result from substracting two numbers.",
    example: "add(minuend, sustraend)",
    use: "sub($$)",
    func: `(minuend, sustraend) => {
      const result = minuend - sustraend;
      console.log("sub", {minuend, sustraend}, "result: ", result);
      return result;
    }`,
  },
  {
    name: "mul",
    collection: "",
    description: "Return the product from multiplying two or more numbers.",
    example: "mul(multiplicand_1, multiplicand_2, ...)",
    use: "mul($$)",
    func: `(...terms) => {
      const result = terms.reduce((prev, curr) => prev * curr, 1);
      console.log("mul", terms, "result: ", result);
      return result;
    }`,
  },
  {
    name: "div",
    collection: "",
    description: "Return the result from dividing two numbers. To get the remainder result, see mod().",
    example: "div(dividend, divisor)",
    use: "div($$)",
    func: `(dividend, divisor) => {
      if(divisor === 0) throw new Error("Division by cero not supported.");
      const result = dividend / divisor;
      console.log("div", {dividend, divisor}, "result: ", result);
      return result;
    }`
  },
  {
    name: "mod",
    collection: "",
    description: "Return the remainder from dividing two numbers. To get the integer result, see div().",
    example: "mod(dividend, divisor)",
    use: "mod($$)",
    func: `(dividend, divisor) => {
      if(divisor === 0) throw new Error("Division by cero not supported.");
      return dividend % divisor;
    }`
  },
  {
    name: "percent",
    collection: "",
    description: "Returns the percentage of an amount.",
    example: "percent(<percentage>, <amount>)",
    use: "percent($$)",
    func: "(percent, amount) => (amount * percent) / 100",
  }
];

export const collectionFunctions = [
  {
    name: "first",
    collection: "collection",
    description: "Return the first item from a collection.",
    example: "collection.first(<collection>)",
    use: "collection.first($$)",
    func: `(collection) => validateColection(collection) && collection.at(0)`
  },
  {
    name: "last",
    collection: "collection",
    description: "Return the last item from a collection.",
    example: "collection.last(<collection>)",
    use: "collection.last($$)",
    func: `(collection) => validateColection(collection) && collection.at(-1)`
  },
  {
    name: "at",
    collection: "collection",
    description: "Return the item from a collection by index.",
    example: "collection.at(<collection>, position)",
    use: "collection.at($$)",
    func: `(collection, index) => validateColection(collection) && collection.at(index - 1)`
  },
  {
    name: "length",
    collection: "collection",
    description: "Return the number of items or chars in a collection or string.",
    example: "collection.length(<collection | string>)",
    use: "collection.length($$)",
    func: `(collection) => validateColection(collection, false) || typeof collection === "string" && collection.length`
  },
  {
    name: "contains",
    collection: "collection",
    description: "Check whether a collection has a specific item.",
    example: "collection.contains(<collection>, value)",
    use: "collection.contains($$)",
    func: `(collection, value) => validateColection(collection) && collection.indexOf(value) >= 0`
  },
  {
    name: "reverse",
    collection: "collection",
    description: "Reverse the order of items in an collection.",
    example: "collection.reverse(<collection>)",
    use: "collection.reverse($$)",
    func: `(collection) => validateColection(collection) && [...collection].reverse()`
  },
  {
    name: "join",
    collection: "collection",
    description: "Return a string that has all the items from an collection, separated by the specified character.",
    example: "collection.join(<collection>, delimiter)",
    use: "collection.join($$)",
    func: `(collection, delimiter) => validateColection(collection) && collection.join(delimiter)`
  },
  {
    name: "split",
    collection: "collection",
    description: "Return an collection that contains substrings, separated by commas, from a larger string based on a specified delimiter character in the original string.",
    example: "collection.split(<string>, <delimiter>)",
    use: "collection.split($$)",
    func: `(text, delimiter) => text.split(delimiter)`
  }
];

export const dateFunctions = [
  {
    name: "now",
    collection: "date",
    description: "Returns currentd date.",
    example: "date.now()",
    use: "date.now()$$",
    func: `() => new Date()`,
  },
  {
    name: "parse",
    collection: "date",
    description: "Parse a string to date.",
    example: 'date.parse(<date_string>)',
    use: "date.parse($$)",
    func: `(string) => new Date(string)`,
  },
  {
    name: "getYear",
    collection: "date",
    description: "Get the year number of date.",
    example: "date.getYear(<date | date_string>)",
    use: "date.getYear($$)",
    func: `(date) => new Date(date).getFullYear()`,
  },
  {
    name: "getMonth",
    collection: "date",
    description: "Get the month number of date. January is 0.",
    example: "date.getMonth(<date | date_string>)",
    use: "date.getMonth($$)",
    func: `(date) => new Date(date).getMonth()`,
  },
  {
    name: "getDay",
    collection: "date",
    description: "Return the day of the month.",
    example: "date.getDay(<date | date_string>)",
    use: "date.getDay($$)",
    func: `(date) => new Date(date).getDate()`,
  },
  {
    name: "getDayOfWeek",
    collection: "date",
    description: "Return the day of the week. Sunday is day 0.",
    example: "date.getDayOfWeek(<date | date_string>)",
    use: "date.getDayOfWeek($$)",
    func: `(date) => new Date(date).getDay()`,
  },
  {
    name: "getHour",
    collection: "date",
    description: "Get the hour of date.",
    example: "date.getHour(<date | date_string>)",
    use: "date.getHour($$)",
    func: `(date) => new Date(date).getHours()`,
  },
  {
    name: "getMinutes",
    collection: "date",
    description: "Get the minutes of date.",
    example: "date.getMinutes(<date | date_string>)",
    use: "date.getMinutes($$)",
    func: `(date) => new Date(date).getMinutes()`,
  },
  {
    name: "getSeconds",
    collection: "date",
    description: "Get the seconds of date.",
    example: "date.getSeconds(<date | date_string>)",
    use: "date.getSeconds($$)",
    func: `(date) => new Date(date).getSeconds()`,
  },
  {
    name: "toTimestamp",
    collection: "date",
    description: "Converts the date to timestamp.",
    example: "date.toTimestamp(<date | date_string>)",
    use: "date.toTimestamp($$)",
    func: `(date) => new Date(date).getTime()`,
  },
  {
    name: "fromTimestamp",
    collection: "date",
    description: "Converts the timestamp to date.",
    example: "date.fromTimestamp(<timestamp>)",
    use: "date.fromTimestamp($$)",
    func: `(timestamp) => new Date(timestamp)`,
  },
];

export const utilitiesFunctions = [
  {
    name: "json",
    collection: "util",
    description: "Converts a string into a json object.",
    example: "util.json(<string_value>)",
    use: "util.json($$)",
    func: `(value) => {
      try {
        return JSON.parse(value);
      }
      catch {
        throw new Error("JSON not valid.");
      }
    }`,
  },
  {
    name: "get",
    collection: "util",
    description: "Retrieve a property from a json object. You can use dot notation.",
    example: "util.get(<json_object>, <propperty>)",
    use: "util.get($$)",
    func: get,
  },
  {
    name: "if",
    collection: "util",
    description: "Check whether an expression is true or false. Based on the result, return a specified value. Parameters are evaluated from left to right.",
    example: "util.if(<expression>, <valueIfTrue>, <valueIfFalse>)",
    use: "util.if($$)",
    func: `(expression, ifTrue, ifFalse) => expression ? ifTrue : ifFalse`,
  },
  {
    name: "concat",
    collection: "util",
    description: "Combine two or more strings, and return the combined string.",
    example: "util.concat(<text1>, <text2>, ...)",
    use: "util.concat($$)",
    func: `(...strings) => strings.join("")`,
  },
  {
    name: "equal",
    collection: "util",
    description: "Compare if tow values are equal.",
    example: "util.equal(<value1>, <value2>)",
    use: "util.equal($$)",
    func: `(value1, value2) => value1 == value2`,
  },
  {
    name: "number",
    collection: "util",
    description: "Converts to number a string. Returns 0 if value can't be convert.",
    example: "util.number(<value1>)",
    use: "util.number($$)",
    func: `(value1) => Number(value1) || 0`,
  },
  {
    name: "string",
    collection: "util",
    description: "Returns the string version for a input value.",
    example: "util.string(<value1>)",
    use: "util.string($$)",
    func: `(value1) => String(value1)`,
  },
];

export function configFormulaFunctions(formula) {
  [
    algebraicFunctions,
    collectionFunctions,
    dateFunctions,
    utilitiesFunctions
  ].forEach(functions => {
    functions.forEach((op) => {
      if(op.collection.trim())
        (formula[op.collection] || (formula[op.collection] = {}))[op.name] = eval(op.func);
      else
        formula[op.name] = eval(op.func);
    })
  })
}