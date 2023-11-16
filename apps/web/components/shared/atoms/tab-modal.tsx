interface TabModal {
  children: React.ReactNode;
  tab: string;
  keyword: string;
}

export default function TabModal({
  children,
  tab,
  keyword,
}: TabModal): JSX.Element {
  return (
    <div
      className={`content w-full p-2 ${
        tab !== keyword ? "hidden" : "block"
      } border-l-2 border-dark500`}
    >
      {children}
    </div>
  );
}
