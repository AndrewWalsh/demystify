import {
  HarEntry,
  HarGraphQL,
  HarGrpcWeb,
  HarRestJson,
  HarRestXml,
} from "../types/index.js";
import { isHarGraphQl } from "./is-graphql.js";
import { isHarXml } from "./is-xml.js";
import { isHarGrpcWeb } from "./is-grpcweb.js";
import { isHarRestJson } from "./is-json.js";
import { isValidMime } from "./is-valid-mime.js";
import { isValidMethod } from "./is-valid-method.js";
import { isValidUrl } from "./is-valid-url.js";

export type Kind = "graphql" | "rest-json" | "rest-xml" | "grpc-web";

interface DiscrimatedUnion {
  har: HarEntry;
  kind: Kind;
}

interface Gql extends DiscrimatedUnion {
  har: HarGraphQL;
  kind: "graphql";
}

interface RestJson extends DiscrimatedUnion {
  har: HarRestJson;
  kind: "rest-json";
}

interface RestXml extends DiscrimatedUnion {
  har: HarRestXml;
  kind: "rest-xml";
}

interface GrpcWeb extends DiscrimatedUnion {
  har: HarGrpcWeb;
  kind: "grpc-web";
}

export type ValidHar = Gql | RestJson | RestXml | GrpcWeb;

const discriminateByKind =
  (har: HarEntry) =>
  (kind: Kind): ValidHar => ({
    har,
    kind,
  });

const isHarHttp = (har: HarEntry): boolean => {
  return har.request.url.startsWith("http");
};

/**
 * Determine the type of a HarEntry, else return null.
 *
 * @param har A HarEntry object
 * @returns The input Har if it can be categorised, else null.
 * @HarGraphQL An entry with mime type application/json and postdata text that is syntactically valid graphql
 *
 */
export const harToHarType = (har: HarEntry): ValidHar | null => {
  if (!isHarHttp(har)) return null;
  if (!isValidMime(har)) return null;
  if (!isValidMethod(har.request.method)) return null;
  if (!isValidUrl(har.request.url)) return null;

  const discriminator = discriminateByKind(har);
  if (isHarGraphQl(har)) return discriminator("graphql");
  if (isHarXml(har)) return discriminator("rest-xml");
  if (isHarGrpcWeb(har)) return discriminator("grpc-web");
  if (isHarRestJson(har)) return discriminator("rest-json");

  return null;
};
