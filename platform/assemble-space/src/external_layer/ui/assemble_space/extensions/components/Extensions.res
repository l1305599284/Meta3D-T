open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  // TODO perf: defer load when panel change
  let _getExtensionsAndContributes = (
    {getAllPublishExtensionProtocols},
    selectedExtensionsFromShop,
  ) => {
    getAllPublishExtensionProtocols()->Meta3dBsMost.Most.map(protocols => {
      protocols->Meta3dCommonlib.ArraySt.reduceOneParam(
        (. result, {name, iconBase64, version}: FrontendUtils.BackendCloudbaseType.protocol) => {
          switch selectedExtensionsFromShop->Meta3dCommonlib.ListSt.filter(({data}) => {
            let protocol = data.extensionPackageData.protocol

            protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
          }) {
          | list{{data}} => result->Meta3dCommonlib.ArraySt.push((name, iconBase64))

          | _ => result
          }
        },
        [],
      )
    }, _)
  }

  let useEffectOnce = ((dispatch, setExtensions), service, selectedExtensionsFromShop) => {
    (
      _getExtensionsAndContributes(
        service,
        selectedExtensionsFromShop,
      )->Meta3dBsMost.Most.observe(extensions => {
        setExtensions(_ => extensions)
        dispatch(FrontendUtils.AssembleSpaceStoreType.SetIsLoaded(true))
      }, _),
      None,
    )
  }
}

@react.component
let make = (~service: service, ~selectedExtensionsFromShop: selectedExtensionsFromShop) => {
  let dispatch = service.useDispatch()

  let (extensions, setExtensions) = React.useState(_ => [])

  service.useEffectOnce(
    Method.useEffectOnce((dispatch, setExtensions), service, selectedExtensionsFromShop),
  )

  <List
    grid={{gutter: 16, column: 3}}
    dataSource={extensions}
    renderItem={((name, iconBase64)) => {
      <List.Item>
        <Card
          key={name}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<img
            style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={iconBase64}
          />}>
          <Card.Meta style={ReactDOM.Style.make(~width="100px", ())} title={React.string(name)} />
        </Card>
      </List.Item>
    }}
  />
}