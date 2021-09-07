import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
import {apiCallBegan} from './api';
import moment from 'moment';
import axios from 'axios';

const slice = createSlice({
    name:'bugs',
    initialState:{
        list:[],
        loading: false,
        lastFetch: null
    },
    reducers:{
        // actions => action handlers
        bugAdded:(bugs,action) =>{
            bugs.list.push(action.payload);

        },
        bugResolved:(bugs,action)=>{
                
                const index = bugs.list.findIndex(bug => { return bug.id === action.payload.id } );
                bugs.list[index].resolved = true;

            
        },

        bugAssigned:(bugs,action)=>{
            
            const index = bugs.list.findIndex(bug => { return bug.id === action.payload.id } );
            bugs.list[index].userId = action.payload.userId;
        },
        bugsRequested:(bugs,action)=>{
            bugs.loading= true;
        },
        bugsRequestFail:(bugs,action)=>{
            bugs.loading=false;
        },
        bugsReceived:(bugs,action)=>{
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
            
        }
    }

});

export let {bugAdded, bugResolved, bugAssigned, bugsReceived, bugsRequested, bugsRequestFail} = slice.actions;
export default slice.reducer;

//Memoization
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => !bug.resolved)
)    

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId)
)  

const url = "/bugs";

export const loadBugs = () => (dispatch, getState) =>{
    const { lastFetch } = getState().entities.bugs;
    const diffInMinutes = moment().diff((lastFetch), 'seconds');
   
    if(diffInMinutes <= 30) return;
    dispatch(
        apiCallBegan({
            url,
            onStart:bugsRequested.type,
            onSuccess: bugsReceived.type,
            onError: bugsRequestFail.type
        })
    );

}






export const addBug = bug => apiCallBegan(
    {
    url,
    method:"post",
    data:bug,
    onSuccess: bugAdded.type
});

export const assignBugToUser = (bugId, userId)=> apiCallBegan(
    {
        url: url + '/' + bugId,
        method:"patch",
        data: {userId},
        onSuccess: bugAssigned.type
    }
);


export const resolvedBug = id => apiCallBegan(
    {
        url: url + '/' + id.id,
        method:"patch",
        data: {resolved:true},
        onSuccess: bugResolved.type
    }
);