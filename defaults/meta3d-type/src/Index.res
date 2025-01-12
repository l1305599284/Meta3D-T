type extensionService

type extensionState

type contribute

type extensionName = string

type contributeName = string

type extensionProtocolName = string

type contributeProtocolName = string

type uiControlName = string

type getContributeFuncResult

// type config

type extensionLifeHandlerData

type canvasData = {
  width: int,
  height: int,
}

type configData

type startConfigData = (canvasData, configData)

type rec extensionLifeEventHandler<'extensionService> = (state, 'extensionService) => state
and extensionLifeAsyncEventHandler<'extensionService> = (
  state,
  'extensionService,
  extensionLifeHandlerData,
) => Js.Promise.t<state>
and extensionLife<'extensionService> = {
  onRegister: Js.Nullable.t<extensionLifeEventHandler<'extensionService>>,
  onStart: Js.Nullable.t<(state, 'extensionService, startConfigData) => unit>,
  onInit: Js.Nullable.t<extensionLifeAsyncEventHandler<'extensionService>>,
  onUpdate: Js.Nullable.t<extensionLifeAsyncEventHandler<'extensionService>>,
}
and state = {
  extensionServiceMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    extensionProtocolName,
    extensionService,
  >,
  extensionStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    extensionProtocolName,
    extensionState,
  >,
  extensionLifeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    extensionProtocolName,
    extensionLife<extensionService>,
  >,
  contributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    contributeProtocolName,
    (ContributeType.contributeType, contribute),
  >,
}

type api = {
  /* ! rank2 polymorphism */
  registerExtension: 'getExtensionServiceFunc 'getLifeFunc 'extensionState. (
    . state,
    extensionProtocolName,
    'getExtensionServiceFunc,
    'getLifeFunc,
    'extensionState,
  ) => state,
  getExtensionService: 'extensionService. (. state, extensionProtocolName) => 'extensionService,
  getExtensionState: 'extensionState. (. state, extensionProtocolName) => 'extensionState,
  setExtensionState: 'extensionState. (. state, extensionProtocolName, 'extensionState) => state,
  registerContribute: 'getContributeFunc. (
    . state,
    contributeProtocolName,
    'getContributeFunc,
  ) => state,
  // removeUIControlContribute: (. state, uiControlName) => state,
  getContribute: 'contribute. (. state, contributeProtocolName) => 'contribute,
  getAllContributesByType: 'contribute. (
    . state,
    ContributeType.contributeType,
  ) => array<'contribute>,
}

type getExtensionService<'extensionService> = api => 'extensionService

type createExtensionState<'extensionState> = unit => 'extensionState

type getContribute<'contribute> = // > = (api, 'config) => 'contribute
api => 'contribute

type getExtensionLife<'extensionService> = (
  api,
  extensionProtocolName,
) => extensionLife<'extensionService>
