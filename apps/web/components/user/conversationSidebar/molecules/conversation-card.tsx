import { useEffect, useRef, useState } from "react";
import type {MouseEventHandler, ChangeEvent, KeyboardEventHandler,
} from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Avatar, Card, Button } from "@nextui-org/react";
import { toast } from "sonner";
import type { Tag } from "@prisma/client";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import SingleSelectionDropdown from "@/components/shared/molecules/single-selection-dropdown";
import type { SingleSelectionDropdownItem } from "@/types/component-types";
import type { ConversationsAction } from "@/helpers/sidebar-conversation-helpers";
import { ConversationsActionType, buildTagSet  } from "@/helpers/sidebar-conversation-helpers";
import { SetToArray } from "@/helpers/set-helpers";
import { mapTagIdsToTags } from "@/helpers/tag-helpers";
import TagMenuModal from "./tag-menu-modal";

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

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleTitleClick: MouseEventHandler<HTMLInputElement> = (e) => {e.stopPropagation();
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

  const handleTagMenuModalClose: (newTags: Tag[], newSelectedTags: Set<number>) => void = (_, newSelectedTags) => {
    if (newSelectedTags.size !== conversationTags.size){
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
        setEditingTitle(false);
        conversationsDispatch({
          type: ConversationsActionType.EditTitle,
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
      body: JSON.stringify({ tags: mapTagIdsToTags(SetToArray(newSelectedTags), userTags)}),
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
    <p className="text-xs text-white whitespace-nowrap overflow-scroll">
      {title}
    </p>
  );

  const titleWhenEditing: JSX.Element = (
    <input
      className="text-xs text-white rounded-sm pr-10"
      onChange={handleTitleChange}
      onClick={handleTitleClick}
      onKeyDown={handleTitleKeydown}
      type="text"
      value={title}
    />
  );

  const singleSelectionListItems: SingleSelectionDropdownItem[] = [
    {key: "editTitle", name: "Edit Title", action: () => {setEditingTitle(true);}},
    {key: "editTags", name: "Edit Tags", action: () => {setTagMenuModalIsOpen(true);}},
    {key: "delete", name: "Delete", style: "text-danger", action: () => {removeThisConversation();}},
  ];

  let cardBackgroundColor = "";
  if (isSelected) {
    cardBackgroundColor = "bg-white bg-opacity-20";
  } else {
    cardBackgroundColor = editingTitle ? "bg-white bg-opacity-20" : "bg-white bg-opacity-0 hover:bg-white hover:bg-opacity-10";
  }

  return (
    <button
      className="w-full group relative p-0"
      onClick={onClick}
      ref={cardContainerRef}
      type="button"
    >
      <Card
        className={`max-w-[200px] py-2 pl-2 pr-0 border-none rounded-md shadow-none hover:bg-white hover:bg-opacity-20 ${cardBackgroundColor}`}
        radius="none"
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <Avatar className="h-6 w-6" radius="sm" src={conversation.model.provider.image}/>

            <div className="flex items-center max-w-10 overflow-hidden">
              {editingTitle ? titleWhenEditing : titleWhenNotEditing}
            </div>
          </div>

          {/* Button as overlay */}
          {isSelected ? (
            <div className="absolute right-0 gradient-shadow-dark-conversation-card py-2 pl-1">
              <SingleSelectionDropdown
                dropdownItems={singleSelectionListItems}
                placement="right"
              >
                <Button
                  className="text-white bg-inherit"
                  isIconOnly
                  size="sm"
                  variant="solid"
                >
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
