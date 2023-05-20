import React, { useState, useEffect } from "react";
import { GetUserAccount } from "../components/services/userService"
// tao gia tri mac dinh cho con text tao gia tri khoi tao  the nao cung duoc vi du :null
const ThemeContext = React.createContext(null);


const ThemeProvider = ({ children }) => {
 
    const [color, setColor] = useState(false);

     const handleChangerColorTheme = ()=>{
        setColor(!color)
     }



   


    return (
        <ThemeContext.Provider value={{ color, handleChangerColorTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}


export { ThemeProvider, ThemeContext }