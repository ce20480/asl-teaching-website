import { Camera, Upload, Gift, GraduationCap } from "lucide-react";
import FeatureCard from "@/components/common/FeatureCard";

const features = [
  {
    title: "Translate",
    description: "Use your camera to translate sign language in real-time",
    icon: Camera,
    to: "/translate",
  },
  {
    title: "Contribute",
    description: "Help improve our system by contributing sign language data",
    icon: Upload,
    to: "/contribute",
  },
  {
    title: "Earn Rewards",
    description: "Get rewarded for helping the sign language community",
    icon: Gift,
    to: "/rewards",
  },
  {
    title: "Learn",
    description: "Practice and learn sign language through interactive lessons",
    icon: GraduationCap,
    to: "/learn",
  },
];

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to ASL Teaching
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn and practice sign language through interactive lessons and
          real-time translation
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.to} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Home;
