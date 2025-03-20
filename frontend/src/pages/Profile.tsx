import { Settings, Award, History, LogOut, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const achievements = [
  {
    name: "Quick Learner",
    description: "Completed 5 lessons in one day",
    date: "2024-03-15",
  },
  {
    name: "Contributor",
    description: "Submitted 10 sign language videos",
    date: "2024-03-10",
  },
  {
    name: "Week Warrior",
    description: "Maintained a 7-day streak",
    date: "2024-03-01",
  },
];

const Profile = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Settings className="h-6 w-6 text-muted-foreground cursor-pointer" />
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <p className="text-muted-foreground">Member since March 2024</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">Level 5</Badge>
          <Badge variant="secondary">1250 XP</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle>Achievements</CardTitle>
          </div>
          <CardDescription>Your latest accomplishments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.name} className="flex items-start gap-4">
                <Award className="h-5 w-5 text-yellow-500 mt-1" />
                <div>
                  <h3 className="font-semibold">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-primary" />
              <span>Learning History</span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-destructive/10 transition-colors">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-destructive" />
              <span className="text-destructive">Sign Out</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
