"use client"
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure,
    Button,
    Card,
    CardBody,
    Input,
    Textarea
}
from "@nextui-org/react"
import { toast } from "sonner"

const Price = () => {
    return (
        <Input
            type="number"
            placeholder="0.00"
            labelPlacement="outside"
            size= "lg"
            startContent={
            <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-medium"></span>
            </div>
            }
        />
    )

}

const Descripcion = () => {
    return (
        <Textarea
            placeholder="Explain the reason"
            size = "lg"
            className="flex items-center text-large"
        />
    )

}

export default function RequestCredits() {
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
        <Button className="bg-emerald-500  text-gray-50" onPress={onOpen}>Request Credits</Button>
        <Modal 
            className="min-h-[500px] overflow-y-scroll"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Request Credits</ModalHeader>
                <ModalBody>
                    <div className="flex-col space-y-4">
                        <Card>
                            <CardBody>
                                <p> Requested Credits </p>
                                <Price/>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <p> Message to Administrator </p>
                                <Descripcion/>
                            </CardBody>
                        </Card>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                    Cancel
                    </Button>
                    <Button className="bg-rose-500 text-gray-50" onClick= {() => {toast.success("Request has been sent")}} onPress={onClose}>
                    Request Credits

                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    );
}
