from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit
from utils import validate_image
from apps.utils.models import BaseModel
from apps.utils.fields import CompressedImageField

class Category(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(BaseModel):
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name='products',null=True,blank=True)
    name = models.CharField(max_length=255,db_index=True)
    price = models.FloatField()
    image = CompressedImageField()
    description = models.TextField()
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Products"
        verbose_name = "Product"


class Image(BaseModel):
    image = CompressedImageField(upload_to='products/images', null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True,blank=True,related_name='images')
    class Meta:
        verbose_name_plural = 'Images'



class Banner(BaseModel):
    title = models.CharField(max_length=255)
    image = CompressedImageField()
    sub_title = models.CharField(max_length=255)

    def __str__(self):
        return self.title
