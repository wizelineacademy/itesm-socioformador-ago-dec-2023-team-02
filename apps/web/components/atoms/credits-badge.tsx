import { Chip } from "@nextui-org/react";
import { TbCoins } from "react-icons/tb";

export default function creditsBadge({ creditsUsed }: { creditsUsed: number }) {
    return (
        <Chip size="sm" radius="sm" avatar={<TbCoins />}>{creditsUsed}</Chip>
    );
}