import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { api, state as meta3dState } from "meta3d-type"

export let getMeta3dState = (): meta3dState => {
    return (globalThis as any).meta3dState_for_scene_graph_converter
}

export let setMeta3dState = (meta3dState: meta3dState): void => {
    (globalThis as any).meta3dState_for_scene_graph_converter = meta3dState
}

let _getAPI = (): api => {
    return (globalThis as any).api_for_scene_graph_converter
}

export let setAPI = (api: api): void => {
    (globalThis as any).api_for_scene_graph_converter = api
}

export let getEngineCoreService = (meta3dState: meta3dState): engineCoreService => {
    return _getAPI().getExtensionService<engineCoreService>(meta3dState, "meta3d-engine-core-protocol")
}

export let getEngineCoreState = (meta3dState: meta3dState): engineCoreState => {
    return _getAPI().getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-protocol")
}