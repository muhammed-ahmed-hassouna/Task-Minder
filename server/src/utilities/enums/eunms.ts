export enum ErrorMessages {
    ForbiddenException = "User does not have the required role",
    UnauthorizedApiKey = "Unauthorized",
    EmailAlreadyExists = "Email Already Exists",
    internalServerError = "Internal Server Error",
    InvalidEmailOrPassword = "Invalid Email Or Password",
    AdminNotFound = "Admin not found",
    UserNotFound = "User not found",
    TodoNotFound = "Todo not found",
    DeleteDocument = "Successfully deleted the document!"
}

export enum SystemRoles {
    USER = 1,
    ADMIN = 2,
}

export enum envKeys {
    JWT_SECRET_KEY = "JWT_SECRET_KEY",
}


export enum TodoPriority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

export enum TodoStatus {
    IN_PROGRESS = 'In progress',
    COMPLETED = 'completed',
    DEFERRED = 'Deferred',
    OPEN = 'open',
}