"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ModeToggle from "@/components/ui/ModeToggle";

import { FormEvent, useState } from "react";
import { loginUser, registerUser } from "../../services/auth.service";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const passwordsMatch = password && password === confirmPassword;
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await registerUser(email, password);
      console.log(error);
      loginUser(res.data.token, res.data.user);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(`Caught an Unknown Error: ${err}`);
      }
    }
  };
  return (
    <div>
      <div className="m-3 absolute right-1">
        <ModeToggle />
      </div>
      <div className="flex items-center min-h-screen justify-center ">
        <Card className="w-full max-w-xl    ">
          <CardHeader>
            <CardTitle className="font-bold text-2xl wrap-normal">
              Craft intelligent forms
            </CardTitle>
            <CardDescription className="font-semibold text-md">
              Meet Formium, your intuitive form-building partner.
            </CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Label htmlFor="confirm password">Confirm Password</Label>
                </div>
                <Input
                  id="confirm password"
                  type="password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {confirmPassword && !passwordsMatch && !error ? (
                <p className="mt-3 text-red-500">Passwords do not match</p>
              ) : null}
              {error ? <p className="mt-3 text-red-500">{error}</p> : null}
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              disabled={!passwordsMatch || !email}
              className="w-full"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
              <img src="google.svg" className="w-5" alt="" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default SignUpPage;
