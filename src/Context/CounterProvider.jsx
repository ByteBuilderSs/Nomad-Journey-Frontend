import React, { useEffect, useState, useContext } from 'react';


// For GET
const CounterContext = React.createContext();
// For EDIT/DELETE
const CounterContextDispatcher = React.createContext();

const CounterProvider = ({ children }) => {
    const [Counter, setCounter] = useState(0);

    return (
        <CounterContext.Provider value={Counter}>
            <CounterContextDispatcher.Provider value={setCounter}>
                {children}
            </CounterContextDispatcher.Provider>
        </CounterContext.Provider>
    )
}

export default CounterProvider;

// Create  custome hooks to access your context all over the project

export const useCounter = () => useContext(CounterContext); // this returns Counter
export const useCounterActions = () => useContext(CounterContextDispatcher); // this returnes setCounter
