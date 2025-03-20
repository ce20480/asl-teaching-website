import { Trophy, Flame, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProgressStatsProps {
  streak: number;
  xp: number;
  level: number;
}

export function ProgressStats({ streak, xp, level }: ProgressStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <p className="text-xl font-bold">{streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            <p className="text-xl font-bold">{xp}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <p className="text-xl font-bold">{level}</p>
            <p className="text-xs text-muted-foreground">Level</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
