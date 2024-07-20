// import { useNavigate } from "react-router-dom";
// import { getSenderDetails } from "./gettingsendername";

// export const useHandleSendMoney = () => {
//   const navigate = useNavigate();
//   const sender = getSenderDetails();

//   const handleSendMoney = (recipient:string) => {
//     if (!sender) {
//       console.error("Sender details not found");
//       return "Sender details not found";
//     }
//     navigate('/send', { state: { sender: sender.username, recipient } });
//   };

//   return handleSendMoney;
// };
