const logger = param => ({dispatch, getState})=> next => action =>{
    if(action.type !== 'error'){
        return next(action);
        
    }
    else{
        next(action);
    }
   

    
   
};

export default logger;