open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/selectedContributes.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show selected contributes", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("select contribute a1, a2", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          list{
            SelectedContributesTool.buildSelectedContribute(~name="e1", ~protocolIconBase64="i1", ()),
            SelectedContributesTool.buildSelectedContribute(~name="e2", ~protocolIconBase64="i2", ()),
          },
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show a1 and a2", () => {
      SelectedContributesTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  // test(."set new name", ({given, \"when", \"and", then}) => {
  //   let useSelectorStub = ref(Obj.magic(1))

  //   _prepare(given, \"and")

  //   given("select contribute a1, a2", () => {
  //     ()
  //   })

  //   \"and"("set a2's new name", () => {
  //     useSelectorStub :=
  //       createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //         list{
  //           SelectedContributesTool.buildSelectedContribute(~name="e1", ~protocolIconBase64="i1", ()),
  //           SelectedContributesTool.buildSelectedContribute(
  //             ~name="e2",
  //             ~newName="e_NewName2"->Some,
  //             ~protocolIconBase64="i2",
  //             (),
  //           ),
  //         },
  //         _,
  //       )
  //   })

  //   \"when"("render", () => {
  //     ()
  //   })

  //   then("should show a1 with its origin name and a2 with its new name", () => {
  //     SelectedContributesTool.buildUI(
  //       ~sandbox,
  //       ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
  //       (),
  //     )
  //     ->ReactTestRenderer.create
  //     ->ReactTestTool.createSnapshotAndMatch
  //   })
  // })
})
