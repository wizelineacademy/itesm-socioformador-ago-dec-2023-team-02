import { useEffect, useRef, useState } from "react";
import type { KeyboardEventHandler, MouseEventHandler } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Avatar, Card, Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import type { Tag } from "@prisma/client";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import SingleSelectionDropdown from "@/components/shared/molecules/single-selection-dropdown";
import type { SingleSelectionDropdownItem } from "@/types/component-types";
import type { ConversationsAction } from "@/helpers/sidebar-conversation-helpers";
import { ConversationsActionType, buildTagSet, isValidConversationName  } from "@/helpers/sidebar-conversation-helpers";
import { setToArray, setsAreEqual } from "@/helpers/set-helpers";
import { mapTagIdsToTags } from "@/helpers/tag-helpers";
import { imposeMaxLength, trimLeadingSpaces } from "@/helpers/string-helpers";
import ConversationTitleControls from "../atoms/conversation-title-controls";
import TagMenuModal from "../../tagMenu/molecules/tag-menu-modal";

interface ConversationCardProps {
  userTags: Tag[];
  conversation: SidebarConversation;
  conversationsDispatch: (action: ConversationsAction) => void;
  isSelected: boolean;
  onClick: () => void;
}

export function ConversationCard({userTags, conversation, conversationsDispatch, isSelected, onClick,}: ConversationCardProps): JSX.Element {
  const [title, setTitle] = useState<string>(conversation.title);
  const [conversationTags, setConversationTags] = useState<Set<number>>(buildTagSet(conversation));
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [tagMenuModalIsOpen, setTagMenuModalIsOpen] = useState<boolean>(false);
  const cardContainerRef = useRef<HTMLButtonElement | null>(null);
  const titleMaxLength = 20

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  const handleOutsideClick: (e: MouseEvent) => void = (e) => {
    if (cardContainerRef.current && !cardContainerRef.current.contains(e.target as Node)){
      setTitle(conversation.title);
      setEditingTitle(false);
    }
  };

  const handleTitleClick: MouseEventHandler<HTMLInputElement> = (e) => {e.stopPropagation();};

  const handleTitleChange: (value: string) => void = (value) => {
    setTitle(imposeMaxLength(trimLeadingSpaces(value), titleMaxLength));
  };

  const handleTitleConfirmPress: () => void = () => {
    saveConversationTitle();
  };

  const handleTitleCancelPress: () => void = () => {
    setTitle(conversation.title)
    setEditingTitle(false)
  }

  const handleTitleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      if (conversation.title !== title && isValidConversationName(title)) {
        saveConversationTitle();
      } else {
        setEditingTitle(false);
      }
    }
  };

  const handleTagMenuModalClose: (newTags: Tag[], newSelectedTags: Set<number>) => void = (_, newSelectedTags) => {
    if (!setsAreEqual<number>(conversationTags, newSelectedTags)){
      saveTagSelection(newSelectedTags)
    }
    setTagMenuModalIsOpen(false)
  }

  const saveConversationTitle: () => void = () => {
    const fetchOptions: RequestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    };
    fetch(`/api/conversations/${conversation.id}`, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((updatedConversation) => {
        conversationsDispatch({
          type: ConversationsActionType.EditTitle,
          conversationId: conversation.id,
          title: updatedConversation.title,
        });
        setEditingTitle(false);
        toast.success("Conversation title updated.");
      })
      .catch((_) => {
        toast.error("The conversation's title couldn't be updated.");
      });
  };

  const removeThisConversation: () => void = () => {
    const fetchOptions: RequestInit = { method: "DELETE" };
    fetch(`/api/conversations/${conversation.id}`, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        conversationsDispatch({
          type: ConversationsActionType.Delete,
          conversationId: conversation.id,
        });
        toast.success("Conversation removed.");
      })
      .catch((_) => {
        toast.error("The conversation couldn't be deleted.");
      });
  };

  const saveTagSelection: (newSelectedTags: Set<number>) => void = (newSelectedTags) => {
    const fetchOptions: RequestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags: mapTagIdsToTags(setToArray(newSelectedTags), userTags)}),
    };
    fetch(`/api/conversations/${conversation.id}`, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((updatedConversation) => {
        setConversationTags(newSelectedTags)
        conversationsDispatch({
          type: ConversationsActionType.EditTags,
          conversationId: conversation.id,
          tags: updatedConversation.tags as Tag[],
        });
        toast.success("Conversation tags updated.");
      })
      .catch((_) => {
        toast.error("The conversation's tags couldn't be updated.");
      });
  }

  const titleWhenNotEditing: JSX.Element = (
    <div className="overflow-scroll scrollbar-hide">
        <p className="text-xs text-white whitespace-nowrap">{title}</p>
    </div>
  );

  const titleWhenEditing: JSX.Element = (
    <Input
      classNames={{input: "text-xs text-white rounded-sm", inputWrapper: "h-unit-6 min-h-unit-0 px-1"}}
      fullWidth
      onClick={handleTitleClick}
      onKeyDown={handleTitleKeydown}
      onValueChange={handleTitleChange}
      size="sm"
      value={title}
      variant="bordered"
    />
  );

  const singleSelectionListItems: SingleSelectionDropdownItem[] = [
    {key: "rename", name: "Rename", action: () => {setEditingTitle(true);}},
    {key: "editTags", name: "Edit Tags", action: () => {setTagMenuModalIsOpen(true);}},
    {key: "delete", name: "Delete", style: "text-danger", action: () => {removeThisConversation();}},
  ];

  let cardBackgroundColor = "";
  if (isSelected) {
    cardBackgroundColor = "bg-white bg-opacity-20";
  } else {
    cardBackgroundColor = editingTitle ? "bg-white bg-opacity-20" : "bg-white bg-opacity-0 hover:bg-white hover:bg-opacity-10";
  }

  let avatarBackgroundColor = "";
  if (conversation.model.name === "gpt-4") {
    avatarBackgroundColor = "bg-purple-400 bg-opacity-80";
  } else if(conversation.model.name === "dalle") {
    avatarBackgroundColor = "bg-sky-400 bg-opacity-80";
  } else {
    avatarBackgroundColor = "bg-green-400 bg-opacity-80";
  }

  return (
    <button className="w-full group relative p-0" onClick={onClick} ref={cardContainerRef} type="button">
      <Card
        className={`py-2 pl-2 pr-0 border-none rounded-md shadow-none hover:bg-white hover:bg-opacity-20 ${cardBackgroundColor}`}
        fullWidth
        radius="none"
      >
        <div className="flex flex-row gap-2 justify-start items-center px-1">
          <Avatar classNames={{base:`p-1 min-w-unit-6 h-6 w-6 ${avatarBackgroundColor}`}} radius="sm" src={conversation.model.provider.image}/>

          {editingTitle ? titleWhenEditing : titleWhenNotEditing}

          {editingTitle ?
          <ConversationTitleControls
            disableConfirmButton={title === conversation.title || !isValidConversationName(title)}
            onCancelPress={handleTitleCancelPress}
            onConfirmPress={handleTitleConfirmPress}
          />
          : null}

          {/* Button as overlay */}
          {isSelected && !editingTitle ? (
            <div className="absolute right-0 gradient-shadow-dark-conversation-card py-2 pl-1">
              <SingleSelectionDropdown dropdownItems={singleSelectionListItems} placement="right">
                <Button className="text-white bg-inherit" isIconOnly size="sm" variant="solid">
                  <AiOutlineEdit />
                </Button>
              </SingleSelectionDropdown>
            </div>
          ) : null}
        </div>
      </Card>

      <TagMenuModal
        allowEditing={false}
        initialSelectedTags={conversationTags}
        initialTags={userTags}
        isOpen={tagMenuModalIsOpen}
        modalTitle="Conversation tags"
        onModalClose={handleTagMenuModalClose}
      />
    </button>
  );
}