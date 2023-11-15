import React from "react";
import {
    Listbox,
    ListboxItem,
    Chip,
    ScrollShadow,
    Avatar,
} from "@nextui-org/react";
import { ListboxWrapper } from "./list-box-wrap";
import { User } from "@prisma/client";

// Define the props in an interface
interface UsersListBoxProps {
    users: User[];
}

// Use the props interface
export default function UsersListBox({ users }: UsersListBoxProps) {
    const [values, setValues] = React.useState<Set<string>>(new Set(["1"]));

    const arrayValues = Array.from(values);

    const topContent = React.useMemo(() => {
        if (!arrayValues.length) {
            return null;
        }

        return (
            <ScrollShadow
                hideScrollBar
                className="w-full flex py-0.5 px-2 gap-1"
                orientation="horizontal"
            >
                {arrayValues.map((value) => (
                    <Chip key={value}>
                        {users.find((user) => `${user.id}` === `${value}`).name}
                    </Chip>
                ))}
            </ScrollShadow>
        );
    }, [arrayValues.length]);

    return (
        <ListboxWrapper>
            <Listbox
                topContent={topContent}
                classNames={{
                    base: "w-full",
                    list: "max-h-[300px] overflow-scroll w-full",
                }}
                defaultSelectedKeys={["1"]}
                items={users}
                label="Assigned to"
                selectionMode="multiple"
                onSelectionChange={setValues}
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
