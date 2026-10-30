import { useEffect, useReducer } from "react";

const initialState = {
  loading: true,
  error: null,
  data: null
};

function fetchReducer(state, action) {
  switch (action.type) {
    case "START":
      return {
        loading: true,
        error: null,
        data: null
      };

    case "SUCCESS":
      return {
        loading: false,
        error: null,
        data: action.payload
      };

    case "ERROR":
      return {
        loading: false,
        error: action.payload,
        data: null
      };

    default:
      return state;
  }
}

export default function useFetch(fetcher, inputs = []) {
  const [state, dispatch] = useReducer(
    fetchReducer,
    initialState
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      dispatch({ type: "START" });

      try {
        const result = await fetcher(controller.signal);

        if (!controller.signal.aborted) {
          dispatch({
            type: "SUCCESS",
            payload: result
          });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          dispatch({
            type: "ERROR",
            payload: error.message || "Something went wrong"
          });
        }
      }
    }

    loadData();

    return () => {
      controller.abort();
    };
  }, [fetcher, ...inputs]);

  return state;
}