import { event } from "./event";
import { teamMember } from "./teamMember";
import { siteSettings } from "./siteSettings";
import { announcement } from "./announcement";

/**
 * Schema registry — all document types registered here are available
 * in the Sanity Studio and used for GROQ query type inference.
 */
export const schemaTypes = [event, teamMember, siteSettings, announcement];
