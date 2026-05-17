import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CategoriesLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-7 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <Card className="py-0">
        <CardHeader>
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex animate-pulse items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-muted" />
                <div className="h-4 w-28 rounded bg-muted" />
              </div>
              <div className="h-8 w-16 rounded bg-muted" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
