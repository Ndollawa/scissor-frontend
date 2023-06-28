import React, { useState } from 'react'
// import useLocalStorage from './useLocalStorage';

const useInput = (initValue:any) =>{// pass key args
const [value, setValue] = useState(initValue);//useLocalStorage(key,initValue)
const reset = ()=> setValue(initValue);

const attributeObj = {
    value,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
}

return [value, reset, attributeObj ];

}


export default useInput;