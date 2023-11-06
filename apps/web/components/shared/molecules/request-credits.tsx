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

const Price = () => {
    return (
        <Input
            type="number"
            placeholder="0.00"
            labelPlacement="outside"
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
            placeholder="Explain your reason"
            className="flex items-center text-medium"
        />
    )

}

export default function RequestCredits() {
    // return (
    //     <Button> Request Credits </Button>
    // )
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
        <Button onPress={onOpen}>Request Credits</Button>
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
                    <div className="flex flex-col space-y-4">
                        <Card>
                            <CardBody>
                                <p> Requested Credits </p>
                                <Price/>
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
                    <Button className="bg-rose-500 text-gray-50" onPress={onClose}>
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
