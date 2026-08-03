
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Page
 * 
 */
export type Page = $Result.DefaultSelection<Prisma.$PagePayload>
/**
 * Model Header
 * 
 */
export type Header = $Result.DefaultSelection<Prisma.$HeaderPayload>
/**
 * Model Footer
 * 
 */
export type Footer = $Result.DefaultSelection<Prisma.$FooterPayload>
/**
 * Model Configuration
 * 
 */
export type Configuration = $Result.DefaultSelection<Prisma.$ConfigurationPayload>
/**
 * Model Media
 * 
 */
export type Media = $Result.DefaultSelection<Prisma.$MediaPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.header`: Exposes CRUD operations for the **Header** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Headers
    * const headers = await prisma.header.findMany()
    * ```
    */
  get header(): Prisma.HeaderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.footer`: Exposes CRUD operations for the **Footer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Footers
    * const footers = await prisma.footer.findMany()
    * ```
    */
  get footer(): Prisma.FooterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.configuration`: Exposes CRUD operations for the **Configuration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configurations
    * const configurations = await prisma.configuration.findMany()
    * ```
    */
  get configuration(): Prisma.ConfigurationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.media`: Exposes CRUD operations for the **Media** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Media
    * const media = await prisma.media.findMany()
    * ```
    */
  get media(): Prisma.MediaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Page: 'Page',
    Header: 'Header',
    Footer: 'Footer',
    Configuration: 'Configuration',
    Media: 'Media'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "page" | "header" | "footer" | "configuration" | "media"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Page: {
        payload: Prisma.$PagePayload<ExtArgs>
        fields: Prisma.PageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findFirst: {
            args: Prisma.PageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findMany: {
            args: Prisma.PageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          create: {
            args: Prisma.PageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          createMany: {
            args: Prisma.PageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          delete: {
            args: Prisma.PageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          update: {
            args: Prisma.PageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          deleteMany: {
            args: Prisma.PageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          upsert: {
            args: Prisma.PageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          aggregate: {
            args: Prisma.PageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePage>
          }
          groupBy: {
            args: Prisma.PageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageCountArgs<ExtArgs>
            result: $Utils.Optional<PageCountAggregateOutputType> | number
          }
        }
      }
      Header: {
        payload: Prisma.$HeaderPayload<ExtArgs>
        fields: Prisma.HeaderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HeaderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HeaderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload>
          }
          findFirst: {
            args: Prisma.HeaderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HeaderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload>
          }
          findMany: {
            args: Prisma.HeaderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload>[]
          }
          create: {
            args: Prisma.HeaderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload>
          }
          createMany: {
            args: Prisma.HeaderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HeaderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload>[]
          }
          delete: {
            args: Prisma.HeaderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload>
          }
          update: {
            args: Prisma.HeaderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload>
          }
          deleteMany: {
            args: Prisma.HeaderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HeaderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HeaderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload>[]
          }
          upsert: {
            args: Prisma.HeaderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeaderPayload>
          }
          aggregate: {
            args: Prisma.HeaderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHeader>
          }
          groupBy: {
            args: Prisma.HeaderGroupByArgs<ExtArgs>
            result: $Utils.Optional<HeaderGroupByOutputType>[]
          }
          count: {
            args: Prisma.HeaderCountArgs<ExtArgs>
            result: $Utils.Optional<HeaderCountAggregateOutputType> | number
          }
        }
      }
      Footer: {
        payload: Prisma.$FooterPayload<ExtArgs>
        fields: Prisma.FooterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FooterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FooterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          findFirst: {
            args: Prisma.FooterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FooterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          findMany: {
            args: Prisma.FooterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>[]
          }
          create: {
            args: Prisma.FooterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          createMany: {
            args: Prisma.FooterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FooterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>[]
          }
          delete: {
            args: Prisma.FooterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          update: {
            args: Prisma.FooterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          deleteMany: {
            args: Prisma.FooterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FooterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FooterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>[]
          }
          upsert: {
            args: Prisma.FooterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          aggregate: {
            args: Prisma.FooterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFooter>
          }
          groupBy: {
            args: Prisma.FooterGroupByArgs<ExtArgs>
            result: $Utils.Optional<FooterGroupByOutputType>[]
          }
          count: {
            args: Prisma.FooterCountArgs<ExtArgs>
            result: $Utils.Optional<FooterCountAggregateOutputType> | number
          }
        }
      }
      Configuration: {
        payload: Prisma.$ConfigurationPayload<ExtArgs>
        fields: Prisma.ConfigurationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfigurationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfigurationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          findFirst: {
            args: Prisma.ConfigurationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfigurationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          findMany: {
            args: Prisma.ConfigurationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>[]
          }
          create: {
            args: Prisma.ConfigurationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          createMany: {
            args: Prisma.ConfigurationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfigurationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>[]
          }
          delete: {
            args: Prisma.ConfigurationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          update: {
            args: Prisma.ConfigurationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          deleteMany: {
            args: Prisma.ConfigurationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfigurationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConfigurationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>[]
          }
          upsert: {
            args: Prisma.ConfigurationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          aggregate: {
            args: Prisma.ConfigurationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfiguration>
          }
          groupBy: {
            args: Prisma.ConfigurationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfigurationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfigurationCountArgs<ExtArgs>
            result: $Utils.Optional<ConfigurationCountAggregateOutputType> | number
          }
        }
      }
      Media: {
        payload: Prisma.$MediaPayload<ExtArgs>
        fields: Prisma.MediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findFirst: {
            args: Prisma.MediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findMany: {
            args: Prisma.MediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          create: {
            args: Prisma.MediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          createMany: {
            args: Prisma.MediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          delete: {
            args: Prisma.MediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          update: {
            args: Prisma.MediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          deleteMany: {
            args: Prisma.MediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          upsert: {
            args: Prisma.MediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          aggregate: {
            args: Prisma.MediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedia>
          }
          groupBy: {
            args: Prisma.MediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaCountArgs<ExtArgs>
            result: $Utils.Optional<MediaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    page?: PageOmit
    header?: HeaderOmit
    footer?: FooterOmit
    configuration?: ConfigurationOmit
    media?: MediaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PageCountOutputType
   */

  export type PageCountOutputType = {
    children: number
  }

  export type PageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | PageCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageCountOutputType
     */
    select?: PageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }


  /**
   * Count Type HeaderCountOutputType
   */

  export type HeaderCountOutputType = {
    reseaux: number
  }

  export type HeaderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reseaux?: boolean | HeaderCountOutputTypeCountReseauxArgs
  }

  // Custom InputTypes
  /**
   * HeaderCountOutputType without action
   */
  export type HeaderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeaderCountOutputType
     */
    select?: HeaderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HeaderCountOutputType without action
   */
  export type HeaderCountOutputTypeCountReseauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
  }


  /**
   * Count Type FooterCountOutputType
   */

  export type FooterCountOutputType = {
    reseaux: number
  }

  export type FooterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reseaux?: boolean | FooterCountOutputTypeCountReseauxArgs
  }

  // Custom InputTypes
  /**
   * FooterCountOutputType without action
   */
  export type FooterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FooterCountOutputType
     */
    select?: FooterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FooterCountOutputType without action
   */
  export type FooterCountOutputTypeCountReseauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    number_id: number | null
  }

  export type UserSumAggregateOutputType = {
    number_id: number | null
  }

  export type UserMinAggregateOutputType = {
    number_id: number | null
    text_email: string | null
    text_password: string | null
    text_name: string | null
    text_createdAt: Date | null
    text_updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    number_id: number | null
    text_email: string | null
    text_password: string | null
    text_name: string | null
    text_createdAt: Date | null
    text_updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    number_id: number
    text_email: number
    text_password: number
    text_name: number
    text_createdAt: number
    text_updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    number_id?: true
  }

  export type UserSumAggregateInputType = {
    number_id?: true
  }

  export type UserMinAggregateInputType = {
    number_id?: true
    text_email?: true
    text_password?: true
    text_name?: true
    text_createdAt?: true
    text_updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    number_id?: true
    text_email?: true
    text_password?: true
    text_name?: true
    text_createdAt?: true
    text_updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    number_id?: true
    text_email?: true
    text_password?: true
    text_name?: true
    text_createdAt?: true
    text_updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    number_id: number
    text_email: string
    text_password: string
    text_name: string | null
    text_createdAt: Date
    text_updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_email?: boolean
    text_password?: boolean
    text_name?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_email?: boolean
    text_password?: boolean
    text_name?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_email?: boolean
    text_password?: boolean
    text_name?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    number_id?: boolean
    text_email?: boolean
    text_password?: boolean
    text_name?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number_id" | "text_email" | "text_password" | "text_name" | "text_createdAt" | "text_updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      number_id: number
      text_email: string
      text_password: string
      text_name: string | null
      text_createdAt: Date
      text_updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `number_id`
     * const userWithNumber_idOnly = await prisma.user.findMany({ select: { number_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `number_id`
     * const userWithNumber_idOnly = await prisma.user.createManyAndReturn({
     *   select: { number_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `number_id`
     * const userWithNumber_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { number_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly number_id: FieldRef<"User", 'Int'>
    readonly text_email: FieldRef<"User", 'String'>
    readonly text_password: FieldRef<"User", 'String'>
    readonly text_name: FieldRef<"User", 'String'>
    readonly text_createdAt: FieldRef<"User", 'DateTime'>
    readonly text_updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Page
   */

  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageAvgAggregateOutputType = {
    number_id: number | null
    number_parent_id: number | null
    number_page_position: number | null
  }

  export type PageSumAggregateOutputType = {
    number_id: number | null
    number_parent_id: number | null
    number_page_position: number | null
  }

  export type PageMinAggregateOutputType = {
    number_id: number | null
    number_parent_id: number | null
    checkbox_published: boolean | null
    text_titre: string | null
    text_slug: string | null
    number_page_position: number | null
    text_langue: string | null
    blocs: string | null
    text_createdAt: Date | null
    text_updatedAt: Date | null
    text_description: string | null
    checkbox_home_page: boolean | null
  }

  export type PageMaxAggregateOutputType = {
    number_id: number | null
    number_parent_id: number | null
    checkbox_published: boolean | null
    text_titre: string | null
    text_slug: string | null
    number_page_position: number | null
    text_langue: string | null
    blocs: string | null
    text_createdAt: Date | null
    text_updatedAt: Date | null
    text_description: string | null
    checkbox_home_page: boolean | null
  }

  export type PageCountAggregateOutputType = {
    number_id: number
    number_parent_id: number
    checkbox_published: number
    text_titre: number
    text_slug: number
    number_page_position: number
    text_langue: number
    blocs: number
    text_createdAt: number
    text_updatedAt: number
    text_description: number
    checkbox_home_page: number
    _all: number
  }


  export type PageAvgAggregateInputType = {
    number_id?: true
    number_parent_id?: true
    number_page_position?: true
  }

  export type PageSumAggregateInputType = {
    number_id?: true
    number_parent_id?: true
    number_page_position?: true
  }

  export type PageMinAggregateInputType = {
    number_id?: true
    number_parent_id?: true
    checkbox_published?: true
    text_titre?: true
    text_slug?: true
    number_page_position?: true
    text_langue?: true
    blocs?: true
    text_createdAt?: true
    text_updatedAt?: true
    text_description?: true
    checkbox_home_page?: true
  }

  export type PageMaxAggregateInputType = {
    number_id?: true
    number_parent_id?: true
    checkbox_published?: true
    text_titre?: true
    text_slug?: true
    number_page_position?: true
    text_langue?: true
    blocs?: true
    text_createdAt?: true
    text_updatedAt?: true
    text_description?: true
    checkbox_home_page?: true
  }

  export type PageCountAggregateInputType = {
    number_id?: true
    number_parent_id?: true
    checkbox_published?: true
    text_titre?: true
    text_slug?: true
    number_page_position?: true
    text_langue?: true
    blocs?: true
    text_createdAt?: true
    text_updatedAt?: true
    text_description?: true
    checkbox_home_page?: true
    _all?: true
  }

  export type PageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Page to aggregate.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
    orderBy?: PageOrderByWithAggregationInput | PageOrderByWithAggregationInput[]
    by: PageScalarFieldEnum[] | PageScalarFieldEnum
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _avg?: PageAvgAggregateInputType
    _sum?: PageSumAggregateInputType
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }

  export type PageGroupByOutputType = {
    number_id: number
    number_parent_id: number | null
    checkbox_published: boolean
    text_titre: string
    text_slug: string
    number_page_position: number
    text_langue: string
    blocs: string
    text_createdAt: Date
    text_updatedAt: Date
    text_description: string | null
    checkbox_home_page: boolean
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    number_parent_id?: boolean
    checkbox_published?: boolean
    text_titre?: boolean
    text_slug?: boolean
    number_page_position?: boolean
    text_langue?: boolean
    blocs?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
    text_description?: boolean
    checkbox_home_page?: boolean
    parent?: boolean | Page$parentArgs<ExtArgs>
    children?: boolean | Page$childrenArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    number_parent_id?: boolean
    checkbox_published?: boolean
    text_titre?: boolean
    text_slug?: boolean
    number_page_position?: boolean
    text_langue?: boolean
    blocs?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
    text_description?: boolean
    checkbox_home_page?: boolean
    parent?: boolean | Page$parentArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    number_parent_id?: boolean
    checkbox_published?: boolean
    text_titre?: boolean
    text_slug?: boolean
    number_page_position?: boolean
    text_langue?: boolean
    blocs?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
    text_description?: boolean
    checkbox_home_page?: boolean
    parent?: boolean | Page$parentArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectScalar = {
    number_id?: boolean
    number_parent_id?: boolean
    checkbox_published?: boolean
    text_titre?: boolean
    text_slug?: boolean
    number_page_position?: boolean
    text_langue?: boolean
    blocs?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
    text_description?: boolean
    checkbox_home_page?: boolean
  }

  export type PageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number_id" | "number_parent_id" | "checkbox_published" | "text_titre" | "text_slug" | "number_page_position" | "text_langue" | "blocs" | "text_createdAt" | "text_updatedAt" | "text_description" | "checkbox_home_page", ExtArgs["result"]["page"]>
  export type PageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Page$parentArgs<ExtArgs>
    children?: boolean | Page$childrenArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Page$parentArgs<ExtArgs>
  }
  export type PageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Page$parentArgs<ExtArgs>
  }

  export type $PagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Page"
    objects: {
      parent: Prisma.$PagePayload<ExtArgs> | null
      children: Prisma.$PagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      number_id: number
      number_parent_id: number | null
      checkbox_published: boolean
      text_titre: string
      text_slug: string
      number_page_position: number
      text_langue: string
      blocs: string
      text_createdAt: Date
      text_updatedAt: Date
      text_description: string | null
      checkbox_home_page: boolean
    }, ExtArgs["result"]["page"]>
    composites: {}
  }

  type PageGetPayload<S extends boolean | null | undefined | PageDefaultArgs> = $Result.GetResult<Prisma.$PagePayload, S>

  type PageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PageCountAggregateInputType | true
    }

  export interface PageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Page'], meta: { name: 'Page' } }
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageFindUniqueArgs>(args: SelectSubset<T, PageFindUniqueArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Page that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs>(args: SelectSubset<T, PageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageFindFirstArgs>(args?: SelectSubset<T, PageFindFirstArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs>(args?: SelectSubset<T, PageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `number_id`
     * const pageWithNumber_idOnly = await prisma.page.findMany({ select: { number_id: true } })
     * 
     */
    findMany<T extends PageFindManyArgs>(args?: SelectSubset<T, PageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
     */
    create<T extends PageCreateArgs>(args: SelectSubset<T, PageCreateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pages.
     * @param {PageCreateManyArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageCreateManyArgs>(args?: SelectSubset<T, PageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pages and returns the data saved in the database.
     * @param {PageCreateManyAndReturnArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pages and only return the `number_id`
     * const pageWithNumber_idOnly = await prisma.page.createManyAndReturn({
     *   select: { number_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PageCreateManyAndReturnArgs>(args?: SelectSubset<T, PageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
     */
    delete<T extends PageDeleteArgs>(args: SelectSubset<T, PageDeleteArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageUpdateArgs>(args: SelectSubset<T, PageUpdateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageDeleteManyArgs>(args?: SelectSubset<T, PageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageUpdateManyArgs>(args: SelectSubset<T, PageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages and returns the data updated in the database.
     * @param {PageUpdateManyAndReturnArgs} args - Arguments to update many Pages.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pages and only return the `number_id`
     * const pageWithNumber_idOnly = await prisma.page.updateManyAndReturn({
     *   select: { number_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PageUpdateManyAndReturnArgs>(args: SelectSubset<T, PageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
     */
    upsert<T extends PageUpsertArgs>(args: SelectSubset<T, PageUpsertArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): Prisma.PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Page model
   */
  readonly fields: PageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Page$parentArgs<ExtArgs> = {}>(args?: Subset<T, Page$parentArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Page$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Page$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Page model
   */
  interface PageFieldRefs {
    readonly number_id: FieldRef<"Page", 'Int'>
    readonly number_parent_id: FieldRef<"Page", 'Int'>
    readonly checkbox_published: FieldRef<"Page", 'Boolean'>
    readonly text_titre: FieldRef<"Page", 'String'>
    readonly text_slug: FieldRef<"Page", 'String'>
    readonly number_page_position: FieldRef<"Page", 'Int'>
    readonly text_langue: FieldRef<"Page", 'String'>
    readonly blocs: FieldRef<"Page", 'String'>
    readonly text_createdAt: FieldRef<"Page", 'DateTime'>
    readonly text_updatedAt: FieldRef<"Page", 'DateTime'>
    readonly text_description: FieldRef<"Page", 'String'>
    readonly checkbox_home_page: FieldRef<"Page", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Page findUnique
   */
  export type PageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findFirst
   */
  export type PageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findMany
   */
  export type PageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Pages to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page create
   */
  export type PageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to create a Page.
     */
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }

  /**
   * Page createMany
   */
  export type PageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Page createManyAndReturn
   */
  export type PageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page update
   */
  export type PageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to update a Page.
     */
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
  }

  /**
   * Page updateManyAndReturn
   */
  export type PageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page upsert
   */
  export type PageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The filter to search for the Page to update in case it exists.
     */
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     */
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }

  /**
   * Page delete
   */
  export type PageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter which Page to delete.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pages to delete
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to delete.
     */
    limit?: number
  }

  /**
   * Page.parent
   */
  export type Page$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
  }

  /**
   * Page.children
   */
  export type Page$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page without action
   */
  export type PageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
  }


  /**
   * Model Header
   */

  export type AggregateHeader = {
    _count: HeaderCountAggregateOutputType | null
    _avg: HeaderAvgAggregateOutputType | null
    _sum: HeaderSumAggregateOutputType | null
    _min: HeaderMinAggregateOutputType | null
    _max: HeaderMaxAggregateOutputType | null
  }

  export type HeaderAvgAggregateOutputType = {
    number_id: number | null
  }

  export type HeaderSumAggregateOutputType = {
    number_id: number | null
  }

  export type HeaderMinAggregateOutputType = {
    number_id: number | null
    text_nom_site: string | null
    text_background_url: string | null
  }

  export type HeaderMaxAggregateOutputType = {
    number_id: number | null
    text_nom_site: string | null
    text_background_url: string | null
  }

  export type HeaderCountAggregateOutputType = {
    number_id: number
    text_nom_site: number
    text_background_url: number
    _all: number
  }


  export type HeaderAvgAggregateInputType = {
    number_id?: true
  }

  export type HeaderSumAggregateInputType = {
    number_id?: true
  }

  export type HeaderMinAggregateInputType = {
    number_id?: true
    text_nom_site?: true
    text_background_url?: true
  }

  export type HeaderMaxAggregateInputType = {
    number_id?: true
    text_nom_site?: true
    text_background_url?: true
  }

  export type HeaderCountAggregateInputType = {
    number_id?: true
    text_nom_site?: true
    text_background_url?: true
    _all?: true
  }

  export type HeaderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Header to aggregate.
     */
    where?: HeaderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Headers to fetch.
     */
    orderBy?: HeaderOrderByWithRelationInput | HeaderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HeaderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Headers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Headers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Headers
    **/
    _count?: true | HeaderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HeaderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HeaderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HeaderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HeaderMaxAggregateInputType
  }

  export type GetHeaderAggregateType<T extends HeaderAggregateArgs> = {
        [P in keyof T & keyof AggregateHeader]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHeader[P]>
      : GetScalarType<T[P], AggregateHeader[P]>
  }




  export type HeaderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HeaderWhereInput
    orderBy?: HeaderOrderByWithAggregationInput | HeaderOrderByWithAggregationInput[]
    by: HeaderScalarFieldEnum[] | HeaderScalarFieldEnum
    having?: HeaderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HeaderCountAggregateInputType | true
    _avg?: HeaderAvgAggregateInputType
    _sum?: HeaderSumAggregateInputType
    _min?: HeaderMinAggregateInputType
    _max?: HeaderMaxAggregateInputType
  }

  export type HeaderGroupByOutputType = {
    number_id: number
    text_nom_site: string | null
    text_background_url: string | null
    _count: HeaderCountAggregateOutputType | null
    _avg: HeaderAvgAggregateOutputType | null
    _sum: HeaderSumAggregateOutputType | null
    _min: HeaderMinAggregateOutputType | null
    _max: HeaderMaxAggregateOutputType | null
  }

  type GetHeaderGroupByPayload<T extends HeaderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HeaderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HeaderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HeaderGroupByOutputType[P]>
            : GetScalarType<T[P], HeaderGroupByOutputType[P]>
        }
      >
    >


  export type HeaderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_nom_site?: boolean
    text_background_url?: boolean
    favicon?: boolean | Header$faviconArgs<ExtArgs>
    logo?: boolean | Header$logoArgs<ExtArgs>
    reseaux?: boolean | Header$reseauxArgs<ExtArgs>
    _count?: boolean | HeaderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["header"]>

  export type HeaderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_nom_site?: boolean
    text_background_url?: boolean
  }, ExtArgs["result"]["header"]>

  export type HeaderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_nom_site?: boolean
    text_background_url?: boolean
  }, ExtArgs["result"]["header"]>

  export type HeaderSelectScalar = {
    number_id?: boolean
    text_nom_site?: boolean
    text_background_url?: boolean
  }

  export type HeaderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number_id" | "text_nom_site" | "text_background_url", ExtArgs["result"]["header"]>
  export type HeaderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favicon?: boolean | Header$faviconArgs<ExtArgs>
    logo?: boolean | Header$logoArgs<ExtArgs>
    reseaux?: boolean | Header$reseauxArgs<ExtArgs>
    _count?: boolean | HeaderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HeaderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type HeaderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HeaderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Header"
    objects: {
      favicon: Prisma.$MediaPayload<ExtArgs> | null
      logo: Prisma.$MediaPayload<ExtArgs> | null
      reseaux: Prisma.$MediaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      number_id: number
      text_nom_site: string | null
      text_background_url: string | null
    }, ExtArgs["result"]["header"]>
    composites: {}
  }

  type HeaderGetPayload<S extends boolean | null | undefined | HeaderDefaultArgs> = $Result.GetResult<Prisma.$HeaderPayload, S>

  type HeaderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HeaderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HeaderCountAggregateInputType | true
    }

  export interface HeaderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Header'], meta: { name: 'Header' } }
    /**
     * Find zero or one Header that matches the filter.
     * @param {HeaderFindUniqueArgs} args - Arguments to find a Header
     * @example
     * // Get one Header
     * const header = await prisma.header.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HeaderFindUniqueArgs>(args: SelectSubset<T, HeaderFindUniqueArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Header that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HeaderFindUniqueOrThrowArgs} args - Arguments to find a Header
     * @example
     * // Get one Header
     * const header = await prisma.header.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HeaderFindUniqueOrThrowArgs>(args: SelectSubset<T, HeaderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Header that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeaderFindFirstArgs} args - Arguments to find a Header
     * @example
     * // Get one Header
     * const header = await prisma.header.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HeaderFindFirstArgs>(args?: SelectSubset<T, HeaderFindFirstArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Header that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeaderFindFirstOrThrowArgs} args - Arguments to find a Header
     * @example
     * // Get one Header
     * const header = await prisma.header.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HeaderFindFirstOrThrowArgs>(args?: SelectSubset<T, HeaderFindFirstOrThrowArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Headers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeaderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Headers
     * const headers = await prisma.header.findMany()
     * 
     * // Get first 10 Headers
     * const headers = await prisma.header.findMany({ take: 10 })
     * 
     * // Only select the `number_id`
     * const headerWithNumber_idOnly = await prisma.header.findMany({ select: { number_id: true } })
     * 
     */
    findMany<T extends HeaderFindManyArgs>(args?: SelectSubset<T, HeaderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Header.
     * @param {HeaderCreateArgs} args - Arguments to create a Header.
     * @example
     * // Create one Header
     * const Header = await prisma.header.create({
     *   data: {
     *     // ... data to create a Header
     *   }
     * })
     * 
     */
    create<T extends HeaderCreateArgs>(args: SelectSubset<T, HeaderCreateArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Headers.
     * @param {HeaderCreateManyArgs} args - Arguments to create many Headers.
     * @example
     * // Create many Headers
     * const header = await prisma.header.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HeaderCreateManyArgs>(args?: SelectSubset<T, HeaderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Headers and returns the data saved in the database.
     * @param {HeaderCreateManyAndReturnArgs} args - Arguments to create many Headers.
     * @example
     * // Create many Headers
     * const header = await prisma.header.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Headers and only return the `number_id`
     * const headerWithNumber_idOnly = await prisma.header.createManyAndReturn({
     *   select: { number_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HeaderCreateManyAndReturnArgs>(args?: SelectSubset<T, HeaderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Header.
     * @param {HeaderDeleteArgs} args - Arguments to delete one Header.
     * @example
     * // Delete one Header
     * const Header = await prisma.header.delete({
     *   where: {
     *     // ... filter to delete one Header
     *   }
     * })
     * 
     */
    delete<T extends HeaderDeleteArgs>(args: SelectSubset<T, HeaderDeleteArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Header.
     * @param {HeaderUpdateArgs} args - Arguments to update one Header.
     * @example
     * // Update one Header
     * const header = await prisma.header.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HeaderUpdateArgs>(args: SelectSubset<T, HeaderUpdateArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Headers.
     * @param {HeaderDeleteManyArgs} args - Arguments to filter Headers to delete.
     * @example
     * // Delete a few Headers
     * const { count } = await prisma.header.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HeaderDeleteManyArgs>(args?: SelectSubset<T, HeaderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Headers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeaderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Headers
     * const header = await prisma.header.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HeaderUpdateManyArgs>(args: SelectSubset<T, HeaderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Headers and returns the data updated in the database.
     * @param {HeaderUpdateManyAndReturnArgs} args - Arguments to update many Headers.
     * @example
     * // Update many Headers
     * const header = await prisma.header.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Headers and only return the `number_id`
     * const headerWithNumber_idOnly = await prisma.header.updateManyAndReturn({
     *   select: { number_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HeaderUpdateManyAndReturnArgs>(args: SelectSubset<T, HeaderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Header.
     * @param {HeaderUpsertArgs} args - Arguments to update or create a Header.
     * @example
     * // Update or create a Header
     * const header = await prisma.header.upsert({
     *   create: {
     *     // ... data to create a Header
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Header we want to update
     *   }
     * })
     */
    upsert<T extends HeaderUpsertArgs>(args: SelectSubset<T, HeaderUpsertArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Headers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeaderCountArgs} args - Arguments to filter Headers to count.
     * @example
     * // Count the number of Headers
     * const count = await prisma.header.count({
     *   where: {
     *     // ... the filter for the Headers we want to count
     *   }
     * })
    **/
    count<T extends HeaderCountArgs>(
      args?: Subset<T, HeaderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HeaderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Header.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeaderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HeaderAggregateArgs>(args: Subset<T, HeaderAggregateArgs>): Prisma.PrismaPromise<GetHeaderAggregateType<T>>

    /**
     * Group by Header.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeaderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HeaderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HeaderGroupByArgs['orderBy'] }
        : { orderBy?: HeaderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HeaderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHeaderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Header model
   */
  readonly fields: HeaderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Header.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HeaderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    favicon<T extends Header$faviconArgs<ExtArgs> = {}>(args?: Subset<T, Header$faviconArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    logo<T extends Header$logoArgs<ExtArgs> = {}>(args?: Subset<T, Header$logoArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reseaux<T extends Header$reseauxArgs<ExtArgs> = {}>(args?: Subset<T, Header$reseauxArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Header model
   */
  interface HeaderFieldRefs {
    readonly number_id: FieldRef<"Header", 'Int'>
    readonly text_nom_site: FieldRef<"Header", 'String'>
    readonly text_background_url: FieldRef<"Header", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Header findUnique
   */
  export type HeaderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    /**
     * Filter, which Header to fetch.
     */
    where: HeaderWhereUniqueInput
  }

  /**
   * Header findUniqueOrThrow
   */
  export type HeaderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    /**
     * Filter, which Header to fetch.
     */
    where: HeaderWhereUniqueInput
  }

  /**
   * Header findFirst
   */
  export type HeaderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    /**
     * Filter, which Header to fetch.
     */
    where?: HeaderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Headers to fetch.
     */
    orderBy?: HeaderOrderByWithRelationInput | HeaderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Headers.
     */
    cursor?: HeaderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Headers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Headers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Headers.
     */
    distinct?: HeaderScalarFieldEnum | HeaderScalarFieldEnum[]
  }

  /**
   * Header findFirstOrThrow
   */
  export type HeaderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    /**
     * Filter, which Header to fetch.
     */
    where?: HeaderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Headers to fetch.
     */
    orderBy?: HeaderOrderByWithRelationInput | HeaderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Headers.
     */
    cursor?: HeaderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Headers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Headers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Headers.
     */
    distinct?: HeaderScalarFieldEnum | HeaderScalarFieldEnum[]
  }

  /**
   * Header findMany
   */
  export type HeaderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    /**
     * Filter, which Headers to fetch.
     */
    where?: HeaderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Headers to fetch.
     */
    orderBy?: HeaderOrderByWithRelationInput | HeaderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Headers.
     */
    cursor?: HeaderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Headers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Headers.
     */
    skip?: number
    distinct?: HeaderScalarFieldEnum | HeaderScalarFieldEnum[]
  }

  /**
   * Header create
   */
  export type HeaderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    /**
     * The data needed to create a Header.
     */
    data?: XOR<HeaderCreateInput, HeaderUncheckedCreateInput>
  }

  /**
   * Header createMany
   */
  export type HeaderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Headers.
     */
    data: HeaderCreateManyInput | HeaderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Header createManyAndReturn
   */
  export type HeaderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * The data used to create many Headers.
     */
    data: HeaderCreateManyInput | HeaderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Header update
   */
  export type HeaderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    /**
     * The data needed to update a Header.
     */
    data: XOR<HeaderUpdateInput, HeaderUncheckedUpdateInput>
    /**
     * Choose, which Header to update.
     */
    where: HeaderWhereUniqueInput
  }

  /**
   * Header updateMany
   */
  export type HeaderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Headers.
     */
    data: XOR<HeaderUpdateManyMutationInput, HeaderUncheckedUpdateManyInput>
    /**
     * Filter which Headers to update
     */
    where?: HeaderWhereInput
    /**
     * Limit how many Headers to update.
     */
    limit?: number
  }

  /**
   * Header updateManyAndReturn
   */
  export type HeaderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * The data used to update Headers.
     */
    data: XOR<HeaderUpdateManyMutationInput, HeaderUncheckedUpdateManyInput>
    /**
     * Filter which Headers to update
     */
    where?: HeaderWhereInput
    /**
     * Limit how many Headers to update.
     */
    limit?: number
  }

  /**
   * Header upsert
   */
  export type HeaderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    /**
     * The filter to search for the Header to update in case it exists.
     */
    where: HeaderWhereUniqueInput
    /**
     * In case the Header found by the `where` argument doesn't exist, create a new Header with this data.
     */
    create: XOR<HeaderCreateInput, HeaderUncheckedCreateInput>
    /**
     * In case the Header was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HeaderUpdateInput, HeaderUncheckedUpdateInput>
  }

  /**
   * Header delete
   */
  export type HeaderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    /**
     * Filter which Header to delete.
     */
    where: HeaderWhereUniqueInput
  }

  /**
   * Header deleteMany
   */
  export type HeaderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Headers to delete
     */
    where?: HeaderWhereInput
    /**
     * Limit how many Headers to delete.
     */
    limit?: number
  }

  /**
   * Header.favicon
   */
  export type Header$faviconArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
  }

  /**
   * Header.logo
   */
  export type Header$logoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
  }

  /**
   * Header.reseaux
   */
  export type Header$reseauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    cursor?: MediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Header without action
   */
  export type HeaderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
  }


  /**
   * Model Footer
   */

  export type AggregateFooter = {
    _count: FooterCountAggregateOutputType | null
    _avg: FooterAvgAggregateOutputType | null
    _sum: FooterSumAggregateOutputType | null
    _min: FooterMinAggregateOutputType | null
    _max: FooterMaxAggregateOutputType | null
  }

  export type FooterAvgAggregateOutputType = {
    number_id: number | null
  }

  export type FooterSumAggregateOutputType = {
    number_id: number | null
  }

  export type FooterMinAggregateOutputType = {
    number_id: number | null
    color_background_color: string | null
    text_nom_site_adresse: string | null
    text_adresse_footer: string | null
    text_code_postal: string | null
  }

  export type FooterMaxAggregateOutputType = {
    number_id: number | null
    color_background_color: string | null
    text_nom_site_adresse: string | null
    text_adresse_footer: string | null
    text_code_postal: string | null
  }

  export type FooterCountAggregateOutputType = {
    number_id: number
    color_background_color: number
    text_nom_site_adresse: number
    text_adresse_footer: number
    text_code_postal: number
    _all: number
  }


  export type FooterAvgAggregateInputType = {
    number_id?: true
  }

  export type FooterSumAggregateInputType = {
    number_id?: true
  }

  export type FooterMinAggregateInputType = {
    number_id?: true
    color_background_color?: true
    text_nom_site_adresse?: true
    text_adresse_footer?: true
    text_code_postal?: true
  }

  export type FooterMaxAggregateInputType = {
    number_id?: true
    color_background_color?: true
    text_nom_site_adresse?: true
    text_adresse_footer?: true
    text_code_postal?: true
  }

  export type FooterCountAggregateInputType = {
    number_id?: true
    color_background_color?: true
    text_nom_site_adresse?: true
    text_adresse_footer?: true
    text_code_postal?: true
    _all?: true
  }

  export type FooterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Footer to aggregate.
     */
    where?: FooterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Footers to fetch.
     */
    orderBy?: FooterOrderByWithRelationInput | FooterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FooterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Footers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Footers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Footers
    **/
    _count?: true | FooterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FooterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FooterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FooterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FooterMaxAggregateInputType
  }

  export type GetFooterAggregateType<T extends FooterAggregateArgs> = {
        [P in keyof T & keyof AggregateFooter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFooter[P]>
      : GetScalarType<T[P], AggregateFooter[P]>
  }




  export type FooterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FooterWhereInput
    orderBy?: FooterOrderByWithAggregationInput | FooterOrderByWithAggregationInput[]
    by: FooterScalarFieldEnum[] | FooterScalarFieldEnum
    having?: FooterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FooterCountAggregateInputType | true
    _avg?: FooterAvgAggregateInputType
    _sum?: FooterSumAggregateInputType
    _min?: FooterMinAggregateInputType
    _max?: FooterMaxAggregateInputType
  }

  export type FooterGroupByOutputType = {
    number_id: number
    color_background_color: string | null
    text_nom_site_adresse: string | null
    text_adresse_footer: string | null
    text_code_postal: string | null
    _count: FooterCountAggregateOutputType | null
    _avg: FooterAvgAggregateOutputType | null
    _sum: FooterSumAggregateOutputType | null
    _min: FooterMinAggregateOutputType | null
    _max: FooterMaxAggregateOutputType | null
  }

  type GetFooterGroupByPayload<T extends FooterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FooterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FooterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FooterGroupByOutputType[P]>
            : GetScalarType<T[P], FooterGroupByOutputType[P]>
        }
      >
    >


  export type FooterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    color_background_color?: boolean
    text_nom_site_adresse?: boolean
    text_adresse_footer?: boolean
    text_code_postal?: boolean
    reseaux?: boolean | Footer$reseauxArgs<ExtArgs>
    _count?: boolean | FooterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["footer"]>

  export type FooterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    color_background_color?: boolean
    text_nom_site_adresse?: boolean
    text_adresse_footer?: boolean
    text_code_postal?: boolean
  }, ExtArgs["result"]["footer"]>

  export type FooterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    color_background_color?: boolean
    text_nom_site_adresse?: boolean
    text_adresse_footer?: boolean
    text_code_postal?: boolean
  }, ExtArgs["result"]["footer"]>

  export type FooterSelectScalar = {
    number_id?: boolean
    color_background_color?: boolean
    text_nom_site_adresse?: boolean
    text_adresse_footer?: boolean
    text_code_postal?: boolean
  }

  export type FooterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number_id" | "color_background_color" | "text_nom_site_adresse" | "text_adresse_footer" | "text_code_postal", ExtArgs["result"]["footer"]>
  export type FooterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reseaux?: boolean | Footer$reseauxArgs<ExtArgs>
    _count?: boolean | FooterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FooterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FooterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FooterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Footer"
    objects: {
      reseaux: Prisma.$MediaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      number_id: number
      color_background_color: string | null
      text_nom_site_adresse: string | null
      text_adresse_footer: string | null
      text_code_postal: string | null
    }, ExtArgs["result"]["footer"]>
    composites: {}
  }

  type FooterGetPayload<S extends boolean | null | undefined | FooterDefaultArgs> = $Result.GetResult<Prisma.$FooterPayload, S>

  type FooterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FooterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FooterCountAggregateInputType | true
    }

  export interface FooterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Footer'], meta: { name: 'Footer' } }
    /**
     * Find zero or one Footer that matches the filter.
     * @param {FooterFindUniqueArgs} args - Arguments to find a Footer
     * @example
     * // Get one Footer
     * const footer = await prisma.footer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FooterFindUniqueArgs>(args: SelectSubset<T, FooterFindUniqueArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Footer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FooterFindUniqueOrThrowArgs} args - Arguments to find a Footer
     * @example
     * // Get one Footer
     * const footer = await prisma.footer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FooterFindUniqueOrThrowArgs>(args: SelectSubset<T, FooterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Footer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterFindFirstArgs} args - Arguments to find a Footer
     * @example
     * // Get one Footer
     * const footer = await prisma.footer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FooterFindFirstArgs>(args?: SelectSubset<T, FooterFindFirstArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Footer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterFindFirstOrThrowArgs} args - Arguments to find a Footer
     * @example
     * // Get one Footer
     * const footer = await prisma.footer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FooterFindFirstOrThrowArgs>(args?: SelectSubset<T, FooterFindFirstOrThrowArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Footers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Footers
     * const footers = await prisma.footer.findMany()
     * 
     * // Get first 10 Footers
     * const footers = await prisma.footer.findMany({ take: 10 })
     * 
     * // Only select the `number_id`
     * const footerWithNumber_idOnly = await prisma.footer.findMany({ select: { number_id: true } })
     * 
     */
    findMany<T extends FooterFindManyArgs>(args?: SelectSubset<T, FooterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Footer.
     * @param {FooterCreateArgs} args - Arguments to create a Footer.
     * @example
     * // Create one Footer
     * const Footer = await prisma.footer.create({
     *   data: {
     *     // ... data to create a Footer
     *   }
     * })
     * 
     */
    create<T extends FooterCreateArgs>(args: SelectSubset<T, FooterCreateArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Footers.
     * @param {FooterCreateManyArgs} args - Arguments to create many Footers.
     * @example
     * // Create many Footers
     * const footer = await prisma.footer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FooterCreateManyArgs>(args?: SelectSubset<T, FooterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Footers and returns the data saved in the database.
     * @param {FooterCreateManyAndReturnArgs} args - Arguments to create many Footers.
     * @example
     * // Create many Footers
     * const footer = await prisma.footer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Footers and only return the `number_id`
     * const footerWithNumber_idOnly = await prisma.footer.createManyAndReturn({
     *   select: { number_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FooterCreateManyAndReturnArgs>(args?: SelectSubset<T, FooterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Footer.
     * @param {FooterDeleteArgs} args - Arguments to delete one Footer.
     * @example
     * // Delete one Footer
     * const Footer = await prisma.footer.delete({
     *   where: {
     *     // ... filter to delete one Footer
     *   }
     * })
     * 
     */
    delete<T extends FooterDeleteArgs>(args: SelectSubset<T, FooterDeleteArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Footer.
     * @param {FooterUpdateArgs} args - Arguments to update one Footer.
     * @example
     * // Update one Footer
     * const footer = await prisma.footer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FooterUpdateArgs>(args: SelectSubset<T, FooterUpdateArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Footers.
     * @param {FooterDeleteManyArgs} args - Arguments to filter Footers to delete.
     * @example
     * // Delete a few Footers
     * const { count } = await prisma.footer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FooterDeleteManyArgs>(args?: SelectSubset<T, FooterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Footers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Footers
     * const footer = await prisma.footer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FooterUpdateManyArgs>(args: SelectSubset<T, FooterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Footers and returns the data updated in the database.
     * @param {FooterUpdateManyAndReturnArgs} args - Arguments to update many Footers.
     * @example
     * // Update many Footers
     * const footer = await prisma.footer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Footers and only return the `number_id`
     * const footerWithNumber_idOnly = await prisma.footer.updateManyAndReturn({
     *   select: { number_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FooterUpdateManyAndReturnArgs>(args: SelectSubset<T, FooterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Footer.
     * @param {FooterUpsertArgs} args - Arguments to update or create a Footer.
     * @example
     * // Update or create a Footer
     * const footer = await prisma.footer.upsert({
     *   create: {
     *     // ... data to create a Footer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Footer we want to update
     *   }
     * })
     */
    upsert<T extends FooterUpsertArgs>(args: SelectSubset<T, FooterUpsertArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Footers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterCountArgs} args - Arguments to filter Footers to count.
     * @example
     * // Count the number of Footers
     * const count = await prisma.footer.count({
     *   where: {
     *     // ... the filter for the Footers we want to count
     *   }
     * })
    **/
    count<T extends FooterCountArgs>(
      args?: Subset<T, FooterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FooterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Footer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FooterAggregateArgs>(args: Subset<T, FooterAggregateArgs>): Prisma.PrismaPromise<GetFooterAggregateType<T>>

    /**
     * Group by Footer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FooterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FooterGroupByArgs['orderBy'] }
        : { orderBy?: FooterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FooterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFooterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Footer model
   */
  readonly fields: FooterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Footer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FooterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reseaux<T extends Footer$reseauxArgs<ExtArgs> = {}>(args?: Subset<T, Footer$reseauxArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Footer model
   */
  interface FooterFieldRefs {
    readonly number_id: FieldRef<"Footer", 'Int'>
    readonly color_background_color: FieldRef<"Footer", 'String'>
    readonly text_nom_site_adresse: FieldRef<"Footer", 'String'>
    readonly text_adresse_footer: FieldRef<"Footer", 'String'>
    readonly text_code_postal: FieldRef<"Footer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Footer findUnique
   */
  export type FooterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    /**
     * Filter, which Footer to fetch.
     */
    where: FooterWhereUniqueInput
  }

  /**
   * Footer findUniqueOrThrow
   */
  export type FooterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    /**
     * Filter, which Footer to fetch.
     */
    where: FooterWhereUniqueInput
  }

  /**
   * Footer findFirst
   */
  export type FooterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    /**
     * Filter, which Footer to fetch.
     */
    where?: FooterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Footers to fetch.
     */
    orderBy?: FooterOrderByWithRelationInput | FooterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Footers.
     */
    cursor?: FooterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Footers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Footers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Footers.
     */
    distinct?: FooterScalarFieldEnum | FooterScalarFieldEnum[]
  }

  /**
   * Footer findFirstOrThrow
   */
  export type FooterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    /**
     * Filter, which Footer to fetch.
     */
    where?: FooterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Footers to fetch.
     */
    orderBy?: FooterOrderByWithRelationInput | FooterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Footers.
     */
    cursor?: FooterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Footers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Footers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Footers.
     */
    distinct?: FooterScalarFieldEnum | FooterScalarFieldEnum[]
  }

  /**
   * Footer findMany
   */
  export type FooterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    /**
     * Filter, which Footers to fetch.
     */
    where?: FooterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Footers to fetch.
     */
    orderBy?: FooterOrderByWithRelationInput | FooterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Footers.
     */
    cursor?: FooterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Footers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Footers.
     */
    skip?: number
    distinct?: FooterScalarFieldEnum | FooterScalarFieldEnum[]
  }

  /**
   * Footer create
   */
  export type FooterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    /**
     * The data needed to create a Footer.
     */
    data?: XOR<FooterCreateInput, FooterUncheckedCreateInput>
  }

  /**
   * Footer createMany
   */
  export type FooterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Footers.
     */
    data: FooterCreateManyInput | FooterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Footer createManyAndReturn
   */
  export type FooterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * The data used to create many Footers.
     */
    data: FooterCreateManyInput | FooterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Footer update
   */
  export type FooterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    /**
     * The data needed to update a Footer.
     */
    data: XOR<FooterUpdateInput, FooterUncheckedUpdateInput>
    /**
     * Choose, which Footer to update.
     */
    where: FooterWhereUniqueInput
  }

  /**
   * Footer updateMany
   */
  export type FooterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Footers.
     */
    data: XOR<FooterUpdateManyMutationInput, FooterUncheckedUpdateManyInput>
    /**
     * Filter which Footers to update
     */
    where?: FooterWhereInput
    /**
     * Limit how many Footers to update.
     */
    limit?: number
  }

  /**
   * Footer updateManyAndReturn
   */
  export type FooterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * The data used to update Footers.
     */
    data: XOR<FooterUpdateManyMutationInput, FooterUncheckedUpdateManyInput>
    /**
     * Filter which Footers to update
     */
    where?: FooterWhereInput
    /**
     * Limit how many Footers to update.
     */
    limit?: number
  }

  /**
   * Footer upsert
   */
  export type FooterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    /**
     * The filter to search for the Footer to update in case it exists.
     */
    where: FooterWhereUniqueInput
    /**
     * In case the Footer found by the `where` argument doesn't exist, create a new Footer with this data.
     */
    create: XOR<FooterCreateInput, FooterUncheckedCreateInput>
    /**
     * In case the Footer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FooterUpdateInput, FooterUncheckedUpdateInput>
  }

  /**
   * Footer delete
   */
  export type FooterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    /**
     * Filter which Footer to delete.
     */
    where: FooterWhereUniqueInput
  }

  /**
   * Footer deleteMany
   */
  export type FooterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Footers to delete
     */
    where?: FooterWhereInput
    /**
     * Limit how many Footers to delete.
     */
    limit?: number
  }

  /**
   * Footer.reseaux
   */
  export type Footer$reseauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    cursor?: MediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Footer without action
   */
  export type FooterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
  }


  /**
   * Model Configuration
   */

  export type AggregateConfiguration = {
    _count: ConfigurationCountAggregateOutputType | null
    _avg: ConfigurationAvgAggregateOutputType | null
    _sum: ConfigurationSumAggregateOutputType | null
    _min: ConfigurationMinAggregateOutputType | null
    _max: ConfigurationMaxAggregateOutputType | null
  }

  export type ConfigurationAvgAggregateOutputType = {
    number_id: number | null
  }

  export type ConfigurationSumAggregateOutputType = {
    number_id: number | null
  }

  export type ConfigurationMinAggregateOutputType = {
    number_id: number | null
    text_taille: string | null
    color_main_color: string | null
    text_police: string | null
    text_createdAt: Date | null
    text_updatedAt: Date | null
  }

  export type ConfigurationMaxAggregateOutputType = {
    number_id: number | null
    text_taille: string | null
    color_main_color: string | null
    text_police: string | null
    text_createdAt: Date | null
    text_updatedAt: Date | null
  }

  export type ConfigurationCountAggregateOutputType = {
    number_id: number
    text_taille: number
    color_main_color: number
    text_police: number
    text_createdAt: number
    text_updatedAt: number
    _all: number
  }


  export type ConfigurationAvgAggregateInputType = {
    number_id?: true
  }

  export type ConfigurationSumAggregateInputType = {
    number_id?: true
  }

  export type ConfigurationMinAggregateInputType = {
    number_id?: true
    text_taille?: true
    color_main_color?: true
    text_police?: true
    text_createdAt?: true
    text_updatedAt?: true
  }

  export type ConfigurationMaxAggregateInputType = {
    number_id?: true
    text_taille?: true
    color_main_color?: true
    text_police?: true
    text_createdAt?: true
    text_updatedAt?: true
  }

  export type ConfigurationCountAggregateInputType = {
    number_id?: true
    text_taille?: true
    color_main_color?: true
    text_police?: true
    text_createdAt?: true
    text_updatedAt?: true
    _all?: true
  }

  export type ConfigurationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configuration to aggregate.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Configurations
    **/
    _count?: true | ConfigurationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConfigurationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConfigurationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfigurationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfigurationMaxAggregateInputType
  }

  export type GetConfigurationAggregateType<T extends ConfigurationAggregateArgs> = {
        [P in keyof T & keyof AggregateConfiguration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfiguration[P]>
      : GetScalarType<T[P], AggregateConfiguration[P]>
  }




  export type ConfigurationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfigurationWhereInput
    orderBy?: ConfigurationOrderByWithAggregationInput | ConfigurationOrderByWithAggregationInput[]
    by: ConfigurationScalarFieldEnum[] | ConfigurationScalarFieldEnum
    having?: ConfigurationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfigurationCountAggregateInputType | true
    _avg?: ConfigurationAvgAggregateInputType
    _sum?: ConfigurationSumAggregateInputType
    _min?: ConfigurationMinAggregateInputType
    _max?: ConfigurationMaxAggregateInputType
  }

  export type ConfigurationGroupByOutputType = {
    number_id: number
    text_taille: string
    color_main_color: string
    text_police: string
    text_createdAt: Date
    text_updatedAt: Date
    _count: ConfigurationCountAggregateOutputType | null
    _avg: ConfigurationAvgAggregateOutputType | null
    _sum: ConfigurationSumAggregateOutputType | null
    _min: ConfigurationMinAggregateOutputType | null
    _max: ConfigurationMaxAggregateOutputType | null
  }

  type GetConfigurationGroupByPayload<T extends ConfigurationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfigurationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfigurationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfigurationGroupByOutputType[P]>
            : GetScalarType<T[P], ConfigurationGroupByOutputType[P]>
        }
      >
    >


  export type ConfigurationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_taille?: boolean
    color_main_color?: boolean
    text_police?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
  }, ExtArgs["result"]["configuration"]>

  export type ConfigurationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_taille?: boolean
    color_main_color?: boolean
    text_police?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
  }, ExtArgs["result"]["configuration"]>

  export type ConfigurationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_taille?: boolean
    color_main_color?: boolean
    text_police?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
  }, ExtArgs["result"]["configuration"]>

  export type ConfigurationSelectScalar = {
    number_id?: boolean
    text_taille?: boolean
    color_main_color?: boolean
    text_police?: boolean
    text_createdAt?: boolean
    text_updatedAt?: boolean
  }

  export type ConfigurationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number_id" | "text_taille" | "color_main_color" | "text_police" | "text_createdAt" | "text_updatedAt", ExtArgs["result"]["configuration"]>

  export type $ConfigurationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Configuration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      number_id: number
      text_taille: string
      color_main_color: string
      text_police: string
      text_createdAt: Date
      text_updatedAt: Date
    }, ExtArgs["result"]["configuration"]>
    composites: {}
  }

  type ConfigurationGetPayload<S extends boolean | null | undefined | ConfigurationDefaultArgs> = $Result.GetResult<Prisma.$ConfigurationPayload, S>

  type ConfigurationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConfigurationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConfigurationCountAggregateInputType | true
    }

  export interface ConfigurationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Configuration'], meta: { name: 'Configuration' } }
    /**
     * Find zero or one Configuration that matches the filter.
     * @param {ConfigurationFindUniqueArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfigurationFindUniqueArgs>(args: SelectSubset<T, ConfigurationFindUniqueArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Configuration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConfigurationFindUniqueOrThrowArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfigurationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfigurationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationFindFirstArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfigurationFindFirstArgs>(args?: SelectSubset<T, ConfigurationFindFirstArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationFindFirstOrThrowArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfigurationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfigurationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Configurations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configurations
     * const configurations = await prisma.configuration.findMany()
     * 
     * // Get first 10 Configurations
     * const configurations = await prisma.configuration.findMany({ take: 10 })
     * 
     * // Only select the `number_id`
     * const configurationWithNumber_idOnly = await prisma.configuration.findMany({ select: { number_id: true } })
     * 
     */
    findMany<T extends ConfigurationFindManyArgs>(args?: SelectSubset<T, ConfigurationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Configuration.
     * @param {ConfigurationCreateArgs} args - Arguments to create a Configuration.
     * @example
     * // Create one Configuration
     * const Configuration = await prisma.configuration.create({
     *   data: {
     *     // ... data to create a Configuration
     *   }
     * })
     * 
     */
    create<T extends ConfigurationCreateArgs>(args: SelectSubset<T, ConfigurationCreateArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Configurations.
     * @param {ConfigurationCreateManyArgs} args - Arguments to create many Configurations.
     * @example
     * // Create many Configurations
     * const configuration = await prisma.configuration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfigurationCreateManyArgs>(args?: SelectSubset<T, ConfigurationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Configurations and returns the data saved in the database.
     * @param {ConfigurationCreateManyAndReturnArgs} args - Arguments to create many Configurations.
     * @example
     * // Create many Configurations
     * const configuration = await prisma.configuration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Configurations and only return the `number_id`
     * const configurationWithNumber_idOnly = await prisma.configuration.createManyAndReturn({
     *   select: { number_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConfigurationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfigurationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Configuration.
     * @param {ConfigurationDeleteArgs} args - Arguments to delete one Configuration.
     * @example
     * // Delete one Configuration
     * const Configuration = await prisma.configuration.delete({
     *   where: {
     *     // ... filter to delete one Configuration
     *   }
     * })
     * 
     */
    delete<T extends ConfigurationDeleteArgs>(args: SelectSubset<T, ConfigurationDeleteArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Configuration.
     * @param {ConfigurationUpdateArgs} args - Arguments to update one Configuration.
     * @example
     * // Update one Configuration
     * const configuration = await prisma.configuration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfigurationUpdateArgs>(args: SelectSubset<T, ConfigurationUpdateArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Configurations.
     * @param {ConfigurationDeleteManyArgs} args - Arguments to filter Configurations to delete.
     * @example
     * // Delete a few Configurations
     * const { count } = await prisma.configuration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfigurationDeleteManyArgs>(args?: SelectSubset<T, ConfigurationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configurations
     * const configuration = await prisma.configuration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfigurationUpdateManyArgs>(args: SelectSubset<T, ConfigurationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configurations and returns the data updated in the database.
     * @param {ConfigurationUpdateManyAndReturnArgs} args - Arguments to update many Configurations.
     * @example
     * // Update many Configurations
     * const configuration = await prisma.configuration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Configurations and only return the `number_id`
     * const configurationWithNumber_idOnly = await prisma.configuration.updateManyAndReturn({
     *   select: { number_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConfigurationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConfigurationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Configuration.
     * @param {ConfigurationUpsertArgs} args - Arguments to update or create a Configuration.
     * @example
     * // Update or create a Configuration
     * const configuration = await prisma.configuration.upsert({
     *   create: {
     *     // ... data to create a Configuration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Configuration we want to update
     *   }
     * })
     */
    upsert<T extends ConfigurationUpsertArgs>(args: SelectSubset<T, ConfigurationUpsertArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Configurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationCountArgs} args - Arguments to filter Configurations to count.
     * @example
     * // Count the number of Configurations
     * const count = await prisma.configuration.count({
     *   where: {
     *     // ... the filter for the Configurations we want to count
     *   }
     * })
    **/
    count<T extends ConfigurationCountArgs>(
      args?: Subset<T, ConfigurationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfigurationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Configuration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfigurationAggregateArgs>(args: Subset<T, ConfigurationAggregateArgs>): Prisma.PrismaPromise<GetConfigurationAggregateType<T>>

    /**
     * Group by Configuration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConfigurationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfigurationGroupByArgs['orderBy'] }
        : { orderBy?: ConfigurationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConfigurationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfigurationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Configuration model
   */
  readonly fields: ConfigurationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Configuration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfigurationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Configuration model
   */
  interface ConfigurationFieldRefs {
    readonly number_id: FieldRef<"Configuration", 'Int'>
    readonly text_taille: FieldRef<"Configuration", 'String'>
    readonly color_main_color: FieldRef<"Configuration", 'String'>
    readonly text_police: FieldRef<"Configuration", 'String'>
    readonly text_createdAt: FieldRef<"Configuration", 'DateTime'>
    readonly text_updatedAt: FieldRef<"Configuration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Configuration findUnique
   */
  export type ConfigurationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration findUniqueOrThrow
   */
  export type ConfigurationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration findFirst
   */
  export type ConfigurationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configurations.
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configurations.
     */
    distinct?: ConfigurationScalarFieldEnum | ConfigurationScalarFieldEnum[]
  }

  /**
   * Configuration findFirstOrThrow
   */
  export type ConfigurationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configurations.
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configurations.
     */
    distinct?: ConfigurationScalarFieldEnum | ConfigurationScalarFieldEnum[]
  }

  /**
   * Configuration findMany
   */
  export type ConfigurationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configurations to fetch.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Configurations.
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    distinct?: ConfigurationScalarFieldEnum | ConfigurationScalarFieldEnum[]
  }

  /**
   * Configuration create
   */
  export type ConfigurationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data needed to create a Configuration.
     */
    data: XOR<ConfigurationCreateInput, ConfigurationUncheckedCreateInput>
  }

  /**
   * Configuration createMany
   */
  export type ConfigurationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Configurations.
     */
    data: ConfigurationCreateManyInput | ConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Configuration createManyAndReturn
   */
  export type ConfigurationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data used to create many Configurations.
     */
    data: ConfigurationCreateManyInput | ConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Configuration update
   */
  export type ConfigurationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data needed to update a Configuration.
     */
    data: XOR<ConfigurationUpdateInput, ConfigurationUncheckedUpdateInput>
    /**
     * Choose, which Configuration to update.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration updateMany
   */
  export type ConfigurationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Configurations.
     */
    data: XOR<ConfigurationUpdateManyMutationInput, ConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which Configurations to update
     */
    where?: ConfigurationWhereInput
    /**
     * Limit how many Configurations to update.
     */
    limit?: number
  }

  /**
   * Configuration updateManyAndReturn
   */
  export type ConfigurationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data used to update Configurations.
     */
    data: XOR<ConfigurationUpdateManyMutationInput, ConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which Configurations to update
     */
    where?: ConfigurationWhereInput
    /**
     * Limit how many Configurations to update.
     */
    limit?: number
  }

  /**
   * Configuration upsert
   */
  export type ConfigurationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The filter to search for the Configuration to update in case it exists.
     */
    where: ConfigurationWhereUniqueInput
    /**
     * In case the Configuration found by the `where` argument doesn't exist, create a new Configuration with this data.
     */
    create: XOR<ConfigurationCreateInput, ConfigurationUncheckedCreateInput>
    /**
     * In case the Configuration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfigurationUpdateInput, ConfigurationUncheckedUpdateInput>
  }

  /**
   * Configuration delete
   */
  export type ConfigurationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter which Configuration to delete.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration deleteMany
   */
  export type ConfigurationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configurations to delete
     */
    where?: ConfigurationWhereInput
    /**
     * Limit how many Configurations to delete.
     */
    limit?: number
  }

  /**
   * Configuration without action
   */
  export type ConfigurationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
  }


  /**
   * Model Media
   */

  export type AggregateMedia = {
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  export type MediaAvgAggregateOutputType = {
    number_id: number | null
    number_position_image: number | null
    number_header_logo_id: number | null
    number_header_favicon_id: number | null
    number_header_reseaux_id: number | null
    number_footer_id: number | null
  }

  export type MediaSumAggregateOutputType = {
    number_id: number | null
    number_position_image: number | null
    number_header_logo_id: number | null
    number_header_favicon_id: number | null
    number_header_reseaux_id: number | null
    number_footer_id: number | null
  }

  export type MediaMinAggregateOutputType = {
    number_id: number | null
    text_titre: string | null
    color_couleur_bg: string | null
    text_image_lien: string | null
    number_position_image: number | null
    image_url: string | null
    number_header_logo_id: number | null
    number_header_favicon_id: number | null
    number_header_reseaux_id: number | null
    number_footer_id: number | null
  }

  export type MediaMaxAggregateOutputType = {
    number_id: number | null
    text_titre: string | null
    color_couleur_bg: string | null
    text_image_lien: string | null
    number_position_image: number | null
    image_url: string | null
    number_header_logo_id: number | null
    number_header_favicon_id: number | null
    number_header_reseaux_id: number | null
    number_footer_id: number | null
  }

  export type MediaCountAggregateOutputType = {
    number_id: number
    text_titre: number
    color_couleur_bg: number
    text_image_lien: number
    number_position_image: number
    image_url: number
    number_header_logo_id: number
    number_header_favicon_id: number
    number_header_reseaux_id: number
    number_footer_id: number
    _all: number
  }


  export type MediaAvgAggregateInputType = {
    number_id?: true
    number_position_image?: true
    number_header_logo_id?: true
    number_header_favicon_id?: true
    number_header_reseaux_id?: true
    number_footer_id?: true
  }

  export type MediaSumAggregateInputType = {
    number_id?: true
    number_position_image?: true
    number_header_logo_id?: true
    number_header_favicon_id?: true
    number_header_reseaux_id?: true
    number_footer_id?: true
  }

  export type MediaMinAggregateInputType = {
    number_id?: true
    text_titre?: true
    color_couleur_bg?: true
    text_image_lien?: true
    number_position_image?: true
    image_url?: true
    number_header_logo_id?: true
    number_header_favicon_id?: true
    number_header_reseaux_id?: true
    number_footer_id?: true
  }

  export type MediaMaxAggregateInputType = {
    number_id?: true
    text_titre?: true
    color_couleur_bg?: true
    text_image_lien?: true
    number_position_image?: true
    image_url?: true
    number_header_logo_id?: true
    number_header_favicon_id?: true
    number_header_reseaux_id?: true
    number_footer_id?: true
  }

  export type MediaCountAggregateInputType = {
    number_id?: true
    text_titre?: true
    color_couleur_bg?: true
    text_image_lien?: true
    number_position_image?: true
    image_url?: true
    number_header_logo_id?: true
    number_header_favicon_id?: true
    number_header_reseaux_id?: true
    number_footer_id?: true
    _all?: true
  }

  export type MediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to aggregate.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Media
    **/
    _count?: true | MediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaMaxAggregateInputType
  }

  export type GetMediaAggregateType<T extends MediaAggregateArgs> = {
        [P in keyof T & keyof AggregateMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedia[P]>
      : GetScalarType<T[P], AggregateMedia[P]>
  }




  export type MediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithAggregationInput | MediaOrderByWithAggregationInput[]
    by: MediaScalarFieldEnum[] | MediaScalarFieldEnum
    having?: MediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaCountAggregateInputType | true
    _avg?: MediaAvgAggregateInputType
    _sum?: MediaSumAggregateInputType
    _min?: MediaMinAggregateInputType
    _max?: MediaMaxAggregateInputType
  }

  export type MediaGroupByOutputType = {
    number_id: number
    text_titre: string | null
    color_couleur_bg: string | null
    text_image_lien: string | null
    number_position_image: number | null
    image_url: string
    number_header_logo_id: number | null
    number_header_favicon_id: number | null
    number_header_reseaux_id: number | null
    number_footer_id: number | null
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  type GetMediaGroupByPayload<T extends MediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaGroupByOutputType[P]>
            : GetScalarType<T[P], MediaGroupByOutputType[P]>
        }
      >
    >


  export type MediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_titre?: boolean
    color_couleur_bg?: boolean
    text_image_lien?: boolean
    number_position_image?: boolean
    image_url?: boolean
    number_header_logo_id?: boolean
    number_header_favicon_id?: boolean
    number_header_reseaux_id?: boolean
    number_footer_id?: boolean
    footer?: boolean | Media$footerArgs<ExtArgs>
    headerFavicon?: boolean | Media$headerFaviconArgs<ExtArgs>
    headerLogo?: boolean | Media$headerLogoArgs<ExtArgs>
    headerReseaux?: boolean | Media$headerReseauxArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type MediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_titre?: boolean
    color_couleur_bg?: boolean
    text_image_lien?: boolean
    number_position_image?: boolean
    image_url?: boolean
    number_header_logo_id?: boolean
    number_header_favicon_id?: boolean
    number_header_reseaux_id?: boolean
    number_footer_id?: boolean
    footer?: boolean | Media$footerArgs<ExtArgs>
    headerFavicon?: boolean | Media$headerFaviconArgs<ExtArgs>
    headerLogo?: boolean | Media$headerLogoArgs<ExtArgs>
    headerReseaux?: boolean | Media$headerReseauxArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type MediaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number_id?: boolean
    text_titre?: boolean
    color_couleur_bg?: boolean
    text_image_lien?: boolean
    number_position_image?: boolean
    image_url?: boolean
    number_header_logo_id?: boolean
    number_header_favicon_id?: boolean
    number_header_reseaux_id?: boolean
    number_footer_id?: boolean
    footer?: boolean | Media$footerArgs<ExtArgs>
    headerFavicon?: boolean | Media$headerFaviconArgs<ExtArgs>
    headerLogo?: boolean | Media$headerLogoArgs<ExtArgs>
    headerReseaux?: boolean | Media$headerReseauxArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type MediaSelectScalar = {
    number_id?: boolean
    text_titre?: boolean
    color_couleur_bg?: boolean
    text_image_lien?: boolean
    number_position_image?: boolean
    image_url?: boolean
    number_header_logo_id?: boolean
    number_header_favicon_id?: boolean
    number_header_reseaux_id?: boolean
    number_footer_id?: boolean
  }

  export type MediaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number_id" | "text_titre" | "color_couleur_bg" | "text_image_lien" | "number_position_image" | "image_url" | "number_header_logo_id" | "number_header_favicon_id" | "number_header_reseaux_id" | "number_footer_id", ExtArgs["result"]["media"]>
  export type MediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    footer?: boolean | Media$footerArgs<ExtArgs>
    headerFavicon?: boolean | Media$headerFaviconArgs<ExtArgs>
    headerLogo?: boolean | Media$headerLogoArgs<ExtArgs>
    headerReseaux?: boolean | Media$headerReseauxArgs<ExtArgs>
  }
  export type MediaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    footer?: boolean | Media$footerArgs<ExtArgs>
    headerFavicon?: boolean | Media$headerFaviconArgs<ExtArgs>
    headerLogo?: boolean | Media$headerLogoArgs<ExtArgs>
    headerReseaux?: boolean | Media$headerReseauxArgs<ExtArgs>
  }
  export type MediaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    footer?: boolean | Media$footerArgs<ExtArgs>
    headerFavicon?: boolean | Media$headerFaviconArgs<ExtArgs>
    headerLogo?: boolean | Media$headerLogoArgs<ExtArgs>
    headerReseaux?: boolean | Media$headerReseauxArgs<ExtArgs>
  }

  export type $MediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Media"
    objects: {
      footer: Prisma.$FooterPayload<ExtArgs> | null
      headerFavicon: Prisma.$HeaderPayload<ExtArgs> | null
      headerLogo: Prisma.$HeaderPayload<ExtArgs> | null
      headerReseaux: Prisma.$HeaderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      number_id: number
      text_titre: string | null
      color_couleur_bg: string | null
      text_image_lien: string | null
      number_position_image: number | null
      image_url: string
      number_header_logo_id: number | null
      number_header_favicon_id: number | null
      number_header_reseaux_id: number | null
      number_footer_id: number | null
    }, ExtArgs["result"]["media"]>
    composites: {}
  }

  type MediaGetPayload<S extends boolean | null | undefined | MediaDefaultArgs> = $Result.GetResult<Prisma.$MediaPayload, S>

  type MediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaCountAggregateInputType | true
    }

  export interface MediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Media'], meta: { name: 'Media' } }
    /**
     * Find zero or one Media that matches the filter.
     * @param {MediaFindUniqueArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaFindUniqueArgs>(args: SelectSubset<T, MediaFindUniqueArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Media that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaFindUniqueOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaFindFirstArgs>(args?: SelectSubset<T, MediaFindFirstArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Media
     * const media = await prisma.media.findMany()
     * 
     * // Get first 10 Media
     * const media = await prisma.media.findMany({ take: 10 })
     * 
     * // Only select the `number_id`
     * const mediaWithNumber_idOnly = await prisma.media.findMany({ select: { number_id: true } })
     * 
     */
    findMany<T extends MediaFindManyArgs>(args?: SelectSubset<T, MediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Media.
     * @param {MediaCreateArgs} args - Arguments to create a Media.
     * @example
     * // Create one Media
     * const Media = await prisma.media.create({
     *   data: {
     *     // ... data to create a Media
     *   }
     * })
     * 
     */
    create<T extends MediaCreateArgs>(args: SelectSubset<T, MediaCreateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Media.
     * @param {MediaCreateManyArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaCreateManyArgs>(args?: SelectSubset<T, MediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Media and returns the data saved in the database.
     * @param {MediaCreateManyAndReturnArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Media and only return the `number_id`
     * const mediaWithNumber_idOnly = await prisma.media.createManyAndReturn({
     *   select: { number_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Media.
     * @param {MediaDeleteArgs} args - Arguments to delete one Media.
     * @example
     * // Delete one Media
     * const Media = await prisma.media.delete({
     *   where: {
     *     // ... filter to delete one Media
     *   }
     * })
     * 
     */
    delete<T extends MediaDeleteArgs>(args: SelectSubset<T, MediaDeleteArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Media.
     * @param {MediaUpdateArgs} args - Arguments to update one Media.
     * @example
     * // Update one Media
     * const media = await prisma.media.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaUpdateArgs>(args: SelectSubset<T, MediaUpdateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Media.
     * @param {MediaDeleteManyArgs} args - Arguments to filter Media to delete.
     * @example
     * // Delete a few Media
     * const { count } = await prisma.media.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaDeleteManyArgs>(args?: SelectSubset<T, MediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaUpdateManyArgs>(args: SelectSubset<T, MediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media and returns the data updated in the database.
     * @param {MediaUpdateManyAndReturnArgs} args - Arguments to update many Media.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Media and only return the `number_id`
     * const mediaWithNumber_idOnly = await prisma.media.updateManyAndReturn({
     *   select: { number_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Media.
     * @param {MediaUpsertArgs} args - Arguments to update or create a Media.
     * @example
     * // Update or create a Media
     * const media = await prisma.media.upsert({
     *   create: {
     *     // ... data to create a Media
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Media we want to update
     *   }
     * })
     */
    upsert<T extends MediaUpsertArgs>(args: SelectSubset<T, MediaUpsertArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaCountArgs} args - Arguments to filter Media to count.
     * @example
     * // Count the number of Media
     * const count = await prisma.media.count({
     *   where: {
     *     // ... the filter for the Media we want to count
     *   }
     * })
    **/
    count<T extends MediaCountArgs>(
      args?: Subset<T, MediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaAggregateArgs>(args: Subset<T, MediaAggregateArgs>): Prisma.PrismaPromise<GetMediaAggregateType<T>>

    /**
     * Group by Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaGroupByArgs['orderBy'] }
        : { orderBy?: MediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Media model
   */
  readonly fields: MediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Media.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    footer<T extends Media$footerArgs<ExtArgs> = {}>(args?: Subset<T, Media$footerArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    headerFavicon<T extends Media$headerFaviconArgs<ExtArgs> = {}>(args?: Subset<T, Media$headerFaviconArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    headerLogo<T extends Media$headerLogoArgs<ExtArgs> = {}>(args?: Subset<T, Media$headerLogoArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    headerReseaux<T extends Media$headerReseauxArgs<ExtArgs> = {}>(args?: Subset<T, Media$headerReseauxArgs<ExtArgs>>): Prisma__HeaderClient<$Result.GetResult<Prisma.$HeaderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Media model
   */
  interface MediaFieldRefs {
    readonly number_id: FieldRef<"Media", 'Int'>
    readonly text_titre: FieldRef<"Media", 'String'>
    readonly color_couleur_bg: FieldRef<"Media", 'String'>
    readonly text_image_lien: FieldRef<"Media", 'String'>
    readonly number_position_image: FieldRef<"Media", 'Int'>
    readonly image_url: FieldRef<"Media", 'String'>
    readonly number_header_logo_id: FieldRef<"Media", 'Int'>
    readonly number_header_favicon_id: FieldRef<"Media", 'Int'>
    readonly number_header_reseaux_id: FieldRef<"Media", 'Int'>
    readonly number_footer_id: FieldRef<"Media", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Media findUnique
   */
  export type MediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findUniqueOrThrow
   */
  export type MediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findFirst
   */
  export type MediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findFirstOrThrow
   */
  export type MediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findMany
   */
  export type MediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media create
   */
  export type MediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to create a Media.
     */
    data: XOR<MediaCreateInput, MediaUncheckedCreateInput>
  }

  /**
   * Media createMany
   */
  export type MediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Media createManyAndReturn
   */
  export type MediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Media update
   */
  export type MediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to update a Media.
     */
    data: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
    /**
     * Choose, which Media to update.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media updateMany
   */
  export type MediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Media.
     */
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyInput>
    /**
     * Filter which Media to update
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to update.
     */
    limit?: number
  }

  /**
   * Media updateManyAndReturn
   */
  export type MediaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * The data used to update Media.
     */
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyInput>
    /**
     * Filter which Media to update
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Media upsert
   */
  export type MediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The filter to search for the Media to update in case it exists.
     */
    where: MediaWhereUniqueInput
    /**
     * In case the Media found by the `where` argument doesn't exist, create a new Media with this data.
     */
    create: XOR<MediaCreateInput, MediaUncheckedCreateInput>
    /**
     * In case the Media was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
  }

  /**
   * Media delete
   */
  export type MediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter which Media to delete.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media deleteMany
   */
  export type MediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to delete
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to delete.
     */
    limit?: number
  }

  /**
   * Media.footer
   */
  export type Media$footerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FooterInclude<ExtArgs> | null
    where?: FooterWhereInput
  }

  /**
   * Media.headerFavicon
   */
  export type Media$headerFaviconArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    where?: HeaderWhereInput
  }

  /**
   * Media.headerLogo
   */
  export type Media$headerLogoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    where?: HeaderWhereInput
  }

  /**
   * Media.headerReseaux
   */
  export type Media$headerReseauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Header
     */
    select?: HeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Header
     */
    omit?: HeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HeaderInclude<ExtArgs> | null
    where?: HeaderWhereInput
  }

  /**
   * Media without action
   */
  export type MediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    number_id: 'number_id',
    text_email: 'text_email',
    text_password: 'text_password',
    text_name: 'text_name',
    text_createdAt: 'text_createdAt',
    text_updatedAt: 'text_updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PageScalarFieldEnum: {
    number_id: 'number_id',
    number_parent_id: 'number_parent_id',
    checkbox_published: 'checkbox_published',
    text_titre: 'text_titre',
    text_slug: 'text_slug',
    number_page_position: 'number_page_position',
    text_langue: 'text_langue',
    blocs: 'blocs',
    text_createdAt: 'text_createdAt',
    text_updatedAt: 'text_updatedAt',
    text_description: 'text_description',
    checkbox_home_page: 'checkbox_home_page'
  };

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const HeaderScalarFieldEnum: {
    number_id: 'number_id',
    text_nom_site: 'text_nom_site',
    text_background_url: 'text_background_url'
  };

  export type HeaderScalarFieldEnum = (typeof HeaderScalarFieldEnum)[keyof typeof HeaderScalarFieldEnum]


  export const FooterScalarFieldEnum: {
    number_id: 'number_id',
    color_background_color: 'color_background_color',
    text_nom_site_adresse: 'text_nom_site_adresse',
    text_adresse_footer: 'text_adresse_footer',
    text_code_postal: 'text_code_postal'
  };

  export type FooterScalarFieldEnum = (typeof FooterScalarFieldEnum)[keyof typeof FooterScalarFieldEnum]


  export const ConfigurationScalarFieldEnum: {
    number_id: 'number_id',
    text_taille: 'text_taille',
    color_main_color: 'color_main_color',
    text_police: 'text_police',
    text_createdAt: 'text_createdAt',
    text_updatedAt: 'text_updatedAt'
  };

  export type ConfigurationScalarFieldEnum = (typeof ConfigurationScalarFieldEnum)[keyof typeof ConfigurationScalarFieldEnum]


  export const MediaScalarFieldEnum: {
    number_id: 'number_id',
    text_titre: 'text_titre',
    color_couleur_bg: 'color_couleur_bg',
    text_image_lien: 'text_image_lien',
    number_position_image: 'number_position_image',
    image_url: 'image_url',
    number_header_logo_id: 'number_header_logo_id',
    number_header_favicon_id: 'number_header_favicon_id',
    number_header_reseaux_id: 'number_header_reseaux_id',
    number_footer_id: 'number_footer_id'
  };

  export type MediaScalarFieldEnum = (typeof MediaScalarFieldEnum)[keyof typeof MediaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    number_id?: IntFilter<"User"> | number
    text_email?: StringFilter<"User"> | string
    text_password?: StringFilter<"User"> | string
    text_name?: StringNullableFilter<"User"> | string | null
    text_createdAt?: DateTimeFilter<"User"> | Date | string
    text_updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    number_id?: SortOrder
    text_email?: SortOrder
    text_password?: SortOrder
    text_name?: SortOrderInput | SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    number_id?: number
    text_email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    text_password?: StringFilter<"User"> | string
    text_name?: StringNullableFilter<"User"> | string | null
    text_createdAt?: DateTimeFilter<"User"> | Date | string
    text_updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "number_id" | "text_email">

  export type UserOrderByWithAggregationInput = {
    number_id?: SortOrder
    text_email?: SortOrder
    text_password?: SortOrder
    text_name?: SortOrderInput | SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    number_id?: IntWithAggregatesFilter<"User"> | number
    text_email?: StringWithAggregatesFilter<"User"> | string
    text_password?: StringWithAggregatesFilter<"User"> | string
    text_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    text_createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    text_updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PageWhereInput = {
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    number_id?: IntFilter<"Page"> | number
    number_parent_id?: IntNullableFilter<"Page"> | number | null
    checkbox_published?: BoolFilter<"Page"> | boolean
    text_titre?: StringFilter<"Page"> | string
    text_slug?: StringFilter<"Page"> | string
    number_page_position?: IntFilter<"Page"> | number
    text_langue?: StringFilter<"Page"> | string
    blocs?: StringFilter<"Page"> | string
    text_createdAt?: DateTimeFilter<"Page"> | Date | string
    text_updatedAt?: DateTimeFilter<"Page"> | Date | string
    text_description?: StringNullableFilter<"Page"> | string | null
    checkbox_home_page?: BoolFilter<"Page"> | boolean
    parent?: XOR<PageNullableScalarRelationFilter, PageWhereInput> | null
    children?: PageListRelationFilter
  }

  export type PageOrderByWithRelationInput = {
    number_id?: SortOrder
    number_parent_id?: SortOrderInput | SortOrder
    checkbox_published?: SortOrder
    text_titre?: SortOrder
    text_slug?: SortOrder
    number_page_position?: SortOrder
    text_langue?: SortOrder
    blocs?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
    text_description?: SortOrderInput | SortOrder
    checkbox_home_page?: SortOrder
    parent?: PageOrderByWithRelationInput
    children?: PageOrderByRelationAggregateInput
  }

  export type PageWhereUniqueInput = Prisma.AtLeast<{
    number_id?: number
    text_slug?: string
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    number_parent_id?: IntNullableFilter<"Page"> | number | null
    checkbox_published?: BoolFilter<"Page"> | boolean
    text_titre?: StringFilter<"Page"> | string
    number_page_position?: IntFilter<"Page"> | number
    text_langue?: StringFilter<"Page"> | string
    blocs?: StringFilter<"Page"> | string
    text_createdAt?: DateTimeFilter<"Page"> | Date | string
    text_updatedAt?: DateTimeFilter<"Page"> | Date | string
    text_description?: StringNullableFilter<"Page"> | string | null
    checkbox_home_page?: BoolFilter<"Page"> | boolean
    parent?: XOR<PageNullableScalarRelationFilter, PageWhereInput> | null
    children?: PageListRelationFilter
  }, "number_id" | "text_slug">

  export type PageOrderByWithAggregationInput = {
    number_id?: SortOrder
    number_parent_id?: SortOrderInput | SortOrder
    checkbox_published?: SortOrder
    text_titre?: SortOrder
    text_slug?: SortOrder
    number_page_position?: SortOrder
    text_langue?: SortOrder
    blocs?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
    text_description?: SortOrderInput | SortOrder
    checkbox_home_page?: SortOrder
    _count?: PageCountOrderByAggregateInput
    _avg?: PageAvgOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
    _sum?: PageSumOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    OR?: PageScalarWhereWithAggregatesInput[]
    NOT?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    number_id?: IntWithAggregatesFilter<"Page"> | number
    number_parent_id?: IntNullableWithAggregatesFilter<"Page"> | number | null
    checkbox_published?: BoolWithAggregatesFilter<"Page"> | boolean
    text_titre?: StringWithAggregatesFilter<"Page"> | string
    text_slug?: StringWithAggregatesFilter<"Page"> | string
    number_page_position?: IntWithAggregatesFilter<"Page"> | number
    text_langue?: StringWithAggregatesFilter<"Page"> | string
    blocs?: StringWithAggregatesFilter<"Page"> | string
    text_createdAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
    text_updatedAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
    text_description?: StringNullableWithAggregatesFilter<"Page"> | string | null
    checkbox_home_page?: BoolWithAggregatesFilter<"Page"> | boolean
  }

  export type HeaderWhereInput = {
    AND?: HeaderWhereInput | HeaderWhereInput[]
    OR?: HeaderWhereInput[]
    NOT?: HeaderWhereInput | HeaderWhereInput[]
    number_id?: IntFilter<"Header"> | number
    text_nom_site?: StringNullableFilter<"Header"> | string | null
    text_background_url?: StringNullableFilter<"Header"> | string | null
    favicon?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    logo?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    reseaux?: MediaListRelationFilter
  }

  export type HeaderOrderByWithRelationInput = {
    number_id?: SortOrder
    text_nom_site?: SortOrderInput | SortOrder
    text_background_url?: SortOrderInput | SortOrder
    favicon?: MediaOrderByWithRelationInput
    logo?: MediaOrderByWithRelationInput
    reseaux?: MediaOrderByRelationAggregateInput
  }

  export type HeaderWhereUniqueInput = Prisma.AtLeast<{
    number_id?: number
    AND?: HeaderWhereInput | HeaderWhereInput[]
    OR?: HeaderWhereInput[]
    NOT?: HeaderWhereInput | HeaderWhereInput[]
    text_nom_site?: StringNullableFilter<"Header"> | string | null
    text_background_url?: StringNullableFilter<"Header"> | string | null
    favicon?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    logo?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    reseaux?: MediaListRelationFilter
  }, "number_id">

  export type HeaderOrderByWithAggregationInput = {
    number_id?: SortOrder
    text_nom_site?: SortOrderInput | SortOrder
    text_background_url?: SortOrderInput | SortOrder
    _count?: HeaderCountOrderByAggregateInput
    _avg?: HeaderAvgOrderByAggregateInput
    _max?: HeaderMaxOrderByAggregateInput
    _min?: HeaderMinOrderByAggregateInput
    _sum?: HeaderSumOrderByAggregateInput
  }

  export type HeaderScalarWhereWithAggregatesInput = {
    AND?: HeaderScalarWhereWithAggregatesInput | HeaderScalarWhereWithAggregatesInput[]
    OR?: HeaderScalarWhereWithAggregatesInput[]
    NOT?: HeaderScalarWhereWithAggregatesInput | HeaderScalarWhereWithAggregatesInput[]
    number_id?: IntWithAggregatesFilter<"Header"> | number
    text_nom_site?: StringNullableWithAggregatesFilter<"Header"> | string | null
    text_background_url?: StringNullableWithAggregatesFilter<"Header"> | string | null
  }

  export type FooterWhereInput = {
    AND?: FooterWhereInput | FooterWhereInput[]
    OR?: FooterWhereInput[]
    NOT?: FooterWhereInput | FooterWhereInput[]
    number_id?: IntFilter<"Footer"> | number
    color_background_color?: StringNullableFilter<"Footer"> | string | null
    text_nom_site_adresse?: StringNullableFilter<"Footer"> | string | null
    text_adresse_footer?: StringNullableFilter<"Footer"> | string | null
    text_code_postal?: StringNullableFilter<"Footer"> | string | null
    reseaux?: MediaListRelationFilter
  }

  export type FooterOrderByWithRelationInput = {
    number_id?: SortOrder
    color_background_color?: SortOrderInput | SortOrder
    text_nom_site_adresse?: SortOrderInput | SortOrder
    text_adresse_footer?: SortOrderInput | SortOrder
    text_code_postal?: SortOrderInput | SortOrder
    reseaux?: MediaOrderByRelationAggregateInput
  }

  export type FooterWhereUniqueInput = Prisma.AtLeast<{
    number_id?: number
    AND?: FooterWhereInput | FooterWhereInput[]
    OR?: FooterWhereInput[]
    NOT?: FooterWhereInput | FooterWhereInput[]
    color_background_color?: StringNullableFilter<"Footer"> | string | null
    text_nom_site_adresse?: StringNullableFilter<"Footer"> | string | null
    text_adresse_footer?: StringNullableFilter<"Footer"> | string | null
    text_code_postal?: StringNullableFilter<"Footer"> | string | null
    reseaux?: MediaListRelationFilter
  }, "number_id">

  export type FooterOrderByWithAggregationInput = {
    number_id?: SortOrder
    color_background_color?: SortOrderInput | SortOrder
    text_nom_site_adresse?: SortOrderInput | SortOrder
    text_adresse_footer?: SortOrderInput | SortOrder
    text_code_postal?: SortOrderInput | SortOrder
    _count?: FooterCountOrderByAggregateInput
    _avg?: FooterAvgOrderByAggregateInput
    _max?: FooterMaxOrderByAggregateInput
    _min?: FooterMinOrderByAggregateInput
    _sum?: FooterSumOrderByAggregateInput
  }

  export type FooterScalarWhereWithAggregatesInput = {
    AND?: FooterScalarWhereWithAggregatesInput | FooterScalarWhereWithAggregatesInput[]
    OR?: FooterScalarWhereWithAggregatesInput[]
    NOT?: FooterScalarWhereWithAggregatesInput | FooterScalarWhereWithAggregatesInput[]
    number_id?: IntWithAggregatesFilter<"Footer"> | number
    color_background_color?: StringNullableWithAggregatesFilter<"Footer"> | string | null
    text_nom_site_adresse?: StringNullableWithAggregatesFilter<"Footer"> | string | null
    text_adresse_footer?: StringNullableWithAggregatesFilter<"Footer"> | string | null
    text_code_postal?: StringNullableWithAggregatesFilter<"Footer"> | string | null
  }

  export type ConfigurationWhereInput = {
    AND?: ConfigurationWhereInput | ConfigurationWhereInput[]
    OR?: ConfigurationWhereInput[]
    NOT?: ConfigurationWhereInput | ConfigurationWhereInput[]
    number_id?: IntFilter<"Configuration"> | number
    text_taille?: StringFilter<"Configuration"> | string
    color_main_color?: StringFilter<"Configuration"> | string
    text_police?: StringFilter<"Configuration"> | string
    text_createdAt?: DateTimeFilter<"Configuration"> | Date | string
    text_updatedAt?: DateTimeFilter<"Configuration"> | Date | string
  }

  export type ConfigurationOrderByWithRelationInput = {
    number_id?: SortOrder
    text_taille?: SortOrder
    color_main_color?: SortOrder
    text_police?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
  }

  export type ConfigurationWhereUniqueInput = Prisma.AtLeast<{
    number_id?: number
    AND?: ConfigurationWhereInput | ConfigurationWhereInput[]
    OR?: ConfigurationWhereInput[]
    NOT?: ConfigurationWhereInput | ConfigurationWhereInput[]
    text_taille?: StringFilter<"Configuration"> | string
    color_main_color?: StringFilter<"Configuration"> | string
    text_police?: StringFilter<"Configuration"> | string
    text_createdAt?: DateTimeFilter<"Configuration"> | Date | string
    text_updatedAt?: DateTimeFilter<"Configuration"> | Date | string
  }, "number_id">

  export type ConfigurationOrderByWithAggregationInput = {
    number_id?: SortOrder
    text_taille?: SortOrder
    color_main_color?: SortOrder
    text_police?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
    _count?: ConfigurationCountOrderByAggregateInput
    _avg?: ConfigurationAvgOrderByAggregateInput
    _max?: ConfigurationMaxOrderByAggregateInput
    _min?: ConfigurationMinOrderByAggregateInput
    _sum?: ConfigurationSumOrderByAggregateInput
  }

  export type ConfigurationScalarWhereWithAggregatesInput = {
    AND?: ConfigurationScalarWhereWithAggregatesInput | ConfigurationScalarWhereWithAggregatesInput[]
    OR?: ConfigurationScalarWhereWithAggregatesInput[]
    NOT?: ConfigurationScalarWhereWithAggregatesInput | ConfigurationScalarWhereWithAggregatesInput[]
    number_id?: IntWithAggregatesFilter<"Configuration"> | number
    text_taille?: StringWithAggregatesFilter<"Configuration"> | string
    color_main_color?: StringWithAggregatesFilter<"Configuration"> | string
    text_police?: StringWithAggregatesFilter<"Configuration"> | string
    text_createdAt?: DateTimeWithAggregatesFilter<"Configuration"> | Date | string
    text_updatedAt?: DateTimeWithAggregatesFilter<"Configuration"> | Date | string
  }

  export type MediaWhereInput = {
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    number_id?: IntFilter<"Media"> | number
    text_titre?: StringNullableFilter<"Media"> | string | null
    color_couleur_bg?: StringNullableFilter<"Media"> | string | null
    text_image_lien?: StringNullableFilter<"Media"> | string | null
    number_position_image?: IntNullableFilter<"Media"> | number | null
    image_url?: StringFilter<"Media"> | string
    number_header_logo_id?: IntNullableFilter<"Media"> | number | null
    number_header_favicon_id?: IntNullableFilter<"Media"> | number | null
    number_header_reseaux_id?: IntNullableFilter<"Media"> | number | null
    number_footer_id?: IntNullableFilter<"Media"> | number | null
    footer?: XOR<FooterNullableScalarRelationFilter, FooterWhereInput> | null
    headerFavicon?: XOR<HeaderNullableScalarRelationFilter, HeaderWhereInput> | null
    headerLogo?: XOR<HeaderNullableScalarRelationFilter, HeaderWhereInput> | null
    headerReseaux?: XOR<HeaderNullableScalarRelationFilter, HeaderWhereInput> | null
  }

  export type MediaOrderByWithRelationInput = {
    number_id?: SortOrder
    text_titre?: SortOrderInput | SortOrder
    color_couleur_bg?: SortOrderInput | SortOrder
    text_image_lien?: SortOrderInput | SortOrder
    number_position_image?: SortOrderInput | SortOrder
    image_url?: SortOrder
    number_header_logo_id?: SortOrderInput | SortOrder
    number_header_favicon_id?: SortOrderInput | SortOrder
    number_header_reseaux_id?: SortOrderInput | SortOrder
    number_footer_id?: SortOrderInput | SortOrder
    footer?: FooterOrderByWithRelationInput
    headerFavicon?: HeaderOrderByWithRelationInput
    headerLogo?: HeaderOrderByWithRelationInput
    headerReseaux?: HeaderOrderByWithRelationInput
  }

  export type MediaWhereUniqueInput = Prisma.AtLeast<{
    number_id?: number
    number_header_logo_id?: number
    number_header_favicon_id?: number
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    text_titre?: StringNullableFilter<"Media"> | string | null
    color_couleur_bg?: StringNullableFilter<"Media"> | string | null
    text_image_lien?: StringNullableFilter<"Media"> | string | null
    number_position_image?: IntNullableFilter<"Media"> | number | null
    image_url?: StringFilter<"Media"> | string
    number_header_reseaux_id?: IntNullableFilter<"Media"> | number | null
    number_footer_id?: IntNullableFilter<"Media"> | number | null
    footer?: XOR<FooterNullableScalarRelationFilter, FooterWhereInput> | null
    headerFavicon?: XOR<HeaderNullableScalarRelationFilter, HeaderWhereInput> | null
    headerLogo?: XOR<HeaderNullableScalarRelationFilter, HeaderWhereInput> | null
    headerReseaux?: XOR<HeaderNullableScalarRelationFilter, HeaderWhereInput> | null
  }, "number_id" | "number_header_logo_id" | "number_header_favicon_id">

  export type MediaOrderByWithAggregationInput = {
    number_id?: SortOrder
    text_titre?: SortOrderInput | SortOrder
    color_couleur_bg?: SortOrderInput | SortOrder
    text_image_lien?: SortOrderInput | SortOrder
    number_position_image?: SortOrderInput | SortOrder
    image_url?: SortOrder
    number_header_logo_id?: SortOrderInput | SortOrder
    number_header_favicon_id?: SortOrderInput | SortOrder
    number_header_reseaux_id?: SortOrderInput | SortOrder
    number_footer_id?: SortOrderInput | SortOrder
    _count?: MediaCountOrderByAggregateInput
    _avg?: MediaAvgOrderByAggregateInput
    _max?: MediaMaxOrderByAggregateInput
    _min?: MediaMinOrderByAggregateInput
    _sum?: MediaSumOrderByAggregateInput
  }

  export type MediaScalarWhereWithAggregatesInput = {
    AND?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    OR?: MediaScalarWhereWithAggregatesInput[]
    NOT?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    number_id?: IntWithAggregatesFilter<"Media"> | number
    text_titre?: StringNullableWithAggregatesFilter<"Media"> | string | null
    color_couleur_bg?: StringNullableWithAggregatesFilter<"Media"> | string | null
    text_image_lien?: StringNullableWithAggregatesFilter<"Media"> | string | null
    number_position_image?: IntNullableWithAggregatesFilter<"Media"> | number | null
    image_url?: StringWithAggregatesFilter<"Media"> | string
    number_header_logo_id?: IntNullableWithAggregatesFilter<"Media"> | number | null
    number_header_favicon_id?: IntNullableWithAggregatesFilter<"Media"> | number | null
    number_header_reseaux_id?: IntNullableWithAggregatesFilter<"Media"> | number | null
    number_footer_id?: IntNullableWithAggregatesFilter<"Media"> | number | null
  }

  export type UserCreateInput = {
    text_email: string
    text_password: string
    text_name?: string | null
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    number_id?: number
    text_email: string
    text_password: string
    text_name?: string | null
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    text_email?: StringFieldUpdateOperationsInput | string
    text_password?: StringFieldUpdateOperationsInput | string
    text_name?: NullableStringFieldUpdateOperationsInput | string | null
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_email?: StringFieldUpdateOperationsInput | string
    text_password?: StringFieldUpdateOperationsInput | string
    text_name?: NullableStringFieldUpdateOperationsInput | string | null
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    number_id?: number
    text_email: string
    text_password: string
    text_name?: string | null
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    text_email?: StringFieldUpdateOperationsInput | string
    text_password?: StringFieldUpdateOperationsInput | string
    text_name?: NullableStringFieldUpdateOperationsInput | string | null
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_email?: StringFieldUpdateOperationsInput | string
    text_password?: StringFieldUpdateOperationsInput | string
    text_name?: NullableStringFieldUpdateOperationsInput | string | null
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateInput = {
    checkbox_published?: boolean
    text_titre: string
    text_slug: string
    number_page_position: number
    text_langue: string
    blocs: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
    text_description?: string | null
    checkbox_home_page?: boolean
    parent?: PageCreateNestedOneWithoutChildrenInput
    children?: PageCreateNestedManyWithoutParentInput
  }

  export type PageUncheckedCreateInput = {
    number_id?: number
    number_parent_id?: number | null
    checkbox_published?: boolean
    text_titre: string
    text_slug: string
    number_page_position: number
    text_langue: string
    blocs: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
    text_description?: string | null
    checkbox_home_page?: boolean
    children?: PageUncheckedCreateNestedManyWithoutParentInput
  }

  export type PageUpdateInput = {
    checkbox_published?: BoolFieldUpdateOperationsInput | boolean
    text_titre?: StringFieldUpdateOperationsInput | string
    text_slug?: StringFieldUpdateOperationsInput | string
    number_page_position?: IntFieldUpdateOperationsInput | number
    text_langue?: StringFieldUpdateOperationsInput | string
    blocs?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_description?: NullableStringFieldUpdateOperationsInput | string | null
    checkbox_home_page?: BoolFieldUpdateOperationsInput | boolean
    parent?: PageUpdateOneWithoutChildrenNestedInput
    children?: PageUpdateManyWithoutParentNestedInput
  }

  export type PageUncheckedUpdateInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    number_parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    checkbox_published?: BoolFieldUpdateOperationsInput | boolean
    text_titre?: StringFieldUpdateOperationsInput | string
    text_slug?: StringFieldUpdateOperationsInput | string
    number_page_position?: IntFieldUpdateOperationsInput | number
    text_langue?: StringFieldUpdateOperationsInput | string
    blocs?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_description?: NullableStringFieldUpdateOperationsInput | string | null
    checkbox_home_page?: BoolFieldUpdateOperationsInput | boolean
    children?: PageUncheckedUpdateManyWithoutParentNestedInput
  }

  export type PageCreateManyInput = {
    number_id?: number
    number_parent_id?: number | null
    checkbox_published?: boolean
    text_titre: string
    text_slug: string
    number_page_position: number
    text_langue: string
    blocs: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
    text_description?: string | null
    checkbox_home_page?: boolean
  }

  export type PageUpdateManyMutationInput = {
    checkbox_published?: BoolFieldUpdateOperationsInput | boolean
    text_titre?: StringFieldUpdateOperationsInput | string
    text_slug?: StringFieldUpdateOperationsInput | string
    number_page_position?: IntFieldUpdateOperationsInput | number
    text_langue?: StringFieldUpdateOperationsInput | string
    blocs?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_description?: NullableStringFieldUpdateOperationsInput | string | null
    checkbox_home_page?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PageUncheckedUpdateManyInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    number_parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    checkbox_published?: BoolFieldUpdateOperationsInput | boolean
    text_titre?: StringFieldUpdateOperationsInput | string
    text_slug?: StringFieldUpdateOperationsInput | string
    number_page_position?: IntFieldUpdateOperationsInput | number
    text_langue?: StringFieldUpdateOperationsInput | string
    blocs?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_description?: NullableStringFieldUpdateOperationsInput | string | null
    checkbox_home_page?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HeaderCreateInput = {
    text_nom_site?: string | null
    text_background_url?: string | null
    favicon?: MediaCreateNestedOneWithoutHeaderFaviconInput
    logo?: MediaCreateNestedOneWithoutHeaderLogoInput
    reseaux?: MediaCreateNestedManyWithoutHeaderReseauxInput
  }

  export type HeaderUncheckedCreateInput = {
    number_id?: number
    text_nom_site?: string | null
    text_background_url?: string | null
    favicon?: MediaUncheckedCreateNestedOneWithoutHeaderFaviconInput
    logo?: MediaUncheckedCreateNestedOneWithoutHeaderLogoInput
    reseaux?: MediaUncheckedCreateNestedManyWithoutHeaderReseauxInput
  }

  export type HeaderUpdateInput = {
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: MediaUpdateOneWithoutHeaderFaviconNestedInput
    logo?: MediaUpdateOneWithoutHeaderLogoNestedInput
    reseaux?: MediaUpdateManyWithoutHeaderReseauxNestedInput
  }

  export type HeaderUncheckedUpdateInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: MediaUncheckedUpdateOneWithoutHeaderFaviconNestedInput
    logo?: MediaUncheckedUpdateOneWithoutHeaderLogoNestedInput
    reseaux?: MediaUncheckedUpdateManyWithoutHeaderReseauxNestedInput
  }

  export type HeaderCreateManyInput = {
    number_id?: number
    text_nom_site?: string | null
    text_background_url?: string | null
  }

  export type HeaderUpdateManyMutationInput = {
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HeaderUncheckedUpdateManyInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FooterCreateInput = {
    color_background_color?: string | null
    text_nom_site_adresse?: string | null
    text_adresse_footer?: string | null
    text_code_postal?: string | null
    reseaux?: MediaCreateNestedManyWithoutFooterInput
  }

  export type FooterUncheckedCreateInput = {
    number_id?: number
    color_background_color?: string | null
    text_nom_site_adresse?: string | null
    text_adresse_footer?: string | null
    text_code_postal?: string | null
    reseaux?: MediaUncheckedCreateNestedManyWithoutFooterInput
  }

  export type FooterUpdateInput = {
    color_background_color?: NullableStringFieldUpdateOperationsInput | string | null
    text_nom_site_adresse?: NullableStringFieldUpdateOperationsInput | string | null
    text_adresse_footer?: NullableStringFieldUpdateOperationsInput | string | null
    text_code_postal?: NullableStringFieldUpdateOperationsInput | string | null
    reseaux?: MediaUpdateManyWithoutFooterNestedInput
  }

  export type FooterUncheckedUpdateInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    color_background_color?: NullableStringFieldUpdateOperationsInput | string | null
    text_nom_site_adresse?: NullableStringFieldUpdateOperationsInput | string | null
    text_adresse_footer?: NullableStringFieldUpdateOperationsInput | string | null
    text_code_postal?: NullableStringFieldUpdateOperationsInput | string | null
    reseaux?: MediaUncheckedUpdateManyWithoutFooterNestedInput
  }

  export type FooterCreateManyInput = {
    number_id?: number
    color_background_color?: string | null
    text_nom_site_adresse?: string | null
    text_adresse_footer?: string | null
    text_code_postal?: string | null
  }

  export type FooterUpdateManyMutationInput = {
    color_background_color?: NullableStringFieldUpdateOperationsInput | string | null
    text_nom_site_adresse?: NullableStringFieldUpdateOperationsInput | string | null
    text_adresse_footer?: NullableStringFieldUpdateOperationsInput | string | null
    text_code_postal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FooterUncheckedUpdateManyInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    color_background_color?: NullableStringFieldUpdateOperationsInput | string | null
    text_nom_site_adresse?: NullableStringFieldUpdateOperationsInput | string | null
    text_adresse_footer?: NullableStringFieldUpdateOperationsInput | string | null
    text_code_postal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConfigurationCreateInput = {
    text_taille: string
    color_main_color: string
    text_police: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
  }

  export type ConfigurationUncheckedCreateInput = {
    number_id?: number
    text_taille: string
    color_main_color: string
    text_police: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
  }

  export type ConfigurationUpdateInput = {
    text_taille?: StringFieldUpdateOperationsInput | string
    color_main_color?: StringFieldUpdateOperationsInput | string
    text_police?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationUncheckedUpdateInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_taille?: StringFieldUpdateOperationsInput | string
    color_main_color?: StringFieldUpdateOperationsInput | string
    text_police?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationCreateManyInput = {
    number_id?: number
    text_taille: string
    color_main_color: string
    text_police: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
  }

  export type ConfigurationUpdateManyMutationInput = {
    text_taille?: StringFieldUpdateOperationsInput | string
    color_main_color?: StringFieldUpdateOperationsInput | string
    text_police?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationUncheckedUpdateManyInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_taille?: StringFieldUpdateOperationsInput | string
    color_main_color?: StringFieldUpdateOperationsInput | string
    text_police?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaCreateInput = {
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    footer?: FooterCreateNestedOneWithoutReseauxInput
    headerFavicon?: HeaderCreateNestedOneWithoutFaviconInput
    headerLogo?: HeaderCreateNestedOneWithoutLogoInput
    headerReseaux?: HeaderCreateNestedOneWithoutReseauxInput
  }

  export type MediaUncheckedCreateInput = {
    number_id?: number
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    number_header_logo_id?: number | null
    number_header_favicon_id?: number | null
    number_header_reseaux_id?: number | null
    number_footer_id?: number | null
  }

  export type MediaUpdateInput = {
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    footer?: FooterUpdateOneWithoutReseauxNestedInput
    headerFavicon?: HeaderUpdateOneWithoutFaviconNestedInput
    headerLogo?: HeaderUpdateOneWithoutLogoNestedInput
    headerReseaux?: HeaderUpdateOneWithoutReseauxNestedInput
  }

  export type MediaUncheckedUpdateInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    number_header_logo_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_favicon_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_reseaux_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_footer_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MediaCreateManyInput = {
    number_id?: number
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    number_header_logo_id?: number | null
    number_header_favicon_id?: number | null
    number_header_reseaux_id?: number | null
    number_footer_id?: number | null
  }

  export type MediaUpdateManyMutationInput = {
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
  }

  export type MediaUncheckedUpdateManyInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    number_header_logo_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_favicon_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_reseaux_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_footer_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    number_id?: SortOrder
    text_email?: SortOrder
    text_password?: SortOrder
    text_name?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    number_id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    number_id?: SortOrder
    text_email?: SortOrder
    text_password?: SortOrder
    text_name?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    number_id?: SortOrder
    text_email?: SortOrder
    text_password?: SortOrder
    text_name?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    number_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PageNullableScalarRelationFilter = {
    is?: PageWhereInput | null
    isNot?: PageWhereInput | null
  }

  export type PageListRelationFilter = {
    every?: PageWhereInput
    some?: PageWhereInput
    none?: PageWhereInput
  }

  export type PageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageCountOrderByAggregateInput = {
    number_id?: SortOrder
    number_parent_id?: SortOrder
    checkbox_published?: SortOrder
    text_titre?: SortOrder
    text_slug?: SortOrder
    number_page_position?: SortOrder
    text_langue?: SortOrder
    blocs?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
    text_description?: SortOrder
    checkbox_home_page?: SortOrder
  }

  export type PageAvgOrderByAggregateInput = {
    number_id?: SortOrder
    number_parent_id?: SortOrder
    number_page_position?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    number_id?: SortOrder
    number_parent_id?: SortOrder
    checkbox_published?: SortOrder
    text_titre?: SortOrder
    text_slug?: SortOrder
    number_page_position?: SortOrder
    text_langue?: SortOrder
    blocs?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
    text_description?: SortOrder
    checkbox_home_page?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    number_id?: SortOrder
    number_parent_id?: SortOrder
    checkbox_published?: SortOrder
    text_titre?: SortOrder
    text_slug?: SortOrder
    number_page_position?: SortOrder
    text_langue?: SortOrder
    blocs?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
    text_description?: SortOrder
    checkbox_home_page?: SortOrder
  }

  export type PageSumOrderByAggregateInput = {
    number_id?: SortOrder
    number_parent_id?: SortOrder
    number_page_position?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MediaNullableScalarRelationFilter = {
    is?: MediaWhereInput | null
    isNot?: MediaWhereInput | null
  }

  export type MediaListRelationFilter = {
    every?: MediaWhereInput
    some?: MediaWhereInput
    none?: MediaWhereInput
  }

  export type MediaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HeaderCountOrderByAggregateInput = {
    number_id?: SortOrder
    text_nom_site?: SortOrder
    text_background_url?: SortOrder
  }

  export type HeaderAvgOrderByAggregateInput = {
    number_id?: SortOrder
  }

  export type HeaderMaxOrderByAggregateInput = {
    number_id?: SortOrder
    text_nom_site?: SortOrder
    text_background_url?: SortOrder
  }

  export type HeaderMinOrderByAggregateInput = {
    number_id?: SortOrder
    text_nom_site?: SortOrder
    text_background_url?: SortOrder
  }

  export type HeaderSumOrderByAggregateInput = {
    number_id?: SortOrder
  }

  export type FooterCountOrderByAggregateInput = {
    number_id?: SortOrder
    color_background_color?: SortOrder
    text_nom_site_adresse?: SortOrder
    text_adresse_footer?: SortOrder
    text_code_postal?: SortOrder
  }

  export type FooterAvgOrderByAggregateInput = {
    number_id?: SortOrder
  }

  export type FooterMaxOrderByAggregateInput = {
    number_id?: SortOrder
    color_background_color?: SortOrder
    text_nom_site_adresse?: SortOrder
    text_adresse_footer?: SortOrder
    text_code_postal?: SortOrder
  }

  export type FooterMinOrderByAggregateInput = {
    number_id?: SortOrder
    color_background_color?: SortOrder
    text_nom_site_adresse?: SortOrder
    text_adresse_footer?: SortOrder
    text_code_postal?: SortOrder
  }

  export type FooterSumOrderByAggregateInput = {
    number_id?: SortOrder
  }

  export type ConfigurationCountOrderByAggregateInput = {
    number_id?: SortOrder
    text_taille?: SortOrder
    color_main_color?: SortOrder
    text_police?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
  }

  export type ConfigurationAvgOrderByAggregateInput = {
    number_id?: SortOrder
  }

  export type ConfigurationMaxOrderByAggregateInput = {
    number_id?: SortOrder
    text_taille?: SortOrder
    color_main_color?: SortOrder
    text_police?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
  }

  export type ConfigurationMinOrderByAggregateInput = {
    number_id?: SortOrder
    text_taille?: SortOrder
    color_main_color?: SortOrder
    text_police?: SortOrder
    text_createdAt?: SortOrder
    text_updatedAt?: SortOrder
  }

  export type ConfigurationSumOrderByAggregateInput = {
    number_id?: SortOrder
  }

  export type FooterNullableScalarRelationFilter = {
    is?: FooterWhereInput | null
    isNot?: FooterWhereInput | null
  }

  export type HeaderNullableScalarRelationFilter = {
    is?: HeaderWhereInput | null
    isNot?: HeaderWhereInput | null
  }

  export type MediaCountOrderByAggregateInput = {
    number_id?: SortOrder
    text_titre?: SortOrder
    color_couleur_bg?: SortOrder
    text_image_lien?: SortOrder
    number_position_image?: SortOrder
    image_url?: SortOrder
    number_header_logo_id?: SortOrder
    number_header_favicon_id?: SortOrder
    number_header_reseaux_id?: SortOrder
    number_footer_id?: SortOrder
  }

  export type MediaAvgOrderByAggregateInput = {
    number_id?: SortOrder
    number_position_image?: SortOrder
    number_header_logo_id?: SortOrder
    number_header_favicon_id?: SortOrder
    number_header_reseaux_id?: SortOrder
    number_footer_id?: SortOrder
  }

  export type MediaMaxOrderByAggregateInput = {
    number_id?: SortOrder
    text_titre?: SortOrder
    color_couleur_bg?: SortOrder
    text_image_lien?: SortOrder
    number_position_image?: SortOrder
    image_url?: SortOrder
    number_header_logo_id?: SortOrder
    number_header_favicon_id?: SortOrder
    number_header_reseaux_id?: SortOrder
    number_footer_id?: SortOrder
  }

  export type MediaMinOrderByAggregateInput = {
    number_id?: SortOrder
    text_titre?: SortOrder
    color_couleur_bg?: SortOrder
    text_image_lien?: SortOrder
    number_position_image?: SortOrder
    image_url?: SortOrder
    number_header_logo_id?: SortOrder
    number_header_favicon_id?: SortOrder
    number_header_reseaux_id?: SortOrder
    number_footer_id?: SortOrder
  }

  export type MediaSumOrderByAggregateInput = {
    number_id?: SortOrder
    number_position_image?: SortOrder
    number_header_logo_id?: SortOrder
    number_header_favicon_id?: SortOrder
    number_header_reseaux_id?: SortOrder
    number_footer_id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PageCreateNestedOneWithoutChildrenInput = {
    create?: XOR<PageCreateWithoutChildrenInput, PageUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: PageCreateOrConnectWithoutChildrenInput
    connect?: PageWhereUniqueInput
  }

  export type PageCreateNestedManyWithoutParentInput = {
    create?: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput> | PageCreateWithoutParentInput[] | PageUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutParentInput | PageCreateOrConnectWithoutParentInput[]
    createMany?: PageCreateManyParentInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type PageUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput> | PageCreateWithoutParentInput[] | PageUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutParentInput | PageCreateOrConnectWithoutParentInput[]
    createMany?: PageCreateManyParentInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PageUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<PageCreateWithoutChildrenInput, PageUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: PageCreateOrConnectWithoutChildrenInput
    upsert?: PageUpsertWithoutChildrenInput
    disconnect?: PageWhereInput | boolean
    delete?: PageWhereInput | boolean
    connect?: PageWhereUniqueInput
    update?: XOR<XOR<PageUpdateToOneWithWhereWithoutChildrenInput, PageUpdateWithoutChildrenInput>, PageUncheckedUpdateWithoutChildrenInput>
  }

  export type PageUpdateManyWithoutParentNestedInput = {
    create?: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput> | PageCreateWithoutParentInput[] | PageUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutParentInput | PageCreateOrConnectWithoutParentInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutParentInput | PageUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PageCreateManyParentInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutParentInput | PageUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PageUpdateManyWithWhereWithoutParentInput | PageUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PageUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput> | PageCreateWithoutParentInput[] | PageUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutParentInput | PageCreateOrConnectWithoutParentInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutParentInput | PageUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PageCreateManyParentInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutParentInput | PageUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PageUpdateManyWithWhereWithoutParentInput | PageUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type MediaCreateNestedOneWithoutHeaderFaviconInput = {
    create?: XOR<MediaCreateWithoutHeaderFaviconInput, MediaUncheckedCreateWithoutHeaderFaviconInput>
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderFaviconInput
    connect?: MediaWhereUniqueInput
  }

  export type MediaCreateNestedOneWithoutHeaderLogoInput = {
    create?: XOR<MediaCreateWithoutHeaderLogoInput, MediaUncheckedCreateWithoutHeaderLogoInput>
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderLogoInput
    connect?: MediaWhereUniqueInput
  }

  export type MediaCreateNestedManyWithoutHeaderReseauxInput = {
    create?: XOR<MediaCreateWithoutHeaderReseauxInput, MediaUncheckedCreateWithoutHeaderReseauxInput> | MediaCreateWithoutHeaderReseauxInput[] | MediaUncheckedCreateWithoutHeaderReseauxInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderReseauxInput | MediaCreateOrConnectWithoutHeaderReseauxInput[]
    createMany?: MediaCreateManyHeaderReseauxInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type MediaUncheckedCreateNestedOneWithoutHeaderFaviconInput = {
    create?: XOR<MediaCreateWithoutHeaderFaviconInput, MediaUncheckedCreateWithoutHeaderFaviconInput>
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderFaviconInput
    connect?: MediaWhereUniqueInput
  }

  export type MediaUncheckedCreateNestedOneWithoutHeaderLogoInput = {
    create?: XOR<MediaCreateWithoutHeaderLogoInput, MediaUncheckedCreateWithoutHeaderLogoInput>
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderLogoInput
    connect?: MediaWhereUniqueInput
  }

  export type MediaUncheckedCreateNestedManyWithoutHeaderReseauxInput = {
    create?: XOR<MediaCreateWithoutHeaderReseauxInput, MediaUncheckedCreateWithoutHeaderReseauxInput> | MediaCreateWithoutHeaderReseauxInput[] | MediaUncheckedCreateWithoutHeaderReseauxInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderReseauxInput | MediaCreateOrConnectWithoutHeaderReseauxInput[]
    createMany?: MediaCreateManyHeaderReseauxInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type MediaUpdateOneWithoutHeaderFaviconNestedInput = {
    create?: XOR<MediaCreateWithoutHeaderFaviconInput, MediaUncheckedCreateWithoutHeaderFaviconInput>
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderFaviconInput
    upsert?: MediaUpsertWithoutHeaderFaviconInput
    disconnect?: MediaWhereInput | boolean
    delete?: MediaWhereInput | boolean
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutHeaderFaviconInput, MediaUpdateWithoutHeaderFaviconInput>, MediaUncheckedUpdateWithoutHeaderFaviconInput>
  }

  export type MediaUpdateOneWithoutHeaderLogoNestedInput = {
    create?: XOR<MediaCreateWithoutHeaderLogoInput, MediaUncheckedCreateWithoutHeaderLogoInput>
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderLogoInput
    upsert?: MediaUpsertWithoutHeaderLogoInput
    disconnect?: MediaWhereInput | boolean
    delete?: MediaWhereInput | boolean
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutHeaderLogoInput, MediaUpdateWithoutHeaderLogoInput>, MediaUncheckedUpdateWithoutHeaderLogoInput>
  }

  export type MediaUpdateManyWithoutHeaderReseauxNestedInput = {
    create?: XOR<MediaCreateWithoutHeaderReseauxInput, MediaUncheckedCreateWithoutHeaderReseauxInput> | MediaCreateWithoutHeaderReseauxInput[] | MediaUncheckedCreateWithoutHeaderReseauxInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderReseauxInput | MediaCreateOrConnectWithoutHeaderReseauxInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutHeaderReseauxInput | MediaUpsertWithWhereUniqueWithoutHeaderReseauxInput[]
    createMany?: MediaCreateManyHeaderReseauxInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutHeaderReseauxInput | MediaUpdateWithWhereUniqueWithoutHeaderReseauxInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutHeaderReseauxInput | MediaUpdateManyWithWhereWithoutHeaderReseauxInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type MediaUncheckedUpdateOneWithoutHeaderFaviconNestedInput = {
    create?: XOR<MediaCreateWithoutHeaderFaviconInput, MediaUncheckedCreateWithoutHeaderFaviconInput>
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderFaviconInput
    upsert?: MediaUpsertWithoutHeaderFaviconInput
    disconnect?: MediaWhereInput | boolean
    delete?: MediaWhereInput | boolean
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutHeaderFaviconInput, MediaUpdateWithoutHeaderFaviconInput>, MediaUncheckedUpdateWithoutHeaderFaviconInput>
  }

  export type MediaUncheckedUpdateOneWithoutHeaderLogoNestedInput = {
    create?: XOR<MediaCreateWithoutHeaderLogoInput, MediaUncheckedCreateWithoutHeaderLogoInput>
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderLogoInput
    upsert?: MediaUpsertWithoutHeaderLogoInput
    disconnect?: MediaWhereInput | boolean
    delete?: MediaWhereInput | boolean
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutHeaderLogoInput, MediaUpdateWithoutHeaderLogoInput>, MediaUncheckedUpdateWithoutHeaderLogoInput>
  }

  export type MediaUncheckedUpdateManyWithoutHeaderReseauxNestedInput = {
    create?: XOR<MediaCreateWithoutHeaderReseauxInput, MediaUncheckedCreateWithoutHeaderReseauxInput> | MediaCreateWithoutHeaderReseauxInput[] | MediaUncheckedCreateWithoutHeaderReseauxInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutHeaderReseauxInput | MediaCreateOrConnectWithoutHeaderReseauxInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutHeaderReseauxInput | MediaUpsertWithWhereUniqueWithoutHeaderReseauxInput[]
    createMany?: MediaCreateManyHeaderReseauxInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutHeaderReseauxInput | MediaUpdateWithWhereUniqueWithoutHeaderReseauxInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutHeaderReseauxInput | MediaUpdateManyWithWhereWithoutHeaderReseauxInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type MediaCreateNestedManyWithoutFooterInput = {
    create?: XOR<MediaCreateWithoutFooterInput, MediaUncheckedCreateWithoutFooterInput> | MediaCreateWithoutFooterInput[] | MediaUncheckedCreateWithoutFooterInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutFooterInput | MediaCreateOrConnectWithoutFooterInput[]
    createMany?: MediaCreateManyFooterInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type MediaUncheckedCreateNestedManyWithoutFooterInput = {
    create?: XOR<MediaCreateWithoutFooterInput, MediaUncheckedCreateWithoutFooterInput> | MediaCreateWithoutFooterInput[] | MediaUncheckedCreateWithoutFooterInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutFooterInput | MediaCreateOrConnectWithoutFooterInput[]
    createMany?: MediaCreateManyFooterInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type MediaUpdateManyWithoutFooterNestedInput = {
    create?: XOR<MediaCreateWithoutFooterInput, MediaUncheckedCreateWithoutFooterInput> | MediaCreateWithoutFooterInput[] | MediaUncheckedCreateWithoutFooterInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutFooterInput | MediaCreateOrConnectWithoutFooterInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutFooterInput | MediaUpsertWithWhereUniqueWithoutFooterInput[]
    createMany?: MediaCreateManyFooterInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutFooterInput | MediaUpdateWithWhereUniqueWithoutFooterInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutFooterInput | MediaUpdateManyWithWhereWithoutFooterInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type MediaUncheckedUpdateManyWithoutFooterNestedInput = {
    create?: XOR<MediaCreateWithoutFooterInput, MediaUncheckedCreateWithoutFooterInput> | MediaCreateWithoutFooterInput[] | MediaUncheckedCreateWithoutFooterInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutFooterInput | MediaCreateOrConnectWithoutFooterInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutFooterInput | MediaUpsertWithWhereUniqueWithoutFooterInput[]
    createMany?: MediaCreateManyFooterInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutFooterInput | MediaUpdateWithWhereUniqueWithoutFooterInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutFooterInput | MediaUpdateManyWithWhereWithoutFooterInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type FooterCreateNestedOneWithoutReseauxInput = {
    create?: XOR<FooterCreateWithoutReseauxInput, FooterUncheckedCreateWithoutReseauxInput>
    connectOrCreate?: FooterCreateOrConnectWithoutReseauxInput
    connect?: FooterWhereUniqueInput
  }

  export type HeaderCreateNestedOneWithoutFaviconInput = {
    create?: XOR<HeaderCreateWithoutFaviconInput, HeaderUncheckedCreateWithoutFaviconInput>
    connectOrCreate?: HeaderCreateOrConnectWithoutFaviconInput
    connect?: HeaderWhereUniqueInput
  }

  export type HeaderCreateNestedOneWithoutLogoInput = {
    create?: XOR<HeaderCreateWithoutLogoInput, HeaderUncheckedCreateWithoutLogoInput>
    connectOrCreate?: HeaderCreateOrConnectWithoutLogoInput
    connect?: HeaderWhereUniqueInput
  }

  export type HeaderCreateNestedOneWithoutReseauxInput = {
    create?: XOR<HeaderCreateWithoutReseauxInput, HeaderUncheckedCreateWithoutReseauxInput>
    connectOrCreate?: HeaderCreateOrConnectWithoutReseauxInput
    connect?: HeaderWhereUniqueInput
  }

  export type FooterUpdateOneWithoutReseauxNestedInput = {
    create?: XOR<FooterCreateWithoutReseauxInput, FooterUncheckedCreateWithoutReseauxInput>
    connectOrCreate?: FooterCreateOrConnectWithoutReseauxInput
    upsert?: FooterUpsertWithoutReseauxInput
    disconnect?: FooterWhereInput | boolean
    delete?: FooterWhereInput | boolean
    connect?: FooterWhereUniqueInput
    update?: XOR<XOR<FooterUpdateToOneWithWhereWithoutReseauxInput, FooterUpdateWithoutReseauxInput>, FooterUncheckedUpdateWithoutReseauxInput>
  }

  export type HeaderUpdateOneWithoutFaviconNestedInput = {
    create?: XOR<HeaderCreateWithoutFaviconInput, HeaderUncheckedCreateWithoutFaviconInput>
    connectOrCreate?: HeaderCreateOrConnectWithoutFaviconInput
    upsert?: HeaderUpsertWithoutFaviconInput
    disconnect?: HeaderWhereInput | boolean
    delete?: HeaderWhereInput | boolean
    connect?: HeaderWhereUniqueInput
    update?: XOR<XOR<HeaderUpdateToOneWithWhereWithoutFaviconInput, HeaderUpdateWithoutFaviconInput>, HeaderUncheckedUpdateWithoutFaviconInput>
  }

  export type HeaderUpdateOneWithoutLogoNestedInput = {
    create?: XOR<HeaderCreateWithoutLogoInput, HeaderUncheckedCreateWithoutLogoInput>
    connectOrCreate?: HeaderCreateOrConnectWithoutLogoInput
    upsert?: HeaderUpsertWithoutLogoInput
    disconnect?: HeaderWhereInput | boolean
    delete?: HeaderWhereInput | boolean
    connect?: HeaderWhereUniqueInput
    update?: XOR<XOR<HeaderUpdateToOneWithWhereWithoutLogoInput, HeaderUpdateWithoutLogoInput>, HeaderUncheckedUpdateWithoutLogoInput>
  }

  export type HeaderUpdateOneWithoutReseauxNestedInput = {
    create?: XOR<HeaderCreateWithoutReseauxInput, HeaderUncheckedCreateWithoutReseauxInput>
    connectOrCreate?: HeaderCreateOrConnectWithoutReseauxInput
    upsert?: HeaderUpsertWithoutReseauxInput
    disconnect?: HeaderWhereInput | boolean
    delete?: HeaderWhereInput | boolean
    connect?: HeaderWhereUniqueInput
    update?: XOR<XOR<HeaderUpdateToOneWithWhereWithoutReseauxInput, HeaderUpdateWithoutReseauxInput>, HeaderUncheckedUpdateWithoutReseauxInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PageCreateWithoutChildrenInput = {
    checkbox_published?: boolean
    text_titre: string
    text_slug: string
    number_page_position: number
    text_langue: string
    blocs: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
    text_description?: string | null
    checkbox_home_page?: boolean
    parent?: PageCreateNestedOneWithoutChildrenInput
  }

  export type PageUncheckedCreateWithoutChildrenInput = {
    number_id?: number
    number_parent_id?: number | null
    checkbox_published?: boolean
    text_titre: string
    text_slug: string
    number_page_position: number
    text_langue: string
    blocs: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
    text_description?: string | null
    checkbox_home_page?: boolean
  }

  export type PageCreateOrConnectWithoutChildrenInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutChildrenInput, PageUncheckedCreateWithoutChildrenInput>
  }

  export type PageCreateWithoutParentInput = {
    checkbox_published?: boolean
    text_titre: string
    text_slug: string
    number_page_position: number
    text_langue: string
    blocs: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
    text_description?: string | null
    checkbox_home_page?: boolean
    children?: PageCreateNestedManyWithoutParentInput
  }

  export type PageUncheckedCreateWithoutParentInput = {
    number_id?: number
    checkbox_published?: boolean
    text_titre: string
    text_slug: string
    number_page_position: number
    text_langue: string
    blocs: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
    text_description?: string | null
    checkbox_home_page?: boolean
    children?: PageUncheckedCreateNestedManyWithoutParentInput
  }

  export type PageCreateOrConnectWithoutParentInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput>
  }

  export type PageCreateManyParentInputEnvelope = {
    data: PageCreateManyParentInput | PageCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type PageUpsertWithoutChildrenInput = {
    update: XOR<PageUpdateWithoutChildrenInput, PageUncheckedUpdateWithoutChildrenInput>
    create: XOR<PageCreateWithoutChildrenInput, PageUncheckedCreateWithoutChildrenInput>
    where?: PageWhereInput
  }

  export type PageUpdateToOneWithWhereWithoutChildrenInput = {
    where?: PageWhereInput
    data: XOR<PageUpdateWithoutChildrenInput, PageUncheckedUpdateWithoutChildrenInput>
  }

  export type PageUpdateWithoutChildrenInput = {
    checkbox_published?: BoolFieldUpdateOperationsInput | boolean
    text_titre?: StringFieldUpdateOperationsInput | string
    text_slug?: StringFieldUpdateOperationsInput | string
    number_page_position?: IntFieldUpdateOperationsInput | number
    text_langue?: StringFieldUpdateOperationsInput | string
    blocs?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_description?: NullableStringFieldUpdateOperationsInput | string | null
    checkbox_home_page?: BoolFieldUpdateOperationsInput | boolean
    parent?: PageUpdateOneWithoutChildrenNestedInput
  }

  export type PageUncheckedUpdateWithoutChildrenInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    number_parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    checkbox_published?: BoolFieldUpdateOperationsInput | boolean
    text_titre?: StringFieldUpdateOperationsInput | string
    text_slug?: StringFieldUpdateOperationsInput | string
    number_page_position?: IntFieldUpdateOperationsInput | number
    text_langue?: StringFieldUpdateOperationsInput | string
    blocs?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_description?: NullableStringFieldUpdateOperationsInput | string | null
    checkbox_home_page?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PageUpsertWithWhereUniqueWithoutParentInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutParentInput, PageUncheckedUpdateWithoutParentInput>
    create: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput>
  }

  export type PageUpdateWithWhereUniqueWithoutParentInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutParentInput, PageUncheckedUpdateWithoutParentInput>
  }

  export type PageUpdateManyWithWhereWithoutParentInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutParentInput>
  }

  export type PageScalarWhereInput = {
    AND?: PageScalarWhereInput | PageScalarWhereInput[]
    OR?: PageScalarWhereInput[]
    NOT?: PageScalarWhereInput | PageScalarWhereInput[]
    number_id?: IntFilter<"Page"> | number
    number_parent_id?: IntNullableFilter<"Page"> | number | null
    checkbox_published?: BoolFilter<"Page"> | boolean
    text_titre?: StringFilter<"Page"> | string
    text_slug?: StringFilter<"Page"> | string
    number_page_position?: IntFilter<"Page"> | number
    text_langue?: StringFilter<"Page"> | string
    blocs?: StringFilter<"Page"> | string
    text_createdAt?: DateTimeFilter<"Page"> | Date | string
    text_updatedAt?: DateTimeFilter<"Page"> | Date | string
    text_description?: StringNullableFilter<"Page"> | string | null
    checkbox_home_page?: BoolFilter<"Page"> | boolean
  }

  export type MediaCreateWithoutHeaderFaviconInput = {
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    footer?: FooterCreateNestedOneWithoutReseauxInput
    headerLogo?: HeaderCreateNestedOneWithoutLogoInput
    headerReseaux?: HeaderCreateNestedOneWithoutReseauxInput
  }

  export type MediaUncheckedCreateWithoutHeaderFaviconInput = {
    number_id?: number
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    number_header_logo_id?: number | null
    number_header_reseaux_id?: number | null
    number_footer_id?: number | null
  }

  export type MediaCreateOrConnectWithoutHeaderFaviconInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutHeaderFaviconInput, MediaUncheckedCreateWithoutHeaderFaviconInput>
  }

  export type MediaCreateWithoutHeaderLogoInput = {
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    footer?: FooterCreateNestedOneWithoutReseauxInput
    headerFavicon?: HeaderCreateNestedOneWithoutFaviconInput
    headerReseaux?: HeaderCreateNestedOneWithoutReseauxInput
  }

  export type MediaUncheckedCreateWithoutHeaderLogoInput = {
    number_id?: number
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    number_header_favicon_id?: number | null
    number_header_reseaux_id?: number | null
    number_footer_id?: number | null
  }

  export type MediaCreateOrConnectWithoutHeaderLogoInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutHeaderLogoInput, MediaUncheckedCreateWithoutHeaderLogoInput>
  }

  export type MediaCreateWithoutHeaderReseauxInput = {
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    footer?: FooterCreateNestedOneWithoutReseauxInput
    headerFavicon?: HeaderCreateNestedOneWithoutFaviconInput
    headerLogo?: HeaderCreateNestedOneWithoutLogoInput
  }

  export type MediaUncheckedCreateWithoutHeaderReseauxInput = {
    number_id?: number
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    number_header_logo_id?: number | null
    number_header_favicon_id?: number | null
    number_footer_id?: number | null
  }

  export type MediaCreateOrConnectWithoutHeaderReseauxInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutHeaderReseauxInput, MediaUncheckedCreateWithoutHeaderReseauxInput>
  }

  export type MediaCreateManyHeaderReseauxInputEnvelope = {
    data: MediaCreateManyHeaderReseauxInput | MediaCreateManyHeaderReseauxInput[]
    skipDuplicates?: boolean
  }

  export type MediaUpsertWithoutHeaderFaviconInput = {
    update: XOR<MediaUpdateWithoutHeaderFaviconInput, MediaUncheckedUpdateWithoutHeaderFaviconInput>
    create: XOR<MediaCreateWithoutHeaderFaviconInput, MediaUncheckedCreateWithoutHeaderFaviconInput>
    where?: MediaWhereInput
  }

  export type MediaUpdateToOneWithWhereWithoutHeaderFaviconInput = {
    where?: MediaWhereInput
    data: XOR<MediaUpdateWithoutHeaderFaviconInput, MediaUncheckedUpdateWithoutHeaderFaviconInput>
  }

  export type MediaUpdateWithoutHeaderFaviconInput = {
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    footer?: FooterUpdateOneWithoutReseauxNestedInput
    headerLogo?: HeaderUpdateOneWithoutLogoNestedInput
    headerReseaux?: HeaderUpdateOneWithoutReseauxNestedInput
  }

  export type MediaUncheckedUpdateWithoutHeaderFaviconInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    number_header_logo_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_reseaux_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_footer_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MediaUpsertWithoutHeaderLogoInput = {
    update: XOR<MediaUpdateWithoutHeaderLogoInput, MediaUncheckedUpdateWithoutHeaderLogoInput>
    create: XOR<MediaCreateWithoutHeaderLogoInput, MediaUncheckedCreateWithoutHeaderLogoInput>
    where?: MediaWhereInput
  }

  export type MediaUpdateToOneWithWhereWithoutHeaderLogoInput = {
    where?: MediaWhereInput
    data: XOR<MediaUpdateWithoutHeaderLogoInput, MediaUncheckedUpdateWithoutHeaderLogoInput>
  }

  export type MediaUpdateWithoutHeaderLogoInput = {
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    footer?: FooterUpdateOneWithoutReseauxNestedInput
    headerFavicon?: HeaderUpdateOneWithoutFaviconNestedInput
    headerReseaux?: HeaderUpdateOneWithoutReseauxNestedInput
  }

  export type MediaUncheckedUpdateWithoutHeaderLogoInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    number_header_favicon_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_reseaux_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_footer_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MediaUpsertWithWhereUniqueWithoutHeaderReseauxInput = {
    where: MediaWhereUniqueInput
    update: XOR<MediaUpdateWithoutHeaderReseauxInput, MediaUncheckedUpdateWithoutHeaderReseauxInput>
    create: XOR<MediaCreateWithoutHeaderReseauxInput, MediaUncheckedCreateWithoutHeaderReseauxInput>
  }

  export type MediaUpdateWithWhereUniqueWithoutHeaderReseauxInput = {
    where: MediaWhereUniqueInput
    data: XOR<MediaUpdateWithoutHeaderReseauxInput, MediaUncheckedUpdateWithoutHeaderReseauxInput>
  }

  export type MediaUpdateManyWithWhereWithoutHeaderReseauxInput = {
    where: MediaScalarWhereInput
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyWithoutHeaderReseauxInput>
  }

  export type MediaScalarWhereInput = {
    AND?: MediaScalarWhereInput | MediaScalarWhereInput[]
    OR?: MediaScalarWhereInput[]
    NOT?: MediaScalarWhereInput | MediaScalarWhereInput[]
    number_id?: IntFilter<"Media"> | number
    text_titre?: StringNullableFilter<"Media"> | string | null
    color_couleur_bg?: StringNullableFilter<"Media"> | string | null
    text_image_lien?: StringNullableFilter<"Media"> | string | null
    number_position_image?: IntNullableFilter<"Media"> | number | null
    image_url?: StringFilter<"Media"> | string
    number_header_logo_id?: IntNullableFilter<"Media"> | number | null
    number_header_favicon_id?: IntNullableFilter<"Media"> | number | null
    number_header_reseaux_id?: IntNullableFilter<"Media"> | number | null
    number_footer_id?: IntNullableFilter<"Media"> | number | null
  }

  export type MediaCreateWithoutFooterInput = {
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    headerFavicon?: HeaderCreateNestedOneWithoutFaviconInput
    headerLogo?: HeaderCreateNestedOneWithoutLogoInput
    headerReseaux?: HeaderCreateNestedOneWithoutReseauxInput
  }

  export type MediaUncheckedCreateWithoutFooterInput = {
    number_id?: number
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    number_header_logo_id?: number | null
    number_header_favicon_id?: number | null
    number_header_reseaux_id?: number | null
  }

  export type MediaCreateOrConnectWithoutFooterInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutFooterInput, MediaUncheckedCreateWithoutFooterInput>
  }

  export type MediaCreateManyFooterInputEnvelope = {
    data: MediaCreateManyFooterInput | MediaCreateManyFooterInput[]
    skipDuplicates?: boolean
  }

  export type MediaUpsertWithWhereUniqueWithoutFooterInput = {
    where: MediaWhereUniqueInput
    update: XOR<MediaUpdateWithoutFooterInput, MediaUncheckedUpdateWithoutFooterInput>
    create: XOR<MediaCreateWithoutFooterInput, MediaUncheckedCreateWithoutFooterInput>
  }

  export type MediaUpdateWithWhereUniqueWithoutFooterInput = {
    where: MediaWhereUniqueInput
    data: XOR<MediaUpdateWithoutFooterInput, MediaUncheckedUpdateWithoutFooterInput>
  }

  export type MediaUpdateManyWithWhereWithoutFooterInput = {
    where: MediaScalarWhereInput
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyWithoutFooterInput>
  }

  export type FooterCreateWithoutReseauxInput = {
    color_background_color?: string | null
    text_nom_site_adresse?: string | null
    text_adresse_footer?: string | null
    text_code_postal?: string | null
  }

  export type FooterUncheckedCreateWithoutReseauxInput = {
    number_id?: number
    color_background_color?: string | null
    text_nom_site_adresse?: string | null
    text_adresse_footer?: string | null
    text_code_postal?: string | null
  }

  export type FooterCreateOrConnectWithoutReseauxInput = {
    where: FooterWhereUniqueInput
    create: XOR<FooterCreateWithoutReseauxInput, FooterUncheckedCreateWithoutReseauxInput>
  }

  export type HeaderCreateWithoutFaviconInput = {
    text_nom_site?: string | null
    text_background_url?: string | null
    logo?: MediaCreateNestedOneWithoutHeaderLogoInput
    reseaux?: MediaCreateNestedManyWithoutHeaderReseauxInput
  }

  export type HeaderUncheckedCreateWithoutFaviconInput = {
    number_id?: number
    text_nom_site?: string | null
    text_background_url?: string | null
    logo?: MediaUncheckedCreateNestedOneWithoutHeaderLogoInput
    reseaux?: MediaUncheckedCreateNestedManyWithoutHeaderReseauxInput
  }

  export type HeaderCreateOrConnectWithoutFaviconInput = {
    where: HeaderWhereUniqueInput
    create: XOR<HeaderCreateWithoutFaviconInput, HeaderUncheckedCreateWithoutFaviconInput>
  }

  export type HeaderCreateWithoutLogoInput = {
    text_nom_site?: string | null
    text_background_url?: string | null
    favicon?: MediaCreateNestedOneWithoutHeaderFaviconInput
    reseaux?: MediaCreateNestedManyWithoutHeaderReseauxInput
  }

  export type HeaderUncheckedCreateWithoutLogoInput = {
    number_id?: number
    text_nom_site?: string | null
    text_background_url?: string | null
    favicon?: MediaUncheckedCreateNestedOneWithoutHeaderFaviconInput
    reseaux?: MediaUncheckedCreateNestedManyWithoutHeaderReseauxInput
  }

  export type HeaderCreateOrConnectWithoutLogoInput = {
    where: HeaderWhereUniqueInput
    create: XOR<HeaderCreateWithoutLogoInput, HeaderUncheckedCreateWithoutLogoInput>
  }

  export type HeaderCreateWithoutReseauxInput = {
    text_nom_site?: string | null
    text_background_url?: string | null
    favicon?: MediaCreateNestedOneWithoutHeaderFaviconInput
    logo?: MediaCreateNestedOneWithoutHeaderLogoInput
  }

  export type HeaderUncheckedCreateWithoutReseauxInput = {
    number_id?: number
    text_nom_site?: string | null
    text_background_url?: string | null
    favicon?: MediaUncheckedCreateNestedOneWithoutHeaderFaviconInput
    logo?: MediaUncheckedCreateNestedOneWithoutHeaderLogoInput
  }

  export type HeaderCreateOrConnectWithoutReseauxInput = {
    where: HeaderWhereUniqueInput
    create: XOR<HeaderCreateWithoutReseauxInput, HeaderUncheckedCreateWithoutReseauxInput>
  }

  export type FooterUpsertWithoutReseauxInput = {
    update: XOR<FooterUpdateWithoutReseauxInput, FooterUncheckedUpdateWithoutReseauxInput>
    create: XOR<FooterCreateWithoutReseauxInput, FooterUncheckedCreateWithoutReseauxInput>
    where?: FooterWhereInput
  }

  export type FooterUpdateToOneWithWhereWithoutReseauxInput = {
    where?: FooterWhereInput
    data: XOR<FooterUpdateWithoutReseauxInput, FooterUncheckedUpdateWithoutReseauxInput>
  }

  export type FooterUpdateWithoutReseauxInput = {
    color_background_color?: NullableStringFieldUpdateOperationsInput | string | null
    text_nom_site_adresse?: NullableStringFieldUpdateOperationsInput | string | null
    text_adresse_footer?: NullableStringFieldUpdateOperationsInput | string | null
    text_code_postal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FooterUncheckedUpdateWithoutReseauxInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    color_background_color?: NullableStringFieldUpdateOperationsInput | string | null
    text_nom_site_adresse?: NullableStringFieldUpdateOperationsInput | string | null
    text_adresse_footer?: NullableStringFieldUpdateOperationsInput | string | null
    text_code_postal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HeaderUpsertWithoutFaviconInput = {
    update: XOR<HeaderUpdateWithoutFaviconInput, HeaderUncheckedUpdateWithoutFaviconInput>
    create: XOR<HeaderCreateWithoutFaviconInput, HeaderUncheckedCreateWithoutFaviconInput>
    where?: HeaderWhereInput
  }

  export type HeaderUpdateToOneWithWhereWithoutFaviconInput = {
    where?: HeaderWhereInput
    data: XOR<HeaderUpdateWithoutFaviconInput, HeaderUncheckedUpdateWithoutFaviconInput>
  }

  export type HeaderUpdateWithoutFaviconInput = {
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: MediaUpdateOneWithoutHeaderLogoNestedInput
    reseaux?: MediaUpdateManyWithoutHeaderReseauxNestedInput
  }

  export type HeaderUncheckedUpdateWithoutFaviconInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: MediaUncheckedUpdateOneWithoutHeaderLogoNestedInput
    reseaux?: MediaUncheckedUpdateManyWithoutHeaderReseauxNestedInput
  }

  export type HeaderUpsertWithoutLogoInput = {
    update: XOR<HeaderUpdateWithoutLogoInput, HeaderUncheckedUpdateWithoutLogoInput>
    create: XOR<HeaderCreateWithoutLogoInput, HeaderUncheckedCreateWithoutLogoInput>
    where?: HeaderWhereInput
  }

  export type HeaderUpdateToOneWithWhereWithoutLogoInput = {
    where?: HeaderWhereInput
    data: XOR<HeaderUpdateWithoutLogoInput, HeaderUncheckedUpdateWithoutLogoInput>
  }

  export type HeaderUpdateWithoutLogoInput = {
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: MediaUpdateOneWithoutHeaderFaviconNestedInput
    reseaux?: MediaUpdateManyWithoutHeaderReseauxNestedInput
  }

  export type HeaderUncheckedUpdateWithoutLogoInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: MediaUncheckedUpdateOneWithoutHeaderFaviconNestedInput
    reseaux?: MediaUncheckedUpdateManyWithoutHeaderReseauxNestedInput
  }

  export type HeaderUpsertWithoutReseauxInput = {
    update: XOR<HeaderUpdateWithoutReseauxInput, HeaderUncheckedUpdateWithoutReseauxInput>
    create: XOR<HeaderCreateWithoutReseauxInput, HeaderUncheckedCreateWithoutReseauxInput>
    where?: HeaderWhereInput
  }

  export type HeaderUpdateToOneWithWhereWithoutReseauxInput = {
    where?: HeaderWhereInput
    data: XOR<HeaderUpdateWithoutReseauxInput, HeaderUncheckedUpdateWithoutReseauxInput>
  }

  export type HeaderUpdateWithoutReseauxInput = {
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: MediaUpdateOneWithoutHeaderFaviconNestedInput
    logo?: MediaUpdateOneWithoutHeaderLogoNestedInput
  }

  export type HeaderUncheckedUpdateWithoutReseauxInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_nom_site?: NullableStringFieldUpdateOperationsInput | string | null
    text_background_url?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: MediaUncheckedUpdateOneWithoutHeaderFaviconNestedInput
    logo?: MediaUncheckedUpdateOneWithoutHeaderLogoNestedInput
  }

  export type PageCreateManyParentInput = {
    number_id?: number
    checkbox_published?: boolean
    text_titre: string
    text_slug: string
    number_page_position: number
    text_langue: string
    blocs: string
    text_createdAt?: Date | string
    text_updatedAt?: Date | string
    text_description?: string | null
    checkbox_home_page?: boolean
  }

  export type PageUpdateWithoutParentInput = {
    checkbox_published?: BoolFieldUpdateOperationsInput | boolean
    text_titre?: StringFieldUpdateOperationsInput | string
    text_slug?: StringFieldUpdateOperationsInput | string
    number_page_position?: IntFieldUpdateOperationsInput | number
    text_langue?: StringFieldUpdateOperationsInput | string
    blocs?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_description?: NullableStringFieldUpdateOperationsInput | string | null
    checkbox_home_page?: BoolFieldUpdateOperationsInput | boolean
    children?: PageUpdateManyWithoutParentNestedInput
  }

  export type PageUncheckedUpdateWithoutParentInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    checkbox_published?: BoolFieldUpdateOperationsInput | boolean
    text_titre?: StringFieldUpdateOperationsInput | string
    text_slug?: StringFieldUpdateOperationsInput | string
    number_page_position?: IntFieldUpdateOperationsInput | number
    text_langue?: StringFieldUpdateOperationsInput | string
    blocs?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_description?: NullableStringFieldUpdateOperationsInput | string | null
    checkbox_home_page?: BoolFieldUpdateOperationsInput | boolean
    children?: PageUncheckedUpdateManyWithoutParentNestedInput
  }

  export type PageUncheckedUpdateManyWithoutParentInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    checkbox_published?: BoolFieldUpdateOperationsInput | boolean
    text_titre?: StringFieldUpdateOperationsInput | string
    text_slug?: StringFieldUpdateOperationsInput | string
    number_page_position?: IntFieldUpdateOperationsInput | number
    text_langue?: StringFieldUpdateOperationsInput | string
    blocs?: StringFieldUpdateOperationsInput | string
    text_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text_description?: NullableStringFieldUpdateOperationsInput | string | null
    checkbox_home_page?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MediaCreateManyHeaderReseauxInput = {
    number_id?: number
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    number_header_logo_id?: number | null
    number_header_favicon_id?: number | null
    number_footer_id?: number | null
  }

  export type MediaUpdateWithoutHeaderReseauxInput = {
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    footer?: FooterUpdateOneWithoutReseauxNestedInput
    headerFavicon?: HeaderUpdateOneWithoutFaviconNestedInput
    headerLogo?: HeaderUpdateOneWithoutLogoNestedInput
  }

  export type MediaUncheckedUpdateWithoutHeaderReseauxInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    number_header_logo_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_favicon_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_footer_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MediaUncheckedUpdateManyWithoutHeaderReseauxInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    number_header_logo_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_favicon_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_footer_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MediaCreateManyFooterInput = {
    number_id?: number
    text_titre?: string | null
    color_couleur_bg?: string | null
    text_image_lien?: string | null
    number_position_image?: number | null
    image_url: string
    number_header_logo_id?: number | null
    number_header_favicon_id?: number | null
    number_header_reseaux_id?: number | null
  }

  export type MediaUpdateWithoutFooterInput = {
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    headerFavicon?: HeaderUpdateOneWithoutFaviconNestedInput
    headerLogo?: HeaderUpdateOneWithoutLogoNestedInput
    headerReseaux?: HeaderUpdateOneWithoutReseauxNestedInput
  }

  export type MediaUncheckedUpdateWithoutFooterInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    number_header_logo_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_favicon_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_reseaux_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MediaUncheckedUpdateManyWithoutFooterInput = {
    number_id?: IntFieldUpdateOperationsInput | number
    text_titre?: NullableStringFieldUpdateOperationsInput | string | null
    color_couleur_bg?: NullableStringFieldUpdateOperationsInput | string | null
    text_image_lien?: NullableStringFieldUpdateOperationsInput | string | null
    number_position_image?: NullableIntFieldUpdateOperationsInput | number | null
    image_url?: StringFieldUpdateOperationsInput | string
    number_header_logo_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_favicon_id?: NullableIntFieldUpdateOperationsInput | number | null
    number_header_reseaux_id?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}