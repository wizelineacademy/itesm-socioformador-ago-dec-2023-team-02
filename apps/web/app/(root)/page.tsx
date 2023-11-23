import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserbyAuthID, createUser } from "@/lib/user";
import type { UserCreateData } from "@/types/user-types";
import LoginButton from "@/components/login/login-button";

interface Parameters {
  userContext: string;
  responseContext: string;
  temperature: number;
  size: string;
}

export async function handleAuth0User(authUser: any): Promise<void> {
  // Replace Auth0SessionType with the actual type

  //check if current auth0 user exists in database
  const authUserId: string = authUser.sub;
  const result = await getUserbyAuthID(authUserId);

  //If user does not exists in database
  if (result.status === 404) {
    // User doesn't exist in database, create a new one
    const newUser: UserCreateData = {
      idAuth0: authUserId,
      name: authUser.name,
      email: authUser.email,
      jobPosition: "",
      role: "USER",
      image: authUser.picture,
      creditsRemaining: 0,
      globalParameters: {} as Parameters,
    };

    //create new user on the database
    try {
      void (await createUser(newUser, [1]));
    } catch (error) {
      console.log("error", error);
    }
  }
}

export default async function Home(): Promise<JSX.Element> {
  const { user } = (await getSession()) || {};

  if (user) {
    await handleAuth0User(user);
  }

  return (
    <section>
      <Image
        alt="Wizeline Office"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        // quality={100}
        src="/assets/wizeline-background.jpeg"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <div
        className="flex flex-col min-h-screen bg-transparent absolute top-0 left-0 right-0 bottom-0 overflow-hidden"
        key="1"
      >
        <header className="p-4 lg:p-6 flex items-center justify-between">
          <Image
            alt="Logo"
            height={48}
            src="./assets/wizeline.svg"
            width={48}
          />
        </header>
        <main className="h-screen relative">
          <section className="flex flex-col justify-center items-center text-center px-4 md:px-6 mt-20 md:mt-32 lg:mt-48">
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-100">
              Welcome to&nbsp;
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E83D45] to-[#892329] shadow-md dark:from-[#E83D45] dark:to-[#892329] dark:shadow-md">
                WizePrompt
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mt-4 text-gray-300">
              The centralised platform for all your AI needs.
            </p>
            <LoginButton user={user} />
          </section>
        </main>
      </div>
    </section>
  );
}
