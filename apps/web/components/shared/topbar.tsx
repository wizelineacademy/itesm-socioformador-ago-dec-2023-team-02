"use client";

import {
  Avatar,
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "WizePrompt",
  description: "",
};

function Topbar(): any {
  const models = [
    {
      id: 1,
      name: "OpenAI",
      description: "GPT-3.5",
      image: "assets/openai.svg",
    },
    {
      id: 2,
      name: "OpenAI",
      description: "GPT-4",
      image: "assets/openai.svg",
    },
  ];

  return (
    <nav className="topbar">
      <Link className="flex items-center gap-4" href="/home">
        <Image alt="logo" height={28} src="/assets/wizeline.svg" width={48} />
      </Link>
      <div className="flex items-center justify-center gap-2">
        <Select
          className="max-w-xs min-w-[200px]"
          classNames={{
            label: "group-data-[filled=true]:-translate-y-5",
            trigger: "min-h-unit-16",
            listboxWrapper: "max-h-[400px]",
          }}
          items={models}
          listboxProps={{
            itemClasses: {
              base: [
                "rounded-md",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            },
          }}
          placeholder="Select a model"
          popoverProps={{
            classNames: {
              base: "p-0 border-small border-divider bg-background",
              arrow: "bg-default-200",
            },
          }}
          renderValue={(items) => {
            return items.map((item) => (
              <div className="flex items-center gap-2" key={item.key}>
                <Avatar
                  alt={item.data?.name}
                  className="flex-shrink-0"
                  size="sm"
                  src={item.data?.image}
                />
                <div className="flex flex-col">
                  <span>{item.data?.name}</span>
                  <span className="text-default-500 text-tiny">
                    ({item.data?.description})
                  </span>
                </div>
              </div>
            ));
          }}
          variant="bordered"
          // label="Model"
        >
          {(model) => (
            <SelectItem key={model.id} textValue={model.name}>
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={model.name}
                  className="flex-shrink-0"
                  size="sm"
                  src={model.image}
                />
                <div className="flex flex-col">
                  <span className="text-small">{model.name}</span>
                  <span className="text-tiny text-default-400">
                    {model.description}
                  </span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>

        <Popover placement="bottom" showArrow>
          <PopoverTrigger>
            <Chip className="hover:cursor-pointer">
              <p className="text-body-semibold">i</p>
            </Chip>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Popover Content</div>
              <div className="text-tiny">This is the popover content</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-2">
        <Button>Custom Instructions</Button>
      </div>
    </nav>
  );
}

export default Topbar;
