import { Button } from "@nextui-org/react";

interface ButtonWithIconProps {
    text: string;
    icon: JSX.Element;
    style?: string;
    isDisabled: boolean;
    isLoading: boolean;
    onPress: ()=>void;
}

export default function ButtonWithIcon({text, icon, style, isDisabled, isLoading, onPress}: ButtonWithIconProps): JSX.Element {
    const handleButtonPress: (e: any) => void = (_) => {
        if (!isDisabled && !isLoading){
            onPress()
        }
    }
    return (
        <Button className={`${isDisabled ? "opacity-50" : "opacity-100"} ${style}`} disabled={isDisabled} isLoading={isLoading} onPress={handleButtonPress} size="sm">
            <div className="flex flex-row space-x-2 items-center p-2">
                <p className="text-white">{text}</p>
                {icon}
            </div>
        </Button>
    );
}