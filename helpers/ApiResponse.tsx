import { NextResponse } from "next/server";
import {
  isPrismaError,
  PrismaError,
  PrismaErrorCode,
} from "./PrismaErrorTypes";

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
    const response: any = { error: message };
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
  static handlePrismaError(err: unknown): NextResponse {
    console.error("Prisma error:", err);

    // Vérifier si c'est une erreur Prisma
    if (!isPrismaError(err)) {
      return this.serverError(err);
    }

    const { code, meta, message } = err;

    switch (code) {
      // Erreur de contrainte unique (duplicate)
      case PrismaErrorCode.UNIQUE_CONSTRAINT:
        const target = meta?.target as string[] | undefined;
        const field = target?.join(", ") || "champ";
        return this.error(`Un doublon a été détecté sur: ${field}`, 400);

      // Enregistrement non trouvé
      case PrismaErrorCode.RECORD_NOT_FOUND:
        return this.notFound("Ressource non trouvée");

      // Violation de contrainte de clé étrangère
      case PrismaErrorCode.FOREIGN_KEY_CONSTRAINT:
        return this.error("Violation de contrainte de clé étrangère", 400);

      // Erreur de validation des données
      case PrismaErrorCode.VALUE_TOO_LONG:
        const fieldName = meta?.field_name || "un champ";
        return this.validationError(
          `La valeur est trop longue pour ${fieldName}`,
        );

      // Valeur NULL sur un champ requis
      case PrismaErrorCode.NULL_CONSTRAINT:
        return this.validationError("Un champ requis est manquant");

      // Champ requis manquant
      case PrismaErrorCode.MISSING_REQUIRED:
      case PrismaErrorCode.MISSING_REQUIRED_ARGUMENT:
        return this.validationError("Des champs requis sont manquants");

      // Type incompatible
      case PrismaErrorCode.TYPE_MISMATCH:
        return this.validationError("Type de données incompatible");

      // Valeur hors limite
      case PrismaErrorCode.VALUE_OUT_OF_RANGE:
      case PrismaErrorCode.NUMBER_OUT_OF_RANGE:
        return this.validationError("Valeur hors limite");

      // Conflit d'écriture (transactions concurrentes)
      case PrismaErrorCode.WRITE_CONFLICT:
        return this.error(
          "Conflit lors de l'écriture, veuillez réessayer",
          409,
        );

      // Timeout de connexion
      case PrismaErrorCode.CONNECTION_POOL_TIMEOUT:
        return this.error("Délai d'attente dépassé, veuillez réessayer", 503);

      // Autres erreurs Prisma
      default:
        return this.error(
          `Erreur de base de données (${code})`,
          500,
          process.env.NODE_ENV === "development" ? message : undefined,
        );
    }
  }

  /**
   * Wrapper pour exécuter du code avec gestion d'erreur automatique
   */
  static async handle<T>(
    handler: () => Promise<T>,
    options?: {
      successStatus?: number;
      errorHandler?: (err: unknown) => NextResponse;
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
      if (isPrismaError(err)) {
        return this.handlePrismaError(err);
      }

      return this.serverError(err);
    }
  }
}
