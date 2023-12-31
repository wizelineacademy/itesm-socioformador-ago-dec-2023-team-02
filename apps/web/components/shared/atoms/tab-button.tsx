import { Button } from "@nextui-org/react";

export default function TabButton({
  tab,
  setTab,
  keyword,
  title,
  children,
}: {
  tab: string;
  setTab: (keyword: string) => void;
  keyword: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <li>
      <Button
      className={`hidden md:block w-auto md:w-[150px] hover:bg-dark400 hover:text-white ${
          tab === keyword ? "bg-black dark:bg-dark400 text-white" : "bg-transparent"
        }`}
        onClick={() => {
          setTab(keyword);
        }}
        radius="sm"
      >
        <p className="hidden md:block">{title}</p>
      </Button>
      <Button
      className={`md:hidden flex flex-col justify-center gap-0 h-[45px] !w-[45px] min-w-[20px] p-[0 24px] hover:bg-dark400 hover:text-white ${
          tab === keyword ? "bg-black dark:bg-dark400 text-white" : "bg-transparent"
        }`}
        onClick={() => {
          setTab(keyword);
        }}
        radius="sm"
      >
        {/* <TbEdit className="flex items-center md:hidden" size={24} /> */}
        {children}
        <p className="text-[10px] break-words">{title.split(" ")[0]}</p>
      </Button>
    </li>
  );
}
