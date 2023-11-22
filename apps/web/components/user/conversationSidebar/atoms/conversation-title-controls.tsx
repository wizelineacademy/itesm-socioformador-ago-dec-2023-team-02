import type { MouseEventHandler } from "react";
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5"

interface ConversationTitleControlsProps {
    disableConfirmButton: boolean;
    onConfirmPress: () => void;
    onCancelPress: () => void;
}

export default function ConversationTitleControls({disableConfirmButton, onConfirmPress, onCancelPress}: ConversationTitleControlsProps): JSX.Element {
    const handleConfirmPress: MouseEventHandler<HTMLButtonElement> = (e) => {
        onConfirmPress()
        e.stopPropagation()
    }

    const handleCancelPress: MouseEventHandler<HTMLButtonElement> = (e) => {
        onCancelPress()
        e.stopPropagation()
    }

    return (
        <div className="flex flex-row gap-x-1 justify-around items-center">
            <button disabled={disableConfirmButton} onClick={handleConfirmPress} type="button">
                <IoCheckmarkSharp color={disableConfirmButton ? "black" : "white"} size="1.1em"/>
            </button>


            <button onClick={handleCancelPress} type="button">
                <IoCloseSharp color="white" size="1.1em"/>
            </button>
        </div>
    );
}