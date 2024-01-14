// helper.ts
export const TruncateText = (
  truncateText: string | undefined,
  stringLength: number
): string => {
  if (!truncateText) {
    return "";
  }

  return truncateText.length > stringLength
    ? `${truncateText.substr(0, stringLength)}...`
    : truncateText;
};
