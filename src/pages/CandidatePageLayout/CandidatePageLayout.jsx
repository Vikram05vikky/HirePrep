// import React from "react";
// import { Outlet } from "react-router-dom";
// import TestNavBar from "../../Components/TestNavBar/TestNavBar";
// import Chatbot from "react-chatbot-kit";

// // import config from "./configs/chatbotConfig";
// // import MessageParser from "./chatbot/MessageParser";
// // import ActionProvider from "./chatbot/ActionProvider";

// import config from "../../Components/Chat-bot/configs";
// import MessageParser from "../../Components/Chat-bot/MessageParser";
// import ActionProvider from "../../Components/Chat-bot/ActionProvider";

// const CandidatePageLayout = () => {
//   return (
//     <>
//       <div className="h-screen overflow-y-scroll relative ">
//         <TestNavBar />
//         <Outlet />
//          <Chatbot
//         config={config}
//         messageParser={MessageParser}
//         actionProvider={ActionProvider}
//       />
//       </div>
//     </>
//   );
// };

// export default CandidatePageLayout;


import React from "react";
import { Outlet } from "react-router-dom";
import TestNavBar from "../../Components/TestNavBar/TestNavBar";


const CandidatePageLayout = () => {
  return (
    <div className="h-screen overflow-y-scroll relative">
      <TestNavBar />
      <Outlet />
      
      {/* Chatbot wrapper with bottom-right positioning */}
      <div className="fixed bottom-4 right-4 z-50">
        
      </div>
    </div>
  );
};

export default CandidatePageLayout;
