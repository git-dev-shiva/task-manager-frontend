"use client"
import RegisterSchema from "@/common/schema/register.schema"
import { Button, Input } from "@nextui-org/react"
import axios from "axios";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
    const registerSchema = new RegisterSchema()
    const router = useRouter();

    const handleSubmit = async (values: any) => {
        try {
            const res = await axios.post("https://task-manager-backend-3r74.onrender.com/signup", values)
            if (!res.data) {
                return toast.error(res.data.message || "Registration Failed")
            }
            toast.success("User Created")
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <Toaster />
            <Formik initialValues={registerSchema.initialValues} validationSchema={registerSchema.schema} onSubmit={async (values, { setSubmitting }) => {
                try {
                    await handleSubmit(values)
                } catch (error) {
                    console.error("Error submitting form:", error);
                    setSubmitting(false);
                }
            }}>
                {({
                    values, errors, touched, handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="grid min-h-screen grid-cols-1">

                            <div className="flex items-center justify-center bg-primary p-6 lg:p-10">
                                <div className="mx-auto w-full max-w-[420px] space-y-6">
                                    <div className="text-center">
                                        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                                        <p className="text-muted-foreground">Get started with our platform today.</p>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <Input id="email" type="email" name="email" placeholder="m@example.com" value={values.email} onChange={handleChange} onBlur={handleBlur} errorMessage={
                                            Boolean(errors.email && touched.email) ? errors.email : ""
                                        }
                                            isInvalid={Boolean(errors.email && touched.email)} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <Input id="password" type="password" placeholder="Password" value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            errorMessage={
                                                Boolean(errors.password && touched.password)
                                                    ? errors.password
                                                    : ""
                                            }
                                            isInvalid={Boolean(errors.password && touched.password)} />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <Input id="confirmPassword" type="password" placeholder="Password" value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            errorMessage={
                                                Boolean(errors.confirmPassword && touched.confirmPassword)
                                                    ? errors.confirmPassword
                                                    : ""
                                            }
                                            isInvalid={Boolean(errors.confirmPassword && touched.confirmPassword)} />
                                    </div>
                                    <Button type="submit" className="w-full" isLoading={isSubmitting}>
                                        Sign up
                                    </Button>

                                    <p className="text-center mt-4">
                                        Already have an account?{" "}
                                        <Link href="/login">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    )
}
export default Register