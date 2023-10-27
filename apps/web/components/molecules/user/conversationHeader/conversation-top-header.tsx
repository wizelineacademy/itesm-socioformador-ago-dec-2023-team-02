import { Button } from '@nextui-org/react';
import { ModelCard } from './model-card';
//import ThemeButton from '@/components/theme-button';
import { BsLayoutSidebar } from 'react-icons/bs';
import { BiBrain } from 'react-icons/bi';

const providerImage =
    "https://avatars.githubusercontent.com/u/86160567?s=200&v=4";

export default function ConversationHeader() {
    return (
        <div className="flex justify-between items-center p-2 fixed w-full top-0 z-30 py-2 shadow-md bg-white dark:bg-black">
            <Button isIconOnly>
                <BsLayoutSidebar/>
            </Button>
            
            <ModelCard modelName="GPT-4" providerImageUrl={providerImage} />
            <Button isIconOnly><BiBrain/></Button>
        </div>
    );
}
