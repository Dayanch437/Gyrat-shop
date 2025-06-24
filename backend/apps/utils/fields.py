import os
from functools import wraps

from django.core.files.base import ContentFile
from django.db import models
from django.db.models.fields.files import FieldFile
from django.db.models.fields.related_descriptors import ManyToManyDescriptor
from imagekit import ImageSpec
from PIL import Image, UnidentifiedImageError

from .files import upload_file


class CompressedImageSpec(ImageSpec):
    format = "WEBP"
    options = {"quality": 75}


class CompressedImageFile(FieldFile):
    def save(self, name, content, save=True):
        try:
            # Use the actual file object
            source = getattr(content, "file", content)

            # Check if it's GIF or SVG — skip compression
            if name.lower().endswith((".gif", ".svg")):
                return super().save(name, content, save)

            # Load image using Pillow
            image = Image.open(source)
            image_format = CompressedImageSpec.format

            compressed_image = ContentFile(b"")
            image.save(compressed_image, format=image_format, quality=75)

            base_name, _ = os.path.splitext(name)
            name = f"{base_name}.{image_format.lower()}"

            return super().save(name, compressed_image, save)

        except UnidentifiedImageError:
            pass

        return super().save(name, content, save)


class CompressedMixin:
    attr_class = CompressedImageFile

    def __init__(self, upload_to=upload_file, **kwargs):
        super().__init__(upload_to=upload_to, **kwargs)


class CompressedFileField(CompressedMixin, models.FileField):
    pass


class CompressedImageField(CompressedMixin, models.ImageField):
    pass
