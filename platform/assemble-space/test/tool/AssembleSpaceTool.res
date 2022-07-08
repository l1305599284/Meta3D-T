// let hook = (
//   ~sandbox,
//   ~service=ServiceTool.build(~sandbox, ()),
//   ~selectedExtensionsFromShop=list{},
//   (),
// ) => {
//   AssembleSpace.Method.hook(service, selectedExtensionsFromShop)
// }

// let render = AssembleSpace.Method.render

let buildAssembleSpace = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedExtensionsFromShop=list{},
  (),
) => {
  <AssembleSpace service selectedExtensionsFromShop />
}

let buildProtocol = (
  ~name,
  ~iconBase64,
  ~version="0.0.1",
  (),
): FrontendUtils.BackendCloudbaseType.protocol => {
  {
    name: "a",
    version: "0.0.1",
    iconBase64: "i1",
  }
}

let buildExtensionPackageData = (
  ~name="p1",
  ~protocol={
    name: "p1",
    version: "0.0.1",
  }: Meta3d.ExtensionFileType.extensionProtocolData,
  ~dependentExtensionNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
): Meta3d.ExtensionFileType.extensionPackageData => {
  {
    name: name,
    protocol: protocol,
    dependentExtensionNameMap: dependentExtensionNameMap,
    dependentContributeNameMap: dependentContributeNameMap,
  }
}

let buildSelectedExtension = (
  ~protocolName,
  ~protocolVersion,
  ~extensionFuncData=Js.Typed_array.Uint8Array.make([]),
  ~id="e1",
  (),
): FrontendUtils.AssembleSpaceType.extension => {
  {
    id: id,
    data: {
      extensionPackageData: buildExtensionPackageData(
        ~protocol={
          name: protocolName,
          version: protocolVersion,
        },
        (),
      ),
      extensionFuncData: extensionFuncData,
    },
  }
}