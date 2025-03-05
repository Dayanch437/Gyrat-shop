from modeltranslation.translator import register, TranslationOptions
from .models import Product,Category,Banner


@register(Product)
class ProductTranslationOptions(TranslationOptions):
    fields = ('type','name','description')

@register(Category)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name','description')

@register(Banner)
class BannerTranslationOptions(TranslationOptions):
    fields = ['title','sub_title']

