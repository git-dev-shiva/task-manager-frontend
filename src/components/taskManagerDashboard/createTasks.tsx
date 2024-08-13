import { useEffect } from "react";
import {
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Textarea
} from "@nextui-org/react";
import { Formik } from "formik";
import TasksSchema from "@/common/schema/create-tasks.schema";
import { Tasks } from "@/common/types/create-tasks";

type Props = {
    onSubmit: (values: any) => Promise<any>;
    taskToEdit: Tasks | null;
    open: boolean;
    onClose: () => void;
};


export default function CreateTasks({
    onSubmit,
    taskToEdit,
    open,
    onClose: handleClose
}: Props) {
    const { onOpen } = useDisclosure();
    const aspectSchema = new TasksSchema();

    useEffect(() => {
        if (open) {
            onOpen();
        }
    }, [open]);

    return (
        <>
            <Formik
                initialValues={taskToEdit ? taskToEdit : aspectSchema.initialValues}
                validationSchema={aspectSchema.schema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        await onSubmit(values);
                        handleClose();
                        resetForm();
                    } catch (error) {
                        console.error("Error submitting form:", error);
                        setSubmitting(false);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,

                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Input
                                type="text"
                                name="title"
                                label="Title*"
                                variant="bordered"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={
                                    Boolean(errors.title && touched.title) ? errors.title : ""
                                }
                                isInvalid={Boolean(errors.title && touched.title)}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <Textarea
                                type="text"
                                label="Description"
                                name="description"
                                variant="bordered"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={
                                    Boolean(errors.description && touched.description)
                                        ? errors.description
                                        : ""
                                }
                                isInvalid={Boolean(errors.description && touched.description)}
                                className="w-full"
                                minRows={5}
                            />
                        </div>

                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={() => {
                                    handleClose();
                                }}
                            >
                                Close
                            </Button>
                            <Button color="primary" isLoading={isSubmitting} type="submit">
                                {taskToEdit ? "Save" : "Create"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </Formik>
        </>
    );
}