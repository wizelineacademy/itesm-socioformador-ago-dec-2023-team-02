import React from "react";
import {
    Listbox,
    ListboxItem,
    Chip,
    ScrollShadow,
    Avatar,
} from "@nextui-org/react";
import type { User } from "@prisma/client";
import { ListboxWrapper } from "./list-box-wrap";

// Define the props in an interface
interface UsersListBoxProps {
    users: User[];
    setValues: (values: Set<string>) => void;
    arrayValues: string[];
}

// Use the props interface
export default function UsersListBox({ users, setValues, arrayValues }: UsersListBoxProps) {
    //const [values, setValues] = React.useState<Set<string>>(new Set(["1"]));

    //const arrayValues = Array.from(values);

    const topContent = React.useMemo(() => {
        if (!arrayValues.length) {
            return null;
        }

        return (
            <ScrollShadow
                className="w-full flex py-0.5 px-2 gap-1"
                hideScrollBar
                orientation="horizontal"
            >
                {arrayValues.map((value) => {
                    // Find the user for the current value
                    const foundUser = users.find((user) => `${user.id}` === value);

                    // Check if a user was found
                    if (!foundUser) return null;

                    // Render the Chip for the found user
                    return (
                        <Chip key={value}>
                            {foundUser.name}
                        </Chip>
                    );
                })}
            </ScrollShadow>
        );
    }, [arrayValues, users]); // Include users in the dependency array

    return (
        <ListboxWrapper>
            <Listbox
            classNames={{
                    base: "w-full",
                    list: "max-h-[300px] overflow-scroll w-full",
                }}
                defaultSelectedKeys={[]}
                emptyContent="All users assigned"
                items={users}
                label="Assigned to"
                onSelectionChange={setValues}
                selectionMode="multiple"
                topContent={topContent}
                variant="flat"
            >
                {(item) => (
                    <ListboxItem className="w-full" key={item.id} textValue={item.name}>
                        <div className="flex flex-col gap-2 justify-start w-full">
                            <div className="flex flex-row gap-2 items-center w-full">
                                <Avatar
                                    alt={item.name}
                                    className="flex-shrink-0"
                                    size="sm"
                                    src={item.image}
                                />
                                <div className="flex flex-col w-full">
                                    <span className="text-small">{item.name}</span>
                                    <span className="text-tiny text-default-400">
                                        {item.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ListboxItem>
                )}
            </Listbox>
        </ListboxWrapper>
    );
}
