import { Button, Input } from "@nextui-org/react"

const Register = () => {
    return (
        <div className="flex items-center justify-center bg-background p-6 lg:p-10">
            <div className="mx-auto w-full max-w-[420px] space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                    <p className="text-muted-foreground">Get started with our platform today.</p>
                </div>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name">Name</label>
                        <Input id="name" type="text" placeholder="John Doe" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Input id="password" type="password" placeholder="Password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Sign up
                    </Button>
                </form>
            </div>
        </div>
    )
}
export default Register