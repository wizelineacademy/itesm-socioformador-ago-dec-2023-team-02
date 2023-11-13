import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserbyAuthID, createUser } from "@/lib/user";
import { UserCreateData } from "@/types/user-types";
interface Parameters {
  userContext: string;
  responseContext: string;
  temperature: number;
  size: string;
}

export async function handleAuth0User(authUser: any) { // Replace Auth0SessionType with the actual type

  //check if current auth0 user exists in database
  const authUserId: string = authUser.sub;
  const result = await getUserbyAuthID(authUserId); 

  //If user does not exists in database
  if(result.status === 404){
      // User doesn't exist in database, create a new one
      const newUser: UserCreateData = {
        idAuth0: authUserId,
        name: authUser.name,
        email: authUser.email,
        jobPosition: "",
        role: 'USER', 
        image: authUser.picture,
        creditsRemaining: 0,
        globalParameters: {} as Parameters
      }

      //create new user on the database
      try{
        void await createUser(newUser, [1]);
      }catch(error){
        console.log("error", error);
      } 
  }
}

export default async function Home(): Promise<JSX.Element> {
  const { user } = (await getSession()) || {};

  if(user){
    await handleAuth0User(user);
  }

  return (
    <section>
      <div
        className="flex flex-col min-h-screen bg-white dark:bg-gray-800 absolute top-0 left-0 right-0 bottom-0 overflow-hidden"
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
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100">
              Welcome to&nbsp;
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                WizePrompt
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mt-4 text-gray-800 dark:text-gray-400">
              The centralised platform for all your AI needs.
            </p>
            {!user ? (
              <Button
                className="w-20 mt-8 px-6 py-3 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                onClick={redirect("/api/auth/login")}
              >
                Login
              </Button>
            ) : (
              <Button
                className="w-20 mt-8 px-6 py-3 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                onClick={redirect("/conversation/new")}
              >
                Get Started
              </Button>
            )}
          </section>
          {/* <section className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
            <div className="w-100vw px-4 md:px-6 flex justify-evenly gap-2">
              <div className="flex flex-col items-center justify-center space-y-4">
                <svg
                  className=" h-12 w-12 text-gray-800 dark:text-gray-100"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
                  <path d="m13 12-3 5h4l-3 5" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Fast Processing
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI models are optimized for speed and accuracy.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <svg
                  className=" h-12 w-12 text-gray-800 dark:text-gray-100"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Secure and Private
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We respect your privacy and protect your data.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <svg
                  className=" h-12 w-12 text-gray-800 dark:text-gray-100"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                  <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M12 2v2" />
                  <path d="M12 22v-2" />
                  <path d="m17 20.66-1-1.73" />
                  <path d="M11 10.27 7 3.34" />
                  <path d="m20.66 17-1.73-1" />
                  <path d="m3.34 7 1.73 1" />
                  <path d="M14 12h8" />
                  <path d="M2 12h2" />
                  <path d="m20.66 7-1.73 1" />
                  <path d="m3.34 17 1.73-1" />
                  <path d="m17 3.34-1 1.73" />
                  <path d="m11 13.73-4 6.93" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Easy Customization
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Customize the AI models to fit your needs.
                </p>
              </div>
            </div>
          </section> */}
        </main>
        {/* <footer className="p-4 lg:p-6 flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-white">
          <div className="text-sm">© 2023 AI App</div>
          <nav className="flex gap-4">
            <Link className="text-white hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="text-white hover:underline" href="#">
              Privacy Policy
            </Link>
          </nav>
        </footer> */}
      </div>
    </section>
  );
}
