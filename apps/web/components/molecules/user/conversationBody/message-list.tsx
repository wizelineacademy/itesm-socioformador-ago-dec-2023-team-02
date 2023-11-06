/**
 * Renders a list of messages in the conversation body.
 * @param messages - An array of Message objects to be displayed.
 * @param userImage - The URL of the image for the user's profile.
 * @param providerImage - The URL of the image for the provider's profile.
 * @returns A JSX element containing the list of messages.
 */

"use client";
import React, {useEffect, useRef, useState} from 'react';
import { Message } from 'ai';
import MessageItem from '@/components/molecules/user/conversationBody/message-item';
import { Divider, Button } from '@nextui-org/react';
import { AiOutlineArrowDown } from "react-icons/ai";
import MessageItemImage from './message-item-image';


export default function MessageList({ messages, userImage, providerImage, model }: { messages: Message[], userImage: string, providerImage: string, model: string }): JSX.Element {

    const [autoScroll, setAutoScroll] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        if (autoScroll) {
            scrollToBottom();
            setAutoScroll(false);
        }
    }, [autoScroll]);


    return (
        <>
            {/* Messages display */}
            {messages.map((message, index) => (
                <>
                {
                    (model === "dalle" && message.role === "assistant")
                    ?
                    <>
                    <MessageItemImage
                        key={index}
                        message={message}
                        senderImage={providerImage}
                    //creditsUsed={message.creditsUsed}
                    />
                    <Divider className="my-0" />
                    </>
                    :
                    <>
                    <MessageItem
                        key={index}
                        message={message}
                        senderImage={message.role === "user" ? userImage : providerImage}
                    //creditsUsed={message.creditsUsed}
                    />
                    <Divider className="my-0" />
                    </>
                }
                </>
            ))}
            <div ref={messagesEndRef}></div>
            {/* Scroll to bottom button */}
            <div className="fixed z-20 bottom-28 right-5">
                <Button size='sm' radius='lg' isIconOnly onClick={() => { setAutoScroll(true); scrollToBottom(); }}>
                    <AiOutlineArrowDown />
                </Button>
            </div>
        </>
    );
}