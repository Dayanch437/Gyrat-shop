from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit
from utils import validate_image
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name



class Product(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name='products',null=True,blank=True)
    type = models.CharField(max_length=255)
    name = models.CharField(max_length=255,db_index=True)
    price = models.FloatField()
    # image = models.ImageField(upload_to='products/%Y/%m/%d/',null=True,blank=True)
    image = ProcessedImageField(
        validators=[validate_image],

        upload_to='category',
        processors=[ResizeToFit(800, 800)],  # Resize image (max width/height: 800px)
        format='WEBP',  # Convert to WebP
        options={'quality': 100},  # Adjust quality (0-100, lower = more compression)
    )
    description = models.TextField()
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Products"
        verbose_name = "Product"


class Image(models.Model):
    image = ProcessedImageField(
        validators=[validate_image],

        upload_to='images',
        processors=[ResizeToFit(800, 800)],  # Resize image (max width/height: 800px)
        format='WEBP',  # Convert to WebP
        options={'quality': 100},  # Adjust quality (0-100, lower = more compression)
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True,blank=True,related_name='images')
    class Meta:
        verbose_name_plural = 'Images'



class Banner(models.Model):
    title = models.CharField(max_length=255)
    # image = models.ImageField(upload_to='images/banners/',blank=True, null=True)
    image = ProcessedImageField(
        # validators=[validate_image],

        upload_to='banners',
        processors=[ResizeToFit(800, 800)],  # Resize image (max width/height: 800px)
        format='WEBP',  # Convert to WebP
        options={'quality': 100},  # Adjust quality (0-100, lower = more compression)
    )
    sub_title = models.CharField(max_length=255)

    def __str__(self):
        return self.title
