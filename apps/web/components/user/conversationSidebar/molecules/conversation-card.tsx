import { useEffect, useRef, useState } from "react";
import type {
  MouseEventHandler,
  ChangeEvent,
  KeyboardEventHandler,
} from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Avatar, Card, Button } from "@nextui-org/react";
import { toast } from "sonner";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import SingleSelectionDropdown from "@/components/shared/molecules/single-selection-dropdown";
import type { SingleSelectionDropdownItem } from "@/types/component-types";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import { ConversationActionType } from "../operations/sidebar-conversation-operations";
import type { ConversationAction } from "../operations/sidebar-conversation-operations";

interface ConversationCardProps {
  conversation: SidebarConversation;
  dispatch: (action: ConversationAction) => void;
  isSelected: boolean;
  onClick: () => void;
}

export function ConversationCard({
  conversation,
  dispatch,
  isSelected,
  onClick,
}: ConversationCardProps): JSX.Element {
  const [title, setTitle] = useState<string>(conversation.title);
  const [tags, setTags] = useState<SidebarTag[]>(conversation.tags);
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [editingTags, setEditingTags] = useState<boolean>(false);
  const cardContainerRef = useRef<HTMLButtonElement | null>(null);

  console.log(tags);
  console.log(setTags);
  console.log(editingTags);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick: (e: MouseEvent) => void = (e) => {
    if (
      cardContainerRef.current &&
      !cardContainerRef.current.contains(e.target as Node)
    ) {
      setEditingTitle(false);
      setTitle(conversation.title);
    }
  };
  const handleTitleClick: MouseEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
  };
  const handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setTitle(e.target.value);
  };
  const handleTitleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      if (conversation.title !== title) {
        saveConversationTitle();
      } else {
        setEditingTitle(false);
      }
    }
  };

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
        setEditingTitle(false);
        dispatch({
          type: ConversationActionType.EditTitle,
          conversationId: conversation.id,
          title: updatedConversation.title,
        });
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
        dispatch({
          type: ConversationActionType.Delete,
          conversationId: conversation.id,
        });
        toast.success("Conversation removed.");
      })
      .catch((_) => {
        toast.error("The conversation couldn't be deleted.");
      });
  };
  
  const titleWhenNotEditing: JSX.Element = <p className="text-xs whitespace-nowrap overflow-scroll">{title}</p>;
  const titleWhenEditing: JSX.Element = (
    <input
      className="text-xs rounded-sm pr-10"
      onChange={handleTitleChange}
      onClick={handleTitleClick}
      onKeyDown={handleTitleKeydown}
      type="text"
      value={title}
    />
  );

  const singleSelectionListItems: SingleSelectionDropdownItem[] = [
    {
      key: "editTitle",
      name: "Edit Title",
      action: () => {
        setEditingTitle(true);
      },
    },
    {
      key: "editTags",
      name: "Edit Tags",
      action: () => {
        setEditingTags(true);
      },
    },
    {
      key: "delete",
      name: "Delete",
      style: "text-danger",
      action: () => {
        removeThisConversation();
      },
    },
  ];

  let cardBackgroundColor = "";
  if (isSelected) {
    cardBackgroundColor =
      "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-20";
  } else {
    cardBackgroundColor = editingTitle
      ? "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-20"
      : "bg-black bg-opacity-0 dark:bg-white dark:bg-opacity-0 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10";
  }

  return (
    <button
    onClick={onClick}
    ref={cardContainerRef}
    type="button"
    className="w-full group relative p-0"
  >
    <Card
      radius="none"
      className={`max-w-[200px] py-2 pl-2 pr-0 border-none rounded-md shadow-none hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-20 ${cardBackgroundColor}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Avatar
            className="h-6 w-6"
            radius="sm"
            src={conversation.model.provider.image}
          />

          <div className="flex items-center max-w-10 overflow-hidden">
            {editingTitle ? titleWhenEditing : titleWhenNotEditing}
          </div>
        </div>

        {/* Botón como overlay */}
        {isSelected && (
          <div className="absolute right-0 gradient-shadow-light-conversation-card dark:gradient-shadow-dark-conversation-card py-2 pl-1">
            <SingleSelectionDropdown dropdownItems={singleSelectionListItems}>
              
                <Button isIconOnly size="sm" variant="light">
                  <AiOutlineEdit />
                </Button>
              
            </SingleSelectionDropdown>
          </div>
        )}
      </div>
    </Card>
  </button>
  );
}
