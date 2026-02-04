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
  static async getBody<T = unknown>(request: NextRequest): Promise<T> {
    return await request.json();
  }

  /**
   * Extrait une propriété du body
   */
  static async getBodyProperty<T = unknown>(
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
}
