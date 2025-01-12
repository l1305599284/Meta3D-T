open Sinon

let buildUI = (~sandbox, ~account=None, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PublishElement service account />
}

let publish = (
  ~sandbox,
  ~service,
  ~setUploadProgress=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setIsUploadBegin=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setVisible=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~account=None,
  ~elementInspectorData=ElementInspectorTool.buildElementInspectorData(
    list{},
    ReducerTool.buildReducers(),
  ),
  ~selectedUIControls=list{},
  ~selectedUIControlInspectorData=list{},
  ~values={
    "elementName": "n1",
    "elementVersion": "0.0.1",
  },
  (),
) => {
  PublishElement.Method.onFinish(
    service,
    (setUploadProgress, setIsUploadBegin, setVisible),
    (account, (elementInspectorData, selectedUIControls, selectedUIControlInspectorData)),
    values,
  )
}
