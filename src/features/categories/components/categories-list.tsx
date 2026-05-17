"use client";

import { Edit2, Tag, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/features/categories/types";

export function CategoriesList({
  categories,
  onEdit,
  onDelete,
}: {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}) {
  if (categories.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center py-8">
        Nenhuma categoria encontrada.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <Card key={category.id} className="group">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  backgroundColor: category.color ?? "#6366f1",
                }}
              >
                <Tag className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">{category.name}</p>
                {category.icon && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    {category.icon}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(category)}
                aria-label="Editar categoria"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => onDelete(category.id)}
                aria-label="Excluir categoria"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
