import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../../app/stores/store';

const PreloaderSlice = createSlice({
    name:'preloader',
    initialState:true,
    reducers:{
        setPreloader: (state, action) =>{
          
                if (typeof action.payload === "boolean") {
                    return action.payload;
                }
                return state;
           
        }
    },
   
})


 export const {setPreloader} = PreloaderSlice.actions;
 export const useIsLoading = (state:RootState) => state.preloader;
 export default PreloaderSlice.reducer;

 