import { Card, CardBody, Tooltip } from "@nextui-org/react";
import type { Group } from "@prisma/client";

interface GroupCardProps {
  group: Group;
  isSelected: boolean;
  onPress: () => void;
}

export default function GroupCard({
  group,
  isSelected,
  onPress,
}: GroupCardProps): JSX.Element {
  const handleCardPress: (e: any) => void = (_) => {
    onPress();
  };

  const cardTooltipContent: JSX.Element = (
    <div className="flex flex-row justify-center items-center">
      <p className="text-sm">Credits assigned: {group.creditsAssigned}</p>
    </div>
  );


  let cardBackgroundColor = "";
  if (isSelected) {
    cardBackgroundColor = "bg-white bg-opacity-20";
  } else {
    cardBackgroundColor = "bg-white bg-opacity-0 hover:bg-white hover:bg-opacity-10";
  }

  return (
    <button onClick={handleCardPress} type="button" className="w-full">
      <Tooltip content={cardTooltipContent} delay={1000} placement="right">
        <Card
           className={`flex flex-row items-center h-11 py-2 pl-2 pr-0 border-none rounded-md shadow-none hover:bg-white hover:bg-opacity-20 ${cardBackgroundColor}`}
          fullWidth
          radius="none"
          shadow="none"
        >
          <CardBody>
            <div className="flex flex-row justify-start items-center w-full overflow-scroll scrollbar-hide">
              <p className="text-xs text-white whitespace-nowrap">{group.name}</p>
            </div>
          </CardBody>
        </Card>
      </Tooltip>
    </button>
  );
}
