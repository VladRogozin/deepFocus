from django.db import models

class Mix(models.Model):  # Изменено имя модели
    title = models.CharField(max_length=200, unique=True)  # Добавлена уникальность

    def __str__(self):
        return self.title  # Теперь объект будет отображаться как его заголовок


class MixAudio(models.Model):
    name = models.CharField(max_length=200, unique=True)
    audio = models.FileField(upload_to='audio/lofi', blank=True, null=True)
    mix = models.ForeignKey(Mix, on_delete=models.CASCADE)  # Изменено имя поля

    def __str__(self):
        return self.name  # Теперь объект будет отображаться как его имя


class MixRoom(models.Model):  # Изменено имя модели
    description = models.TextField()  # Удалено max_length
    mix = models.ForeignKey(Mix, on_delete=models.CASCADE)  # Изменено имя поля
    image = models.ImageField(upload_to='images/lofi', blank=True, null=True)

    def __str__(self):
        return self.description  # Теперь объект будет отображаться как его описание


class Dialogue(models.Model):
    thema = models.CharField(max_length=200, unique=True)  # Добавлена уникальность
    room = models.ForeignKey(MixRoom, on_delete=models.CASCADE)

    def __str__(self):
        return self.thema  # Теперь объект будет отображаться как его тема


class Message(models.Model):
    name = models.CharField(max_length=200)
    message = models.TextField()  # Удалено max_length
    dialogue = models.ForeignKey(Dialogue, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}: {self.message[:50]}'


class Character(models.Model):
    audio = models.FileField(upload_to='audio/lofi/character', blank=True, null=True)
    image = models.ImageField(upload_to='images/lofi/character', blank=True, null=True)
    name = models.CharField(max_length=200)
    message = models.TextField()
    room = models.ForeignKey(MixRoom, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}: {self.name}'


class QuestionAnswer(models.Model):
    question = models.TextField()
    answer = models.TextField()
    character = models.ForeignKey(Character, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.question}: {self.question}'