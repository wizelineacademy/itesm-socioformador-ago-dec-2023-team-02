"use client"

import {
    Table, 
    TableBody, 
    TableRow, 
    TableColumn, 
    TableHeader, 
    getKeyValue, 
    TableCell,
    Button,
    Card,
    CardBody
} from "@nextui-org/react"
import ThemeButton from "@/components/theme-button";
import RequestCredits from "./request-credits";
import {MdOutlineLightMode} from "react-icons/md"

const ClearAll = () => {
    return (
        <Button className="bg-red-500 text-gray-50"> Clear </Button>
    )
}



export default function General() {
    const creditsData = [
        {
            key: 1,
            model: "OpenAI",
            credits: 2345,
        },

        {
            key: 2,
            model: "Dall-E",
            credits: 6384,
        }
    ];

    const data = [
        {
            key: "model",
            label: "Model"
        },

        {
            key: "credits",
            label: "Credits"
        }
    ];

    return (
        <div className ="flex flex-col space-y-4" >
            {/* Credits Card */}
            <Card> <CardBody> 
                <div className = "flex flex-col space-y-2">
                    <p> Credits </p> 
                    <Table isCompact removeWrapper >
                        <TableHeader columns={data} >
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={creditsData} >
                            {(item)=> (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <RequestCredits/>
                </div>
             </CardBody> </Card>
                   
            {/* Theme Options */}
            <Card> <CardBody>
                <div className="grid grid-cols-2 gap-4 ">
                    <div className="grid grid-cols-4 gap-0">
                        <p className= "inline-block align-text-top"> Theme </p> 
                        <MdOutlineLightMode
                                className="inline-block align-bottom"
                                size={20}
                        /> 
                    </div>
                    
                    <ThemeButton />  </div> 
                    </CardBody></Card>
            
            
            {/* Clear all chats Options */}
            <Card> <CardBody>
                <div className="grid grid-cols-2 gap-4 ">
                    <p className= "inline-block align-bottom"> Clear All Chats </p>  
                    <ClearAll />  </div> 
                    </CardBody></Card>
        </div>
    )
}