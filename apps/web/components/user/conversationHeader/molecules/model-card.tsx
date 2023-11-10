// Import required components from NextUI for UI design and interactivity
import {
  User,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

// Interface to describe the shape of the model description object
interface ModelDescription {
  details: string;
  generalDescription: string;
  typeOfUse: string[];
  examples: string[];
  capabilities: string[];
  limitations: string[];
  pricePerToken: number;
}

// Interface for the props expected by the ModelCard component
interface ModelCardProps {
  modelName: string;
  providerImageUrl: string;
  creditsAvailable: number;
  modelDescription: ModelDescription;
}

// The ModelCard component displays a user card that, when clicked, opens a modal with more details
export const ModelCard: React.FC<ModelCardProps> = ({
  modelName,
  providerImageUrl,
  creditsAvailable,
  modelDescription,
}) => {
  // useDisclosure is a hook that helps in controlling the visibility of modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let avatarBackgroundColor = "";
  if(modelName === "gpt-4") {
    avatarBackgroundColor = "dark:bg-purple-400 dark:bg-opacity-80 bg-purple-600 bg-opacity-80";
  }else if(modelName === "dalle") {
    avatarBackgroundColor = "dark:bg-sky-400 dark:bg-opacity-80 bg-sky-600 bg-opacity-80";
  }else {
    avatarBackgroundColor = "dark:bg-green-400 dark:bg-opacity-80 bg-green-600 bg-opacity-80";
  }


  return (
    // Fragment to group the button and modal without adding extra nodes to the DOM
    <>
      {/* Button to trigger modal opening */}
      <button onClick={onOpen}>
        {/* User component from NextUI representing the model, with credits and image */}
        <User
          className="xs:ml-10 md:ml-20"
          name={modelName.toUpperCase()}
          description={`${creditsAvailable} Tokens`}
          avatarProps={{
            radius: "sm",
            size: "sm",
            className: `p-1 ${avatarBackgroundColor}`,
            src: providerImageUrl,
          }}
        />
      </button>

      {/* Modal component to show the detailed description of the model */}
      <Modal placement="center" size="md" radius="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        {/* ModalContent holds the content of the modal */}
        <ModalContent>
          {/* Function as a child pattern to render content with access to the close function */}
          {(onClose) => (
            // Fragment to group header, body, and footer
            <>
              {/* ModalHeader contains the title of the modal */}
              <ModalHeader className="flex flex-col gap-1">
                {modelName.toUpperCase()}
              </ModalHeader>
              {/* ModalBody holds the main content */}
              <ModalBody>
                {/* ModelDescriptionComponent renders the details of the model */}
                <ModelDescriptionComponent modelDescription={modelDescription}/>
              </ModalBody>
              {/* ModalFooter contains the actions, such as closing the modal */}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

// Interface for the props of the List component
interface ListProps {
  items: string[]; // Array of strings that will be rendered as list items
}

// A reusable List component for rendering an array of strings as a list
const List: React.FC<ListProps> = ({ items }) => (
  <ul className="list-disc list-inside">
    {/* Mapping through the items array to create a list item for each entry */}
    {items.map((item, index) => (
      <li key={index}>{item}</li> // Key is index because items are static and order won't change
    ))}
  </ul>
);

// ModelDescriptionComponent takes the modelDescription prop and renders details about the model
const ModelDescriptionComponent: React.FC<{
  modelDescription: ModelDescription;
}> = ({ modelDescription }) => (
  <div className="text-xs space-y-4">
    {/* Render the general details of the model */}
    <p>{modelDescription.details}</p>

    {/* A section for capabilities with a title and a list */}
    <h3 className="font-medium text-sm">Capabilities</h3>
    <List items={modelDescription.capabilities} />

    {/* A section for limitations with a title and a list */}
    <h3 className="font-medium text-sm">Limitations</h3>
    <List items={modelDescription.limitations} />

    {/* A section for examples with a title and a list */}
    <h3 className="font-medium text-sm">Examples</h3>
    <List items={modelDescription.examples} />
  </div>
);
