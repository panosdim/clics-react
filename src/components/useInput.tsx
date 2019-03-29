import {useState} from "react";

export const useInput = (initialValue, initialValid) => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setValid] = useState(initialValid);

    return {
        value,
        reset: () => {
            setValue("");
            setValid(false);
        },
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
                setValid(event.target.validity.valid);
            },
            error: !isValid,
        }
    };
};