

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_obj from "../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/PromiseSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function hide(state, elementName) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, elementName, false),
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          reducers: state.reducers
        };
}

function show(state, elementName) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, elementName, true),
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          reducers: state.reducers
        };
}

function _markStateChange(state, elementName) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, elementName, true),
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          reducers: state.reducers
        };
}

function _markStateNotChange(state, elementName) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, elementName, false),
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          reducers: state.reducers
        };
}

function _markAllStateNotChange(state, needMarkStateNotChangeIds) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(needMarkStateNotChangeIds, _markStateNotChange, state);
}

function _getElementStateExn(param, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(param.elementStateMap, elementName);
}

function getElementState(param, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(param.elementStateMap, elementName);
}

function _setElementState(state, elementName, elementState) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.elementStateMap, elementName, elementState),
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          reducers: state.reducers
        };
}

function _getElementExecOrderExn(state, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.elementExecOrderMap, elementName);
}

function _setElementExecOrder(state, elementName, execOrder) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: ImmutableHashMap$Meta3dCommonlib.set(state.elementExecOrderMap, elementName, execOrder),
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          reducers: state.reducers
        };
}

var _updateElementField = (function(
elementState, 
updatedElementStateFieldName,
updateElementStateFieldFunc
){
  var newElementState = Object.assign({}, elementState)

 newElementState[updatedElementStateFieldName] = updateElementStateFieldFunc(newElementState[updatedElementStateFieldName])

  return newElementState
});

function dispatch(state, actionName, role, updateElementStateFieldFunc) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(state.reducers, (function (state, param) {
                var reducers = param[1];
                if (reducers.role !== role) {
                  return state;
                }
                var elementName = param[0];
                var oldElementState = _getElementStateExn(state, elementName);
                var newElementState = ArraySt$Meta3dCommonlib.reduceOneParam(ArraySt$Meta3dCommonlib.filter(reducers.handlers, (function (handler) {
                            return handler.actionName === actionName;
                          })), (function (elementState, param) {
                        return _updateElementField(elementState, param.updatedElementStateFieldName, updateElementStateFieldFunc);
                      }), oldElementState);
                if (Caml_obj.caml_notequal(oldElementState, newElementState)) {
                  return _setElementState(_markStateChange(state, elementName), elementName, newElementState);
                } else {
                  return _markStateNotChange(state, elementName);
                }
              }), state);
}

function _exec(meta3dState, state) {
  var elementFuncMap = state.elementFuncMap;
  var __x = ImmutableHashMap$Meta3dCommonlib.entries(state.isShowMap);
  return ArraySt$Meta3dCommonlib.traverseReducePromiseM(__x.sort(function (param, param$1) {
                  return ImmutableHashMap$Meta3dCommonlib.getExn(state.elementExecOrderMap, param[0]) - ImmutableHashMap$Meta3dCommonlib.getExn(state.elementExecOrderMap, param$1[0]) | 0;
                }), (function (param, param$1) {
                var needMarkStateNotChangeIds = param[1];
                var meta3dState = param[0];
                if (!param$1[1]) {
                  return Promise.resolve([
                              meta3dState,
                              needMarkStateNotChangeIds
                            ]);
                }
                var elementName = param$1[0];
                var elementFunc = ImmutableHashMap$Meta3dCommonlib.getExn(elementFuncMap, elementName);
                return PromiseSt$Meta3dCommonlib.map(elementFunc(meta3dState, _getElementStateExn(state, elementName)), (function (meta3dState) {
                              return [
                                      meta3dState,
                                      ArraySt$Meta3dCommonlib.push(needMarkStateNotChangeIds, elementName)
                                    ];
                            }));
              }), [
              meta3dState,
              []
            ]);
}

function _invokeIMGUIRenderFunc(meta3dState, invokeFunc, param) {
  var imguiRendererExtensionName = param[1];
  var api = param[0];
  var imguiRendererState = api.getExtensionState(meta3dState, imguiRendererExtensionName);
  var imguiRendererService = api.getExtensionService(meta3dState, imguiRendererExtensionName);
  var imguiRendererState$1 = Curry._2(invokeFunc, imguiRendererState, imguiRendererService);
  return api.setExtensionState(meta3dState, imguiRendererExtensionName, imguiRendererState$1);
}

function _invokeIMGUIRenderFuncWithParam(meta3dState, invokeFunc, param) {
  var imguiRendererExtensionName = param[1];
  var api = param[0];
  var imguiRendererState = api.getExtensionState(meta3dState, imguiRendererExtensionName);
  var imguiRendererService = api.getExtensionService(meta3dState, imguiRendererExtensionName);
  var match = Curry._2(invokeFunc, imguiRendererState, imguiRendererService);
  var meta3dState$1 = api.setExtensionState(meta3dState, imguiRendererExtensionName, match[0]);
  return [
          meta3dState$1,
          match[1]
        ];
}

function render(api, meta3dState, param, time) {
  var imguiRendererExtensionName = param[1];
  var uiExtensionName = param[0];
  var state = api.getExtensionState(meta3dState, uiExtensionName);
  var meta3dState$1 = api.setExtensionState(meta3dState, uiExtensionName, state);
  var meta3dState$2 = _invokeIMGUIRenderFunc(meta3dState$1, (function (imguiRendererState, imguiRendererService) {
          return imguiRendererService.beforeExec(imguiRendererState, time);
        }), [
        api,
        imguiRendererExtensionName
      ]);
  return PromiseSt$Meta3dCommonlib.map(PromiseSt$Meta3dCommonlib.map(_exec(meta3dState$2, state), (function (param) {
                    var meta3dState = param[0];
                    var state = api.getExtensionState(meta3dState, uiExtensionName);
                    var state$1 = _markAllStateNotChange(state, param[1]);
                    return api.setExtensionState(meta3dState, uiExtensionName, state$1);
                  })), (function (meta3dState) {
                return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                              var __x = imguiRendererService.afterExec(imguiRendererState);
                              return imguiRendererService.render(__x);
                            }), [
                            api,
                            imguiRendererExtensionName
                          ]);
              }));
}

function _setElementFunc(state, elementName, elementFunc) {
  return {
          elementFuncMap: ImmutableHashMap$Meta3dCommonlib.set(state.elementFuncMap, elementName, elementFunc),
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          reducers: state.reducers
        };
}

function _addReducers(state, elementName, reducers) {
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(reducers, (function (reducers) {
                    return {
                            elementFuncMap: state.elementFuncMap,
                            elementStateMap: state.elementStateMap,
                            elementExecOrderMap: state.elementExecOrderMap,
                            isShowMap: state.isShowMap,
                            isStateChangeMap: state.isStateChangeMap,
                            skinContributeMap: state.skinContributeMap,
                            uiControlContributeMap: state.uiControlContributeMap,
                            reducers: ArraySt$Meta3dCommonlib.push(state.reducers, [
                                  elementName,
                                  reducers
                                ])
                          };
                  })), state);
}

function registerElement(state, param) {
  var elementName = param.elementName;
  return _markStateChange(show(_addReducers(_setElementExecOrder(_setElementState(_setElementFunc(state, elementName, param.elementFunc), elementName, param.elementState), elementName, param.execOrder), elementName, param.reducers), elementName), elementName);
}

function registerSkin(state, skinContribute) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.skinContributeMap, skinContribute.skinName, skinContribute),
          uiControlContributeMap: state.uiControlContributeMap,
          reducers: state.reducers
        };
}

function registerUIControl(state, uiControlContribute) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.uiControlContributeMap, uiControlContribute.uiControlName, uiControlContribute),
          reducers: state.reducers
        };
}

function getSkin(state, skinName) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(state.skinContributeMap, skinName);
}

function getUIControlExn(state, uiControlName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.uiControlContributeMap, uiControlName).func;
}

function isStateChange(state, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.isStateChangeMap, elementName);
}

function setStyle(meta3dState, data, style) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return imguiRendererService.setStyle(style, imguiRendererState);
              }), data);
}

function beginWindow(meta3dState, data, label) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return imguiRendererService.beginWindow(label, imguiRendererState);
              }), data);
}

function endWindow(meta3dState, data) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return imguiRendererService.endWindow(imguiRendererState);
              }), data);
}

function setNextWindowRect(meta3dState, data, rect) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return imguiRendererService.setNextWindowRect(rect, imguiRendererState);
              }), data);
}

function button(meta3dState, data, label, size) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return imguiRendererService.button(label, size, imguiRendererState);
              }), data);
}

function setCursorPos(meta3dState, data, pos) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return imguiRendererService.setCursorPos(pos, imguiRendererState);
              }), data);
}

function init(meta3dState, param, isInitEvent, isDebug, canvas) {
  var imguiRendererExtensionName = param[1];
  var api = param[0];
  var imguiRendererState = api.getExtensionState(meta3dState, imguiRendererExtensionName);
  var imguiRendererService = api.getExtensionService(meta3dState, imguiRendererExtensionName);
  return PromiseSt$Meta3dCommonlib.map(imguiRendererService.init(imguiRendererState, isInitEvent, isDebug, canvas), (function (imguiRendererState) {
                return api.setExtensionState(meta3dState, imguiRendererExtensionName, imguiRendererState);
              }));
}

function clear(meta3dState, data, clearColor) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return imguiRendererService.clear(imguiRendererState, clearColor);
              }), data);
}

export {
  hide ,
  show ,
  _markStateChange ,
  _markStateNotChange ,
  _markAllStateNotChange ,
  _getElementStateExn ,
  getElementState ,
  _setElementState ,
  _getElementExecOrderExn ,
  _setElementExecOrder ,
  _updateElementField ,
  dispatch ,
  _exec ,
  _invokeIMGUIRenderFunc ,
  _invokeIMGUIRenderFuncWithParam ,
  render ,
  _setElementFunc ,
  _addReducers ,
  registerElement ,
  registerSkin ,
  registerUIControl ,
  getSkin ,
  getUIControlExn ,
  isStateChange ,
  setStyle ,
  beginWindow ,
  endWindow ,
  setNextWindowRect ,
  button ,
  setCursorPos ,
  init ,
  clear ,
  
}
/* No side effect */
