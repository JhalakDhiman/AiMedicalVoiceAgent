'use client'

import { createContext, useState } from "react";

export const SubscribeContext = createContext();

export const SubscribeContextProvider = ({ children }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);    
    return (
        <SubscribeContext.Provider value={{ isSubscribed, setIsSubscribed }}>
            {children}
        </SubscribeContext.Provider>
    );
}   