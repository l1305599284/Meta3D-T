import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-viewrect-protocol/src/StateType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, canvas } = getState(states)

    return mostService.callFunc(() => {
        console.log("get editor view rect job");

		return setStatesFunc<states>(
			meta3dState,
			setState(states, {
				...getState(states),
                    viewRect: {
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height
                    }
			})
		)
    })
}