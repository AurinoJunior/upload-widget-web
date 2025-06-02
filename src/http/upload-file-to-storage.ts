import axios from "axios"

interface UploadFileToStorageParams {
  file: File
  signal?: AbortSignal
}

export async function uploadFileToStorage({
  file,
  signal,
}: UploadFileToStorageParams) {
  const data = new FormData()

  data.append("file", file)

  const response = await axios.post<{ url: string }>(
    "http://localhost:3333/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal,
    }
  )

  return { url: response.data.url }
}
