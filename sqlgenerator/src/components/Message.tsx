interface UserMessage {
    role: string,
    content: string
  };
  
  interface MessageProps{
    message: UserMessage
  };
  
  const Message = ({ message }: MessageProps) => {
      return (
        <div className="message">
          {message.role === "user" ? (
            <p id="icon">۞</p>
          ) : (
            <p id="icon"></p>
          )}
          <p>{message.content}</p>
        </div>
      );
    };
    
    export default Message;