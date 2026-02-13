/**
 * Types pour les erreurs Prisma
 * Source: https://www.prisma.io/docs/reference/api-reference/error-reference
 */

/**
 * Structure d'une erreur Prisma
 */
export type PrismaError = {
  code: string;
  meta?: {
    target?: string[];
    field_name?: string;
    object_name?: string;
    database_error?: string;
    [key: string]: unknown;
  };
  message: string;
  clientVersion?: string;
};

/**
 * Codes d'erreur Prisma les plus courants
 */
export enum PrismaErrorCode {
  // Erreurs de validation
  VALUE_TOO_LONG = "P2000",
  RECORD_NOT_EXIST = "P2001",
  UNIQUE_CONSTRAINT = "P2002",
  FOREIGN_KEY_CONSTRAINT = "P2003",
  CONSTRAINT_FAILED = "P2004",
  INVALID_VALUE = "P2005",
  TYPE_MISMATCH = "P2006",
  TYPE_MISMATCH_INVALID_CUSTOM = "P2007",
  QUERY_PARSING_FAILED = "P2008",
  QUERY_VALIDATION_FAILED = "P2009",
  RAW_QUERY_FAILED = "P2010",
  NULL_CONSTRAINT = "P2011",
  MISSING_REQUIRED = "P2012",
  MISSING_REQUIRED_ARGUMENT = "P2013",
  RELATION_VIOLATION = "P2014",
  RELATED_RECORD_NOT_FOUND = "P2015",
  QUERY_INTERPRETATION_ERROR = "P2016",
  RECORDS_NOT_CONNECTED = "P2017",
  REQUIRED_CONNECTED_RECORDS = "P2018",
  INPUT_ERROR = "P2019",
  VALUE_OUT_OF_RANGE = "P2020",
  TABLE_NOT_EXIST = "P2021",
  COLUMN_NOT_EXIST = "P2022",
  INCONSISTENT_COLUMN_DATA = "P2023",
  CONNECTION_POOL_TIMEOUT = "P2024",
  RECORD_NOT_FOUND = "P2025",
  UNSUPPORTED_FEATURE = "P2026",
  MULTIPLE_ERRORS = "P2027",
  TRANSACTION_API_ERROR = "P2028",
  QUERY_PARAMETER_LIMIT = "P2029",
  FULLTEXT_INDEX_NOT_FOUND = "P2030",
  MONGODB_REPLICA_SET_REQUIRED = "P2031",
  NUMBER_OUT_OF_RANGE = "P2033",
  WRITE_CONFLICT = "P2034",
}

/**
 * Type guard pour vérifier si c'est une erreur Prisma
 */
export function isPrismaError(error: unknown): error is PrismaError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as any).code === "string" &&
    (error as any).code.startsWith("P")
  );
}

/**
 * Extrait les informations utiles d'une erreur Prisma
 */
export function parsePrismaError(error: PrismaError): {
  code: string;
  message: string;
  target?: string[];
  field?: string;
} {
  return {
    code: error.code,
    message: error.message,
    target: error.meta?.target,
    field: error.meta?.field_name,
  };
}
