import { toast } from "react-toastify";

export default function errorHandler(error) {

  // console.log('error >>>>>>>>>>>>')
  // console.log(error)
  if (error) {
    let message;
    if (error.response) {
      message = error.response.data.msg || 'internal server error';

      if (message === 'Partisipan belum terdaftar') {
        message = `
        session expired 
        try Signup`
        setTimeout(()=> {
          window.location.replace('/signup');
        }, 3000)
      }

      if (typeof message === "string") {
        toast.error(message)
      }

      return Promise.reject(message);
    }
  }
}
