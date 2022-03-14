/**
 * This module re-exports the required dependencies.
 */
export {
  Application,
  Request as OakRequest,
  Router,
} from "https://deno.land/x/oak@v10.2.1/mod.ts";
export type { RouterContext } from "https://deno.land/x/oak@v10.2.1/mod.ts";
export {
  readAll,
  readerFromStreamReader,
} from "https://deno.land/std@0.127.0/streams/conversion.ts";
