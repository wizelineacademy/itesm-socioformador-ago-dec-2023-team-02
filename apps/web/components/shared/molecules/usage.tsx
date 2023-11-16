"use client";

import { Card, CardBody, Accordion, AccordionItem } from "@nextui-org/react";

export default function Usage() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agosto",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardBody>
          <p>Usage</p>
          <Accordion isCompact>
            <AccordionItem title="Monthly Usage">
              {months.map((month) => {
                return <p key={month}> {month} </p>;
              })}
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </div>
  );
}
