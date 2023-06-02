import React, { useState, useEffect } from "react";
import { GetUserAccount } from "../components/services/userService"
// tao gia tri mac dinh cho con text tao gia tri khoi tao  the nao cung duoc vi du :null
const NotificationContext = React.createContext(null);


const NotificationProvider = ({ children }) => {

    const [color, setColor] = useState(false);

    const handleChangerColorTheme = () => {
        setColor(!color)
    }






    return (
        <NotificationContext.Provider value={{ color, handleChangerColorTheme }}>
            {children}
        </NotificationContext.Provider>
    );
}


export { NotificationProvider, NotificationContext }