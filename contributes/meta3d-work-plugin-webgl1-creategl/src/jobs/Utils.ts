import { state, states, workPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType"
import { state as dataState, states as dataStates, workPluginName as dataWorkPluginName } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"

export function getState(states: states): state {
    return states[workPluginName]
}

// export function setState(states: states, state: state): states {
//     return Object.assign({}, states, {
//         [workPluginName]: state
//     });
// }


export function getDataState(states: states): dataState {
    return states[dataWorkPluginName]
}

export function setStateToData(states: states, state: dataState): states {
    return Object.assign({}, states as any as dataStates, {
        [dataWorkPluginName]: state
    }) as any as states;
}