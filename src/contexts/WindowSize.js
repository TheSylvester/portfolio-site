import { createContext, useContext } from "react";

const WindowSizeContext = createContext({
  width: window.innerWidth,
  height: window.innerHeight,
});

const useWindowSizeContext = () => useContext(WindowSizeContext);

const WindowSizeProvider = ({ value, children }) => {
  return (
    <WindowSizeContext.Provider value={value}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export { WindowSizeProvider, useWindowSizeContext };
