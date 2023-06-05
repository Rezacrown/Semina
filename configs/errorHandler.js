import { toast } from "react-toastify";

export default function errorHandler(error) {
  if (error) {
    let message;
    if (error.response) {
      message = error.response.data.msg || 'internal server error';

      if (typeof message === "string") {
        toast.error(message)
      };

      return Promise.reject(error);
    }
  }
}
