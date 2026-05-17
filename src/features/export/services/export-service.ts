function buildExportUrl(path: string): string {
  if (typeof window !== "undefined") {
    return `/api${path}`;
  }
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  return `${base}${path}`;
}

export async function exportCsv(): Promise<Blob> {
  const response = await fetch(buildExportUrl("/export/csv"), {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to export CSV");
  return response.blob();
}

export async function exportPdf(): Promise<Blob> {
  const response = await fetch(buildExportUrl("/export/pdf"), {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to export PDF");
  return response.blob();
}
