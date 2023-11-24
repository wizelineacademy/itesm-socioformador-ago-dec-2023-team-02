import { LuPlusCircle, LuMinusCircle } from "react-icons/lu"

interface NumericStepperProps {
    onArrowUpPress: () => void;
    onArrowDownPress: () => void;
}

export default function NumericStepper({onArrowUpPress, onArrowDownPress}: NumericStepperProps): JSX.Element {
    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <button type="button">
                <LuPlusCircle onClick={(_) => {onArrowUpPress()}} size="0.9rem"/>
            </button>
            <button type="button">
                <LuMinusCircle onClick={(_) => {onArrowDownPress()}} size="0.9rem"/>
            </button>
        </div>
    );
}