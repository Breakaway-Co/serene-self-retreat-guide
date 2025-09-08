import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const { session, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    document.title = "Sign In | Luma Soul Retreats";
    if (session) navigate("/", { replace: true });
  }, [session, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(signinEmail, signinPassword);
    setLoading(false);
    if (error) {
      toast({ title: "Sign in failed", description: error });
    } else {
      toast({ title: "Welcome back" });
      navigate("/", { replace: true });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(signupEmail, signupPassword);
    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error });
    } else {
      toast({
        title: "Check your email",
        description: "We sent you a confirmation link to complete sign up.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-playfair text-2xl">Welcome to Luma Soul Retreats</CardTitle>
          <CardDescription>Sign in or create an account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-sm mb-2">Test Login Credentials:</h4>
                <p className="text-xs text-muted-foreground">Email: test@example.com</p>
                <p className="text-xs text-muted-foreground">Password: password123</p>
              </div>
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input id="signin-email" type="email" value={signinEmail} onChange={(e) => setSigninEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input id="signin-password" type="password" value={signinPassword} onChange={(e) => setSigninPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>Sign In</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>Create Account</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
};

export default Auth;