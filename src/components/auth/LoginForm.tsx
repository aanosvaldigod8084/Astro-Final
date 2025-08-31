import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { account, databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from "@/lib/appwrite";
import { Query } from "appwrite";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added password state
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Try Appwrite Auth login
      await account.createEmailPasswordSession(email, password);

      // 2. Fetch matching document from astro collection
      const docs = await databases.listDocuments(
        APPWRITE_DATABASE_ID, // databaseId
        APPWRITE_COLLECTION_ID,                // collectionId
        [Query.equal("mail", email)]
      );

      if (docs.total === 0) {
        throw new Error("No user record found in database");
      }

      const userDoc = docs.documents[0];

      // 3. Compare password (⚠️ insecure — storing raw password)
      if (userDoc.Password !== password) {
        throw new Error("Invalid password (DB mismatch)");
      }

      // 4. Success → toast + redirect
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });

      navigate("/profile");
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="space-y-2">
  <Label htmlFor="password">Password</Label>
  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••"
      required
      className="pr-10" // space for the eye icon
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>
</div>


      <Button
        type="submit"
        className="w-full cosmic-glow"
        disabled={isLoading}
      >
        {isLoading ? "Connecting to the cosmos..." : "Enter AstroGuide"}
      </Button>

      
    </form>
  );
}
