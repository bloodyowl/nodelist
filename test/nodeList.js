var tape = require("tape")
  , nodeList = require("../")

tape("nodeList", function(test){
  var list = nodeList.create()

  if(typeof {}.__proto__ == "object"){
    test.equal(list.__proto__ === Array.prototype, false, "__proto__ isn't Array.prototype")
  } else {
    test.equal(list instanceof Array, false, "Isn't a window Array")
  }
  test.equal(Object.prototype.toString.call(list), "[object Array]", "Is an array, though")

  list[0] = 1
  test.equal(list[0], 1, "Acts like an Array")
  test.equal(typeof list.push, "function", "Gets Array default's prototype")
  
  nodeList.prototype.foo = "bar"
  test.equal(list.foo, "bar", "Prototypal inheritance is preserved")
  list.length = 0
  test.equal("0" in list, false, "Can be emptied using .length = 0")

  delete nodeList.prototype.foo
  test.end()
})

tape("nodeList.$", function(test){
  document.body.appendChild(document.createElement("div"))
  test.equal(({}).isPrototypeOf.call(nodeList.prototype, nodeList.$()), true, "returns an instanceof nodeList")
  test.equal(nodeList.$("body")[0].nodeName, "BODY", "get elements by selector")
  test.equal(nodeList.$(document.getElementsByTagName("div"))[0].nodeName, "DIV", "converts proper nodelists")
  test.equal(nodeList.$(document.body)[0].nodeName, "BODY", "wraps elements passed in")
  test.equal(nodeList.$().length, 0, "create empty if no arguments")
  test.equal(nodeList.$(null).length, 0, "create empty if arg is null")
  test.end()
})
