# Generated by Django 4.0.5 on 2022-06-19 16:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ShortedUrl',
            new_name='ShortenedUrl',
        ),
    ]