import React from "react"
import ChatHeader from "./chatHeader"
import MatchesDisplay from "./matchesDisplay"
import ChatDisplay from "./chatDisplay"

const ChatContainer = () =>{
    return(
        <div className="chat-container">
            <ChatHeader/>
            <div>
                <button className="option">Matches</button>
                <button className="option">Chat</button>
            </div>
            <MatchesDisplay/>

            <ChatDisplay/>
        </div>
    )
}


export default ChatContainer