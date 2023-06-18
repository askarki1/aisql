import { useState } from "react";
import Messages from "./components/Messages";
import SQLout from "./components/SQLout";

interface ChatData {
  role: string,
  content: string
}

function App() {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getQuery();
    }
  };

  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      };
      const response = await fetch("http://localhost:8000/completions", options);
      const data = await response.json();
      const userMessage = {
        role: "user",
        content: value
      };
      setChat(oldChat => [...oldChat, userMessage, data]);
      setValue("");
    } catch (error) {
      console.error(error);
    };
  };

  const clearChat = () => {
    setValue("");
    setChat([]);
  };

  const latestcode = chat.filter(message => message.role === "assistant").pop()
  return (
    <div className="App">
      <Messages userMessages={chat}/>
      <div className="container">
        <input value={value} onChange={e => setValue(e.target.value)} onKeyUp={handleKeyPress} className="input-box"/>
        <button onClick={getQuery} className="submit-button">Submit</button>
      </div>
      <SQLout text={latestcode?.content || ""}/>
      <div className="button-container">
      <button id="clear-chat" onClick={clearChat}>Clear</button>
      </div>
    </div>
  );
}

export default App;
