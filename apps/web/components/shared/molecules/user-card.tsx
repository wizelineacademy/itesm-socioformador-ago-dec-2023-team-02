// Importing required components and dependencies
import { Card, User } from "@nextui-org/react";
import { SlOptions } from "react-icons/sl";
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
}: UserCardProps): JSX.Element {
  return (
    <div className="w-full">
      {/* Button to encapsulate the UserCard and CreditsBadge components. */}
      <div
        className="flex items-center justify-between w-full outline-none"
        // onClick={() => {
        //   console.log("Click");
        // }}
        // type="button"
      >
        {/* Card component to display the user's details. */}
        <Card
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

        {/* Options Icon */}
        <SlOptions className="text-xs" />
      </div>
    </div>
  );
}
