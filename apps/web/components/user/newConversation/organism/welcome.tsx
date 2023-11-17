"use client";
import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Button,
  Divider,
} from "@nextui-org/react";
import { PrismaUserContext } from "@/context/prisma-user-context";
import ModelSelectionCard from "../atoms/model-selection-card";
import { ModelWithProvider } from "@/types/moder-with-provider-types";

interface Model {
  name: string;
  // Add additional properties as needed
}

interface WelcomeProps {
  models: ModelWithProvider[];
}

function Welcome({ models }: WelcomeProps): JSX.Element {
  const prismaUser = useContext(PrismaUserContext);

  // Function to calculate credits per model (placeholder logic)
  //   const calculateCreditsPerModel = () => {
  //     return modelList.map(model => ({
  //       ...model,
  //       creditsUsage: 'TBD' // Replace 'TBD' with actual calculation
  //     }));
  //   };

  //   const modelsWithCredits = calculateCreditsPerModel();

  return (
    <div className="flex justify-center  pt-20 w-full h-full">
      <div className="flex flex-col items-center justify-start w-10/12 md:w-7/12">
        <h2 className="text-3xl font-bold p-2">Welcome {prismaUser?.name}</h2>
        <p className="text-md">
          You have {prismaUser?.creditsRemaining} credits available to spend
          with our integrated AI models.
        </p>
        <Divider className="m-3" />

        <p className="pt-2 text-md">
          Available Tokens
        </p> 
           <p className="text-xs font-light text-default-500 pb-2 text-center">
           Your credits convert to tokens, which are consumed by the models. 
           <br/>Each model consume a different amount of credits.
         </p>

        {models.map((model, index) => (
          <div key={index} className="w-10/12 md:w-7/12 lg:w-1/3 p-2">
            <ModelSelectionCard model={model} />
          </div>
        ))}
      </div>
    </div>

    // <div className="flex flex-col w-full h-full my-10 px-6 justify-stretch items-center">
    //   <div className="text-center gap-3 w-full md:w-9/12">
    //     <h2 className="text-3xl font-bold pb-2">Welcome {prismaUser?.name}</h2>
    //     <p className="text-md p-2">
    //       You have {prismaUser?.creditsRemaining} credits available to spend with our integrated AI models.
    //     </p>

    //   </div>

    //   <Divider/>

    //   <div className="flex flex-col justify-start items-start w-full sm:w-7/12 mb-5">
    //     <Card radius="sm" shadow="none" className="mb-2 flex justify-center bg-inherit">
    //       <CardHeader className="w-full text-center flex flex-col items-center justify-center">

    //         <p className="p-2">
    //           Start conversations with a variety of Large Language Models
    //         </p>

    //       </CardHeader>
    //       <CardBody className="flex justify-center w-full">
    //         <div className="flex flex-col justify-center items-center w-8/12">
    //         {models.map((model, index) => (
    //           <div key={index} className="w-full lg:w-1/3 p-2">
    //             <ModelSelectionCard model={model} />
    //           </div>
    //         ))}
    //         </div>
    //       </CardBody>
    //     </Card>
    //   </div>
    //   <div className="flex flex-col justify-center items-center w-full">
    //   <p className="text-sm font-light text-default-500 p-2">
    //       Your credits convert to tokens, which are consumed by the models. Each model may consume a different amount of credits.
    //     </p>
    //   </div>
    // </div>
  );
}

export default Welcome;
