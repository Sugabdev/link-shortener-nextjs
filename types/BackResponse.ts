export type BackResponse = {
    message: string,
    data: MessageResponse,
    status: number
}

interface MessageResponse {
    original_url: string
    short_url: string
}