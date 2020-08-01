import { useRouteMatch } from 'react-router-dom';

export const useTabsWithRouter = (
  routes: string[],
  defaultRoute: string
): string => {
  const match = useRouteMatch(routes.filter((w) => w !== defaultRoute));
  return match?.path ?? defaultRoute;
};
