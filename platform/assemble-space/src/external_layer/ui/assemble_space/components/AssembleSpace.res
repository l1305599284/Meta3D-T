open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

@react.component
let make = (~service: service, ~selectedExtensionsFromShop: selectedExtensionsFromShop) => {
  let isLoaded = service.useSelector(({isLoaded}: FrontendUtils.AssembleSpaceStoreType.state) =>
    isLoaded
  )

  !isLoaded
    ? <Layout> <Layout.Content> {React.string(`loading...`)} </Layout.Content> </Layout>
    : {
        <Layout>
          <Layout.Header>
            <Button
              onClick={_ => {
                ()
              }}>
              {React.string(`发布`)}
            </Button>
          </Layout.Header>
          <Layout>
            // TODO extract Sider component
            <Layout.Sider>
              <Collapse defaultActiveKey={["1"]}>
                <Collapse.Panel header="Extensions" key="1">
                  <Extensions service selectedExtensionsFromShop />
                </Collapse.Panel>
              </Collapse>
            </Layout.Sider>
            <Layout.Content> {React.string(`装配空间`)} </Layout.Content>
          </Layout>
        </Layout>
      }
}