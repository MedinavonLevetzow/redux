const toast = param => store => next => action => {
    if(action.type === 'error'){
        console.log(param);
        
    }

    else{
        return next(action);
    }
}

export default toast;

