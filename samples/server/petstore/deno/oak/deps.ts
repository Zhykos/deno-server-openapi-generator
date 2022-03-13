/**
 * This module re-exports the required dependencies.
 */
export { join } from "https://deno.land/std@0.126.0/path/mod.ts";
export { camelCaseSync } from "https://deno.land/x/camelcase@v1.0.0/mod.ts";
export * as path from "https://deno.land/std@0.126.0/path/mod.ts";
export {
    readAll,
    readerFromStreamReader,
  } from "https://deno.land/std@0.127.0/streams/conversion.ts";