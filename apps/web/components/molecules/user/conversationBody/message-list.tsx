/**
 * Renders a list of messages in the conversation body.
 * @param messages - An array of Message objects to be displayed.
 * @param userImage - The URL of the image for the user's profile.
 * @param providerImage - The URL of the image for the provider's profile.
 * @returns A JSX element containing the list of messages.
 */

"use client";
import React from 'react';
import { Message } from 'ai';
import MessageItem from '@/components/molecules/user/conversationBody/message-item';
import { Divider } from '@nextui-org/react';

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