import {toast} from "react-toastify";

export default function notify(message: string, type: "success" | "error" | "warning") {
    return toast[type](`${message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

