# Generated by Django 5.1.1 on 2025-01-12 17:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Banner",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("title_tk", models.CharField(max_length=255, null=True)),
                ("title_en", models.CharField(max_length=255, null=True)),
                ("title_ru", models.CharField(max_length=255, null=True)),
                (
                    "image",
                    models.ImageField(
                        blank=True, null=True, upload_to="images/banners/"
                    ),
                ),
                ("sub_title", models.CharField(max_length=255)),
                ("sub_title_tk", models.CharField(max_length=255, null=True)),
                ("sub_title_en", models.CharField(max_length=255, null=True)),
                ("sub_title_ru", models.CharField(max_length=255, null=True)),
            ],
            options={
                "verbose_name": "Banner",
                "verbose_name_plural": "Banners",
            },
        ),
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("name_tk", models.CharField(max_length=100, null=True)),
                ("name_en", models.CharField(max_length=100, null=True)),
                ("name_ru", models.CharField(max_length=100, null=True)),
                ("description", models.TextField()),
                ("description_tk", models.TextField(null=True)),
                ("description_en", models.TextField(null=True)),
                ("description_ru", models.TextField(null=True)),
                ("date_created", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name_plural": "Categories",
            },
        ),
        migrations.CreateModel(
            name="Image",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        blank=True, null=True, upload_to="images/products/"
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Images",
            },
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("type", models.CharField(max_length=255)),
                ("type_tk", models.CharField(max_length=255, null=True)),
                ("type_en", models.CharField(max_length=255, null=True)),
                ("type_ru", models.CharField(max_length=255, null=True)),
                ("name", models.CharField(db_index=True, max_length=255)),
                ("name_tk", models.CharField(db_index=True, max_length=255, null=True)),
                ("name_en", models.CharField(db_index=True, max_length=255, null=True)),
                ("name_ru", models.CharField(db_index=True, max_length=255, null=True)),
                ("price", models.FloatField()),
                ("description", models.TextField()),
                ("description_tk", models.TextField(null=True)),
                ("description_en", models.TextField(null=True)),
                ("description_ru", models.TextField(null=True)),
                (
                    "image",
                    models.ImageField(
                        blank=True, null=True, upload_to="images/products/"
                    ),
                ),
                (
                    "category",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="products",
                        to="products.category",
                    ),
                ),
                ("images", models.ManyToManyField(blank=True, to="products.image")),
            ],
            options={
                "verbose_name": "Product",
                "verbose_name_plural": "Products",
            },
        ),
    ]
