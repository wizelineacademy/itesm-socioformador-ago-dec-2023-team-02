import { Card, CardBody, Tooltip } from "@nextui-org/react";
import type { Group } from "@prisma/client";

interface GroupCardProps {
    group: Group;
    isSelected: boolean;
    onPress: () => void;
}

export default function GroupCard({group, isSelected, onPress}: GroupCardProps): JSX.Element {
    const handleCardPress: (e: any) => void = (_) => {
        onPress()
    }

    const cardTooltipContent: JSX.Element = (
        <div className="flex flex-row justify-center items-center">
            <p className="text-sm">Credits assigned: {group.creditsAssigned}</p>
        </div>
    )

    return (
        <button onClick={handleCardPress} type="button">
            <Tooltip content={cardTooltipContent} delay={1000} placement="right">
                <Card className={isSelected ? "border-1" : "border-0"}  fullWidth isHoverable radius="sm" shadow="none">
                    <CardBody>
                        <div className="flex flex-row justify-center items-center w-full gap-2">
                            <p className="text-sm">{group.name}</p>
                        </div>
                    </CardBody>
                </Card>
            </Tooltip>
        </button>
    );
}