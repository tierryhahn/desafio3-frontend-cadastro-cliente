import {createContext, useEffect} from "react";
import api from "../services/Api"
import { useState } from "react";

export const listApiContext = createContext([]);

export const ListApiProvider = ({children}) => {
    const id = localStorage.getItem("@CadastroClientes:id");
    const token = localStorage.getItem("@CadastroClientes:token");
    const [user, setUser] = useState({});
    const [listApi, setListApi] = useState([]);

    function callApi() {
        api
        .get(`/user/profile/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            setListApi(response.data.contacts);
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        return listApi;
    }

    useEffect(() => {
        callApi();
    }, []);

    return (
        <listApiContext.Provider value={{ listApi, setListApi, user, setUser }}>
        {children}
        </listApiContext.Provider>
    );
}