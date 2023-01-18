import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType";
import { execFunc as execGetGL } from "./jobs/init/GetGLJob";
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-work-plugin-editor-webgl1-getgl-protocol/src/DependentMapType";
import { config } from "meta3d-work-plugin-editor-webgl1-getgl-protocol/src/ConfigType";
import { state, states, workPluginName } from "meta3d-work-plugin-editor-webgl1-getgl-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "get_gl_webgl1_getgl_meta3d":
			return execGetGL;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, workPluginContribute<config, state>> = (api, dependentMapData) => {
	let {
		meta3dUIExtensionName,
		meta3dBsMostExtensionName
	} = dependentMapData[0]

	return {
		workPluginName: workPluginName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionName),
				uiService: api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_getgl_meta3d",
						link: "concat",
						elements: [
							{
								"name": "get_gl_webgl1_getgl_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_getgl_meta3d"
			}
		],
	}
}
