/** 条件付きクラス名の連結ユーティリティ（clsxの軽量版）。 */
export function cn(
  ...inputs: Array<string | false | null | undefined | Record<string, boolean>>
): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string") {
      classes.push(input);
    } else {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  return classes.join(" ");
}
