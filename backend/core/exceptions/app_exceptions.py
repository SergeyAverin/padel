class DocumentNotFound(Exception):
    ''' Исключение вызываемое если объект не найден. '''

    def __str__(self):
        return "Document is not found."
