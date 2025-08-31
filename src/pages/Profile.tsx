import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { databases, account } from "@/lib/appwrite";

export default function Profile() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await account.get(); // logged in user

      await databases.createDocument(
        "68b49b9800149227bd81", // databaseId
        "astro", // collectionId
        user.$id, // use user id as document id
        {
          mail: user.email,
          phone: user.phone || "",
          date_of_birth: dateOfBirth,
          Place_of_birth: placeOfBirth,
          History: "",
        }
      );

      toast({
        title: "Profile Saved",
        description: "Your details have been synced.",
      });

      navigate("/chat"); // redirect to chat after save
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="starfield" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl stellar-gradient border-border cosmic-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">
              <span className="gold-gradient bg-clip-text text-transparent">
                Cosmic Profile
              </span>
            </CardTitle>
            <CardDescription className="text-lg">
              Share your birth details to unlock personalized astrological
              insights
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Date of Birth</span>
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Exact birth date helps determine your natal chart and
                  planetary positions
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pob" className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Place of Birth</span>
                </Label>
                <Input
                  id="pob"
                  type="text"
                  value={placeOfBirth}
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                  placeholder="City, State, Country"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Birth location determines the precise celestial coordinates
                  for your chart
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full cosmic-glow"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save & Continue"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
