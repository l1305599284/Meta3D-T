open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/package/package_contributeInspector.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show nothing", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show nothing",
      () => {
        PackageContributeInspectorTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
              (None, list{}),
              _,
            ),
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  // test(."set new name input show default name", ({given, \"when", \"and", then}) => {
  //   let useSelectorStub = ref(Obj.magic(1))
  //   let id = "e1"

  //   _prepare(given, \"and")

  //   given(
  //     "set inspector current contribute to a1",
  //     () => {
  //       ()
  //     },
  //   )

  //   \"and"(
  //     "set a1's new name to new1",
  //     () => {
  //       useSelectorStub :=
  //         createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //           (
  //             id->Some,
  //             list{
  //               PackageSelectedContributesTool.buildSelectedContribute(
  //                 ~id,
  //                 ~newName="new1"->Some,
  //                 (),
  //               ),
  //             },
  //           ),
  //           _,
  //         )
  //     },
  //   )

  //   \"when"(
  //     "render",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "set new name input's default name should be new1",
  //     () => {
  //       PackageContributeInspectorTool.buildUI(
  //         ~sandbox,
  //         ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
  //         (),
  //       )
  //       ->ReactTestRenderer.create
  //       ->ReactTestTool.createSnapshotAndMatch
  //     },
  //   )
  // })
})
