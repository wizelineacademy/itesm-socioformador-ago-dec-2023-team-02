// GroupTable.tsx
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User as UserIcon, Chip, ChipProps, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { User } from '@prisma/client';

interface GroupTableProps {
  users: User[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
    ADMIN: "success",
    USER: "danger",
  };

export const GroupTable: React.FC<GroupTableProps> = ({ users }) => {
  // This function renders the table cell depending on the column key and user data
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <UserIcon
            avatarProps={{radius: "sm", src: user.image}}
            description={user.email}
            name={user.name}
          >
            {typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue}
          </UserIcon>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.jobPosition}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.role}</p>
          </div>
        );
      case "status":
        return (
        <Chip className="capitalize" color={statusColorMap[user.role]} size="sm" variant="flat">
            {cellValue.toString()}
        </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  {/* <VerticalDotsIcon className="text-default-300" /> */}
                  <p className='text-white'>...</p>
                  
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
  }, []);

  // Define the columns for the table
  const columns = [
    { name: 'Name', uid: 'name' },
    { name: 'Role', uid: 'role' },
    { name: 'Position', uid: 'jobPosition' },
    { name: 'Credits Remaining', uid: 'creditsRemaining'}
    // Add other columns as needed
  ];

  return (
    <Table css={{ minWidth: '100%' }} aria-label="Group Users Table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid}>{column.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            {columns.map((column) => (
              <TableCell key={`${user.id}-${column.uid}`}>
                {renderCell(user, column.uid as keyof User)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};