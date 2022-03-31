from django.contrib import admin
from .models import Shp

class ShpAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(Shp, ShpAdmin)

