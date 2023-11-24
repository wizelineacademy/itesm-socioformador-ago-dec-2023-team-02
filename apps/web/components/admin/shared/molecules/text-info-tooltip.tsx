import { Tooltip } from "@nextui-org/react";
import { LuInfo } from "react-icons/lu"

interface TextInfoTooltipProps {
    text: string;
}

export default function TextInfoTooltip({text}: TextInfoTooltipProps): JSX.Element {
    return (
        <Tooltip content={text}>
            <button type="button">
                <LuInfo/>
            </button>
        </Tooltip>
    );
}