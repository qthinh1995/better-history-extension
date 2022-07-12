/*global chrome*/
import React, { useEffect, useState } from "react";

import HistoryItem from "./components/HistoryItem";
import { saveDataToStorage, getDataFromStorage } from "./utils";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [url, setUrl] = useState();
  const [history, setHistory] = useState([]);
  console.log("history: ", history);

  /**
   * Get current URL
   */
  useEffect(() => {
    (async () => {
      const history = (await getDataFromStorage("history")) || [];
      setHistory(history);
    })();
  }, []);

  return (
    <div className="App">
      {history.map((historyItem) => (
        <HistoryItem {...historyItem} />
      ))}
    </div>
  );
}

export default App;
