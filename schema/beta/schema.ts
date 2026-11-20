/**
 * Skills extension wire types for specification/beta/skills.mdx.
 * The released specification remains normative.
 * Keep these declarations in sync with its TypeScript blocks (npm run check:schema).
 */

import type {
  MetaObject,
  JSONRPCRequest,
  JSONRPCResultResponse,
  RequestParams,
  PaginatedRequest,
  PaginatedRequestParams,
  PaginatedResult,
  CacheableResult,
  Resource,
} from "./spec.types.js";

/**
 * A file belonging to a skill, with the digest and size of its content.
 */
export interface SkillResource {
  /** Resource URI of the file. */
  uri: string;

  /**
   * SHA-256 digest of the file's raw bytes, formatted as `sha256:{hex}`
   * where {hex} is 64 lowercase hexadecimal characters.
   */
  digest: string;

  /**
   * Length in bytes of the file's raw content (the same bytes that `digest` covers).
   */
  size: number;
}

/**
 * The entry for a single skill.
 */
export interface Skill {
  /** Resource URI of the skill's SKILL.md, readable via resources/read. */
  uri: string;

  /**
   * The skill's SKILL.md YAML frontmatter, rendered verbatim as a JSON object.
   * `name` and `description` are always present; every other field the author
   * wrote passes through unchanged.
   */
  frontmatter: {
    name: string;
    description: string;
    [key: string]: unknown;
  };

  /**
   * The skill's files: a complete enumeration of SKILL.md and every supporting
   * file, or the string "dynamic" when the skill's content is generated such
   * that stable digests cannot be published.
   */
  resources: SkillResource[] | "dynamic";

  /**
   * See the base protocol's notes on `_meta` usage. Keys defined by this
   * extension use the `io.modelcontextprotocol.skills/` prefix.
   */
  _meta?: MetaObject;
}

export interface ListSkillsRequest extends PaginatedRequest {
  method: "skills/list";
}

export interface ListSkillsResult extends PaginatedResult, CacheableResult {
  skills: Skill[];
}

export interface ListSkillsResultResponse extends JSONRPCResultResponse {
  result: ListSkillsResult;
}

export interface GetSkillRequestParams extends RequestParams {
  /** URI of the skill's SKILL.md. */
  uri: string;
}

export interface GetSkillRequest extends JSONRPCRequest {
  method: "skills/get";
  params: GetSkillRequestParams;
}

export interface GetSkillResult extends CacheableResult {
  skill: Skill;
}

export interface GetSkillResultResponse extends JSONRPCResultResponse {
  result: GetSkillResult;
}

export interface ReadResourceDirectoryRequestParams extends PaginatedRequestParams {
  /** URI of the directory resource to read. */
  uri: string;
}

export interface ReadResourceDirectoryRequest extends PaginatedRequest {
  method: "resources/directory/read";
  params: ReadResourceDirectoryRequestParams;
}

export interface ReadResourceDirectoryResult
  extends PaginatedResult, CacheableResult {
  /** Resource metadata of the directory's direct children. */
  resources: Resource[];
}

export interface ReadResourceDirectoryResultResponse extends JSONRPCResultResponse {
  result: ReadResourceDirectoryResult;
}
