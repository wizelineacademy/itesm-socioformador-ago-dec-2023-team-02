"use client"
import React from "react";
import { Textarea, Button } from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";

export default function PromptTextInput() {
  //const [message, setMessage] = useState('');
  //const [credits, setCredits] = useState(0);

  /*
  const handleSendMessage = () => {
    // Handle send message logic
    // Update credits logic
    setCredits(credits + 1);  // Example logic for updating credits
  };
*/
  return (

    <div className=" w-full flex flex-col fixed bottom-0">
      <Textarea
        placeholder="Type your message here..."
        value={""}
        minRows={3}
        maxRows={10}
      />
      <div className="flex justify-between items-center mt-2">
        
        <Button >
          <IoMdSend />
        </Button>
      </div>
    </div>
  );
}