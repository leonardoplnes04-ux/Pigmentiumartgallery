"use client";

import { ConvexReactClient } from "convex/react";

// Cliente de Convex creado solo cuando hace falta (al enviar un formulario),
// nunca durante el render del servidor. Si falta NEXT_PUBLIC_CONVEX_URL
// devuelve null y los formularios usan su plan B (correo del visitante).
let client: ConvexReactClient | null | undefined;

export function getConvex(): ConvexReactClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  client = url ? new ConvexReactClient(url) : null;
  return client;
}
