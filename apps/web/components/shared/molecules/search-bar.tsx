import { Input } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  text: string;
  placeholder: string;
  onTextChange: (text: string) => void;
  takeFullWidth: boolean;
  widthStyle?: string;
  textStyle?: string;
}

export default function SearchBar({
  text,
  placeholder,
  onTextChange,
  takeFullWidth,
  widthStyle,
  textStyle
}: SearchBarProps): JSX.Element {
  const handleTextChange: (value: string) => void = (value) => {
    onTextChange(value);
  };

  return (
    <Input
      className={widthStyle}
      classNames={{inputWrapper: "h-unit-10 min-h-unit-0", input: textStyle}}
      fullWidth={takeFullWidth}
      isClearable
      onValueChange={handleTextChange}
      placeholder={placeholder}
      radius="sm"
      size="sm"
      startContent={<BiSearch />}
      value={text}
    />
  );
}
