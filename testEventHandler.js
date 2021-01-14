const eventHandlerMap = new Map();

window.mockOn = function (type, domNode, handler) {
  let typeHandlers = new Map();
  if (eventHandlerMap.has(type)) {
    typeHandlers = eventHandlerMap.get(type);
  } else {
    eventHandlerMap.set(type, typeHandlers);
  }

  let domNodeHandlers = typeHandlers.get(domNode) || [];
  domNodeHandlers.push({
    handler
  });
  typeHandlers.set(domNode, domNodeHandlers);
}

window.mockOnce = function (type, domNode, handler) {
  let typeHandlers = new Map();
  if (eventHandlerMap.has(type)) {
    typeHandlers = eventHandlerMap.get(type);
  } else {
    eventHandlerMap.set(type, typeHandlers);
  }

  let domNodeHandlers = typeHandlers.get(domNode) || [];
  domNodeHandlers.push({
    handler,
    once: true,
    hasExecuted: false
  });
  typeHandlers.set(domNode, domNodeHandlers);
}

Element.prototype.mockClick = function (...args) {
  let el = this;
  if (eventHandlerMap.has('click')) {
    clickHandlers = eventHandlerMap.get('click');
    if (clickHandlers && clickHandlers.has(el)) {
      let elHandlers = clickHandlers.get(el);
      if (elHandlers && elHandlers.length > 0) {
        elHandlers.forEach((handlerObj) => {
          if (handlerObj.once) {
            if (!handlerObj.hasExecuted) {
              handlerObj.handler.call(el, ...args);
              handlerObj.hasExecuted = true;
            }
          } else {
            handlerObj.handler.call(el, ...args);
          }
        })
      }
    }
  }
}