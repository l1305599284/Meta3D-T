open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let transformState = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ()) => {
    StateTool.createState(~contribute=contribute.contents, ~isDebug, ())
  }

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := Main.getGameObjectContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."dispose transform", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let transform1 = ref(Obj.magic(3))
    let transform2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposeTransformFuncStub = ref(Obj.magic(1))
    let disposeTransformsFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("create transform state", () => {
      transformState :=
        {
          "gameObjectTransformMap": Meta3dCommonlib.MutableSparseMap.createEmpty(),
        }
    })

    \"and"(%re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic, () => {
      let (s, g1) = contribute.contents.createGameObjectFunc(. state.contents)
      let (s, g2) = contribute.contents.createGameObjectFunc(. s)

      state := s
      gameObject1 := g1
      gameObject2 := g2
    })

    \"and"(%re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic, () => {
      transform1 := 100
      transform2 := 101
    })

    \"and"(%re("/^add transform(\d+) to gameObject(\d+)$/")->Obj.magic, () => {
      transformState.contents["gameObjectTransformMap"]
      ->Meta3dCommonlib.MutableSparseMap.set(gameObject1.contents, transform1.contents)
      ->ignore
    })

    \"and"(%re("/^add transform(\d+) to gameObject(\d+)$/")->Obj.magic, () => {
      transformState.contents["gameObjectTransformMap"]
      ->Meta3dCommonlib.MutableSparseMap.set(gameObject2.contents, transform2.contents)
      ->ignore
    })

    \"and"(%re("/^defer dispose gameObject(\d+)$/")->Obj.magic, arg0 => {
      deferDisposeTransformFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

      let (gs, ts, _) = DisposeTool.deferDisposeGameObject(
        ~state=state.contents,
        ~contribute=contribute.contents,
        ~gameObject=gameObject1.contents,
        ~transformState=transformState.contents,
        ~transformFuncs=(
          (. _, _) => transform1.contents->Meta3dCommonlib.NullableSt.return,
          deferDisposeTransformFuncStub.contents,
        ),
        (),
      )

      state := gs
      transformState := ts->Obj.magic
    })

    \"and"(%re("/^defer dispose gameObject(\d+)$/")->Obj.magic, arg0 => {
      let (gs, ts, _) = DisposeTool.deferDisposeGameObject(
        ~state=state.contents,
        ~contribute=contribute.contents,
        ~gameObject=gameObject2.contents,
        ~transformState=transformState.contents,
        ~transformFuncs=(
          (. _, _) => transform2.contents->Meta3dCommonlib.NullableSt.return,
          deferDisposeTransformFuncStub.contents,
        ),
        (),
      )

      state := gs
      transformState := ts->Obj.magic
    })

    \"when"("dispose [gameObject1, gameObject2]", () => {
      disposeTransformsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      let (gs, ts, _) = DisposeTool.disposeGameObjects(
        ~state=state.contents,
        ~contribute=contribute.contents,
        ~gameObjects=[gameObject1.contents, gameObject2.contents],
        ~transformState=transformState.contents,
        ~transformFuncs=(
          (. transformState, gameObject) =>
            Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
              ? transform1.contents->Js.Nullable.return
              : transform2.contents->Js.Nullable.return,
          disposeTransformsFuncStub.contents,
        ),
        (),
      )

      state := gs
      transformState := ts->Obj.magic
    })

    then("should dispose [transform1, transform2]", () => {
      (
        deferDisposeTransformFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg2(matchAny, (transform1.contents, matchAny)),
        deferDisposeTransformFuncStub.contents
        ->Obj.magic
        ->getCall(1, _)
        ->SinonTool.calledWithArg2(matchAny, (transform2.contents, matchAny)),
        disposeTransformsFuncStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg2(matchAny, [transform1.contents, transform2.contents]),
      )->expect == (true, true, true)
    })
  })

  test(."should remove disposed gameObjects from needDisposedGameObjects", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let sandbox = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("create transform state", () => {
      transformState :=
        {
          "gameObjectTransformMap": Meta3dCommonlib.MutableSparseMap.createEmpty(),
        }
    })

    \"and"(%re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic, () => {
      let (s, g1) = contribute.contents.createGameObjectFunc(. state.contents)
      let (s, g2) = contribute.contents.createGameObjectFunc(. s)

      state := s
      gameObject1 := g1
      gameObject2 := g2
    })

    \"and"(%re("/^defer dispose gameObject(\d+)$/")->Obj.magic, arg0 => {
      let (gs, ts, _) = DisposeTool.deferDisposeGameObject(
        ~state=state.contents,
        ~contribute=contribute.contents,
        ~gameObject=gameObject1.contents,
        ~transformState=transformState.contents,
        ~transformFuncs=(
          createEmptyStubWithJsObjSandbox(sandbox),
          createEmptyStubWithJsObjSandbox(sandbox),
        ),
        (),
      )

      state := gs
      transformState := ts->Obj.magic
    })

    \"and"(%re("/^defer dispose gameObject(\d+)$/")->Obj.magic, arg0 => {
      let (gs, ts, _) = DisposeTool.deferDisposeGameObject(
        ~state=state.contents,
        ~contribute=contribute.contents,
        ~gameObject=gameObject2.contents,
        ~transformState=transformState.contents,
        ~transformFuncs=(
          createEmptyStubWithJsObjSandbox(sandbox),
          createEmptyStubWithJsObjSandbox(sandbox),
        ),
        (),
      )

      state := gs
      transformState := ts->Obj.magic
    })

    \"when"("dispose gameObject1", () => {
      let (gs, ts, _) = DisposeTool.disposeGameObjects(
        ~state=state.contents,
        ~contribute=contribute.contents,
        ~gameObjects=[gameObject1.contents],
        ~transformState=transformState.contents,
        ~transformFuncs=(
          createEmptyStubWithJsObjSandbox(sandbox),
          createEmptyStubWithJsObjSandbox(sandbox),
        ),
        (),
      )

      state := gs
      transformState := ts->Obj.magic
    })

    then("get need disposed gameObjects should return [gameObject2]", () => {
      contribute.contents.getNeedDisposedGameObjectsFunc(. state.contents)->expect == [
          gameObject2.contents,
        ]
    })
  })
})
