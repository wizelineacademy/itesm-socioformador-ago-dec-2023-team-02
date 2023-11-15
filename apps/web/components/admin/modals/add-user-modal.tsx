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
import UsersListBox from "./users-list-box";
import { toast } from "sonner";
import { User } from "@prisma/client";

interface AddUserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [users, setUsers] = useState<User[] | null>(null);
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  // const handleAddUser = async () => {
  //   setIsSubmitting(true);
  //   try {
  //     // Implement your add user logic here
  //     onOpenChange(); // Close the modal on success
  //   } catch (error: any) {
  //     console.error("Error adding user:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  return (
    <Modal className="w-full" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 w-full">Add Users</ModalHeader>
            <ModalBody className="flex w-full justify-center">
              {users ? <UsersListBox users={users} /> : <div className="w-full h-full flex justify-center items-center"><Spinner color="danger" /></div>}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                // onPress={handleAddUser}
                disabled={isSubmitting}
              >
                Add User
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
