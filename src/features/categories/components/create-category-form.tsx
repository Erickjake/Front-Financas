"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createCategory,
  updateCategory,
} from "@/features/categories/services/categories-service";
import type { Category } from "@/features/categories/types";

export function CreateCategoryForm({
  onCreated,
  initialData,
}: {
  onCreated?: () => void;
  initialData?: Category;
}) {
  const isEditing = !!initialData;
  const [name, setName] = useState(initialData?.name ?? "");
  const [color, setColor] = useState(initialData?.color ?? "#6366f1");
  const [icon, setIcon] = useState(initialData?.icon ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError("O nome é obrigatório.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        name: name.trim(),
        color,
        icon: icon.trim() || undefined,
      };
      if (isEditing) {
        await updateCategory(initialData.id, payload);
        setSuccess("Categoria atualizada com sucesso!");
      } else {
        await createCategory(payload);
        setSuccess("Categoria criada com sucesso!");
        setName("");
        setColor("#6366f1");
        setIcon("");
      }
      onCreated?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar categoria.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Categoria" : "Nova Categoria"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Atualize as informações da categoria."
            : "Preencha os dados para criar uma nova categoria."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="category-name"
              className="block text-sm font-medium mb-1"
            >
              Nome *
            </label>
            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Alimentação"
              required
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label
              htmlFor="category-color"
              className="block text-sm font-medium mb-1"
            >
              Cor
            </label>
            <div className="flex items-center gap-3">
              <input
                id="category-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-9 w-16 cursor-pointer rounded-md border p-1"
              />
              <span className="text-sm text-muted-foreground">{color}</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="category-icon"
              className="block text-sm font-medium mb-1"
            >
              Ícone (emoji ou código)
            </label>
            <input
              id="category-icon"
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Ex: 🍔"
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting
              ? isEditing
                ? "Salvando..."
                : "Criando..."
              : isEditing
                ? "Salvar alterações"
                : "Criar categoria"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
