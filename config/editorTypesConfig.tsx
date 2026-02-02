const DISALLOWED_LINK_PROTOCOLS = ["ftp", "file", "mailto"];
const NO_AUTOLINK_DOMAINS = [
  "example-no-autolink.com",
  "another-no-autolink.com",
];

const FONT_SIZES = [
  { value: "16", label: "16" },
  { value: "18", label: "18" },
  { value: "20", label: "20" },
  { value: "24", label: "24" },
] as const;

export { DISALLOWED_LINK_PROTOCOLS, NO_AUTOLINK_DOMAINS, FONT_SIZES };
