import { Chip } from "@nextui-org/react";
import { TbCoins } from "react-icons/tb";

export default function CreditsBadge({ creditsUsed }: { creditsUsed: number }) {
    return (
        <Chip variant="flat" size="sm" radius="sm" avatar={<TbCoins />}>{creditsUsed}</Chip>
    );
}