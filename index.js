var docEl = document.documentElement
  , supportsProto = typeof {}.__proto__ == "object"
  , fragment = document.createDocumentFragment()
  , property = "_nodeList" + (+new Date())
  , nodeList = supportsProto ? [] : getExternalArray()
  , _hasOwnProperty = {}.hasOwnProperty
  , interface

function getExternalArray(){
  var frame = document.createElement("iframe")
    , proto, contextDoc
  frame.style.display = "none"
  docEl.insertBefore(frame, docEl.firstChild)
  contextDoc = frame.contentWindow.document
  contextDoc.write("<script>parent[\"" + property + "\"] = Array<\/script>")
  contextDoc.close()
  proto = window[property].prototype
  window[property] = null
  fragment.appendChild(frame)
  return proto
}

function create(){
  var array = nodeList.constructor.apply(null, arguments)
  if(supportsProto) {
    array.__proto__ = nodeList
  }
  return array
}

function $(selector, context){
  var collection = create()
    , index = -1, length
  
  if(!selector) {
    return collection
  }
  
  if(typeof selector == "string") {
    if(arguments.length < 2) {
      context = document
    }
    selector = interface.selector(context, selector)
  }

  if(selector.nodeType || selector == window && selector.window == selector) {
    selector = [selector]
  }
  
  if(typeof selector.length == "number") {
    if(_hasOwnProperty.call(selector, (length = selector.length) - 1)){
      while(++index < length) collection[index] = selector[index]
    }
  }
  
  return collection
}

function querySelectorAll(context, selector){
  return context.querySelectorAll ? context.querySelectorAll(selector) : []
}

interface = {
      prototype : nodeList
    , create : create
    , $ : $
    , selector : querySelectorAll
    , querySelectorAll : querySelectorAll
  }

module.exports = interface
