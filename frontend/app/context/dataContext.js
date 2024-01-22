import React, { useState, createContext } from 'react';

 const DataContext = createContext();
 const DataProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <DataContext.Provider value={{
         ...state, 
         setState: (data) => setState({...state, ...data})
       }}
    >
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };