from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from apps.products.models import Product,Category,Image,Banner
from apps.contact.models import Contact

# Register your models here.

class ImageAdmin(admin.TabularInline):
    model = Image
    min = 3
    extra = 3

class ProductAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    inlines = [ImageAdmin]
admin.site.register(Product,ProductAdmin)


admin.site.register(Category,ImportExportModelAdmin)
admin.site.register(Contact,ImportExportModelAdmin)
admin.site.register(Banner,ImportExportModelAdmin)
