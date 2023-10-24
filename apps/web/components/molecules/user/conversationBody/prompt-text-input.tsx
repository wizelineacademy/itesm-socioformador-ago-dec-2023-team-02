"use client";
import React from "react";
import { Textarea, Button } from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";
import CreditsBadge from "@/components/atoms/credits-badge";

export default function PromptTextInput() {
    return (
        <div className="w-full fixed bottom-0 pb-4 z-10 gradient-shadow-light dark:gradient-shadow-dark py-0">
            <div className="flex flex-col justify-center items-center max-w-[750px] md:w-11/12 mx-auto p-2">
                <div className="flex justify-between items-center w-full mt-2 mb-1">
                    {/* Tokens Placeholder */}
                    <div className="ml-2">
                        <CreditsBadge creditsUsed={0.5} />
                    </div>
                </div>
                <div className="flex items-center w-full rounded-xl">
                    {/* Textarea field */}
                    <Textarea
                        placeholder="Send Message"
                        className="flex-grow p-0 mr-2"
                        isMultiline
                        variant="faded"
                        maxRows={2}
                    />
                    {/* Send button */}
                    <Button
                        size="lg"
                        isIconOnly
                        variant="flat"
                        className="text-white  rounded-r-xl"
                    >
                        <IoMdSend className="text-lg" />
                    </Button>
                </div>
                <div className="absolute bottom-1 w-full text-center">
                <p className="p-0 m-0 text-xs text-slate-400 dark:text-slate-400 wizeline-brand:text-slate-200 text-center">
                        © 2023 Team SAM, developed by Wizeline.
                    </p>
                </div>

            </div>
        </div>
    );
}
