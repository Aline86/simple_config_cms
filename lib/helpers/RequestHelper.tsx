import { NextRequest } from "next/server";

/**
 * Classe utilitaire pour extraire et valider les données des requêtes
 */
export class RequestHelper {
  /**
   * Extrait un paramètre de recherche de l'URL via l'API native nextUrl
   */
  static getSearchParam(
    request: NextRequest,
    paramName: string,
  ): string | null {
    return request.nextUrl.searchParams.get(paramName);
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
  static async getBody<T = Record<string, Record<string, unknown>>>(
    request: NextRequest,
  ): Promise<T> {
    return await request.json();
  }

  /**
   * Extrait une propriété du body
   */
  static async getBodyProperty<T = Record<string, Record<string, unknown>>>(
    request: NextRequest,
    propertyName: string,
    required: boolean = true,
  ): Promise<T> {
    const body = await this.getBody(request);
    const value = body[propertyName] as T;

    if (required && !value) {
      throw new Error(`${propertyName} missing`);
    }

    return value;
  }
}
