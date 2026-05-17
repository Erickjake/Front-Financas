import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ExportLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-7 w-36 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <Card className="py-0 animate-pulse">
        <CardHeader>
          <div className="h-5 w-40 rounded bg-muted" />
          <div className="mt-1 h-4 w-56 rounded bg-muted" />
        </CardHeader>
        <CardContent className="flex gap-2 pb-4">
          <div className="h-9 w-32 rounded bg-muted" />
          <div className="h-9 w-32 rounded bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}
