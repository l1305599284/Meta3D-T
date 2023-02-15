import { getContribute as getContributeMeta3D } from "meta3d-type"
// import { uiControlName, state as uiControlState, inputData, outputData } from "meta3d-ui-control-scene-view-protocol"
import { uiControlName, inputData, outputData } from "meta3d-ui-control-scene-view-protocol"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
// import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
// import { state } from "meta3d-ui-protocol/src/state/StateType"

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, uiControlContribute<inputData, outputData>> = (api, [dependentExtensionProtocolNameMap, _]) => {
    // let { meta3dUIExtensionProtocolName } = dependentExtensionProtocolNameMap

    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _
        ) => {
            // let { setUIControlState } = api.getExtensionService<service>(meta3dState, meta3dUIExtensionProtocolName)
            // let state = api.getExtensionState<state>(meta3dState, meta3dUIExtensionProtocolName)


            // let canvas = document.querySelector("canvas") as HTMLCanvasElement

            // state = setUIControlState<uiControlState>(state, uiControlName, {
            //     rect: {
            //         x: 0,
            //         y: 0,
            //         width: canvas.width,
            //         height: canvas.height
            //     }
            // })

            // meta3dState = api.setExtensionState<state>(meta3dState, meta3dUIExtensionProtocolName, state)

            return new Promise((resolve, reject) => {
                resolve([meta3dState, null])
            })
        }
    }
}
