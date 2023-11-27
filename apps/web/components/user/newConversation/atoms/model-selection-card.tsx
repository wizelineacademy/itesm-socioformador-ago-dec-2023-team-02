"use client";
import React, { useContext } from "react";
import { User, Chip } from "@nextui-org/react";
import { BsImages } from "react-icons/bs";
import type { PrismaUserContextShape } from "@/context/prisma-user-context";
import { PrismaUserContext } from "@/context/prisma-user-context";
import type { ModelWithProvider } from "@/types/moder-with-provider-types";
import { creditsToTokens } from "@/lib/helper/gpt/credits-and-tokens";
import CreditsBadge from "../../conversationBody/atoms/credits-badge";

interface ModelSelectionProps {
  model: ModelWithProvider;
}

// The ModelSelectionCard component renders a User component with model details.
export default function ModelSelectionCard({
  model,
}: ModelSelectionProps): JSX.Element {
  const prismaUserContext = useContext<PrismaUserContextShape | null>(
    PrismaUserContext
  );
  const prismaUser = prismaUserContext?.prismaUser;

  // Sets avatar background color based on the model name.
  let avatarBackgroundColor = "";
  if (model.name === "gpt-4") {
    avatarBackgroundColor =
      "dark:bg-purple-400 dark:bg-opacity-80 bg-purple-600 bg-opacity-80";
  } else if (model.name === "dalle") {
    avatarBackgroundColor =
      "dark:bg-sky-400 dark:bg-opacity-80 bg-sky-600 bg-opacity-80";
  } else {
    avatarBackgroundColor =
      "dark:bg-green-400 dark:bg-opacity-80 bg-green-600 bg-opacity-80";
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
      description={
        model.name === "dalle" ? (
          <Chip avatar={<BsImages />} radius="sm" size="sm" variant="flat">
            <p className="text-xs">{`${creditsToTokens(
              prismaUser?.creditsRemaining || 0,
              model.name,
              "1024x1024"
            )} Images Available`}</p>
          </Chip>
        ) : (
          <CreditsBadge
            creditsUsed={creditsToTokens(
              prismaUser?.creditsRemaining || 0,
              model.name
            )}
            text="Tokens Available"
          />
        )
      }
      name={model.name.toUpperCase()} // Model name is displayed in uppercase.
    />
  );
}
