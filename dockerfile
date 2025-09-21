# Imagen base (ligera)
FROM python:3.11-alpine

# Evitar que Python guarde archivos .pyc
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Crear directorio en el contenedor
WORKDIR /app

# Instalar dependencias necesarias para Django + Pillow (para imágenes)
RUN apk add --no-cache build-base libffi-dev musl-dev zlib-dev jpeg-dev

# Copiar requerimientos e instalarlos
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el proyecto al contenedor
COPY . /app/

# Exponer el puerto
EXPOSE 8000

# Comando para ejecutar el servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
