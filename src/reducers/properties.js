import { createSlice } from '@reduxjs/toolkit'

const propertiesSlice = createSlice({
    name: 'properties',
    initialState: [],
    reducers: {
        properties
        propertyAdded(state, action) {
            state.push(action.payload)
        },
        propertyDeleted(state, action) {
            return state.filter((property) => property.id !== action.payload)
        },
        propertyEdited(state, action) {
            return state.map(
                (property) => property.id === action.payload.id ?
                    Object.assign({}, property, action.payload) : property
            );
        }
    }
})

export const { propertyAdded, propertyDeleted, propertyEdited } = propertiesSlice.actions
export default propertiesSlice.reducer

