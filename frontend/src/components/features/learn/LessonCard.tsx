import { BookOpen, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface LessonCardProps {
  title: string;
  description: string;
  progress: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completedLessons: number;
  totalLessons: number;
  onClick?: () => void;
}

export function LessonCard({
  title,
  description,
  progress,
  difficulty,
  completedLessons,
  totalLessons,
  onClick,
}: LessonCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:bg-accent/50 transition-all hover:shadow-md"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant={difficulty === "Beginner" ? "default" : "secondary"}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {completedLessons}/{totalLessons} Lessons
            </span>
          </div>
          <ArrowRight className="h-5 w-5 text-primary" />
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
    </Card>
  );
}
