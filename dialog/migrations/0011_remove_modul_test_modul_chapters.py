# Generated by Django 5.0.7 on 2024-08-05 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dialog', '0010_alter_modul_test'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='modul',
            name='test',
        ),
        migrations.AddField(
            model_name='modul',
            name='chapters',
            field=models.ManyToManyField(blank=True, to='dialog.chapter'),
        ),
    ]
