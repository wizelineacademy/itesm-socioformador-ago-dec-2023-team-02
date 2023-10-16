"use client";

import Image from "next/image";
import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
import type { SelectedItems } from "@nextui-org/react";
import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

function LeftSidebar(): any {
  // const router = useRouter();
  // const pathname = usePathname();

  const tags = [
    {
      id: 1,
      name: "Tag 1",
    },
    {
      id: 2,
      name: "Tag 2",
    },
    {
      id: 3,
      name: "Tag 3",
    },
  ];

  const historyChats = [
    {
      id: 1,
      name: "Chat 1",
    },
    {
      id: 2,
      name: "Chat 2",
    },
    {
      id: 3,
      name: "Chat 3",
    },
  ];

  const { user, error, isLoading } = useUser();

  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        <Button color="primary">New Chat</Button>
        <Input placeholder="Search" type="search" />
        {/* //* TAGS */}
        <Select
          className="max-w-[190px]"
          classNames={{
            base: "max-w-xs",
            trigger: "min-h-unit-12 py-2",
          }}
          isMultiline
          items={tags}
          label="Tags"
          labelPlacement="outside"
          placeholder="Select a tag"
          renderValue={(items: SelectedItems<{ id: string; name: string }>) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip key={item.key}>{item.data?.name}</Chip>
                ))}
              </div>
            );
          }}
          selectionMode="multiple"
          variant="bordered"
        >
          {(tag) => (
            <SelectItem key={tag.id} textValue={tag.name}>
              {tag.name}
            </SelectItem>
          )}
        </Select>
        {/* //* HISTORY CHATS */}
        <h3 className="text-small-bold text-zinc-100">History Chats</h3>
        {historyChats.map((chat) => (
          <div className="flex items-center gap-2" key={chat.id}>
            <div className="relative w-10 h-10">
              <Image
                alt="OpenAI"
                className="rounded-full"
                layout="fill"
                objectFit="cover"
                src="/assets/openai.svg"
              />
            </div>
            <div className="flex flex-col">
              <Link
                className="text-small-bold text-zinc-100"
                href={`/chat/${chat.id}`}
              >
                {chat.name}
              </Link>
              <p className="text-small-regular text-zinc-400">Last message</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 px-6 flex items-center justify-between">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              alt={user?.name || ""}
              as="button"
              className="transition-transform"
              isBordered
              src={user?.picture || ""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem className="h-14 gap-2" key="profile">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem
              color="danger"
              key="logout"
              onClick={() => {
                router.push("/api/auth/logout");
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <p>Creditos</p>
      </div>
      {/* <p className="text-small-regular text-zinc-400 text-center">v1.0.0</p> */}
    </section>
  );
}

export default LeftSidebar;
