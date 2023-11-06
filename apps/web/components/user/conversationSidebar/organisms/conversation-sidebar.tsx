"use client"

import { useReducer, useState } from "react";
import { Badge, Button } from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi"
import { AiFillTag } from "react-icons/ai";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import SearchBar from "@/components/shared/molecules/search-bar";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import { ConversationActionType, conversationsReducer, filterConversations, sortConversationsByDate } from "../operations/sidebar-conversation-operations";
import { ConversationList } from "../molecules/conversation-list";
import TagMenuModal from "../molecules/tag-menu-modal";
import { sortTagsByName } from "../operations/sidebar-tag-operations";

interface ConversationSidebarProps {
    sidebarConversations: SidebarConversation[]; 
    sidebarTags: SidebarTag[];
}

export default function ConversationSidebar({sidebarConversations, sidebarTags}: ConversationSidebarProps): JSX.Element {
    const [conversations, conversationsDispatch] = useReducer(conversationsReducer, sortConversationsByDate(sidebarConversations))
    const [tags, setTags] = useState<SidebarTag[]>(sortTagsByName(sidebarTags))
    const [selectedTags, setSelectedTags] = useState<Set<number>>(new Set<number>())
    const [searchText, setSearchText] = useState<string>("");
    const [showingSidebar, setShowingSidebar] = useState<boolean>(true)
    const [tagMenuModalIsOpen, setTagMenuModalIsOpen] = useState<boolean>(false)
  
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
            conversationsDispatch({type: ConversationActionType.Create, conversationId: createdConversation.id, conversation: createdConversation})
            console.log("Success")
          })
        .catch((error) => {
            console.log(error)
        });
    }

    const handleSidebarVisibilityPress: (e: any) => void = (_) => {setShowingSidebar(!showingSidebar)}

    const handleTagButtonPress: (e: any) => void = (_) => {setTagMenuModalIsOpen(!tagMenuModalIsOpen)}

    const handleTagMenuModalClose: (newTags: SidebarTag[], newSelectedTags: Set<number>) => void = (newTags, newSelectedTags) => {
        setTagMenuModalIsOpen(false)
        setTags(newTags)
        setSelectedTags(newSelectedTags)
    }

    return (
        <div className="flex flex-row items-start space-x-3">
            <div className={`transition-all duration-200 linear h-screen bg-neutral-700 flex flex-col justify-start items-center space-y-5 overflow-hidden ${showingSidebar ?  "w-50  px-5" : "w-0"}`}>
                <Button className="w-full h-10 mt-5 bg-neutral-600" onPress={handleNewConversationPress}>
                    <p>New Conversation +</p>
                </Button>

                <div className="flex flex-row items-center space-x-2">
                    <SearchBar onTextChange={handleSearchTextChange} placeholder="Search conversations" takeFullWidth={false}/>

                    <Badge content={selectedTags.size} isInvisible={selectedTags.size === 0}>
                        <Button isIconOnly onPress={handleTagButtonPress}>
                            <AiFillTag/>
                        </Button>
                    </Badge>
                </div>
            
                <ConversationList conversations={filterConversations(conversations, searchText, selectedTags)} conversationsDispatch={conversationsDispatch}/>
            </div>

            <Button className="mt-5 w-2" isIconOnly onPress={handleSidebarVisibilityPress}>
                <PiSidebarSimple/>
            </Button>

            <TagMenuModal
            allowEditing
            initialSelectedTags={selectedTags}
            initialTags={tags}
            isOpen={tagMenuModalIsOpen}
            modalTitle="Tags"
            onModalClose={handleTagMenuModalClose}/>
        </div>
    ); 
}