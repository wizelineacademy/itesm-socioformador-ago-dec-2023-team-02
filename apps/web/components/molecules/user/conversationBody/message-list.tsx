"use client";
import React from 'react';
import { Message } from 'ai';
import MessageItem from '@/components/molecules/user/conversationBody/message-item';
import { Divider } from '@nextui-org/react';

/**
 * Props for the MessageList component
 * @interface
 */
/*
interface MessageListProps {
    // Array of messages to be displayed 
    messages: Message[];
    // Image URL for the sender of the message 
    senderImage: string;
}
*/

/**
 * Component that displays a list of messages
 * @param {MessageListProps} props - Component props
 * @param {Message[]} props.messages - Array of messages to be displayed
 * @param {string} props.senderImage - Image URL for the sender of the message
 * @returns {JSX.Element} - Rendered component
 */
export default function MessageList({ messages, userImage, providerImage }: { messages: Message[], userImage: string, providerImage: string }): JSX.Element {
    return (
        <>
            {/* Messages display */}
                {messages.map((message, index) => (
                    <>
                        <MessageItem
                            key={index}
                            message={message}
                            senderImage={message.role === "user" ? userImage : providerImage}
                        //creditsUsed={message.creditsUsed}
                        />
                        <Divider className="my-0" />
                    </>
                ))}
        </>
    );
};