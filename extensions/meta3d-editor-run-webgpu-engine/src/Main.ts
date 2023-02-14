import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state } from "meta3d-editor-run-engine-protocol/src/state/StateType"
import { service } from "meta3d-editor-run-engine-protocol/src/service/ServiceType"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
import { service as engineWebgpuWholeService } from "meta3d-editor-engine-webgpu-whole-protocol/src/service/ServiceType"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionProtocolNameMap,
	dependentContributeProtocolNameMap,
	service
> = (api, [{
	meta3dEditorEngineWebgpuWholeExtensionProtocolName
}, _]) => {
		return {
			prepareAndInitEngine: (meta3dState, gl, isDebug) => {
				let engineWebgpuWholeService = api.getExtensionService<engineWebgpuWholeService>(
					meta3dState,
					meta3dEditorEngineWebgpuWholeExtensionProtocolName
				)

				meta3dState = engineWebgpuWholeService.prepare(meta3dState, isDebug,
					gl
				)

				return engineWebgpuWholeService.init(meta3dState)
			},
			loopEngine: (meta3dState) => {
				let engineWebgpuWholeService = api.getExtensionService<engineWebgpuWholeService>(
					meta3dState,
					meta3dEditorEngineWebgpuWholeExtensionProtocolName
				)

				return engineWebgpuWholeService.update(meta3dState).then(meta3dState => engineWebgpuWholeService.render(meta3dState))
			}
		}
	}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}