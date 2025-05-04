import {
    CommonActions,
    EventArg,
    EventListenerCallback,
    StackActions,
    TabActions,
} from '@react-navigation/native';
import {
    NavigationAction,
    NavigationState,
    PartialState,
} from '@react-navigation/routers';

export interface PropsScreen {
    navigation: typeNavigation;
    route: {
        name: string;
        params?: any | {screen: string; params?: any};
    };
}

type EventMap = {
    focus: EventArg<'focus'>; // Event type for 'focus'
    blur: EventArg<'blur'>; // Event type for 'blur'
    beforeRemove: EventArg<'beforeRemove'>; // Event type for 'beforeRemove'
    state: EventArg<'state'>; // Event type for 'state'
};

export type typeNavigation = {
    // Returns true if the screen is focused
    isFocused: () => boolean;

    // Returns the state object for the navigator
    getState: () => NavigationState | PartialState<NavigationState>;

    // Navigates to a route with specified parameters
    navigate: <RouteName extends string>(
        name: RouteName,
        params?:
            | {
                  screen: string;
                  params?: any;
              }
            | any,
    ) => void;

    // Dispatches a navigation action (advanced)
    dispatch: (
        action:
            | NavigationAction
            | ((state: NavigationState) => NavigationAction),
    ) => void;

    // Go back to the previous screen in the stack
    goBack: () => void;

    // Pop the specified number of screens off the stack
    pop: (count?: number) => void;

    // Adds a listener for specified events
    addListener: <EventName extends keyof EventMap>(
        event: EventName,
        callback: EventListenerCallback<EventMap, EventName>,
    ) => () => void;

    // Replaces the current screen in the stack with a new one
    replace: <RouteName extends string>(
        name: RouteName,
        params?: object | undefined,
    ) => void;

    // Pushes a new screen onto the stack
    push: <RouteName extends string>(
        name: RouteName,
        params?: object | undefined,
    ) => void;

    // Resets the navigation state with specified routes and index
    reset: (state: PartialState<NavigationState> | NavigationState) => void;

    // Checks if there is a screen to go back to
    canGoBack: () => boolean;

    // Removes a previously added listener
    removeListener: (event: string, callback: (event: any) => void) => void;

    // Pops all screens in the stack until the first screen is on top
    popToTop: () => void;

    // Dynamically sets options for the current screen
    setOptions: (options: object) => void;

    // Retrieves options for the current screen
    getCurrentOptions: () => object;

    // Emulates Tab Navigator actions
    jumpTo: (name: string, params?: object) => void;

    // Common Navigation actions
    resetRoot: (
        state?: NavigationState | PartialState<NavigationState>,
    ) => void;
    setParams: (params: object) => void;

    // Stack Actions
    pushStack: typeof StackActions.push;
    replaceStack: typeof StackActions.replace;
    popStack: typeof StackActions.pop;
    popToTopStack: typeof StackActions.popToTop;

    // Tab Actions
    jumpToTab: typeof TabActions.jumpTo;

    // Common Actions
    resetCommon: typeof CommonActions.reset;
    goBackCommon: typeof CommonActions.goBack;
    navigateCommon: typeof CommonActions.navigate;
};

export type screenType = {
    name: string;
    component: Function;
    options?: any;
};
