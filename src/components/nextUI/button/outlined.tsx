import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const OutlinedBtn = (props: any) => {
    return (
        <Button
            {...props}
            className={twMerge(
                clsx(
                    "bg-white border border-orange-600 items-center rounded-full text-orange-600 font-semibold",
                    props.className
                )
            )}
        >
            {props.children}
        </Button>
    );
};

export default OutlinedBtn;
