import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import SearchBar from "@/components/shared/molecules/search-bar";
import UsersListBox from "./users-list-box";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { findMatchRatio, cleanString } from "@/helpers/string-helpers";


interface AddUserModalProps {
  setUpdatedUsers: any;
  idGroup: number;
  isOpen: boolean;
  onOpenChange: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  setUpdatedUsers,
  idGroup,
  isOpen,
  onOpenChange,
}) => {
  //users in database
  const [users, setUsers] = useState<User[] | null>(null);

  //submitting add users
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  // Filter users based on search text
  function filterUsers(usersArray: User[], textToSearch: string): User[] {
    const cleanedSearchText: string = cleanString(textToSearch);
    return usersArray.filter(({ name }) => {
      return (
        cleanedSearchText.length === 0 ||
        findMatchRatio(cleanedSearchText, cleanString(name)) > 0.7
      );
    });
  }

  // Handler function for updating the search text
  const handleSearchTextChange: (value: string) => void = (value) => {
    setSearchText(value);
  };

  //get users from database
  async function getUsers() {
    try {
      const response = await fetch(`http://localhost:3000/api/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed getting user data");
    }
  }

  useEffect(() => {
    if (isOpen) {
      void getUsers();
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("Updated users: ", users);
  }, [users]);

  //set values
  const [values, setValues] = React.useState<Set<string>>(new Set(["1"]));

  //array values
  const arrayValues = Array.from(values);

  const handleAddUser = async () => {
    setIsSubmitting(true);
    try {
      // Get the user IDs from the values Set
      const userIds = Array.from(values).map(Number);
  
      // Send the POST request to your API endpoint
      const response = await fetch(`http://localhost:3000/api/groups/add-users/${idGroup}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Users added to group:', data);
      toast.success('Users added to the group successfully');
      onOpenChange(); // Close the modal on success
    } catch (error) {
      console.error('Error adding users:', error);
      toast.error('Failed to add users to the group');
    } finally {
      setIsSubmitting(false);
      setUpdatedUsers(true);
    }
  };

  return (
    <Modal className="w-full" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 w-full">
              Add Users
            </ModalHeader>
            <ModalBody className="flex w-full justify-center">
              {/* Search bar component */}
              <SearchBar
                onTextChange={handleSearchTextChange}
                overridingStyle="w-full text-sm shadow-none"
                placeholder="Search User"
                takeFullWidth={false}
                text={searchText}
              />
              {users ? (
                <UsersListBox
                  users={filterUsers(users, searchText)}
                  setValues={setValues}
                  arrayValues={arrayValues}
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <Spinner color="danger" />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {void handleAddUser()}}
                disabled={isSubmitting}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
