import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service, webgl1Context, fbo } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { extensionProtocolName } from "meta3d-type"
import { strictNullable } from "meta3d-commonlib-ts/src/nullable";
import { viewRect } from "./ConfigType"

export const workPluginName = "Editor_WebGL1_SceneView"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    uiService: uiService,
    engineWholeService: engineWholeService,
    meta3dUIExtensionProtocolName: extensionProtocolName,
    viewRect: viewRect,
    fbo: strictNullable<fbo>,
}

export type states = {
    [workPluginName]: state
}