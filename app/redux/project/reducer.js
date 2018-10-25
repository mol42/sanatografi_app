import * as $ from "../actionTypes";
import moment from "moment";

const initialState = {
    projects : [],
    projectCategories : [],
    featuredProjects : [],
    events : []
};

export default (state = initialState, action) => {

    if (action.type == $.GET_PROJECTS_SUCCESS) {

        let payload = action.payload;
        let [projects] = payload.slice(0,1);
        let [visual] = payload.slice(1,2);
        let [event] = payload.slice(2);

        projects.forEach(function(projectItem) {
            projectItem.visual = visual.filter(visual => visual.projectId == projectItem.id);
            projectItem.event = event.filter(event => event.projectId == projectItem.id);
        });

        return {
            ...state,
            projects
        }
    }

    if (action.type == $.GET_PROJECT_CATEGORIES_SUCCESS) {

        return {
            ...state,
            projectCategories : action.payload
        }
    }

    if (action.type == $.GET_EVENTS_SUCCESS) {

        return {
            ...state,
            events : action.payload
        }
    }


    if (action.type == $.GET_FEATURED_PROJECTS_SUCCESS) {

        let payload = action.payload;
        let [featuredProjects] = payload.slice(0,1);
        let [visual] = payload.slice(1);
        let [event] = payload.slice(2);

        featuredProjects.forEach(function(projectItem) {
            projectItem.project.visual = visual.filter(visual => visual.projectId == projectItem.project.id);
            projectItem.project.event = event.filter(event => event.projectId == projectItem.project.id);
            projectItem.project.event.sort((e1, e2) => moment(e1.date).isAfter(e2.date) ? 1 : -1);
        });

        return {
            ...state,
            featuredProjects
        }
    }

    return state;
}