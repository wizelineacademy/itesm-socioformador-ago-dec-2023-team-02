"use client";
import { Select, SelectItem } from "@nextui-org/react";
// Provider is imported from the Prisma client which is an ORM for TypeScript.
import type { ModelWithProvider } from "@/types/moder-with-provider-types";
import ModelSelectionCard from "../atoms/model-selection-card";


// Props interface for the ModelSelector component.
interface ModelSelectorProps {
  models: ModelWithProvider[];
  onModelSelection: (modelId: number | null) => void; // Function to call when a model is selected, takes a model ID.
}

// ModelSelector component definition with type annotation for props.

export default function ModelSelector({models, onModelSelection}: ModelSelectorProps): JSX.Element {
  // Event handler for the select change event, updates the selected model via the passed-in callback.
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = Number(event.target.value);
    onModelSelection(newModel === 0 ? null : newModel); // Converts the selected model ID to a number and updates state.
  };

  // JSX for rendering the select dropdown with model options.
  return (
    <div>
      <Select
        className="w-56"
        items={models} // Items for the select are the models fetched from the API.
        label="Select a Model"
        onChange={handleChange} // Sets the event handler for change events.
        placeholder="Select a Model"
        size="sm"
      >
        {/* This function renders each model as a selectable item with a custom ModelSelectionCard. */}
        {models.map((model) =>(
          <SelectItem key={model.id} textValue={model.name.toUpperCase()}>
            <ModelSelectionCard model={model}/>
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

