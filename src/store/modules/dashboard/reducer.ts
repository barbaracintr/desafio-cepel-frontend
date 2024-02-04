const initialState: object[] = []

const circuitReducer = (state = initialState, action: { type: string, entityValue: any, reorganizedCircuit: any }) => {
    console.log(state)

    if (action.type === 'ADD_ENTITY') {
        const { entityValue } = action
        return [...state, entityValue]
    }

    if (action.type === 'SORT_CIRCUIT') {
        const { reorganizedCircuit } = action
        return [...reorganizedCircuit]
    }

    if (action.type === 'DELETE_ENTITY') {
        return [...state]
    }

    return [...state]
}

export default circuitReducer