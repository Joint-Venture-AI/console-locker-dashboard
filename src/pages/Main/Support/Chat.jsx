import { useEffect, useState } from 'react'
import SupportChatHeader from '../../../layouts/Main/SupportChatHeader';

const Chat = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 0);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
  return (
    <div>
       <div className={`w-full z-10 transition-all ${
          isScrolled
            ? "sticky top-0 bg-white shadow-md p-0"
            : "sticky top-0 bg-transparent p-[24px]"
        }`}>
          <SupportChatHeader />
        </div>
    </div>
  )
}

export default Chat
