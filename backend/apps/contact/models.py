from django.db import models
from util.validator import validate_email


class Contact(models.Model):
    username = models.CharField(max_length=255)
    gmail = models.EmailField(max_length=200, validators=[validate_email])
    comment = models.TextField()
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=6, blank=True, null=True)

    def __str__(self):
        return f"{self.username}: {self.comment}"

    class Meta:
        verbose_name = 'contact'
        verbose_name_plural = 'contacts'
