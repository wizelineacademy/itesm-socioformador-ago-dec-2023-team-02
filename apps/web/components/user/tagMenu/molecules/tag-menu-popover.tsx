import type { Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { MdOutlineCancel } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import type { PopoverPlacement } from "@/types/component-types";
import ButtonWithIcon from "@/components/shared/atoms/button-with-icon";
import TagMenu from "./tag-menu";

interface TagMenuPopoverProps {
  children: JSX.Element;
  tags: Tag[];
  initialSelectedTags: Set<number>;
  placement: PopoverPlacement;
  onPopoverClose: (newSelectedTags: Set<number>) => void;
}

export default function TagMenuPopover({
  children,
  tags,
  initialSelectedTags,
  placement,
  onPopoverClose,
}: TagMenuPopoverProps): JSX.Element {
  const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] =
    useState<Set<number>>(initialSelectedTags);

  useEffect(() => {
    setSelectedTags(initialSelectedTags);
  }, [initialSelectedTags]);

  const handleSelectedTagsChange: (newSelectedTags: Set<number>) => void = (
    newSelectedTags
  ) => {
    setSelectedTags(newSelectedTags);
  };

  const handleOpenChange: (isOpen: boolean) => void = (isOpen) => {
    setPopoverIsOpen(isOpen);
  };

  const handleCancelButtonPress: () => void = () => {
    setSelectedTags(initialSelectedTags);
    setPopoverIsOpen(false);
    onPopoverClose(initialSelectedTags);
  };
  const handleSaveButtonPress: () => void = () => {
    setPopoverIsOpen(false);
    onPopoverClose(selectedTags);
  };

  const handlePopoverClose: () => void = () => {
    onPopoverClose(selectedTags);
  };

  return (
    <Popover
      backdrop="opaque"
      isOpen={popoverIsOpen}
      onClose={handlePopoverClose}
      onOpenChange={handleOpenChange}
      placement={placement}
      showArrow
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col justify-center itesm-center gap-4 w-96 p-4">
          <TagMenu
            // allowEditing={false}
            isEditingTags={false} // ! Replaced allowEditing with isEditingTags
            onSelectedTagsChange={handleSelectedTagsChange}
            onTagsChange={null}
            selectedTags={selectedTags}
            tags={tags}
          />

          <div className="flex flex-row gap-2 justify-center items-center">
            <ButtonWithIcon
              icon={<MdOutlineCancel color="white" />}
              isDisabled={false}
              isLoading={false}
              onPress={handleCancelButtonPress}
              style="bg-red-700"
              text="Cancel"
            />
            <ButtonWithIcon
              icon={<IoCheckmarkSharp color="white" />}
              isDisabled={false}
              isLoading={false}
              onPress={handleSaveButtonPress}
              style="bg-sky-700"
              text="Confirm"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
