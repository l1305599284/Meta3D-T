'use strict';

var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");

function buildService(sandbox, initOpt, clearOpt, renderOpt, beforeExecOpt, afterExecOpt, setStyleOpt, beginWindowOpt, endWindowOpt, setNextWindowRectOpt, addFBOTextureOpt, getWindowBarHeightOpt, getContextOpt, buttonOpt, setCursorPosOpt, param) {
  var init = initOpt !== undefined ? initOpt : Sinon.createEmptyStub(sandbox.contents);
  var clear = clearOpt !== undefined ? clearOpt : Sinon.createEmptyStub(sandbox.contents);
  var render = renderOpt !== undefined ? renderOpt : Sinon.createEmptyStub(sandbox.contents);
  var beforeExec = beforeExecOpt !== undefined ? beforeExecOpt : Sinon.createEmptyStub(sandbox.contents);
  var afterExec = afterExecOpt !== undefined ? afterExecOpt : Sinon.createEmptyStub(sandbox.contents);
  var setStyle = setStyleOpt !== undefined ? setStyleOpt : Sinon.createEmptyStub(sandbox.contents);
  var beginWindow = beginWindowOpt !== undefined ? beginWindowOpt : Sinon.createEmptyStub(sandbox.contents);
  var endWindow = endWindowOpt !== undefined ? endWindowOpt : Sinon.createEmptyStub(sandbox.contents);
  var setNextWindowRect = setNextWindowRectOpt !== undefined ? setNextWindowRectOpt : Sinon.createEmptyStub(sandbox.contents);
  var addFBOTexture = addFBOTextureOpt !== undefined ? addFBOTextureOpt : Sinon.createEmptyStub(sandbox.contents);
  var getWindowBarHeight = getWindowBarHeightOpt !== undefined ? getWindowBarHeightOpt : Sinon.createEmptyStub(sandbox.contents);
  var getContext = getContextOpt !== undefined ? getContextOpt : Sinon.createEmptyStub(sandbox.contents);
  var button = buttonOpt !== undefined ? buttonOpt : Sinon.createEmptyStub(sandbox.contents);
  var setCursorPos = setCursorPosOpt !== undefined ? setCursorPosOpt : Sinon.createEmptyStub(sandbox.contents);
  return {
          init: init,
          render: render,
          setStyle: setStyle,
          beforeExec: beforeExec,
          afterExec: afterExec,
          clear: clear,
          beginWindow: beginWindow,
          endWindow: endWindow,
          setNextWindowRect: setNextWindowRect,
          addFBOTexture: addFBOTexture,
          getWindowBarHeight: getWindowBarHeight,
          button: button,
          setCursorPos: setCursorPos,
          getContext: getContext
        };
}

exports.buildService = buildService;
/* Sinon Not a pure module */
