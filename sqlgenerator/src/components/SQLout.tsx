interface SQLout {
    text: string
  }
  
  const SQLout = ({ text }: SQLout) => {
      return (
        <div className="sqlout">
          <div className="header">
            <div className="language">sql</div>
            {/* <div className="clipboard"><button id="copy">copy</button></div> */}
          </div>
          <div className="code-output">
            <p>{text}</p>
          </div>
        </div>
      );
    }
    
    export default SQLout;