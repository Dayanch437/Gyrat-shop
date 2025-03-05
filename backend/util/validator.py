from django.core.exceptions import ValidationError

def validate_video_extension(value):
    valid_extensions = ['.mp4', '.avi', '.webb']
    if not value.name.lower().endswith(tuple(valid_extensions)):
        raise ValidationError('Unsupported file extension. Please upload a video in MP4, AVI, or MOV format.')

def validate_image(value):
    if not value.name.lower().endswith(('.jpg', '.jpeg', '.png',"svg")):
        raise ValidationError('Unsupported file extension. Please upload an image file.')



def validate_email(value):
    allowed_domains = (
        "@gmail.com",  # Google-yň giňden ulanylýan e-poçta hyzmaty
        "@yahoo.com",  # Şahsy we iş maksatlary üçin giňden ulanylýan e-poçta domeni
        "@outlook.com",  # Microsoft-yň e-poçta platformasy
        "@hotmail.com",  # Microsoft-yň hyzmatlarynyň bir bölegi
        "@mail.ru",  # Türkmenistanda we beýleki GDA ýurtlarynda meşhur
        "@icloud.com",  # Apple-yň e-poçta hyzmaty
        "@aol.com",  # Dünýäniň käbir ulanyjylary tarapyndan henizem ulanylýar
        "@protonmail.com",  # Howpsuz we şifrlenen e-poçtalar üçin ulanylýar
        "@zoho.com",  # Iş e-poçtalary üçin ulanylýan domen
        "@online.tm",  # Türkmenistanda Türkmen Telekom tarapyndan hödürlenýär
        "@sanly.tm",  # Döwlet ýa-da IT taslamalary bilen bagly domen
        "@tmcell.tm",  # TMCell, ýerli aragatnaşyk operatory bilen bagly
        "@turkmentelecom.tm",  # Türkmenistanyň döwlet eýeçiligindäki aragatnaşyk kompaniýasy bilen bagly
        "@agt.tm",  # Ahal welaýaty ýa-da Aşgabat bilen bagly sebitleýin domen
        "@pochta.tm"  # Ýerli poçta ýa-da e-poçta hyzmatlaryna degişli bolup biler
    )

    if not value.endswith(allowed_domains):
        raise ValidationError(f"Email must end with one of the following: {', '.join(allowed_domains)}")
