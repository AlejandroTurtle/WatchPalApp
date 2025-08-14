import React, {createContext, useReducer, useContext, ReactNode} from 'react';

type State = {
  episodesWatched: number;
  hoursWatched: number;
  seriesCompleted: number;
};

type Action =
  | {type: 'SET_EPISODES_WATCHED'; payload: number}
  | {type: 'SET_HOURS_WATCHED'; payload: number}
  | {type: 'SET_SERIES_COMPLETED'; payload: number};

const initialState: State = {
  episodesWatched: 0,
  hoursWatched: 0,
  seriesCompleted: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_EPISODES_WATCHED':
      return {...state, episodesWatched: action.payload};
    case 'SET_HOURS_WATCHED':
      return {...state, hoursWatched: action.payload};
    case 'SET_SERIES_COMPLETED':
      return {...state, seriesCompleted: action.payload};
    default:
      return state;
  }
}

const SeriesStateContext = createContext<State | undefined>(undefined);
const SeriesDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined,
);

export const SeriesProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SeriesStateContext.Provider value={state}>
      <SeriesDispatchContext.Provider value={dispatch}>
        {children}
      </SeriesDispatchContext.Provider>
    </SeriesStateContext.Provider>
  );
};

export const useSeriesState = () => {
  const ctx = useContext(SeriesStateContext);
  if (ctx === undefined) {
    throw new Error('useSeriesState must be used within SeriesProvider');
  }
  return ctx;
};

export const useSeriesDispatch = () => {
  const ctx = useContext(SeriesDispatchContext);
  if (ctx === undefined) {
    throw new Error('useSeriesDispatch must be used within SeriesProvider');
  }
  return ctx;
};
