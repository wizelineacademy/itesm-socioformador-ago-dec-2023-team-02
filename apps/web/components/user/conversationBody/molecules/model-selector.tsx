"use client";
import { useState, useEffect } from "react";
import { Select, SelectItem, User } from "@nextui-org/react";
import { Provider } from "@prisma/client";

interface ModelInterface {
    id: number;
    name: string;
    idProvider: number;
    providerImage: string;
    active: boolean;
    modelType: string;
    modelDescription: string;
    provider: Provider;
}

interface ModelSelectorProps {
  onSelectModel: (model: string) => void; // Callback function when a model is selected
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ onSelectModel }) => {
  // Local state to keep track of the selected model
  //const [selectedModel, setSelectedModel] = useState(models[0] || '');
  const [models, setModels] = useState<ModelInterface[]>([]);
  console.log(onSelectModel);

  async function getModels(): Promise<void> {
    const response = await fetch("/api/models");
    const data: ModelInterface[] = await response.json();
    setModels(data);
  }

  useEffect(() => {
    void getModels();
  }, []);

  // Handle the change event of the select element
  //   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const newModel = event.target.value;
  //     setSelectedModel(newModel);
  //     onSelectModel(newModel); // Invoke the callback function
  //   };

  return (
    <div className="w-full max-w-xs mx-auto">
      <Select
        size="sm"
        items={models}
        label="Select a Model"
        placeholder="Select a Model"
        className="xs:ml-10 md:ml-20"
      >
        {(model) => <SelectItem key={model.id} textValue={model.name.toUpperCase()}><ModelSelectionCard model={model}/></SelectItem>}
      </Select>
    </div>
  );
};

function ModelSelectionCard(props: any) {
  const { model } = props;
  console.log(model);
  let avatarBackgroundColor = "";
  if (model.name === "gpt-4") {
    avatarBackgroundColor =
      "dark:bg-purple-400 dark:bg-opacity-80 bg-purple-600 bg-opacity-80";
  } else if (model.name === "dalle") {
    avatarBackgroundColor =
      "bg-blue-400 bg-opacity-80 bg-sky bg-opacity-80";
  } else {
    avatarBackgroundColor =
      "dark:bg-green-400 dark:bg-opacity-80 bg-green-600 bg-opacity-80";
  }

  return (
    <User
      className=""
      name={model.name.toUpperCase()}
      description={`${2} Tokens`}
      avatarProps={{
        radius: "sm",
        size: "sm",
        className: `p-1 ${avatarBackgroundColor}`,
        src: model.provider.image,
      }}
    />
  );
}

export default ModelSelector;
