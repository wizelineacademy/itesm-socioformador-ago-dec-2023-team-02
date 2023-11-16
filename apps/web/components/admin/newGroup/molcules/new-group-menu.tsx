import { Input, Textarea } from "@nextui-org/react";
import type { Group } from "@prisma/client";
import { editGroupCredits, editGroupDescription, editGroupName } from "@/helpers/group-helpers";
import { enforcePositiveNumericValuesOnly, imposeMaxLength, removeLeadingZeros, strToNumber, trimLeadingSpaces } from "@/helpers/string-helpers";

interface NewGroupMenuProps {
    group: Group;
    onGroupChange: (editedGroup: Group) => void;
}

export default function NewGroupMenu({group, onGroupChange}: NewGroupMenuProps): JSX.Element {
    const groupNameMaxLength = 20 

    const handleGroupNameChange: (value: string) => void = (value) => {
        onGroupChange(editGroupName(group, imposeMaxLength(trimLeadingSpaces(value), groupNameMaxLength)))
    }

    const handleGroupDescriptionChange: (value: string) => void = (value) => {
        onGroupChange(editGroupDescription(group, trimLeadingSpaces(value)))
    }

    const handleGroupCreditsChange: (value: string) => void = (value) => {
        const normalizedNumberString: string = removeLeadingZeros(enforcePositiveNumericValuesOnly(value))
        if (normalizedNumberString.length === 0){
            onGroupChange(editGroupCredits(group, 0))
        } else {
            onGroupChange(editGroupCredits(group, strToNumber(normalizedNumberString)))
        }
    }

    return (
        <div className="flex flex-col justify-start items-center gap-4">
            <div className="flex flex-col items-start gap-2 w-full">
                <p>Name</p>
                <Input isClearable onValueChange={handleGroupNameChange} placeholder="Group name" value={group.name}/>
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
                <p>Credits assigned</p>
                <Input
                    className="w-1/3"
                    isClearable
                    onValueChange={handleGroupCreditsChange}
                    placeholder="Group credits"
                    value={group.creditsAssigned.toString()}
                />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
                <p>Description</p>
                <Textarea fullWidth onValueChange={handleGroupDescriptionChange} placeholder="Group description" value={group.description}/>
            </div>
        </div>
    );
}