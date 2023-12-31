export function ListboxWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="w-full max-w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );
}
