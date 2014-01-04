# nodelist

[![browser support](https://ci.testling.com/bloodyowl/nodelist.png)](https://ci.testling.com/bloodyowl/nodelist)

## Install

```
$ npm install bloody-nodelist
```

## Require

```javascript
var nodeList = require("bloody-nodeList")
```

## Definition 

NodeList is basically a "subclassed array" (or looks like it, depending on the implementation). 
It lets you get a class especially for your nodeLists, on top of which you can implement your own methods. 
NodeList gives you the keys for a simple, syntax friendly, custom implementation. 

## How to

```javascript
var nodeList = require("bloody-nodeList")
  , myNodeList = nodeList.create(document.body)

nodeList.prototype.getNodeName = function(){
  var element = this[0]
  if(!element) return null
  return element.nodeName.toUpperCase()
}

myNodeList.getNodeName() // "BODY"

Array.prototype.getNodeName // undefined
```

## Methods

#### `nodeList.create([any])` -> `list`

Creates a nodeList, arguments act like the `Array` constructor's ones. 

#### `nodeList.$()`

Builds a nodeList with the given arguments. 
Uses `nodeList.selector` for DOM requests, `nodeList.querySelectorAll` per default. This can be changed with `nodeList.selector = function(context, selector){ /* -> array */ }` (with this order for arguments). 

Arguments can be as follow : 

```javascript
nodeList.$(node) 
nodeList.$(selector)
nodeList.$(selector, context)
nodeList.$(array)
nodeList.$(window)
nodeList.$(nodeList)
```

## Properties

#### `nodeList.prototype`

Prototype shared accros nodeLists. 
