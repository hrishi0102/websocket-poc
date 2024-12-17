import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connection established");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setMessage(message.data);
    };
    return () => socket.close();
  }, []);

  if (!socket) {
    return <>Connecting to Socket server ...</>;
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter Message"
        onChange={(e) => {
          setInputMsg(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          socket.send(inputMsg);
        }}
      >
        Send
      </button>
      {message}
    </>
  );
}

export default App;
