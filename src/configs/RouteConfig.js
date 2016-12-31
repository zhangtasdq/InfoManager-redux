import LoginView from "../views/LoginView";
import InfoListView from "../views/InfoListView";
import InfoEditView from "../views/InfoEditView";
import InfoDetailEditView from "../views/InfoDetailEditView";
import InfoShowView from "../views/InfoShowView";

let RouteMap = {
    loginView: { name: "Login View", index: 0, component: LoginView },
    infoListView: {name: "Info List View", index: 1, component: InfoListView},
    infoEditView: {name: "Info Edit View", index: 2, component: InfoEditView},
    infoDetailEditView: {name: "Info Detail Edit View", index: 3, component: InfoDetailEditView},
    infoShowView: {name: "Info Show View", index: 4, component: InfoShowView}
};


let RouteChain = {
    loginView: {
        forward: "infoListView"
    },

    infoListView: {
        add: "infoEditView",
        detail: "infoShowView"
    },

    infoEditView: {
        addDetail: "infoDetailEditView"
    },

    infoShowView: {
        edit: "infoEditView"
    }
}


export {RouteMap, RouteChain};
