from enum import Enum

class Errors(Enum):
    INVALID_EMAIL_OR_PWD = "Email o password invalide"
    USER_ALREADY_EXISTS = "Utente già presente"
    RES_NOT_FOUND = "Prenotazione non trovata"
    GENERAL_ERROR = "Qualcosa è andato storto. Riprova."
    PERMISSION_DENIED = "Permission denied"
    UNKNOWN_ERROR = "Unknown error"