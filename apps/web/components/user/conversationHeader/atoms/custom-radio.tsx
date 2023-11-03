import React from "react";
import { Radio, cn } from "@nextui-org/react";

export const CustomRadio = (props: any) => {
  const {children, ...otherProps} = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-start",
          "flex-row max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-danger wrapper-border-danger",
        ),
      }}
      color="danger"
    >
      {children}
    </Radio>
  );
};