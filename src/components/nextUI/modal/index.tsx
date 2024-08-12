"use client";
import { ReactNode, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Divider
} from "@nextui-org/react";

type Size =
    | "sm"
    | "md"
    | "lg"
    | "xs"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full"
    | undefined;

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: Size;
};

const NextUIModal = ({
    open,
    onClose: handleClose,
    title,
    children,
    footer,
    size = "lg"
}: Props) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    useEffect(() => {
        if (open) {
            onOpen();
        } else {
            onClose();
        }
    }, [open]);

    return (
        <Modal
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={() => {
                onOpenChange();
                handleClose();
            }}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut"
                        }
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn"
                        }
                    }
                }
            }}
            size={size}
            classNames={{
                closeButton:
                    "text-lg hover:text-orange-600 hover:bg-orange-300 mt-2 mr-2 transition-all duration-500 ease-in-out text-white",
            }}
        >
            <ModalContent className="w-[90%] absolute top-[20%]">
                {() => (
                    <>
                        <ModalHeader className="px-4 bg-indigo-950 text-white">
                            {title}
                        </ModalHeader>
                        <Divider />
                        <ModalBody className="p-4 max-h-[80vh] overflow-y-auto">
                            {children}
                        </ModalBody>
                        {footer && <ModalFooter>{footer}</ModalFooter>}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default NextUIModal;
