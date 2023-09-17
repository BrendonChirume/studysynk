import {toast} from "react-toastify";

const notify = (message: string, type: "success" | "error" | "warning") => toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
});

export default notify;