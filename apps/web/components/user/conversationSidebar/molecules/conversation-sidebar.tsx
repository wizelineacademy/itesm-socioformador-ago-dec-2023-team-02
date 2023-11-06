"use client";

import { useReducer, useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import MultipleSelectionDropdown from "@/components/shared/molecules/multiple-selection-dropdown";
import SearchBar from "@/components/shared/molecules/search-bar";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import {
  ConversationActionType,
  conversationReducer,
  filterConversations,
  sortConversationsByDate,
} from "../operations/sidebar-conversation-operations";
import { tagsToListItems } from "../operations/sidebar-tag-operations";
import { ConversationList } from "./conversation-list";

interface ConversationSideBarProps {
  sidebarConversations: SidebarConversation[];
  sidebarTags: SidebarTag[];
}

export default function ConversationSideBar({
  sidebarConversations,
  sidebarTags,
}: ConversationSideBarProps): JSX.Element {
  const [conversations, dispatch] = useReducer(
    conversationReducer,
    sortConversationsByDate(sidebarConversations)
  );
  const [tags, setTags] = useState<SidebarTag[]>(sidebarTags);
  const [selectedTags, setSelectedTags] = useState<SidebarTag[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [showingSidebar, setShowingSidebar] = useState<boolean>(true);

  console.log(setTags);

  // Handler function for updating the search text
  const handleSearchTextChange: (value: string) => void = (value) => {
    setSearchText(value);
  };

  // Handler function for creating a new conversation on button press
  const handleNewConversationPress: (e: any) => void = (_) => {
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Conversation",
        idUser: 1,
        idModel: 1,
      }),
    };
    fetch(`/api/conversations`, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((createdConversation) => {
        dispatch({
          type: ConversationActionType.Create,
          conversationId: createdConversation.id,
          conversation: createdConversation,
        });
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handler function for toggling the visibility of the sidebar
  const handleSidebarVisibilityPress: (e: any) => void = (_) => {
    setShowingSidebar(!showingSidebar);
  };

  // Handler function for updating selected tags when the dropdown closes
  const handleMultipleSelectionDropdownClosing: (
    selectedItems: string[]
  ) => void = (selectedItems) => {
    const selectedItemsSet: Set<string> = new Set<string>(selectedItems);
    setSelectedTags(
      tags.filter((tag) => selectedItemsSet.has(tag.id.toString()))
    );
    console.log("selectedTags", selectedTags);
  };
  // Rendering the sidebar with its contained components and data
  return (
    <div
      className="flex flex-row items-start space-x-0 absolute z-50 md:z-auto md:relative pt-0 bg-black"
      suppressHydrationWarning
    >
      {/* Sidebar section */}
      <div
        className={`transition-all duration-200 linear h-screen bg-transparent flex flex-col justify-start items-center space-y-5 overflow-hidden border-yellow-50 ${
          showingSidebar ? "w-50  px-5" : "w-0"
        }`}
      >
        {/* New Conversation button */}
        <Button
          className="w-full mt-5 lg:h-16"
          color="danger"
          onPress={handleNewConversationPress}
          radius="sm"
        >
          <p className="text-xs">
            <AiOutlinePlus />
          </p>
          <p className="text-xs">New Chat</p>
        </Button>

        {/* Search and tag filter section */}
        <div className="flex flex-row items-center space-x-2">
          {/* Search bar component */}
          <SearchBar
            onTextChange={handleSearchTextChange}
            overridingStyle="w-full text-sm shadow-none dark text-white"
            placeholder="Search Chat"
            takeFullWidth={false}
          />
        </div>

        {/* Tag filter section */}
        {/* Multiple selection dropdown for tags */}

        <div className="scrollbar-hide">
          <div className="w-full h-full bg-black rounded-lg overflow-hidden">
            <MultipleSelectionDropdown
              dropdownItems={tagsToListItems(tags)}
              onCloseAction={handleMultipleSelectionDropdownClosing}
              selectedDropdownItems={selectedTags.map((tag) =>
                tag.id.toString()
              )}
            >
              <button className="w-full h-full" type="button">
                {selectedTags.length}
              </button>
            </MultipleSelectionDropdown>
          </div>
        </div>

        <Divider className="dark my-0" />
        {/* Conversation list section */}
        <ConversationList
          conversations={filterConversations(
            conversations,
            searchText,
            selectedTags
          )}
          dispatch={dispatch}
        />
      </div>

      {/* Sidebar toggle button */}
      <Button
        className="mt-5 w-2 absolute -right-14 z-50 -top-2"
        isIconOnly
        onPress={handleSidebarVisibilityPress}
        radius="sm"
      >
        <PiSidebarSimple />
      </Button>
    </div>
  );
}
