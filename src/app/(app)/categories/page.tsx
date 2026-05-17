"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Category } from "@/features/categories";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "@/features/categories";

const DEFAULT_COLOR = "#0ea5e9";

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [icon, setIcon] = useState("");

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const categories = await getCategories();
      setItems(categories);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao carregar categorias.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);
    setError(null);
    try {
      await createCategory({
        name: name.trim(),
        color: color || undefined,
        icon: icon.trim() || undefined,
      });
      setName("");
      setColor(DEFAULT_COLOR);
      setIcon("");
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao criar categoria.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setError(null);
    try {
      await deleteCategory(id);
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao excluir categoria.",
      );
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Categorias
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Organize transações por tipo para melhorar filtros e relatórios.
        </p>
      </div>

      <Card className="py-0">
        <CardHeader>
          <CardTitle>Nova categoria</CardTitle>
          <CardDescription>
            Crie categorias para classificar receitas e despesas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleCreate}
            className="grid gap-3 sm:grid-cols-[1fr_120px_120px_auto] sm:items-end"
          >
            <label className="grid gap-1 text-sm">
              Nome
              <input
                className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Alimentação"
              />
            </label>

            <label className="grid gap-1 text-sm">
              Cor
              <input
                className="h-9 w-full rounded-md border border-input bg-background px-2"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>

            <label className="grid gap-1 text-sm">
              Ícone
              <input
                className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="car"
              />
            </label>

            <Button type="submit" disabled={isSaving || !name.trim()}>
              {isSaving ? "Salvando..." : "Criar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="py-0">
        <CardHeader>
          <CardTitle>Lista de categorias</CardTitle>
          <CardDescription>Total atual: {items.length}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {isLoading ? (
            <p className="text-sm text-muted-foreground">
              Carregando categorias...
            </p>
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma categoria cadastrada.
            </p>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full bg-primary"
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  {item.color ? (
                    <span className="text-xs text-muted-foreground">
                      {item.color}
                    </span>
                  ) : null}
                  {item.icon ? (
                    <span className="text-xs text-muted-foreground">
                      icon: {item.icon}
                    </span>
                  ) : null}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Excluir
                </Button>
              </article>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
