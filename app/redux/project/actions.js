import * as $ from "../actionTypes";

export function getProjects() {
    return {
        type: $.GET_PROJECTS_REQUEST
    }
}

export function getProjectCategories() {
    return {
        type: $.GET_PROJECT_CATEGORIES_REQUEST
    }
}

export function getFeaturedProjects() {
    return {
        type: $.GET_FEATURED_PROJECTS_REQUEST
    }
}

export function getEvents() {
    return {
        type: $.GET_EVENTS_REQUEST
    }
}