import axios from 'axios'
import { getToken } from '../../../common/utils'
import { API_URL } from '../../../common/app-consts'
import { ActionStatus } from '../../../common/models'

export interface Microservice {
    heartbit: string
    index: number
    ipv4: string
    name: string
    port: number
    started: string
    status: string
    type: string
    type_i: number
    uid: string
    version: string
}

export const getServiceById = (uid: string) => {
    return axios
        .get<Microservice[]>(`${API_URL}services/${uid}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data[0])
}

export const listServices = () => {
    return axios
        .get<Microservice[]>(`${API_URL}services/list`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getServiceLogs = (uid: string) => {
    return axios
        .get<ActionStatus>(`${API_URL}services/${uid}/logs`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getServiceAudit = (uid: string) => {
    return axios
        .get<ActionStatus>(`${API_URL}services/${uid}/audit`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getServiceAlerts = (uid: string) => {
    return axios
        .get<ActionStatus>(`${API_URL}services/${uid}/allerts`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getServiceCounters = (uid: string) => {
    return axios
        .get<ActionStatus>(`${API_URL}services/${uid}/counters`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const stopService = (id: string) => {
    return axios
        .get<ActionStatus>(API_URL + 'services/' + id + '/stop', {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}
