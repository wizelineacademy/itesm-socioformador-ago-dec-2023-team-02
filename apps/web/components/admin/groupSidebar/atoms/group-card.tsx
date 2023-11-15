import { Card, CardBody } from "@nextui-org/react";
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

    const cardBackground: string = isSelected ? "bg-neutral-500" : "bg-neutral-700 hover:bg-neutral-600"

    return (
        <button onClick={handleCardPress} type="button">
            <Card className={cardBackground} fullWidth>
                <CardBody>
                    <div className="flex flex-row justify-center items-center w-full gap-2">
                        <p className="text-sm">{group.name}</p>
                        <p className="text-sm opacity-40">{group.creditsAssigned}</p>
                    </div>
                </CardBody>
            </Card>
        </button>
    );
}