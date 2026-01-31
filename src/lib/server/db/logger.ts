import type { Logger } from "drizzle-orm/logger";

// ANSI color codes for terminal
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
} as const;

// SQL keywords to highlight
const SQL_KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "INSERT",
  "INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE",
  "JOIN",
  "LEFT",
  "RIGHT",
  "INNER",
  "OUTER",
  "ON",
  "AND",
  "OR",
  "ORDER",
  "BY",
  "GROUP",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "AS",
  "NULL",
  "NOT",
  "IN",
  "LIKE",
  "BETWEEN",
  "EXISTS",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "CREATE",
  "ALTER",
  "DROP",
  "TABLE",
  "INDEX",
  "RETURNING",
];

export class SQLLogger implements Logger {
  private formatQuery(query: string): string {
    let formatted = query;

    // Highlight SQL keywords
    for (const keyword of SQL_KEYWORDS) {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      formatted = formatted.replace(
        regex,
        `${colors.magenta}${colors.bright}${keyword}${colors.reset}${colors.yellow}`
      );
    }

    return `${colors.yellow}${formatted}${colors.reset}`;
  }

  private formatParams(params: unknown[]): string {
    if (params.length === 0) return `${colors.gray}(no params)${colors.reset}`;

    const formatted = params
      .map(
        (p, i) =>
          `${colors.cyan}$${i + 1}${colors.reset}=${colors.green}${JSON.stringify(p)}${colors.reset}`
      )
      .join(", ");

    return `[${formatted}]`;
  }

  private getTimestamp(): string {
    const now = new Date().toISOString();
    return `${colors.gray}${now}${colors.reset}`;
  }

  logQuery(query: string, params: unknown[]): void {
    const timestamp = this.getTimestamp();
    const label = `${colors.blue}${colors.bright}🔍 SQL${colors.reset}`;
    const formattedQuery = this.formatQuery(query);
    const formattedParams = this.formatParams(params);

    console.log(
      `${timestamp} ${label} ${formattedQuery} ${colors.gray}   └─ Params:${colors.reset} ${formattedParams}`
    );
  }
}
