import reducer from './reducer';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import logger from './middleware/logger';
import toast from './middleware/toast';
import api from './middleware/api';

export default function() {
    
  return configureStore({ 
    reducer, 
    middleware: [
      ...getDefaultMiddleware(),
      logger({destination:"console"}),
      toast({Toasterror: "An error has occured."}),
      api
    ]
  });

}