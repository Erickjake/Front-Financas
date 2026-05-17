import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BackupLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-7 w-28 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-5 w-36 rounded bg-muted" />
          <div className="mt-1 h-4 w-56 rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="h-9 w-36 rounded bg-muted" />
        </CardContent>
      </Card>
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-5 w-40 rounded bg-muted" />
          <div className="mt-1 h-4 w-48 rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-40 w-full rounded-md bg-muted" />
          <div className="h-9 w-36 rounded bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}
