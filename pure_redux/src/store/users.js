import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';

let lastId = 0;

const slice = createSlice({
    name:'users',
    initialState:[],
    reducers:{
        addUser:(users, action) => {
            console.log(action.payload.name);
            users.push({
                id: ++lastId,
                name: action.payload.name,
              
            })
        },

        
    }
});



export let {addUser} = slice.actions;
export default slice.reducer;

