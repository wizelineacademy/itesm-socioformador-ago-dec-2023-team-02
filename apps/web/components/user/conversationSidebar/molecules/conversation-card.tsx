import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEventHandler , ChangeEvent, KeyboardEventHandler } from "react";
import type { Tag } from "@prisma/client";
import { AiOutlineEdit } from "react-icons/ai";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import SingleSelectionDropdown from "@/components/shared/molecules/single-selection-dropdown";
import type { SingleSelectionListItem } from "@/types/component-types";
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
    const [tags, setTags] = useState<Tag[]>(conversation.tags)
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
        }
    }
    const handleTitleClick: MouseEventHandler<HTMLInputElement> = (e) => {e.stopPropagation()}
    const handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {setTitle(e.target.value)}
    const handleTitleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter"){
            if (conversation.title !== title) {
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
            console.log("Success")
          })
        .catch((_) => {
            console.log("Error")
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
            console.log("Success")
        })
        .catch((_) => {
            console.log("Error")
        });
    }

    const titleWhenNotEditing: JSX.Element = <p className="text-sm ">{title}</p>
    const titleWhenEditing: JSX.Element = (
        <input className="text-sm rounded-sm" onChange={handleTitleChange} onClick={handleTitleClick} onKeyDown={handleTitleKeydown} type="text" value={title}/>
    )

    const singleSelectionListItems: SingleSelectionListItem[] = [
        {key: "editTitle", name: "Edit Title", action: ()=>{setEditingTitle(true)}}, 
        {key: "editTags", name: "Edit Tags", action: ()=>{setEditingTags(true)}},
        {key: "remove", name: "Remove", style: "text-danger", action: ()=>{removeThisConversation()}}
    ]

    let cardBackgroundColor = ""
    if (isSelected) {
        cardBackgroundColor = "bg-neutral-700"
    } else {
        cardBackgroundColor = editingTitle ? "bg-neutral-800" : "hover:bg-neutral-800"
    }

    return (
        <button className={`group relative flex flex-row justify-start space-x-5 px-5 items-center w-full h-10 rounded-md overflow-hidden 
            ${cardBackgroundColor}`} onClick={onClick}
            ref={cardContainerRef} type="button">
            <div className="rounded-full">
                <Image alt="Model Image" height={8} src={conversation.model.provider.image} width={8}/>
            </div>

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