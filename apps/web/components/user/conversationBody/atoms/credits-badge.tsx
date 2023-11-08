import { Chip } from "@nextui-org/react";
import { TbCoins } from "react-icons/tb";

export default function CreditsBadge({
  creditsUsed,
}: {
  creditsUsed: number;
}): JSX.Element {
  return (
    <Chip avatar={<TbCoins />} radius="sm" size="sm" variant="flat">
      {creditsUsed}
    </Chip>
  );
}
