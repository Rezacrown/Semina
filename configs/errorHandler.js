import { toast } from "react-toastify";

export default function errorHandler(error) {

  // console.log('error >>>>>>>>>>>>')
  // console.log(error)
  if (error) {
    let message;
    if (error.response) {
      message = error.response.data.msg || 'internal server error';


      switch (message) {
        case "Partisipan belum terdaftar": {
          message = `
        session expired 
        try Signup`;
          setTimeout(() => {
            window.location.replace("/signup");
          }, 3000);
        }
        case "Akun anda belum aktif, segera lakukan pendaftaran ulang": {
          setTimeout(() => {
            window.location.replace('/signup')
          }, 3000)
        }
        default:
          "internal server error";
      }

      if (typeof message === "string") {
        toast.error(message)
      }

      return Promise.reject(message);
    }
  }
}
