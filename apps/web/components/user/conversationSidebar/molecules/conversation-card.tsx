import { useEffect, useRef, useState } from "react";
import type { MouseEventHandler , ChangeEvent, KeyboardEventHandler } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Avatar } from "@nextui-org/react";
import { toast } from "sonner";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import SingleSelectionDropdown from "@/components/shared/molecules/single-selection-dropdown";
import type { SingleSelectionDropdownItem } from "@/types/component-types";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import { ConversationActionType } from "../operations/sidebar-conversation-operations";
import type {  ConversationAction } from "../operations/sidebar-conversation-operations";

interface ConversationCardProps {
    conversation: SidebarConversation;
    dispatch: (action: ConversationAction) => void; 
    isSelected: boolean; 
    onClick: () => void; 
}

export function ConversationCard({conversation, dispatch, isSelected, onClick}: ConversationCardProps): JSX.Element {
    const [title, setTitle] = useState<string>(conversation.title)
    const [tags, setTags] = useState<SidebarTag[]>(conversation.tags)
    const [editingTitle, setEditingTitle] = useState<boolean>(false)
    const [editingTags, setEditingTags] = useState<boolean>(false)
    const cardContainerRef = useRef<HTMLButtonElement | null>(null);

    console.log(tags)
    console.log(setTags)
    console.log(editingTags)

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);

    const handleOutsideClick: (e: MouseEvent) => void = (e) => {
        if (cardContainerRef.current && !cardContainerRef.current.contains(e.target as Node)){
            setEditingTitle(false)
            setTitle(conversation.title)
        }
    }
    const handleTitleClick: MouseEventHandler<HTMLInputElement> = (e) => {e.stopPropagation()}
    const handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {setTitle(e.target.value)}
    const handleTitleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter"){
            if (conversation.title !== title){
                saveConversationTitle()
            } else {
                setEditingTitle(false)
            }
        }
    }

    const saveConversationTitle: () => void = () => {
        const fetchOptions: RequestInit = {method: "PATCH", headers: {"Content-Type": "application/json",}, body: JSON.stringify({title})}
        fetch(`/api/conversations/${conversation.id}`, fetchOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
        .then((updatedConversation) => {
            setEditingTitle(false)
            dispatch({type: ConversationActionType.EditTitle,
                conversationId: conversation.id,
                title: updatedConversation.title})
            toast.success("Conversation title updated.")
          })
        .catch((_) => {
            toast.error("The conversation's title couldn't be updated.")
        });
    }

    const removeThisConversation: () => void = () => {
        const fetchOptions: RequestInit = {method: "DELETE"}
        fetch(`/api/conversations/${conversation.id}`, fetchOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            dispatch({type: ConversationActionType.Delete, conversationId: conversation.id})
            toast.success("Conversation removed.")
        })
        .catch((_) => {
            toast.error("The conversation couldn't be deleted.")
        });
    }

    const titleWhenNotEditing: JSX.Element = <p className="text-sm">{title}</p>
    const titleWhenEditing: JSX.Element = (
        <input className="text-sm rounded-sm" onChange={handleTitleChange} onClick={handleTitleClick} onKeyDown={handleTitleKeydown} type="text" value={title}/>
    )

    const singleSelectionListItems: SingleSelectionDropdownItem[] = [
        {key: "editTitle", name: "Edit Title", action: ()=>{setEditingTitle(true)}}, 
        {key: "editTags", name: "Edit Tags", action: ()=>{setEditingTags(true)}},
        {key: "remove", name: "Remove", style: "text-danger", action: ()=>{removeThisConversation()}}
    ]

    let cardBackgroundColor = ""
    if (isSelected) {
        cardBackgroundColor = "bg-neutral-500"
    } else {
        cardBackgroundColor = editingTitle ? "bg-neutral-600" : "hover:bg-neutral-600"
    }

    return (
        <button className={`group relative flex flex-row justify-start space-x-5 px-5 items-center w-full h-10 rounded-md overflow-hidden 
            ${cardBackgroundColor}`} onClick={onClick}
            ref={cardContainerRef} type="button">

            <Avatar className="h-6 w-6" radius="md" src={conversation.model.provider.image}/>

            <div className="overflow-hidden w-30">
                {editingTitle ? titleWhenEditing : titleWhenNotEditing}
            </div>

            <div className={`absolute flex justify-center items-center right-0 h-full w-1/5 bg-gradient-to-l from-neutral-500 ${!isSelected && "opacity-0 group-hover:opacity-100"}`}>
                <SingleSelectionDropdown dropdownItems={singleSelectionListItems}>
                    <div><AiOutlineEdit/></div>
                </SingleSelectionDropdown>
            </div>
        </button>
    ); 
}