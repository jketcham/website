import { useEffect, useReducer } from 'react';

function fetchReducer(state, { type, payload }) {
  switch (type) {
    case 'INIT':
      return { ...state, isLoading: true };
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
      };
    case 'ERROR':
      return { ...state, isError: true, isLoading: false };
    default:
      throw new Error();
  }
}

function useFetch(url, initialData) {
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
    ...initialData,
  });

  useEffect(() => {
    let ignore = false;

    async function getData() {
      dispatch({ type: 'INIT' });

      try {
        const data = await fetch(url);
        const result = await data.json();

        if (!ignore) {
          dispatch({ type: 'SUCCESS', payload: result });
        }
      } catch (error) {
        if (!ignore) {
          dispatch({ type: 'ERROR' });
        }
      }
    }

    getData();

    return () => { ignore = true; };
  }, [url]);

  return state;
}

export default useFetch;
