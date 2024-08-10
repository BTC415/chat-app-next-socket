import React from 'react';
import { useRouter } from 'next/navigation';
interface ChatBodyProps {
  messages: any[],
  typingStatus: string,
  lastMessageRef: React.RefObject<HTMLDivElement>
}

const ChatBody: React.FC<ChatBodyProps> = ({ messages, typingStatus, lastMessageRef }) => {
  const router = useRouter();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    router.push('/');
  };

  return (
    <>
      <header className="w-full h-[10vh] flex items-center justify-between p-5 bg-[#f9f5eb]">
        <p>Hangout with Colleagues</p>
        <button className=" p-2.5 w-36 border-none outline-none bg-[#d1512d] cursor-pointer rounded-md text-[#eae3d2]" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="w-full h-[80vh] bg-white p-5 overflow-y-scroll">
        {messages.map((message) => message.name === localStorage.getItem('userName') ? (
          <div className="text-xs" key={message.id}>
            <p className="text-right">You</p>
            <div className="bg-[rgb(194,243,194)] max-w-[300px] p-2.5 rounded-lg ml-auto text-base">
              <p>{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="text-xs" key={message.id}>
            <p>{message.name}</p>
            <div className="bg-[#f5ccc2] w-[300px] p-2.5 rounded-lg text-base">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {/*This is triggered when a user is typing*/}
        <div className="fixed bottom-[50px] text-xs italic">
          <p>
            {typingStatus}
          </p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;