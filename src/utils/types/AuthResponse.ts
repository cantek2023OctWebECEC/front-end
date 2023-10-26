export interface signupResponse {
    id: string,
    username: string,
    email: string,
    password: string,
    lastLogin: any,
    createdAt: string,
    updatedAt: string,
    timestamp: string,
}

export interface resetResponse {
    password: string,
    timestamp: string,
}
