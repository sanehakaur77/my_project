import { toast } from 'react-toastify';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 export const showSucess = (msg) => {
  toast.success(msg || 'Success!');
};

export const showError = (msg) => {
  toast.error(msg || 'Error occurred!');
};

