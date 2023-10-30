"use client"

import type { Tag } from "@prisma/client";
import { useReducer, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi"
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import MultipleSelectionList from "@/components/shared/molecules/multiple-selection-list";
import { ConversationActionType, conversationReducer, filterConversations, sortConversationsByDate } from "../sidebar-conversation-operations";
import { tagsToListItems } from "../tag-operationst";
import { ConversationList } from "./conversation-list";

interface ConversationSideBarProps {
    userConversations: SidebarConversation[]; 
    userTags: Tag[];
}

export default function ConversationSideBar({userConversations, userTags}: ConversationSideBarProps): JSX.Element {
    const [conversations, dispatch] = useReducer(conversationReducer, sortConversationsByDate(userConversations))
    const [tags, setTags] = useState<Tag[]>(userTags); 
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [searchText, setSearchText] = useState<string>("");
    const [showingSidebar, setShowingSidebar] = useState<boolean>(true)
    const sidebarTopPadding = 5

    const handleSearchTextChange: (value: string) => void = (value) => {setSearchText(value)}

    const handleNewConversationPress: (e: any) => void = (e) => {
        const fetchOptions: RequestInit = {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify({
            title: "New Conversation",
            idUser: 1,
            idModel: 1
        })}
        fetch(`/api/conversations`, fetchOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
        .then((createdConversation) => {
            dispatch({type: ConversationActionType.Create, conversationId: createdConversation.id, conversation: createdConversation})
            console.log("Success")
          })
        .catch((_) => {
            console.log("Error")
        });
    }

    const handleSidebarVisibilityPress: (e: any) => void = (_) => {setShowingSidebar(!showingSidebar)}

    const handleMultipleSelectionListClosing: (selectedItems: string[]) => void = (selectedItems) => {
        const selectedItemsSet: Set<string> = new Set<string>(selectedItems)
        setSelectedTags(tags.filter(tag => selectedItemsSet.has(tag.id.toString())))
    }

    return (
        <div className="flex flex-row items-start space-x-3">
            <div className={`h-screen bg-red-400 flex flex-col justify-start items-center px-5 space-y-5 overflow-hidden ${showingSidebar ?  "w-50" : "w-0"}`}>
                <Button className={`w-full h-10 mt-${sidebarTopPadding}`} onPress={handleNewConversationPress}>
                    <p>New Conversation +</p>
                </Button>
            
                <Input onValueChange={handleSearchTextChange} value={searchText}/>

                <div className="flex flex-row justify-center items-center space-x-5 p-2 bg-black">
                    <MultipleSelectionList
                        listItems={tagsToListItems(tags)}
                        onCloseAction={handleMultipleSelectionListClosing}
                        selectedListItems={selectedTags.map(tag => tag.id.toString())}>
                        <div>{selectedTags.length}</div>
                    </MultipleSelectionList>
                    <p>Tags</p>
                </div>

                <ConversationList
                conversations={filterConversations(conversations, searchText, selectedTags)}
                dispatch={dispatch}/>
            </div>

            <Button className={`mt-${sidebarTopPadding}`} onPress={handleSidebarVisibilityPress}>
                <PiSidebarSimple/>
            </Button>
        </div>
    ); 
}