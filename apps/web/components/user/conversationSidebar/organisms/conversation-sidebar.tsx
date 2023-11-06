"use client"

import { useReducer, useState } from "react";
import { Badge, Button, Divider } from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi"
import { AiFillTag, AiOutlinePlus } from "react-icons/ai";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import SearchBar from "@/components/shared/molecules/search-bar";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import {
    ConversationActionType,
    conversationsReducer,
    filterConversations,
    sortConversationsByDate
} from "../operations/sidebar-conversation-operations";
import { ConversationList } from "../molecules/conversation-list";
import TagMenuModal from "../molecules/tag-menu-modal";
import { sortTagsByName } from "../operations/sidebar-tag-operations";
import UserCard from "../molecules/user-card";

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
  
    // Handler function for updating the search text
    const handleSearchTextChange: (value: string) => void = (value) => {setSearchText(value)}

    // Handler function for creating a new conversation on button press
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

    // Handler function for toggling the visibility of the sidebar
    const handleSidebarVisibilityPress: (e: any) => void = (_) => {setShowingSidebar(!showingSidebar)}

    const handleTagButtonPress: (e: any) => void = (_) => {setTagMenuModalIsOpen(!tagMenuModalIsOpen)}

    const handleTagMenuModalClose: (newTags: SidebarTag[], newSelectedTags: Set<number>) => void = (newTags, newSelectedTags) => {
        setTagMenuModalIsOpen(false)
        setTags(newTags)
        setSelectedTags(newSelectedTags)
    }

    // Rendering the sidebar with its contained components and data
    return (
        <div className="flex flex-row items-start space-x-0 absolute z-50 md:z-auto md:relative pt-0 bg-black" suppressHydrationWarning>
            {/* Sidebar section */}
            <div className={`transition-all duration-200 linear h-screen bg-transparent flex flex-col justify-start items-center space-y-5 overflow-hidden ${showingSidebar ?  "w-50  px-5" : "w-0"}`}>
                <div className="w-full flex items-center gap-1 justify-between">
                    <Button className="w-full h-10 mt-5 bg-neutral-600" onPress={handleNewConversationPress}>
                        <p className="text-xs"><AiOutlinePlus/></p>
                        <p className="text-xs">New Chat</p>
                    </Button>

                    {/* Sidebar toggle button */}
                    <Button
                    className={`${showingSidebar ? "block" : "inline"} mt-3 dark`}
                    isIconOnly
                    onPress={handleSidebarVisibilityPress}
                    radius="sm">
                        <div className="flex justify-center">
                            <PiSidebarSimple />
                        </div>
                    </Button>
                </div>

                {/* Search and tag filter section */}
                <div className="flex flex-row items-center space-x-2">
                    {/* Search bar component */}
                    <SearchBar onTextChange={handleSearchTextChange} placeholder="Search conversations" takeFullWidth={false}/>

                    <Badge content={selectedTags.size} isInvisible={selectedTags.size === 0}>
                        <Button isIconOnly onPress={handleTagButtonPress}>
                            <AiFillTag/>
                        </Button>
                    </Badge>
                </div>

                <Divider className="dark my-0"/>
            
                <ConversationList conversations={filterConversations(conversations, searchText, selectedTags)} conversationsDispatch={conversationsDispatch}/>

                {/* User Information Component */}
                <UserCard avatarUrl="https://i.pravatar.cc/150?u=a04258114e29026702d" description="" name="Jane Doe"/>
            </div>

            {/* Sidebar toggle button */}
            <Button
            className={`${showingSidebar ? "hidden" : "block"}  w-2 absolute -right-14 z-50 top-3`}
            isIconOnly
            onPress={handleSidebarVisibilityPress}
            radius="sm">
                <div className="flex justify-center">
                    <PiSidebarSimple />
                </div>
            </Button>

            <TagMenuModal
            allowEditing
            initialSelectedTags={selectedTags}
            initialTags={tags}
            isOpen={tagMenuModalIsOpen}
            modalTitle="Tags"
            onModalClose={handleTagMenuModalClose}/>

            {/* Sidebar toggle button */}
            <Button
            className={`${showingSidebar ? "hidden" : "block"}  w-2 absolute -right-14 z-50 top-3`}
            isIconOnly
            onPress={handleSidebarVisibilityPress}
            radius="sm">
                <div className="flex justify-center">
                    <PiSidebarSimple/>
                </div>
            </Button>
        </div>
    ); 
}