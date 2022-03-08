let createState = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    StateType.state,
    Meta3dComponentTransformProtocol.Index.state,
    StateType.config,
    StateType.gameObject,
    Meta3dComponentTransformProtocol.Index.transform,
  >,
  ~isDebug=false,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
  })
}
