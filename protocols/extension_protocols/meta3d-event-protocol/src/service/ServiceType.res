type eventExtensionName = Meta3dType.Index.extensionName

type pointEventName = [
  | #meta3d_pointdown
  | #meta3d_pointup
  | #meta3d_pointtap
  | #meta3d_pointmove
  | #meta3d_pointscale
  | #meta3d_pointdragstart
  | #meta3d_pointdragover
  | #meta3d_pointdragdrop
]

type priority = int

type handleFunc = (. EventType.customEvent) => unit

type service = {
  trigger: 'eventData. (
    Meta3dType.Index.state,
    eventExtensionName,
    ActionContributeType.eventName,
    'eventData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  registerAction: 'eventData. (
    StateType.state,
    ActionContributeType.actionContribute<'eventData>,
  ) => StateType.state,
  onPointEvent: (eventExtensionName, (pointEventName, priority, handleFunc)) => unit,
  initEvent: (Meta3dType.Index.state, eventExtensionName) => Meta3dType.Index.state,
  setBrowser: (
    Meta3dType.Index.state,
    eventExtensionName,
    BrowserType.browser,
  ) => Meta3dType.Index.state,
  setCanvas: (
    Meta3dType.Index.state,
    eventExtensionName,
    Dom.htmlCanvasElement,
  ) => Meta3dType.Index.state,
  setBody: (
    Meta3dType.Index.state,
    eventExtensionName,
    Dom.htmlBodyElement,
  ) => Meta3dType.Index.state,
  getBrowserChromeType: unit => BrowserType.browser,
  getBrowserFirefoxType: unit => BrowserType.browser,
  getBrowserAndroidType: unit => BrowserType.browser,
  getBrowserIOSType: unit => BrowserType.browser,
  getBrowserUnknownType: unit => BrowserType.browser,
  getPointDownEventName: unit => pointEventName,
  getPointUpEventName: unit => pointEventName,
  getPointTapEventName: unit => pointEventName,
  getPointMoveEventName: unit => pointEventName,
  getPointScaleEventName: unit => pointEventName,
  getPointDragStartEventName: unit => pointEventName,
  getPointDragOverEventName: unit => pointEventName,
}
