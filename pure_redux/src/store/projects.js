import { createSlice} from "@reduxjs/toolkit";

let lastId=0;

const slice = createSlice({
    name:'projects',
    initialState:[],
    reducers:{
        projectAdd:(projects,action)=>{
            projects.push({
                id: ++lastId,
                name:action.payload.description,
            })
            
        },

        projectRemove:(projects,action)=>{
            projects.filter(project=>project.id===action.payload.id ? projects.pop(project):project)
        }
    }
});


export const {projectAdd, projectRemove} = slice.actions;
export default slice.reducer;