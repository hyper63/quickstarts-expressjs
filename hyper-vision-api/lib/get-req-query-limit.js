import {pathOr} from 'ramda'

export const getReqQueryLimit = req => parseInt(pathOr(1000, ['query', 'limit'], req), 10)

