import axios from "axios";

const token = localStorage.getItem ('token');
if (token)
    axios.defaults.headers.common["x-auth-token"] = token;