import { Card, CardHeader, Image, Tooltip } from '@nextui-org/react';
interface ModelCardProps {
    modelName: string;
    providerImageUrl: string;
}

export const ModelCard: React.FC<ModelCardProps> = ({ modelName, providerImageUrl }) => {
    return (
        <Tooltip content="I am a tooltip" placement="bottom" size='md' color='default'>
        <Card className="max-w-[200px]" shadow='none' radius='sm'>
            <CardHeader className="flex gap-3 px-2 py-1">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={providerImageUrl}
                    width={30}
                />
                <div className="flex flex-col">
                    <p className="text-sm text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">{modelName}</p>
                </div>
            </CardHeader>
        </Card>
        </Tooltip>
    );
}

