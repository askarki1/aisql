import { useEffect, useRef } from "react";
import Message from "./Message";

interface UserMessage {
  role: string,
  content: string
};

interface MessagesProps {
  userMessages: UserMessage[]
};

const Messages = ({ userMessages } : MessagesProps) => {

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [userMessages]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  return (
      <div className="messages" ref= {messagesRef}>
          {userMessages.map((userMessage, _index) =>
              <Message key = {_index} message={userMessage}/>)}
      </div>
    );
  }
  
  export default Messages;