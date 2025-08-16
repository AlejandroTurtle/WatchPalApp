import React, {createContext, useReducer, useContext, ReactNode} from 'react';

type MediaItem = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  genres: {id: number; name: string}[];
  vote_average?: number;
  vote_count?: number;
  poster_path?: string;
  type?: 'movie' | 'tv' | string;
};

type State = {
  episodesWatched: number;
  hoursWatched: number;
  seriesCompleted: number;
  favorites: MediaItem[];
};
type Action =
  | {type: 'SET_EPISODES_WATCHED'; payload: number}
  | {type: 'SET_HOURS_WATCHED'; payload: number}
  | {type: 'SET_SERIES_COMPLETED'; payload: number}
  | {type: 'SET_MEDIA_FAVORITE'; payload: MediaItem[]}
  | {type: 'ADD_MEDIA_FAVORITE'; payload: MediaItem}
  | {type: 'REMOVE_MEDIA_FAVORITE'; payload: number};

const initialState: State = {
  episodesWatched: 0,
  hoursWatched: 0,
  seriesCompleted: 0,
  favorites: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_EPISODES_WATCHED':
      return {...state, episodesWatched: action.payload};
    case 'SET_HOURS_WATCHED':
      return {...state, hoursWatched: action.payload};
    case 'SET_SERIES_COMPLETED':
      return {...state, seriesCompleted: action.payload};
    case 'SET_MEDIA_FAVORITE':
      return {...state, favorites: action.payload};
    case 'ADD_MEDIA_FAVORITE':
      return {...state, favorites: [...state.favorites, action.payload]};
    case 'REMOVE_MEDIA_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload),
      };
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
