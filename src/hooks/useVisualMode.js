import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  return { 
    mode,
    transition: (newMode, replace = false) => {
      setMode(newMode);
      if(replace) {
        history[history.length-1] = newMode; // Replace previous mode with the current mode
        setHistory(history);
      } else {
        setHistory([...history, newMode]);
      }
    },
    back: () => {
      if(history.length > 1) {
        history.pop(); // Remove current mode
        setHistory(history);
        setMode(history[history.length-1]); // Previous mode is now at the end of the array
      }
    }
  };
}