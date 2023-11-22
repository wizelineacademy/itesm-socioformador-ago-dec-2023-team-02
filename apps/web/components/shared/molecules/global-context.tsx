/* eslint-disable */
/**
 * ModalParametersGPT Component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Prop to control the open state of the modal
 * @param {function} props.onOpenChange - Handler for changes to the open state
 * @return {JSX.Element} ModalParametersGPT component
 */
// Importing necessary libraries and components
"use client";
import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Textarea,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Slider } from "@/components/ui/slider";
import { PrismaUserContext } from "@/context/prisma-user-context";
import { type User } from "@prisma/client";
import { toast } from "sonner";
import { UserUpdateData } from "@/types/user-types";

interface Parameters {
  userContext: string;
  responseContext: string;
  temperature: number;
}

// ModalParametersGPT Component
export default function GlobalContext(): JSX.Element {
  const prismaUser = useContext<User | null>(PrismaUserContext);

  // State to hold the form data
  const [formParams, setFormParams] = useState<Parameters>({
    userContext: '',
    responseContext: '',
    temperature: 0.5, // Default temperature value
  });


  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Effect to initialize state with prismaUser data
  useEffect(() => {
    if (prismaUser && prismaUser.globalParameters) {
      const userParameters: Parameters = prismaUser.globalParameters as any;
      setFormParams(userParameters);
      console.log('userParameters', userParameters);
    }
  }, [prismaUser]);


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      // Assuming you have the user's ID and the API endpoint ready
      const userId = prismaUser?.id; // Replace with actual user ID
      const apiEndpoint = `http://localhost:3000/api/users/${userId}`; // Modify as per your API endpoint
  
      // Converting form data to JSON
      //const requestData = JSON.stringify(formParams);

      const updatedInfo: UserUpdateData = {
        globalParameters: {
          userContext: formParams.userContext,
          responseContext: formParams.responseContext,
          temperature: formParams.temperature,
        },
      };
  
  
      // Making the PATCH request
      const response = await fetch(apiEndpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
      });
  
      // Handle the response
      if (response.ok) {
        // Handle successful update
        const updatedUserData = await response.json();
        console.log('User updated:', updatedUserData);
        toast.success('User updated');
        const updatedUserParameters: Parameters = updatedUserData.globalParameters;
        setFormParams(updatedUserParameters);
        console.log('updatedUserParameters', updatedUserParameters);
      } else {
        // Handle errors
        const errorMessage = await response.text();
        console.error('Error updating user:', errorMessage);
        toast.error('Error updating user');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred');
    }

    setIsSubmitting(false);
  };

  // Returning the Modal component
  return (
    <form onSubmit={handleSubmit} className="m-2">
      {/* Label and Textarea for entering personal parameters */}
      <label className="mb-0" htmlFor="customInstructions">
        <p className="text-xs text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">
          What would you like ChatGPT to know about you to provide better
          responses?
        </p>
      </label>
      {/* Tooltip for additional information on personal parameters */}
      <Tooltip content={<PersonalParameterTooltip />} placement="right">
        <Textarea
          className="max-w-[800px] w-full p-0 text-sm text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200"
          value={formParams.userContext}
          labelPlacement="outside"
          maxRows={6}
          minRows={6}
          onChange={(e) => {
            setFormParams({ ...formParams, userContext: e.target.value });
          }}
          placeholder=""
          radius="sm"
          variant="faded"
        />
      </Tooltip>

      {/* Label and Textarea for entering response parameters */}
      <label className="mb-0" htmlFor="customInstructions">
        <p className="text-xs text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">
          How would you like ChatGPT to respond?
        </p>
      </label>
      {/* Tooltip for additional information on response parameters */}
      <Tooltip content={<ResponseParameterTooltip />} placement="right">
        <Textarea
          className="max-w-[800px] w-full p-0 text-sm text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200"
          value={formParams.responseContext}
          labelPlacement="outside"
          maxRows={6}
          minRows={6}
          onChange={(e) => {
            setFormParams({ ...formParams, responseContext: e.target.value });
          }}
          placeholder=""
          radius="sm"
          variant="faded"
        />
      </Tooltip>

      {/* Label and Slider for temperature parameters */}

      {/* Label for temperature parameters for xs and sm screens */}
      <div className="md:hidden">
        <Popover className="ml-auto md:hidden" placement="top">
          <PopoverTrigger>
            <label
              className="mb-2 ml-auto md:hidden"
              htmlFor="customInstructions"
            >
              <p className="flex text-xs text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">
                How creative should ChatGPT be?{" "}
                <span className="text-lg">
                  <AiOutlineInfoCircle className="p-0 pl-1" />
                </span>
              </p>
            </label>
          </PopoverTrigger>
          <PopoverContent>
            <TemperatureTooltip />
          </PopoverContent>
        </Popover>
      </div>

      {/* Label for temperature parameters for md and above screens*/}
      <div className="hidden md:inline">
        <Tooltip content={<TemperatureTooltip />} placement="right">
          <label
            className="mb-0 hidden md:inline "
            htmlFor="customInstructions"
          >
            <p className="flex text-xs text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">
              How creative should ChatGPT be?{" "}
              <span className="text-lg">
                <AiOutlineInfoCircle className="p-0 pl-1" />
              </span>
            </p>
          </label>
        </Tooltip>
      </div>

      {/* Slider for temperature parameters */}
      <Slider
      className="m-3 mb-4"
        //defaultValue={[formParams.temperature]}
        max={1}
        min={0}
        onValueChange={(value: number[]) => {
          setFormParams({ ...formParams, temperature: value[0] });
         }}
        step={0.1}
        value={[formParams.temperature]}
      />

      <div className="flex flex-col-reverse justify-end md:flex-row gap-2">
        {/* Cancel and Save buttons */}
        <Button type="submit" color="danger" isDisabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
}

// Component to display a tooltip with personal parameter prompts
function PersonalParameterTooltip(): JSX.Element {
  return (
    <div className="p-2">
      <h2 className="text-sm mb-1">Thought starters</h2>
      <ul className="list-disc list-inside text-xs text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200">
        {/* List of response parameter prompts */}
        <li>Where are you based?</li>
        <li>What do you do for work?</li>
        <li>What are your hobbies and interests?</li>
        <li>What subjects can you talk about for hours?</li>
        <li>What are some goals you have?</li>
      </ul>
    </div>
  );
}

// Component to display a tooltip with response parameter prompts
function ResponseParameterTooltip(): JSX.Element {
  return (
    <div className="p-2">
      <h2 className="text-sm mb-1">Thought starters</h2>
      <ul className="list-disc list-inside text-xs text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200">
        {/* List of personal parameter prompts */}
        <li>How formal or casual should ChatGPT be?</li>
        <li>How long or short should responses generally be?</li>
        <li>How do you want to be addressed?</li>
        <li>Should ChatGPT have opinions on topics or remain neutral?</li>
      </ul>
    </div>
  );
}

// Component to display a tooltip with information about temperature and creativity levels
function TemperatureTooltip(): JSX.Element {
  return (
    <div className="p-2">
      <h2 className="text-sm mb-1">Temperature and Creativity</h2>
      <ul className="list-disc list-inside text-xs text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200">
        {/* List of personal parameter prompts */}
        <li>
          Lower temperature ( left ) makes ChatGPT more focused and
          deterministic
        </li>
        <li>Higher temperature ( right ) makes it more creative and random</li>
      </ul>
    </div>
  );
}
