const DISALLOWED_LINK_PROTOCOLS = ["ftp", "file", "mailto"];
const NO_AUTOLINK_DOMAINS = [
  "example-no-autolink.com",
  "another-no-autolink.com",
];

const FONT_SIZES = [
  { value: "16", label: "16px" },
  { value: "18", label: "18px" },
  { value: "20", label: "20px" },
  { value: "24", label: "24px" },
] as const;

export { DISALLOWED_LINK_PROTOCOLS, NO_AUTOLINK_DOMAINS, FONT_SIZES };
