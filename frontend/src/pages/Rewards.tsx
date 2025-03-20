import { Gift, Trophy, Star } from "lucide-react";

const rewards = [
  {
    title: "Contributor Badge",
    description: "Upload 10 sign language videos",
    progress: 3,
    total: 10,
    icon: Trophy,
  },
  {
    title: "Learning Streak",
    description: "Practice for 7 consecutive days",
    progress: 5,
    total: 7,
    icon: Star,
  },
];

const Rewards = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Rewards</h1>

      <div className="grid gap-6">
        <div className="p-6 rounded-lg bg-card">
          <div className="flex items-center gap-4 mb-6">
            <Gift className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-xl font-semibold">Your Progress</h2>
              <p className="text-muted-foreground">
                Earn rewards by contributing and learning
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {rewards.map((reward) => (
              <div key={reward.title} className="p-4 rounded-lg bg-accent">
                <div className="flex items-center gap-4">
                  <reward.icon className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{reward.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {reward.description}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {reward.progress}/{reward.total}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${(reward.progress / reward.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
