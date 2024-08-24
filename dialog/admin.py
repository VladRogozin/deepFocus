from django.contrib import admin
from .models import Chapter, DialogueElement, Test, Modul


class DialogueElementInline(admin.TabularInline):
    model = DialogueElement
    extra = 1


class ChapterAdmin(admin.ModelAdmin):
    inlines = [DialogueElementInline]


class TestAdmin(admin.ModelAdmin):
    list_display = ('title', 'antwort', 'variant_1', 'variant_2', 'variant_3')
    search_fields = ('title', 'antwort', 'variant_1', 'variant_2', 'variant_3')

class ModulAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')  # Удален 'test'
    search_fields = ('title', 'description')
    filter_horizontal = ('chapters',)  # Обновлено для ManyToManyField

admin.site.register(Modul, ModulAdmin)


admin.site.register(Chapter, ChapterAdmin)
admin.site.register(DialogueElement)
admin.site.register(Test, TestAdmin)