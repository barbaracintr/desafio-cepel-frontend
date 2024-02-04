import { api } from "../../../services/fakeapi"

export const addEntity = async (entityValue: any) => {
    return await api.post('/entity', { "id": entityValue.id, "entity": entityValue.entity, "img": entityValue.img })
        .then(res => {
            console.log(res)
            return {
                type: "ADD_ENTITY",
                entityValue: {
                    id: entityValue.id,
                    entity: entityValue.entity,
                    img: entityValue.img
                }
            }
        })
        .catch(err => {
            console.log(err)
            return {
                type: "ADD_ENTITY",
                message: err
            }
        })
}

export const sortCircuit = async (reorganizedCircuit: any, id: string) => {
    return await api.patch(`/entity/${id}`)
        .then(res => {
            console.log(res)
            return {
                type: "SORT_CIRCUIT",
                reorganizedCircuit
            }
        })
        .catch(err => {
            console.log(err)
            return {
                type: "SORT_CIRCUIT",
                message: err
            }
        })
}

export const deleteEntity = async (id: string) => {
    return await api.delete(`/entity/${id}`)
        .then(res => {
            console.log(res)
            return {
                type: "DELETE_ENTITY",
                id
            }
        })
        .catch(err => {
            console.log(err)
            return {
                type: "DELETE_ENTITY",
                message: err
            }
        })
}