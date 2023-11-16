// GroupTable.tsx
import React from "react";
import AddUserModal from "../../modals/add-user-modal";
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
  Selection,
  ChipProps,
  SortDescriptor,
  useDisclosure
} from "@nextui-org/react";
import { User } from "@prisma/client";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { BsChevronCompactDown } from "react-icons/bs";
import { Role } from "@prisma/client";

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
  USER: "danger",
};

//initial visible columns
const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "role",
  "creditsRemaining",
  "actions",
];

//function to capitalize strings
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const GroupTable: React.FC<GroupTableProps> = ({ setUpdatedUsers, users, idGroup }) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  type UserInfo = (typeof users)[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [roleFilter, setRoleFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
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
  }, [users, filterValue, roleFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
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
  const renderCell = React.useCallback(
    (user: UserInfo, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof UserInfo];

      switch (columnKey) {
        case "name":
          return (
            <UserIcon
              avatarProps={{ radius: "sm", src: user.image }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </UserIcon>
          );
        case "role":
          return (
            <Chip
              className="capitalize"
              color={roleColorMap[user.role]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "creditsRemaining":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              {/* <p className="text-bold text-tiny capitalize text-default-400">{user.jobPosition}</p> */}
            </div>
          );

        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Dropdown placement="left">
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <SlOptionsVertical className="text-default-600" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-center">
            <Input
          size="sm"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<AiOutlineSearch />}
            value={filterValue}
            onClear={() => {
              onClear();
            }}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                size="sm"
                  endContent={<BsChevronCompactDown className="text-small" />}
                  variant="light"
                >
                  Role
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}
              >
                {roleOptions.map((role) => (
                  <DropdownItem key={role.uid} className="capitalize">
                    {capitalize(role.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                size="sm"
                  endContent={<BsChevronCompactDown className="text-small" />}
                  variant="light"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button size="sm" color="danger" onClick={onOpen} endContent={<AiOutlinePlus />}>
              Add New
            </Button>
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
  }, [
    filterValue,
    roleFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="danger"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


  return (
    <>
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px] shadow-none p-4",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
    <AddUserModal setUpdatedUsers={setUpdatedUsers} idGroup={idGroup} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
