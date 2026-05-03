import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TeamStatsCardProps {
  velocity: string;
  engagement: string;
  description: string;
}

export default function TeamStatsCard({
  velocity,
  engagement,
  description,
}: TeamStatsCardProps) {
  return (
    <Card className="bg-primary text-primary-foreground ring-0">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary-foreground">
          Statistik Tim
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stat Boxes */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-primary-foreground/15 p-3 text-center">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-primary-foreground/70">
              Kecepatan
            </p>
            <p className="text-2xl font-bold text-primary-foreground mt-1">
              {velocity}
            </p>
          </div>
          <div className="rounded-lg bg-primary-foreground/15 p-3 text-center">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-primary-foreground/70">
              Keterlibatan
            </p>
            <p className="text-2xl font-bold text-primary-foreground mt-1">
              {engagement}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-primary-foreground/80 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
