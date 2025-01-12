import { api, extensionProtocolName, state as meta3dState } from "meta3d-type/src/Index"
import { elementContribute, elementName } from "../contribute/ElementContributeType"
import { state, textureID } from "../state/StateType"
import { skinContribute, skinName } from "../contribute/SkinContributeType"
import { uiControlContribute, uiControlFunc, uiControlName } from "../contribute/UIControlContributeType"
import { style, label, pos, size, rect, texture as imguiTexture, context } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"

export type uiExtensionProtocolName = extensionProtocolName

export type imguiRendererExtensionProtocolName = extensionProtocolName

type time = number

type elementStateField = any

type updateElementStateFieldFunc = (elementStateField: elementStateField) => elementStateField

type clearColor = [number, number, number, number]

export type texture = imguiTexture

export type isDebug = boolean

export type service = {
    readonly registerElement: < elementState> (
        state: state,
        elementContribute: elementContribute<elementState>
    ) => state;
    readonly registerSkin: <skin> (
        state: state,
        skinContribute: skinContribute<skin>
    ) => state;
    readonly registerUIControl: <inputData, outputData> (
        state: state,
        uiControlContribute: uiControlContribute<inputData, outputData>
    ) => state;
    readonly getSkin: <skin> (
        state: state,
        skinName: skinName
    ) => nullable<skinContribute<skin>>;
    readonly getUIControlFunc: < inputData, outputData> (
        state: state,
        uiControlName: uiControlName
    ) => uiControlFunc<inputData, outputData>;
    // readonly updateUIControlName: (
    //     meta3dState: meta3dState,
    //     [api, uiExtensionProtocolName]: [api, uiExtensionProtocolName],
    //     [oldUIControlName, newUIControlName]: [uiControlName, uiControlName]
    // ) => meta3dState;
    readonly getUIControlState: <uiControlState> (
        state: state,
        uiControlName: uiControlName,
    ) => nullable<uiControlState>;
    readonly setUIControlState: <uiControlState> (
        state: state,
        uiControlName: uiControlName,
        uiControlState: uiControlState
    ) => state;
    // readonly prepare: (
    //     meta3dState: meta3dState,
    //     allUIControlContributes: Array<uiControlContribute<uiControlState, inputData, outputData>>
    // ) => Promise<meta3dState>;
    readonly init: (
        meta3dState: meta3dState,
        [api, imguiRendererExtensionProtocolName]: [api, imguiRendererExtensionProtocolName],
        isInitEvent: boolean,
        isDebug: boolean,
        canvas: HTMLCanvasElement
    ) => Promise<meta3dState>;
    readonly clear: (
        meta3dState: meta3dState,
        [api, imguiRendererExtensionProtocolName]: [api, imguiRendererExtensionProtocolName],
        clearColor: clearColor
    ) => meta3dState;
    readonly render: (
        meta3dState: meta3dState,
        [uiExtensionProtocolName, imguiRendererExtensionProtocolName]: [uiExtensionProtocolName, imguiRendererExtensionProtocolName],
        time: time
    ) => Promise<meta3dState>;
    readonly show: (
        state: state,
        elementName: elementName
    ) => state;
    readonly hide: (
        state: state,
        elementName: elementName
    ) => state;
    readonly isStateChange: (
        state: state,
        elementName: elementName
    ) => boolean;
    readonly getElementState: <elementState> (
        state: state,
        elementName: elementName
    ) => nullable<elementState>;
    readonly dispatch: <action> (
        state: state,
        actionName: string,
        role: string,
        updateElementStateFieldFunc: updateElementStateFieldFunc
    ) => state;
    readonly setStyle: (
        meta3dState: meta3dState,
        style: style
    ) => meta3dState;
    readonly beginWindow: (
        meta3dState: meta3dState,
        label: label
    ) => meta3dState;
    readonly endWindow: (
        meta3dState: meta3dState
    ) => meta3dState;
    readonly setNextWindowRect: (
        meta3dState: meta3dState,
        rect: rect
    ) => meta3dState;
    readonly addFBOTexture: (
        meta3dState: meta3dState,
        texture: strictNullable<texture>,
        rect: rect
    ) => meta3dState;
    readonly getFBOTexture: (
        state: state,
        textureID: textureID,
    ) => nullable<texture>;
    readonly setFBOTexture: (
        state: state,
        textureID: textureID,
        texture: texture
    ) => state;
    readonly getWindowBarHeight: (
        meta3dState: meta3dState
    ) => number;
    readonly getContext: (
        meta3dState: meta3dState
    ) => context;
    readonly button: (
        meta3dState: meta3dState,
        label: label,
        size: size
    ) => [meta3dState, boolean];
    readonly setCursorPos: (
        meta3dState: meta3dState,
        pos: pos
    ) => meta3dState;
};
