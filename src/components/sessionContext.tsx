import * as React from "react";

export interface SessionContextProps {
    selectedDate: Date;
    updateDate: (value: Date) => void;
}

export const SessionContext =
    React.createContext<SessionContextProps>({
        selectedDate: new Date(),
        updateDate: () => { },
    });

export const SessionProvider: React.FunctionComponent = (props) => {
    const [selectedDate, setDate] = React.useState(new Date());

    return (
        <SessionContext.Provider value={{ selectedDate, updateDate: setDate }}>
            {props.children}
        </SessionContext.Provider>
    )
}
