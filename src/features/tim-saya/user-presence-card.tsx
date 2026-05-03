import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import type { OnlineUser } from "@/_mock/team-data";

interface UserPresenceCardProps {
  users: OnlineUser[];
  additionalCount: number;
}

export default function UserPresenceCard({
  users,
  additionalCount,
}: UserPresenceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Kehadiran Pengguna
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <AvatarGroup>
          {users.map((user) => (
            <Avatar key={user.id} size="lg">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount className="text-xs font-medium">
            +{additionalCount}
          </AvatarGroupCount>
        </AvatarGroup>
        <p className="text-xs text-muted-foreground">
          Kontributor aktif online sekarang.
        </p>
      </CardContent>
    </Card>
  );
}
