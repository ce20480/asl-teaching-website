import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LessonCard } from "@/components/features/learn/LessonCard";
import { ProgressStats } from "@/components/features/learn/ProgressStats";
import { Play } from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Basic Alphabet",
    description: "Learn the ASL alphabet signs",
    progress: 60,
    difficulty: "Beginner" as const,
    completedLessons: 3,
    totalLessons: 5,
  },
  {
    id: 2,
    title: "Common Phrases",
    description: "Essential everyday expressions",
    progress: 30,
    difficulty: "Intermediate" as const,
    completedLessons: 2,
    totalLessons: 8,
  },
  {
    id: 3,
    title: "Numbers & Counting",
    description: "Learn to sign numbers and count",
    progress: 0,
    difficulty: "Beginner" as const,
    completedLessons: 0,
    totalLessons: 4,
  },
];

const Learn = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learn ASL</h1>
        <p className="text-muted-foreground mt-2">
          Master sign language step by step
        </p>
      </div>

      <ProgressStats streak={5} xp={240} level={3} />

      <Card>
        <CardHeader>
          <CardTitle>Daily Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={70} className="flex-1" />
            <span className="text-sm font-medium">70/100 XP</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Continue Learning
          </h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">Basic Alphabet</h3>
                <p className="text-sm text-primary-foreground/80">
                  Continue where you left off
                </p>
              </div>
              <Button size="sm" variant="secondary" className="gap-2">
                <Play className="h-4 w-4" />
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              {...lesson}
              onClick={() => console.log(`Navigate to lesson ${lesson.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
