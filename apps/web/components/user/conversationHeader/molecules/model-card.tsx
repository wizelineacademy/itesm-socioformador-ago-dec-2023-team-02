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
  Chip
} from "@nextui-org/react";
import { BsImages } from "react-icons/bs";
import { creditsToTokens } from "@/lib/helper/gpt/credits-and-tokens";
import CreditsBadge from "../../conversationBody/atoms/credits-badge";


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
  size: string;
}

// The ModelCard component displays a user card that, when clicked, opens a modal with more details
// export const ModelCard: React.FC<ModelCardProps> = ({
export function ModelCard({
  modelName,
  providerImageUrl,
  creditsAvailable,
  modelDescription,
  size,
}: ModelCardProps): JSX.Element {
  // useDisclosure is a hook that helps in controlling the visibility of modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let avatarBackgroundColor = "";
  if (modelName === "gpt-4") {
    avatarBackgroundColor =
      "dark:bg-purple-400 dark:bg-opacity-80 bg-purple-600 bg-opacity-80";
  } else if (modelName === "dalle") {
    avatarBackgroundColor =
      "dark:bg-sky-400 dark:bg-opacity-80 bg-sky-600 bg-opacity-80";
  } else {
    avatarBackgroundColor =
      "dark:bg-green-400 dark:bg-opacity-80 bg-green-600 bg-opacity-80";
  }

  return (
    // Fragment to group the button and modal without adding extra nodes to the DOM
    <>
      {/* Button to trigger modal opening */}
      <button onClick={onOpen} type="button">
        {/* User component from NextUI representing the model, with credits and image */}
        <User
          avatarProps={{
            radius: "sm",
            size: "sm",
            className: `p-1 ${avatarBackgroundColor}`,
            src: providerImageUrl,
          }}
          className="xs:ml-10 md:ml-20"
          classNames={
            {
              description: "text-xs font-bold text-black dark:text-white",
            }
          }
          description={modelName === "dalle"
            ? <Chip avatar={<BsImages />} radius="sm" size="sm" variant="flat"><p className="text-xs">{`${creditsToTokens(creditsAvailable, modelName, size)} Images Available`}</p></Chip>
            : <CreditsBadge creditsUsed={creditsToTokens(creditsAvailable, modelName)} text="Tokens Available" /> 
          }
          name={modelName.toUpperCase()}
        />
      </button>

      {/* Modal component to show the detailed description of the model */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        radius="sm"
        size="md"
      >
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
                <ModelDescriptionComponent
                  modelDescription={modelDescription}
                />
              </ModalBody>
              {/* ModalFooter contains the actions, such as closing the modal */}
              <ModalFooter>
                <Button color="danger" onPress={onClose} variant="light">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

// Interface for the props of the List component
interface ListProps {
  items: string[]; // Array of strings that will be rendered as list items
}

// A reusable List component for rendering an array of strings as a list
function List({ items }: ListProps): JSX.Element {
  return (
    <ul className="list-disc list-inside">
      {/* Mapping through the items array to create a list item for each entry */}
      {items.map((item, index) => (
        <li key={index}>{item}</li> // Key is index because items are static and order won't change
      ))}
    </ul>
  );
}

// ModelDescriptionComponent takes the modelDescription prop and renders details about the model
// const ModelDescriptionComponent: React.FC<{
//   modelDescription: ModelDescription;
// }> = ({ modelDescription }) => (
function ModelDescriptionComponent({
  modelDescription,
}: {
  modelDescription: ModelDescription;
}): JSX.Element {
  return (
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
}
