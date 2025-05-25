export function formatBytes(bytes: number): string {
  let formattedBytes = 0

  if (bytes < 0) {
    throw new Error("Size in bytes cannot be negative")
  }

  const units = ["B", "KB", "MB", "GB", "TB", "PB"]
  let index = 0

  while (bytes >= 1024 && index < units.length - 1) {
    formattedBytes = bytes / 1024
    index++
  }

  return `${formattedBytes.toFixed(2)} ${units[index]}`
}
