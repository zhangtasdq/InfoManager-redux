import {RouteMap, RouteChain} from "../configs/RouteConfig";

export default RouteService = {
    getRouteByName: (viewName) => RouteMap[viewName],

    getViewByDirection: (viewName, direction, param) => {
        let routeName = RouteChain[viewName][direction];

        if (routeName) {
            return {
                ...RouteMap[routeName],
                param: param
            }
        }

        return null;
    }
};
