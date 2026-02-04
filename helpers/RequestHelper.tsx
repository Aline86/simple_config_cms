import { NextRequest } from "next/server";

/**
 * Classe utilitaire pour extraire et valider les données des requêtes
 */
export class RequestHelper {
  /**
   * Extrait un paramètre de recherche de l'URL
   */
  static getSearchParam(
    request: NextRequest,
    paramName: string,
  ): string | null {
    const { searchParams } = new URL(request.url);
    return searchParams.get(paramName);
  }

  /**
   * Extrait et valide un paramètre de recherche requis
   */
  static getRequiredSearchParam(
    request: NextRequest,
    paramName: string,
  ): string {
    const value = this.getSearchParam(request, paramName);
    if (!value) {
      throw new Error(`${paramName} missing`);
    }
    return value;
  }

  /**
   * Parse le body JSON de la requête
   */
  static async getBody<T = any>(request: NextRequest): Promise<T> {
    return await request.json();
  }

  /**
   * Extrait une propriété du body
   */
  static async getBodyProperty<T = any>(
    request: NextRequest,
    propertyName: string,
    required: boolean = true,
  ): Promise<T | undefined> {
    const body = await this.getBody(request);
    const value = body[propertyName];

    if (required && !value) {
      throw new Error(`${propertyName} missing`);
    }

    return value;
  }

  /**
   * Extrait et normalise un tableau du body
   */
  static async getArrayFromBody<T = any>(
    request: NextRequest,
    propertyName?: string,
  ): Promise<T[]> {
    const body = await this.getBody(request);

    // Si propertyName est fourni, chercher dans cette propriété
    const data = propertyName ? body[propertyName] : body;

    if (!Array.isArray(data)) {
      throw new Error("Payload must be an array");
    }

    return data;
  }
}
