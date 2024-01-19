import { API_URL } from '../constants'

export type EndpointParam = {
    path: string,
    method: string
}

export const getEndpointUrl = (endpoint: EndpointParam) => `${API_URL}${endpoint.path}`