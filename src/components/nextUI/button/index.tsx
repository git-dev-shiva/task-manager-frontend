import ContainedBtn from "./contained";
import OutlinedBtn from "./outlined";

type NextUIProps = any & {
    variant?: any;
};

const NextUIBtn = ({ variant = "solid", ...rest }: NextUIProps) => {
    if (variant === "bordered") return <OutlinedBtn {...rest} />;

    return <ContainedBtn {...rest} />;
};

export default NextUIBtn;
