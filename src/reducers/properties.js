import { createSlice } from '@reduxjs/toolkit'

const propertiesSlice = createSlice({
    name: 'properties',
    initialState: [],
    reducers: {
        propertyAdded(state, action) {
            state.push(action.payload)
        },
        propertyDeleted(state, action) {
            state.filter((property) => property.id !== action.payload)
        },
        propertyEdited(state, action) {
            let editedProperty = state.find((property) => property.id == action.payload.id)
            editedProperty = { ...action.payload }
        }
    }
})

export const { propertyAdded, propertyToggled } = propertiesSlice.actions
export default propertiesSlice.reducer

