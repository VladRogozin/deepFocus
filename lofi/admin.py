from django.contrib import admin
from .models import Mix, MixAudio, MixRoom, Dialogue, Message

# Inline для аудиофайлов
class MixAudioInline(admin.TabularInline):
    model = MixAudio
    extra = 1  # Количество пустых форм для добавления новых аудиофайлов

# Inline для комнат
class MixRoomInline(admin.StackedInline):
    model = MixRoom
    extra = 1  # Количество пустых форм для добавления новых комнат

# Админка для модели Mix с встроенными комнатами и аудио
class MixAdmin(admin.ModelAdmin):
    inlines = [MixRoomInline, MixAudioInline]  # Включаем инлайн комнат и аудио

# Админка для модели Dialogue с встроенными сообщениями
class MessageInline(admin.TabularInline):
    model = Message
    extra = 1  # Количество пустых форм для добавления новых сообщений

class DialogueAdmin(admin.ModelAdmin):
    inlines = [MessageInline]
    list_display = ['thema', 'room']  # Отображение темы диалога и связанной комнаты
    list_filter = ['room']  # Фильтр по комнате
    search_fields = ['thema']  # Поиск по теме диалога

# Админка для модели MixRoom
class MixRoomAdmin(admin.ModelAdmin):
    list_display = ['description', 'mix']  # Отображение описания комнаты и связанного микса
    search_fields = ['description']  # Поиск по описанию

# Регистрация моделей в админке
admin.site.register(Mix, MixAdmin)
admin.site.register(MixRoom, MixRoomAdmin)
admin.site.register(Dialogue, DialogueAdmin)


