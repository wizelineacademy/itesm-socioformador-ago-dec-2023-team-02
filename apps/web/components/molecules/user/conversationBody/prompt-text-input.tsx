"use client"
import React from "react";
import { Textarea, Button, Divider } from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";

export default function PromptTextInput() {
    return (
        <div className="w-full fixed bottom-0 pb-4 z-10 md:gradient-shadow-light md:dark:gradient-shadow-dark bg-white dark:bg-black py-0">
            <Divider className="my-0 py-0 md:hidden" />
            <div className="flex flex-col justify-center items-center max-w-[750px] md:w-11/12 mx-auto p-2">
                <div className="flex justify-between items-center w-full mt-2 mb-1">
                    {/* Tokens Placeholder */}
                    <div className="ml-2">
                        .
                    </div>
                </div>
                <div className="flex items-center w-full rounded-xl">
                    {/* Textarea field */}
                    <Textarea
                        placeholder="Send Message"
                        className="flex-grow p-0 mr-2"
                        maxRows={3}
                    />
                    {/* Send button */}
                    <Button
                    size="lg"
                    isIconOnly
                        className="text-white rounded-r-xl"
                    >
                        <IoMdSend className="text-lg"  />
                    </Button>
                </div>
            </div>
        </div>
    );
}
