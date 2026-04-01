import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { LiveQueryCard } from "@/components/sandbox/live-query-card";

export default function SandboxPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <Badge variant="secondary">Component Sandbox</Badge>
            <h1 className="text-3xl font-semibold tracking-tight">
              shadcn/ui playground
            </h1>
            <p className="text-muted-foreground">
              Use this page to test component composition before shipping.
            </p>
          </div>
          <Button variant="outline" render={<Link href="/" />}>
            Back to landing
          </Button>
        </div>

        <Tabs defaultValue="controls">
          <TabsList>
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="query">React Query</TabsTrigger>
          </TabsList>
          <TabsContent value="controls" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Form Controls</CardTitle>
                <CardDescription>
                  Basic shadcn fields for quick prototyping.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Project name" />
                <Textarea
                  placeholder="Describe your feature idea..."
                  className="min-h-28"
                />
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <p className="text-sm">Enable preview mode</p>
                  <Switch defaultChecked />
                </div>
                <div className="flex gap-2">
                  <Button>Primary action</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="query" className="space-y-4">
            <LiveQueryCard />
          </TabsContent>
        </Tabs>

        <Separator />

        <p className="text-sm text-muted-foreground">
          Tip: Add more components with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            npx shadcn@latest add &lt;component&gt;
          </code>
        </p>
      </div>
    </main>
  );
}
