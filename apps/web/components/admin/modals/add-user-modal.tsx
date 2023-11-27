import { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import { toast } from "sonner";
import type { User } from "@prisma/client";
import SearchBar from "@/components/shared/molecules/search-bar";
import { findMatchRatio, cleanString } from "@/helpers/string-helpers";
import UsersListBox from "./users-list-box";

interface AddUserModalProps {
  setUpdatedUsers: any;
  idGroup: number;
  isOpen: boolean;
  onOpenChange: () => void;
}

function AddUserModal({
  setUpdatedUsers,
  idGroup,
  isOpen,
  onOpenChange,
}: AddUserModalProps): JSX.Element {
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

  async function getUsers(): Promise<void> {
    try {
      // Modify the URL to include the groupId
      const url = `http://${
        process.env.ENVIROMENT === "production"
          ? process.env.PROD_DOMAIN
          : "localhost"
      }:3000/api/users/group/${idGroup}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: User[] = await response.json();
      setUsers(data); // setUsers is a state setter function for users
    } catch (err) {
      console.error(err);
      toast.error("Failed getting user data");
    }
  }

  useEffect(() => {
    if (isOpen) {
      void getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    console.log("Updated users: ", users);
  }, [users]);

  //set values
  const [values, setValues] = useState<Set<string>>(new Set(["1"]));

  //array values
  const arrayValues = Array.from(values);

  const handleAddUser = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      // Get the user IDs from the values Set
      const userIds = Array.from(values).map(Number);

      // Send the POST request to your API endpoint
      const response = await fetch(
        `http://${
          process.env.ENVIROMENT === "production"
            ? process.env.PROD_DOMAIN
            : "localhost"
        }:3000/api/groups/add-users/${idGroup}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Users added to group:", data);
      toast.success("Users added to the group successfully");
      onOpenChange(); // Close the modal on success
    } catch (error) {
      console.error("Error adding users:", error);
      toast.error("Failed to add users to the group");
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
                // overridingStyle="w-full text-sm shadow-none" // ! The property doesn't exist
                placeholder="Search User"
                takeFullWidth={false}
                text={searchText}
              />
              {users ? (
                <UsersListBox
                  arrayValues={arrayValues}
                  setValues={setValues}
                  users={filterUsers(users, searchText)}
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <Spinner color="danger" />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose} variant="light">
                Close
              </Button>
              <Button
                className="text-white"
                color="success"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                onPress={() => {
                  void handleAddUser();
                }}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddUserModal;
