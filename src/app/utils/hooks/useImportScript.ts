import React, {useEffect} from 'react';

const useImportScript = (resourceUrl:string[],jsType="javascript")=> {
 
      const scriptHolder = document.createElement('div');
      scriptHolder.id='scriptHolder';
      document.body.appendChild(scriptHolder);
      
  useEffect(
    () => {
      // let scripts
      let script:HTMLScriptElement;
    resourceUrl.map(url=>{
    script = document.createElement('script');
    script.src = url;
    script.type= `text/${jsType}`;
    // script.async = true;
    script.defer = true;

  script.onload = () => {
  // console.log(`The script '${url}'has loaded.'`);
  };

  script.onerror = () => {
  console.log('Error occurred while loading script');
  };

  document?.getElementById('scriptHolder')?.appendChild(script);
   
    // console.log(scriptHolder)
      })
return () => {
  
      document?.getElementById('scriptHolder')?.remove();
    }
  }, []);
};
export default useImportScript;