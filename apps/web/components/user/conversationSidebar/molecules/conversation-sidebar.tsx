"use client"

import type { Tag } from "@prisma/client";
import { useReducer, useState } from "react";
import { Button } from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi"
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import MultipleSelectionDropdown from "@/components/shared/molecules/multiple-selection-dropdown";
import SearchBar from "@/components/shared/molecules/search-bar";
import { ConversationActionType, conversationReducer, filterConversations, sortConversationsByDate } from "../operations/sidebar-conversation-operations";
import { tagsToListItems } from "../operations/tag-operationst";
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

    console.log(setTags)

    const handleSearchTextChange: (value: string) => void = (value) => {setSearchText(value)}

    const handleNewConversationPress: (e: any) => void = (_) => {
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
        .catch((error) => {
            console.log(error)
        });
    }

    const handleSidebarVisibilityPress: (e: any) => void = (_) => {setShowingSidebar(!showingSidebar)}

    const handleMultipleSelectionDropdownClosing: (selectedItems: string[]) => void = (selectedItems) => {
        const selectedItemsSet: Set<string> = new Set<string>(selectedItems)
        setSelectedTags(tags.filter(tag => selectedItemsSet.has(tag.id.toString())))
        console.log("selectedTags", selectedTags)
    }

    return (
        <div className="flex flex-row items-start space-x-3">
            <div className={`transition-all duration-200 linear h-screen bg-neutral-700 flex flex-col justify-start items-center space-y-5 overflow-hidden ${showingSidebar ?  "w-50  px-5" : "w-0"}`}>
                <Button className="w-full h-10 mt-5 bg-neutral-600" onPress={handleNewConversationPress}>
                    <p>New Conversation +</p>
                </Button>

                <div className="flex flex-row items-center space-x-2">
                    <SearchBar onTextChange={handleSearchTextChange} overridingStyle="w-3/4" placeholder="Search conversations" takeFullWidth={false}/>

                    <div className="w-1/4 h-full bg-black rounded-lg overflow-hidden">
                        <MultipleSelectionDropdown dropdownItems={tagsToListItems(tags)} onCloseAction={handleMultipleSelectionDropdownClosing}
                            selectedDropdownItems={selectedTags.map(tag => tag.id.toString())}>
                            <button className="w-full h-full" type="button">
                                {selectedTags.length}
                            </button>
                        </MultipleSelectionDropdown>
                    </div>
                </div>
            
                <ConversationList conversations={filterConversations(conversations, searchText, selectedTags)} dispatch={dispatch}/>
            </div>

            <Button className="mt-5 w-2" isIconOnly onPress={handleSidebarVisibilityPress}>
                <PiSidebarSimple/>
            </Button>
        </div>
    ); 
}