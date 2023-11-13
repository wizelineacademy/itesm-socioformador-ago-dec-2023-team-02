import { Input } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  text: string;
  placeholder: string;
  onTextChange: (text: string) => void;
  takeFullWidth: boolean;
  overridingStyle?: string;
}

export default function SearchBar({
  text,
  placeholder,
  onTextChange,
  takeFullWidth = true,
  overridingStyle,
}: SearchBarProps): JSX.Element {
  const handleTextChange: (value: string) => void = (value) => {
    onTextChange(value);
  };

  return (
    <Input
      className={overridingStyle}
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
