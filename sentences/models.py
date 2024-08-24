from django.db import models


class Playlist(models.Model):
    """Плейлист, содержащий слова и предложения."""
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Sentence(models.Model):
    """Модель для предложений."""
    german_sentence = models.TextField()
    translation = models.TextField()
    playlist = models.ForeignKey(Playlist, related_name='sentences', on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='images/game/sentence', blank=True, null=True)
    audio = models.FileField(upload_to='audio/game/sentence', blank=True, null=True)

    def __str__(self):
        return self.german_sentence


class Word(models.Model):
    """Модель для слов."""
    german_word = models.CharField(max_length=100)  # Изменено с german_sentence на german_word
    translation = models.CharField(max_length=100)
    playlist = models.ForeignKey(Playlist, related_name='words', on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='images/game/word', blank=True, null=True)
    audio = models.FileField(upload_to='audio/game/word', blank=True, null=True)  # Исправлено на правильный путь

    def __str__(self):
        return self.german_word  # Изменено на german_word для слов


