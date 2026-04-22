import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransactions } from "@/features/transactions/hooks/use-transactions";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function TransactionsList() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Carregando transacoes...</p>
    );
  }

  return (
    <Card className="py-0">
      <CardHeader>
        <CardTitle>Ultimas transacoes</CardTitle>
        <CardDescription>Lista consolidada por categoria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {transactions.map((item) => (
          <article
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
          >
            <div>
              <p className="font-medium text-foreground">{item.description}</p>
              <p className="text-xs text-muted-foreground">
                {item.category} - {item.date}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={item.type === "income" ? "secondary" : "outline"}>
                {item.type === "income" ? "Entrada" : "Saida"}
              </Badge>
              <span className="text-sm font-medium text-foreground">
                {currencyFormatter.format(item.amount)}
              </span>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
