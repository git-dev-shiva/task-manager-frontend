"use client";
import LoginSchema from "@/common/schema/login.schema";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function Login() {
    const loginSchema = new LoginSchema()
    const router = useRouter();

    const handleSubmit = async (values: any) => {
        try {
            const res = await axios.post("http://localhost:8081/login", values)
            if (!res.data) {
                toast.error("Invalid Credentials");
            }
            localStorage.setItem("token", res.data.token);
            toast.success(res.statusText)
            return router.push("/dashboard")
        } catch (error: any) {
            toast.error(error.message)
        }

    }

    return (
        <>
            <Formik initialValues={loginSchema.initialValues} validationSchema={loginSchema.schema} onSubmit={async (values, { setSubmitting }) => {
                try {
                    await handleSubmit(values)
                } catch (error) {
                    console.error("Error submitting form:", error);
                    setSubmitting(false);
                }
            }}>{({
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
                                    <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                                    <p className="text-muted-foreground">Sign in to your account to continue.</p>
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <Input id="email" name="email" type="email" placeholder="m@example.com" value={values.email} onChange={handleChange} onBlur={handleBlur} errorMessage={
                                        Boolean(errors.email && touched.email) ? errors.email : ""
                                    }
                                        isInvalid={Boolean(errors.email && touched.email)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <Input id="password" name="password" type="password" placeholder="Password" value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={
                                            Boolean(errors.password && touched.password)
                                                ? errors.password
                                                : ""
                                        }
                                        isInvalid={Boolean(errors.password && touched.password)}
                                    />
                                </div>
                                <Button type="submit" className="w-full" isLoading={isSubmitting}>
                                    Sign in
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
            </Formik>
        </>
    )
}