import { NextResponse } from "next/server";

/**
 * Classe utilitaire pour gérer les réponses API de manière cohérente
 */
export class ApiResponse {
  /**
   * Réponse de succès
   */
  static success<T>(data: T, status: number = 200): NextResponse {
    return NextResponse.json(data, { status });
  }

  /**
   * Réponse d'erreur générique
   */
  static error(
    message: string,
    status: number = 500,
    details?: any,
  ): NextResponse {
    const response: Record<string, unknown> = { error: message };
    if (details) {
      response.details = details;
    }
    return NextResponse.json(response, { status });
  }

  /**
   * Erreur de validation
   */
  static validationError(
    message: string = "Validation failed",
    details?: any,
  ): NextResponse {
    return this.error(message, 400, details);
  }

  /**
   * Ressource non trouvée
   */
  static notFound(message: string = "Resource not found"): NextResponse {
    return this.error(message, 404);
  }

  /**
   * Paramètre manquant
   */
  static missingParameter(paramName: string): NextResponse {
    return this.error(`${paramName} missing`, 400);
  }

  /**
   * Erreur serveur
   */
  static serverError(err: unknown): NextResponse {
    console.error("Server error:", err);
    return this.error(
      "Server error",
      500,
      err instanceof Error ? err.message : "Unknown error",
    );
  }

  /**
   * Gestion des erreurs Prisma
   */
  static handlePrismaError(err: Record<string, unknown>): NextResponse {
    console.error("Prisma error:", err);

    // Erreur de contrainte unique (duplicate)
    if (err.code === "P2002") {
      return this.error("Un slug en doublon a été détecté", 400);
    }

    // Enregistrement non trouvé
    if (err.code === "P2025") {
      return this.notFound("Ressource non trouvée");
    }

    // Autres erreurs Prisma
    return this.serverError(err);
  }

  /**
   * Wrapper pour exécuter du code avec gestion d'erreur automatique
   */
  static async handle<T>(
    handler: () => Promise<T>,
    options?: {
      successStatus?: number;
      errorHandler?: (err: Record<string, unknown>) => NextResponse;
    },
  ): Promise<NextResponse> {
    try {
      const result = await handler();
      return this.success(result, options?.successStatus);
    } catch (err) {
      if (options?.errorHandler) {
        return options.errorHandler(err);
      }

      // Gestion par défaut des erreurs Prisma
      if (err && typeof err === "object" && "code" in err) {
        return this.handlePrismaError(err);
      }

      return this.serverError(err);
    }
  }
}
