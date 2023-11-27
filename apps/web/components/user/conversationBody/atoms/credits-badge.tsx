import { Chip } from "@nextui-org/react";
import { TbCoins } from "react-icons/tb";

export default function CreditsBadge({
  text,
  creditsUsed,
}: {
  text: string;
  creditsUsed: number;
}): JSX.Element {

  let shortenCredits: string;

  // million
  if(creditsUsed >= 1000000){
    shortenCredits = `${(creditsUsed / 1000000).toFixed(2)}M`;
  }
  
  // thousands
  else if(creditsUsed >= 1000){
    shortenCredits = `${(creditsUsed / 1000).toFixed(2)}K`;
  }

  else{
    shortenCredits = `${creditsUsed}`;
  }
  console.log('credits: ', creditsUsed);


  return (
    <Chip avatar={<TbCoins />} radius="sm" size="sm" variant="flat">
      <p className="text-xs">{shortenCredits} {text}</p>
    </Chip>
  );
}

