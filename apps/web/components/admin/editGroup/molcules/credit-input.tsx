import { BiCoinStack } from "react-icons/bi";
import { Input } from "@nextui-org/react";
import { strToNumber } from "@/helpers/string-helpers";
import NumericStepper from "../atoms/numeric-stepper";

interface CreditInputProps {
    credits: string;
    onCreditsChange: (newCredits: string) => void;
}

export default function CreditInput({credits, onCreditsChange}: CreditInputProps): JSX.Element {
    const stepValue = 1

    const handleCreditsValueChange: (value: string) => void = (value) => {
        onCreditsChange(value)
    }  

    const handleArrowUpPress: () => void = () => {
        credits.length === 0 ? onCreditsChange(stepValue.toString()) : onCreditsChange((strToNumber(credits) + stepValue).toString())
    }

    const handleArrowDownPress: () => void = () => {
        credits.length === 0 ? onCreditsChange((-stepValue).toString()) : onCreditsChange((strToNumber(credits) - stepValue).toString())
    }

    return (
        <Input
            className="w-40"
            endContent={
                <NumericStepper 
                    onArrowDownPress={handleArrowDownPress}
                    onArrowUpPress={handleArrowUpPress}
                />
            }
            onValueChange={handleCreditsValueChange}
            placeholder="Group credits"
            startContent={<BiCoinStack/>}
            value={credits}
        />
    );
}