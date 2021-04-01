import React, {useContext, useState, useEffect} from 'react'

export const Authcontext = React.createContext()

export default  ({children}) => {
    const [verified, setVerified] = useState(false)
    return(
        <Authcontext.Provider value={{verified}}>
            {children}
        </Authcontext.Provider>
    )
}

