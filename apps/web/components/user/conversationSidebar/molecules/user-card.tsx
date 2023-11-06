// Importing required components and dependencies
import { Card, User, Tooltip } from "@nextui-org/react";
import CreditsBadge from "../../conversationBody/atoms/credits-badge";

// Defining the props expected by the UserCard component
interface UserCardProps {
  /**
   * Name of the user.
   */
  name: string;

  /**
   * Description about the user.
   */
  description: string;

  /**
   * URL for the user's avatar.
   */
  avatarUrl: string;
}

/**
 * UserCard Component
 * 
 * This component displays a user's information card along with their available credits.
 * 
 * @param {string} name - The name of the user.
 * @param {string} description - A brief description about the user.
 * @param {string} avatarUrl - The URL for the user's avatar.
 * 
 * @example
 * <UserCard name="John Doe" description="Software Engineer" avatarUrl="/path/to/avatar.jpg" />
 */
export default function UserCard({
  name,
  description,
  avatarUrl,
}: UserCardProps) {
  return (
    // Tooltip provides additional information on hover (in this case, about remaining credits).
    <Tooltip content="Remaining credits" placement="right">
      {/* Button to encapsulate the UserCard and CreditsBadge components. */}
      <button className="flex items-center justify-between w-full pb-4 outline-none">
        {/* Card component to display the user's details. */}
        <Card
          className="relative bottom-0 h-auto bg-transparent dark"
          radius="none"
        >
          {/* User component displays user's name, description, and avatar. */}
          <User
            avatarProps={{
              src: avatarUrl,
            }}
            className="shadow-none"
            description={description}
            name={name}
          />
        </Card>

        {/* CreditsBadge displays the number of credits used by the user (static value of 100 for this example). */}
        <CreditsBadge creditsUsed={100} />
      </button>
    </Tooltip>
  );
}