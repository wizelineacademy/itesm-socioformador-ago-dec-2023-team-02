"use client";
// This line imports necessary React functionalities and components from NextUI.
import { useState, useEffect } from "react";
import { Select, SelectItem, User } from "@nextui-org/react";
// Provider is imported from the Prisma client which is an ORM for TypeScript.
import { Provider } from "@prisma/client";

// Interface for typing the structure of a model object.
interface ModelInterface {
    id: number;
    name: string;
    idProvider: number;
    providerImage: string;
    active: boolean;
    modelType: string;
    modelDescription: string;
    provider: Provider; // This is likely a complex object with its own structure.
}

// Props interface for the ModelSelector component.
interface ModelSelectorProps {
  setSelectedModel: (id: number) => void; // Function to call when a model is selected, takes a model ID.
  onSelectModel: (model: string) => void; // Another callback function, likely intended to handle additional logic when a model is selected.
}

// ModelSelector component definition with type annotation for props.
const ModelSelector: React.FC<ModelSelectorProps> = ({ setSelectedModel, onSelectModel }) => {
  // Local state declaration to store an array of models.
  const [models, setModels] = useState<ModelInterface[]>([]);

  // Logs onSelectModel to the console for debugging.
  console.log(onSelectModel);

  // Function to fetch models from an API and set the local state with the fetched models.
  async function getModels(): Promise<void> {
    const response = await fetch("/api/models");
    const data: ModelInterface[] = await response.json();
    setModels(data);
  }

  // useEffect hook to call the getModels function when the component mounts.
  useEffect(() => {
    void getModels();
  }, []);

  // Event handler for the select change event, updates the selected model via the passed-in callback.
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = event.target.value;
    setSelectedModel(Number(newModel)); // Converts the selected model ID to a number and updates state.
  };

  // JSX for rendering the select dropdown with model options.
  return (
    <div className="w-full max-w-xs mx-auto">
      <Select
        size="sm"
        items={models} // Items for the select are the models fetched from the API.
        label="Select a Model"
        placeholder="Select a Model"
        className="xs:ml-10 md:ml-20"
        onChange={handleChange} // Sets the event handler for change events.
      >
        {/* This function renders each model as a selectable item with a custom ModelSelectionCard. */}
        {(model) => <SelectItem key={model.id} textValue={model.name.toUpperCase()}><ModelSelectionCard model={model}/></SelectItem>}
      </Select>
    </div>
  );
};

// The ModelSelectionCard component renders a User component with model details.
function ModelSelectionCard(props: any) {
  const { model } = props;
  // Logs the model object for debugging.
  console.log(model);
  
  // Sets avatar background color based on the model name.
  let avatarBackgroundColor = "";
  if(model.name === "gpt-4") {
    avatarBackgroundColor = "dark:bg-purple-400 dark:bg-opacity-80 bg-purple-600 bg-opacity-80";
  }else if(model.name === "dalle") {
    avatarBackgroundColor = "dark:bg-sky-400 dark:bg-opacity-80 bg-sky-600 bg-opacity-80";
  }else {
    avatarBackgroundColor = "dark:bg-green-400 dark:bg-opacity-80 bg-green-600 bg-opacity-80";
  }

  // The User component from NextUI is used to display the model's name, description, and avatar.
  return (
    <User
      className=""
      name={model.name.toUpperCase()} // Model name is displayed in uppercase.
      description={`${2} Tokens`} // Static description is added, should be dynamic based on model data.
      avatarProps={{
        radius: "sm",
        size: "sm",
        className: `p-1 ${avatarBackgroundColor}`, // Applies the computed background color style.
        src: model.provider.image, // Uses the image from the model's provider.
      }}
    />
  );
}

// Exports the ModelSelector component as the default export of this module.
export default ModelSelector;
