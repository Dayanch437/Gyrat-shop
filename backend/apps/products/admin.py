from import_export.admin import ImportExportModelAdmin
from unfold.admin import ModelAdmin as UnfoldAdmin, TabularInline
from django.contrib import admin
from apps.products.models import Product, Category, Image, Banner
from apps.contact.models import Contact

class ImageInline(TabularInline):
    model = Image
    extra = 3
    min_num = 3
    fields = ['image']  # ✅ ensure this is visible in admin

class ProductAdmin(UnfoldAdmin, ImportExportModelAdmin):
    inlines = [ImageInline]

admin.site.register(Product, ProductAdmin)
admin.site.register(Category, ImportExportModelAdmin)
admin.site.register(Contact, ImportExportModelAdmin)
admin.site.register(Banner, ImportExportModelAdmin)
