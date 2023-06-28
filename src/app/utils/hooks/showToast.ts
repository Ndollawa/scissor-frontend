import {toast} from 'react-toastify';
import { store } from '../../stores/store';
import 'react-toastify/dist/ReactToastify.css';


const version = store.getState().settingsConfig.dashboardConfig.layoutOptions.version
   console.log(version)
const showToast=(type:string, message:any)=>{
    message = message.toString()
 switch (type) {
        case 'success':
            toast.success(message,{
            position:"top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick:true,
            pauseOnHover:true,
            theme:version ==='light'? 'light':version ==='dark'? 'dark':'colored',
        })
            break;
        case 'info':
            toast.info(message,{
            position:"top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick:true,
            pauseOnHover:true,
            theme:version ==='light'? 'light':version ==='dark'? 'dark':'colored',
        })
            break;
        case 'error':
            toast.error(message,{
            position:"top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick:true,
            pauseOnHover:true,
            theme:version ==='light'? 'light':version ==='dark'? 'dark':'colored',
        })
            break;
        case 'warning':
            toast.warning(message,{
            position:"top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick:true,
            pauseOnHover:true,
            theme:version ==='light'? 'light':version ==='dark'? 'dark':'colored',
        })
            break;
    
        default:
            toast(message,{
                position:"top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick:true,
                pauseOnHover:true,
                theme:version ==='light'? 'light':version ==='dark'? 'dark':'colored',
            })
            break;
    }
   
}
export default showToast;