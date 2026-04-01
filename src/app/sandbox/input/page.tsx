import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function InputSandboxPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Input component playground
            </h1>
            <p className="text-muted-foreground">
              Test input styles, states, and common form rows.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/sandbox" />}
            >
              All sandboxes
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/" />}
            >
              Back to landing
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Input States</CardTitle>
            <CardDescription>
              Default, disabled, and prefilled patterns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Enter project name" />
            <Input defaultValue="starter-project" />
            <Input disabled defaultValue="disabled-input" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Rows</CardTitle>
            <CardDescription>
              Simple stacked rows with labels and helper text.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Email</p>
              <Input type="email" placeholder="name@company.com" />
              <p className="text-xs text-muted-foreground">
                We only use this for project notifications.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">API Key</p>
              <Input type="password" value="sk-xxxxxx" readOnly />
            </div>
            <div className="flex gap-2">
              <Button>Save</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
