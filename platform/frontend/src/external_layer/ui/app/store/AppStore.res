type action = ..

type action +=
  | UserCenterAction(UserCenterStore.action)
  | EnterAppAction(EnterAppStore.action)
  | AssembleSpaceAction(FrontendUtils.AssembleSpaceStoreType.action)

type state = {
  userCenterState: UserCenterStore.state,
  enterAppState: EnterAppStore.state,
  assembleSpaceState: FrontendUtils.AssembleSpaceStoreType.state,
}

let reducer = (state, action) => {
  switch action {
  | UserCenterAction(action) => {
      ...state,
      userCenterState: UserCenterStore.reducer(state.userCenterState, action),
    }
  | EnterAppAction(action) => {
      ...state,
      enterAppState: EnterAppStore.reducer(state.enterAppState, action),
    }
  | AssembleSpaceAction(action) => {
      ...state,
      assembleSpaceState: AssembleSpace.AssembleSpaceStore.reducer(
        state.assembleSpaceState,
        action,
      ),
    }
  }
}

let initialState = {
  userCenterState: UserCenterStore.initialState,
  enterAppState: EnterAppStore.initialState,
  assembleSpaceState: AssembleSpace.AssembleSpaceStore.initialState,
}

let store = Remporium.makeStore(initialState, reducer)

module AppStore = Remporium.CreateModule({
  type action = action
  type state = state
})

let useDispatch = AppStore.useDispatch

let useSelector = AppStore.useSelector
