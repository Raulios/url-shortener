# Generated by Django 4.0.5 on 2022-06-19 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_shortenedurl_short_url_shortenedurlstatperday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shortenedurlstatperday',
            name='date',
            field=models.DateField(max_length=100),
        ),
        migrations.AlterField(
            model_name='shortenedurlstatperday',
            name='number_of_clicks',
            field=models.IntegerField(default=1),
        ),
    ]
