// GroupTable.tsx
import type { Selection, ChipProps, SortDescriptor } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User as UserIcon,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { Role } from "@prisma/client";
import type { User } from "@prisma/client";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { BsChevronCompactDown } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { BiCoinStack } from "react-icons/bi";
import { toast } from "sonner";
import { useCallback, useMemo, useState } from "react";
import type { Key, ChangeEvent } from "react";
import { roundUsersCredits } from "@/helpers/user-helpers";
import AddUserModal from "../../modals/add-user-modal";

//Component props
interface GroupTableProps {
  setUpdatedUsers: any;
  idGroup: number;
  users: User[];
}

//columns
const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "CREDITS REMAINING", uid: "creditsRemaining", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

//role options
const roleOptions = [
  { name: Role.ADMIN, uid: Role.ADMIN },
  { name: Role.USER, uid: Role.USER },
];

//role color mapping
const roleColorMap: Record<string, ChipProps["color"]> = {
  ADMIN: "success",
  USER: "warning",
};

//initial visible columns
const INITIAL_VISIBLE_COLUMNS = ["name", "role", "creditsRemaining", "actions"];

//function to capitalize strings
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function GroupTable({
  setUpdatedUsers,
  users,
  idGroup,
}: GroupTableProps): JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  type UserInfo = (typeof users)[0];

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [roleFilter, setRoleFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  // Function to remove users from the group
  const removeUsersFromGroup = async (): Promise<void> => {
    try {
      console.log("Selected keys: ", selectedKeys);
      console.log("Selected keys2: ", Array.from(selectedKeys));
      const response = await fetch(
        `http://${
          process.env.ENVIROMENT === "production"
            ? process.env.PROD_DOMAIN
            : "localhost"
        }:3000/api/groups/add-users/${idGroup}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds: Array.from(selectedKeys) }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Result: ", result);
      toast.success("Users removed from the group successfully");

      setUpdatedUsers(true);
      setSelectedKeys(new Set([])); // Reset selection
    } catch (error) {
      console.error("Failed to remove users:", error);
      toast.error("Failed to remove users from the group");
    }
  };

  const updateUserRole = async (userId: number, role: Role): Promise<void> => {
    try {
      const response = await fetch(
        `http://${
          process.env.ENVIROMENT === "production"
            ? process.env.PROD_DOMAIN
            : "localhost"
        }:3000/api/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Result: ", result);
      toast.success("User role updated successfully");
      setUpdatedUsers(true);
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      roleFilter !== "all" &&
      Array.from(roleFilter).length !== roleOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(roleFilter).includes(user.role)
      );
    }

    return filteredUsers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, filterValue, roleFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: UserInfo, b: UserInfo) => {
      const first = a[sortDescriptor.column as keyof UserInfo] as string;
      const second = b[sortDescriptor.column as keyof UserInfo] as string;
      //const cmp = first < second ? -1 : first > second ? 1 : 0;

      let cmp;
      if (first < second) {
        cmp = -1;
      } else if (first > second) {
        cmp = 1;
      } else {
        cmp = 0;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // This function renders the table cell depending on the column key and user data
  const renderCell = useCallback((user: UserInfo, columnKey: Key) => {
    const cellValue = user[columnKey as keyof UserInfo];

    switch (columnKey) {
      case "name":
        return (
          <UserIcon
            avatarProps={{ radius: "sm", src: user.image }}
            description={user.email}
            name={cellValue as any}
          >
            {user.email}
          </UserIcon>
        );
      case "role":
        return (
          <div className="w-full pl-0 ml-0 flex justify-start">
            <Chip
              className="pl-0 ml-0 capitalize border-none gap-1 text-default-600"
              color={roleColorMap[user.role]}
              size="sm"
              variant="dot"
            >
              {cellValue as string}
            </Chip>
          </div>
          // <Chip
          //   className="capitalize border-none gap-1 text-default-600"
          //   color={roleColorMap[user.role]}
          //   size="sm"
          //   variant="dot"
          // >
          //   {cellValue}
          // </Chip>
        );
      case "creditsRemaining":
        return (
          <div className="flex flex-row w-full items-center gap-1">
            <p className="p-0 m-0">
              <BiCoinStack />
            </p>
            <p>
              {" "}
              {
                roundUsersCredits(user) as string // eslint-disable-line
              }
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Dropdown placement="left">
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <SlOptionsVertical className="text-default-600" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <button
                    onClick={() => {
                      void updateUserRole(
                        user.id,
                        user.role === Role.ADMIN ? Role.USER : Role.ADMIN
                      );
                    }}
                    type="button"
                  >
                    Change role to {user.role === Role.ADMIN ? "USER" : "ADMIN"}
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-center">
          <Input
            className="w-full sm:max-w-[44%]"
            isClearable
            onClear={() => {
              onClear();
            }}
            onValueChange={onSearchChange}
            placeholder="Search by name..."
            size="sm"
            startContent={<AiOutlineSearch />}
            value={filterValue}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<BsChevronCompactDown className="text-small" />}
                  size="sm"
                  variant="light"
                >
                  Role
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Table Columns"
                closeOnSelect={false}
                disallowEmptySelection
                onSelectionChange={setRoleFilter as any}
                selectedKeys={roleFilter}
                selectionMode="multiple"
              >
                {roleOptions.map((role) => (
                  <DropdownItem className="capitalize" key={role.uid}>
                    {capitalize(role.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<BsChevronCompactDown className="text-small" />}
                  size="sm"
                  variant="light"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Table Columns"
                closeOnSelect={false}
                disallowEmptySelection
                onSelectionChange={setVisibleColumns as any}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
              >
                {columns.map((column) => (
                  <DropdownItem className="capitalize" key={column.uid}>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {selectedKeys instanceof Set && selectedKeys.size > 0 ? (
              <Button
                color="danger"
                endContent={<FaMinus />}
                onClick={() => {
                  void removeUsersFromGroup();
                }}
                size="sm"
              >
                Remove Users
              </Button>
            ) : (
              <Button
                className="text-white"
                color="success"
                endContent={<AiOutlinePlus />}
                onClick={onOpen}
                size="sm"
              >
                Add Users
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-small">
            Rows per page:
            <select
              className=" bg-transparent outline-none text-small mx-2"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedKeys,
    filterValue,
    roleFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          color="danger"
          isCompact
          onChange={setPage}
          page={page}
          showControls
          showShadow
          total={pages}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            onPress={onPreviousPage}
            size="sm"
            variant="flat"
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            onPress={onNextPage}
            size="sm"
            variant="flat"
          >
            Next
          </Button>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={{
          wrapper: "max-h-[382px] shadow-none p-4",
        }}
        isHeaderSticky
        onSelectionChange={setSelectedKeys as any}
        onSortChange={setSortDescriptor as any}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              key={column.uid}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No users found" items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <>{renderCell(item, columnKey)}</>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddUserModal
        idGroup={idGroup}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setUpdatedUsers={setUpdatedUsers}
      />
    </>
  );
}
