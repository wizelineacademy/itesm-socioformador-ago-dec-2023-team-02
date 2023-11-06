import { Button } from "@nextui-org/react";

interface ButtonWithIconProps {
    text: string;
    icon: JSX.Element;
    isDisabled: boolean;
    onPress: ()=>void;
}

export default function ButtonWithIcon({text, icon, isDisabled, onPress}: ButtonWithIconProps): JSX.Element {
    const handleButtonPress: (e: any) => void = (_) => {
        onPress()
    }
    return (
        <Button disabled={isDisabled} onPress={handleButtonPress}>
            <div className="flex flex-row space-x-2 items-center p-2">
                <p>{text}</p>
                {icon}
            </div>
        </Button>
    );
}