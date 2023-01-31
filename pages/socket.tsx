import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import type { Socket } from "socket.io-client";

interface MessageBody {
  username: string;
  message: string;
}

let socket: undefined | Socket;

const SocketPage = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState<MessageBody[]>([]);

  useEffect(() => {
    socketInitializer();

    return () => {
      socket?.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data: MessageBody) => {
      setAllMessages((pre) => [...pre, data]);
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("emitted");

    socket?.emit("send-message", {
      username,
      message,
    });

    setMessage("");
  }

  return (
    <div>
      <h1>Chat app</h1>
      <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <div>
        {allMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div>
    </div>
  );
};

export default SocketPage;