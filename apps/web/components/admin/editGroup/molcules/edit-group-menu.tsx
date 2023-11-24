import { Input, Textarea } from "@nextui-org/react";
import type { Group } from "@prisma/client";
import { useEffect, useState } from "react";
import { editGroupCredits, editGroupDescription, editGroupName } from "@/helpers/group-helpers";
import { imposeMaxLength, strToNumber, trimLeadingSpaces, isPositiveDecimal } from "@/helpers/string-helpers";
import TextInfoTooltip from "../../shared/molecules/text-info-tooltip";
import CreditInput from "./credit-input";

interface EditGroupMenuProps {
    isEditing: boolean;
    group: Group;
    onGroupChange: (editedGroup: Group) => void;
}

export default function EditGroupMenu({isEditing, group, onGroupChange}: EditGroupMenuProps): JSX.Element {
    const [creditsString, setCreditsString] = useState<string>(group.creditsAssigned.toString())
    const groupNameMaxLength = 20 

    useEffect(() => {
        if (!isEditing){
            setCreditsString(group.creditsAssigned.toString())
        }
    }, [group.creditsAssigned, isEditing])

    const handleGroupNameChange: (value: string) => void = (value) => {
        onGroupChange(editGroupName(group, imposeMaxLength(trimLeadingSpaces(value), groupNameMaxLength)))
    }

    const handleGroupDescriptionChange: (value: string) => void = (value) => {
        onGroupChange(editGroupDescription(group, trimLeadingSpaces(value)))
    }

    const handleGroupCreditsChange: (value: string) => void = (value) => {
        const trimmedValue: string = trimLeadingSpaces(value)
        if (trimmedValue.length === 0 || isPositiveDecimal(trimmedValue)){
            setCreditsString(trimmedValue)
            onGroupChange(editGroupCredits(group, strToNumber(trimmedValue)))
        }
    }

    return (
        <div className="flex flex-col justify-start items-center gap-4">
            <div className="flex flex-col items-start gap-2 w-full">
                <p>Name</p>
                <Input isClearable onValueChange={handleGroupNameChange} placeholder="Group name" value={group.name}/>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex flex-row gap-2 justify-start items-center">
                    <p>Monthly credits</p>
                    <TextInfoTooltip text="Number of credits to add to each user of the group every month."/>
                </div>

                <CreditInput credits={creditsString} onCreditsChange={handleGroupCreditsChange}/>
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
                <p>Description</p>
                <Textarea fullWidth onValueChange={handleGroupDescriptionChange} placeholder="Group description" value={group.description}/>
            </div>
        </div>
    );
}