import { User } from "@nextui-org/react";
import type { ModelWithProvider } from "@/types/moder-with-provider-types";

interface ModelSelectionProps {
    model: ModelWithProvider;
}

// The ModelSelectionCard component renders a User component with model details.
export default function ModelSelectionCard({model}: ModelSelectionProps): JSX.Element {
    // Sets avatar background color based on the model name.
    let avatarBackgroundColor = "";
    if(model.name === "gpt-4") {
      avatarBackgroundColor = "dark:bg-purple-400 dark:bg-opacity-80 bg-purple-600 bg-opacity-80";
    } else if(model.name === "dalle") {
      avatarBackgroundColor = "dark:bg-sky-400 dark:bg-opacity-80 bg-sky-600 bg-opacity-80";
    } else {
      avatarBackgroundColor = "dark:bg-green-400 dark:bg-opacity-80 bg-green-600 bg-opacity-80";
    }
  
    // The User component from NextUI is used to display the model's name, description, and avatar.
    return (
      <User
        avatarProps={{
          radius: "sm",
          size: "sm",
          className: `p-1 ${avatarBackgroundColor}`, // Applies the computed background color style.
          src: model.provider.image, // Uses the image from the model's provider.
        }}
        className="whitespace-nowrap"
        description={`${2} Tokens`} // Static description is added, should be dynamic based on model data.
        name={model.name.toUpperCase()} // Model name is displayed in uppercase.
      />
    );
  }