import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  return { 
    mode,
    transition: (newMode, replace = false) => {
      setMode(newMode);
      if(replace) {
        setHistory(prev => [...prev.slice(0, prev.length-1), newMode]); // Replace previous mode with the current 
        console.log(
          "history", history,
          "newMode", newMode
        );
      } else {
        setHistory(prev => ([...prev, newMode]));
        console.log(
          "history", history,
          "newMode", newMode
        );
      }
    },
    back: () => {
      if(history.length > 1) {
        setHistory([...history.slice(0, history.length-1)]); // Remove the current node
        setMode(history.slice(-2)[0]); // Previous mode is now the new mode
      }
    }
  };
}