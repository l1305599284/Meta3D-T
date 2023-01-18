import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType";
import { execFunc as execPrepareInitDataJob } from "./jobs/init/PrepareInitDataJob"
import { execFunc as execPrepareRenderDataJob } from "./jobs/render/PrepareRenderDataJob"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-work-plugin-webgl1-data-protocol/src/DependentMapType";
import { config } from "meta3d-work-plugin-webgl1-data-protocol/src/ConfigType";
import { state, states, workPluginName } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"


let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "prepare_init_data_webgl1_engine":
			return execPrepareInitDataJob
		case "prepare_render_data_webgl1_engine":
			return execPrepareRenderDataJob
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, workPluginContribute<config, state>> = (api, dependentMapData) => {
	let {
		// meta3dWebgl1ExtensionName,
		meta3dBsMostExtensionName,
		meta3dEngineCoreExtensionName,
		// meta3dImmutableExtensionName
	} = dependentMapData[0]

	return {
		workPluginName: workPluginName,
		createStateFunc: (meta3dState, {
			isDebug,
		}) => {
			return {
				isDebug,
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionName),
				engineCoreService: api.getExtensionService<engineCoreService>(meta3dState, meta3dEngineCoreExtensionName),
				gl: null,
				allGeometryIndices: [],
				allMaterialIndices: [],
				viewRect: null,
				viewMatrix: null,
				pMatrix: null,
				allRenderComponents: []
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_engine",
						link: "concat",
						elements: [
							{
								"name": "prepare_init_data_webgl1_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_webgl1_engine"
			},
			{
				name: "render",
				groups: [
					{
						name: "first_webgl1_engine",
						link: "concat",
						elements: [
							{
								"name": "prepare_render_data_webgl1_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_webgl1_engine"
			}
		],
	}
}
