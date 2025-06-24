import os
import uuid

from django.core.files.uploadedfile import TemporaryUploadedFile


def upload_file(instance: TemporaryUploadedFile, filename: str) -> str:
    path = type(instance).__name__.lower()

    filename, ext = filename.rsplit(".", 1)
    filename = f"{uuid.uuid4()}.{ext}"

    return os.path.join(path, filename)
