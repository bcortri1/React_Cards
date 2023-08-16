import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const useToggleState = (intialState = false) => {
    const [state, setState] = useState(intialState);
    const toggle = () => {
        setState((state) => !state);
    };
    return [state, toggle];
}

const useAxios = (baseUrl) => {
    const [stateArr, setState] = useState([]);

    const addToArr = (response) => {
        setState((stateArr) => [...stateArr, { ...response.data, id: uuid() }]);
    }

    const makeRequest = async (extraUrl="") => {
        try {
            const response = await axios.get(baseUrl+extraUrl);
            addToArr(response);
        }
        catch (err) {
            console.error(err)
        }
    };

    return [stateArr, makeRequest];
}


export { useToggleState, useAxios };