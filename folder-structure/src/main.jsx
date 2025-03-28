import { StrictMode, createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const startingDirectory = {
  1: {
    11: {
      111: {},
    },
    12: {
      121: {},
    },
  },

  2: {},

  3: {
    31: {},
  },
};

const DirectoryContext = createContext();

const DirectoryProvider = ({ children }) => {
  const [directory, setDirectory] = useState(startingDirectory);

  return (
    <DirectoryContext.Provider value={{ directory, setDirectory }}>
      {children}
    </DirectoryContext.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DirectoryProvider>
      <App />
    </DirectoryProvider>
  </StrictMode>
);

export default DirectoryContext;
