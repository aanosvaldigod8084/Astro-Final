import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { account, databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from "@/lib/appwrite";
import { ID } from "appwrite";
import { Eye, EyeOff } from "lucide-react";
export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Create user account in Appwrite Auth
      const newUser = await account.create(ID.unique(), email, password, name);

      // 2. Log them in
      await account.createEmailPasswordSession(email, password);

      // 3. Create user document in database
      await databases.createDocument(
        APPWRITE_DATABASE_ID, // databaseId
        APPWRITE_COLLECTION_ID,                // collectionId
        newUser.$id,            // documentId = same as auth user id
        {
          mail: email,
          Password: password,   // ⚠️ ideally hash this before saving
          phone: "",            // placeholder, can be updated later
          date_of_birth: "",    // will be filled in Profile page
          Place_of_birth: "",   // will be filled in Profile page
          History: "",          // empty chat history initially
        },
        [
          `user:${newUser.$id}` // only this user can read/write their row
        ]
      );

      toast({
        title: "Welcome to AstroGuide!",
        description: "Your cosmic journey begins now.",
      });

      // 4. Redirect to profile page
      navigate("/profile");
    } catch (err: any) {
      toast({
        title: "Signup Failed",
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>

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
      className="pr-10" // 👈 add right padding so icon doesn't overlap text
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
        {isLoading ? "Aligning with the stars..." : "Begin Cosmic Journey"}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Button
          variant="link"
          className="p-0 h-auto text-primary"
          onClick={() => navigate("/auth")}
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}
