import { createContext, FC, useCallback, useContext, useMemo } from 'react';

export interface ApiRequestUtils {
  post: <Response extends {}, RequestBody extends {} = {}>(
    reqPath: string,
    body: RequestBody,
    params?: { headers?: Record<string, string> }
  ) => Promise<Response>;
}

// @ts-ignore
export const ApiRequestUtilsContext = createContext<ApiRequestUtils>(null);

export function useApiRestUtils(): ApiRequestUtils {
  return useContext(ApiRequestUtilsContext);
}

const ApiRestUtilsProvider: FC<{}> = ({ children }) => {
  const post = useCallback<ApiRequestUtils['post']>(
    async (reqPath, body, params = {}) => {
      const result = await fetch(reqPath, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...(params.headers || {}),
        },
      });

      return result.json();
    },
    []
  );
  const apiUtils = useMemo<ApiRequestUtils>(() => ({ post }), [post]);

  return (
    <ApiRequestUtilsContext.Provider value={apiUtils}>
      {children}
    </ApiRequestUtilsContext.Provider>
  );
};

export default ApiRestUtilsProvider;
