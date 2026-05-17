import { Card, CardHeader } from "@/components/ui/card";

export default function ReportsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-7 w-36 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="py-0 animate-pulse">
            <CardHeader className="p-5">
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="mt-2 h-7 w-32 rounded bg-muted" />
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
