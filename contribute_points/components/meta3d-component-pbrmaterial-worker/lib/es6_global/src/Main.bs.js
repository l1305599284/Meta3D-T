

import * as DefaultGetDataUtils$Meta3dComponentWorkerUtils from "./../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/DefaultGetDataUtils.bs.js";
import * as Index$Meta3dComponentPbrmaterialWorkerProtocol from "./../../../../../node_modules/meta3d-component-pbrmaterial-worker-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentPbrmaterialWorker from "./create_state/CreateStateUtils.bs.js";
import * as GetPBRMaterialDataUtils$Meta3dComponentPbrmaterialWorker from "./operate_data/GetPBRMaterialDataUtils.bs.js";

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentPbrmaterialWorkerProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPbrmaterialWorker.createState(param.isDebug, param.pbrMaterialCount, param.buffer);
            }),
          getGameObjectsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getGameObjectsFunc,
          createComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.createComponentFunc,
          addComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.addComponentFunc,
          removeComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.removeComponentFunc,
          hasComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.hasComponentFunc,
          getComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getComponentFunc,
          getNeedDisposedComponentsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getNeedDisposedComponentsFunc,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPBRMaterialDataUtils$Meta3dComponentPbrmaterialWorker.getData(state, component, dataName);
            }),
          setComponentDataFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.setComponentDataFunc,
          deferDisposeComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.deferDisposeComponentFunc,
          disposeComponentsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.disposeComponentsFunc,
          cloneComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.cloneComponentFunc,
          getAllComponentsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getAllComponentsFunc
        };
}

export {
  getComponentContribute ,
  
}
/* No side effect */