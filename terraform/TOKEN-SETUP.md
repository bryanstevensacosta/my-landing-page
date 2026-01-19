# GitHub Token Setup Guide

## 🎯 Objetivo

Configurar el GitHub Personal Access Token de forma permanente para no tener que ingresarlo cada vez que uses Terraform.

## 📋 Opciones de Configuración

### Opción 1: Variable de Entorno en Shell Profile (Recomendado)

Esta es la forma más común y funciona en cualquier directorio.

#### Para Zsh (macOS/Linux moderno)

```bash
# 1. Editar tu archivo de perfil
nano ~/.zshrc

# 2. Agregar al final del archivo
export GITHUB_TOKEN="ghp_tu_token_aqui"

# 3. Guardar y recargar
source ~/.zshrc

# 4. Verificar
echo $GITHUB_TOKEN
```

#### Para Bash (Linux/macOS antiguo)

```bash
# 1. Editar tu archivo de perfil
nano ~/.bashrc  # o ~/.bash_profile en macOS

# 2. Agregar al final del archivo
export GITHUB_TOKEN="ghp_tu_token_aqui"

# 3. Guardar y recargar
source ~/.bashrc  # o source ~/.bash_profile

# 4. Verificar
echo $GITHUB_TOKEN
```

### Opción 2: Archivo .envrc con direnv (Más Seguro)

Esta opción carga el token automáticamente solo cuando estás en el directorio `terraform/`.

#### Instalar direnv

```bash
# macOS
brew install direnv

# Linux (Ubuntu/Debian)
sudo apt install direnv

# Agregar a tu shell
# Para Zsh
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
source ~/.zshrc

# Para Bash
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
source ~/.bashrc
```

#### Configurar .envrc

```bash
# 1. Ir al directorio terraform
cd terraform

# 2. Copiar el ejemplo
cp .envrc.example .envrc

# 3. Editar con tu token
nano .envrc

# Cambiar:
export GITHUB_TOKEN="ghp_tu_token_aqui"

# 4. Permitir que direnv lo use
direnv allow

# 5. Verificar (solo funciona dentro de terraform/)
echo $GITHUB_TOKEN
```

**Ventajas de direnv:**
- ✅ Token solo disponible en el directorio terraform/
- ✅ No contamina tu entorno global
- ✅ Más seguro si compartes tu computadora
- ✅ Fácil de desactivar (solo sal del directorio)

### Opción 3: Archivo terraform.tfvars (NO Recomendado)

⚠️ **ADVERTENCIA:** Esta opción NO es segura porque el archivo podría ser commiteado accidentalmente.

```hcl
# terraform/terraform.tfvars
github_token = "ghp_tu_token_aqui"
```

**Por qué NO usar esta opción:**
- ❌ Riesgo de commitear el token al repositorio
- ❌ Token visible en texto plano en el disco
- ❌ Difícil de rotar (hay que cambiar el archivo)

## 🔑 Crear un GitHub Personal Access Token

### Paso 1: Ir a GitHub Settings

1. Ve a: https://github.com/settings/tokens/new
2. O navega: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

### Paso 2: Configurar el Token

**Token name:** `Terraform Branch Protection`

**Expiration:** 
- Para uso personal: `No expiration` o `1 year`
- Para equipos: `90 days` (y rotar regularmente)

**Scopes requeridos:**
- ✅ `repo` - Full control of private repositories
  - ✅ `repo:status`
  - ✅ `repo_deployment`
  - ✅ `public_repo`
  - ✅ `repo:invite`
  - ✅ `security_events`
- ✅ `admin:repo_hook` - Full control of repository hooks
  - ✅ `write:repo_hook`
  - ✅ `read:repo_hook`

### Paso 3: Generar y Copiar

1. Click en "Generate token"
2. **IMPORTANTE:** Copia el token inmediatamente (solo se muestra una vez)
3. Guárdalo en un lugar seguro (password manager)

### Paso 4: Configurar según la Opción Elegida

Sigue los pasos de la opción que elegiste arriba.

## ✅ Verificar Configuración

### Verificar que el token está disponible

```bash
# Debe mostrar tu token (ghp_...)
echo $GITHUB_TOKEN

# Si no muestra nada, el token no está configurado
```

### Probar con Terraform

```bash
cd terraform

# Debe funcionar sin pedir el token
terraform plan

# Si pide el token, no está configurado correctamente
```

## 🔄 Rotar el Token

Es buena práctica rotar tokens periódicamente:

```bash
# 1. Crear nuevo token en GitHub (mismo proceso de arriba)

# 2. Actualizar según tu método:

# Opción 1 (Shell Profile):
nano ~/.zshrc  # Cambiar el valor de GITHUB_TOKEN
source ~/.zshrc

# Opción 2 (direnv):
cd terraform
nano .envrc  # Cambiar el valor de GITHUB_TOKEN
direnv allow

# 3. Verificar
echo $GITHUB_TOKEN

# 4. Revocar el token antiguo en GitHub
# https://github.com/settings/tokens
```

## 🗑️ Remover el Token

### Opción 1 (Shell Profile)

```bash
# 1. Editar perfil
nano ~/.zshrc

# 2. Eliminar o comentar la línea
# export GITHUB_TOKEN="..."

# 3. Recargar
source ~/.zshrc
```

### Opción 2 (direnv)

```bash
cd terraform
rm .envrc
# El token desaparece automáticamente
```

### Revocar en GitHub

1. Ve a: https://github.com/settings/tokens
2. Encuentra tu token
3. Click en "Delete" o "Revoke"

## 🔒 Mejores Prácticas de Seguridad

### ✅ DO

- ✅ Usar variables de entorno
- ✅ Usar direnv para scope limitado
- ✅ Rotar tokens regularmente (cada 90 días)
- ✅ Usar tokens con permisos mínimos necesarios
- ✅ Revocar tokens que ya no uses
- ✅ Guardar tokens en password manager
- ✅ Usar tokens diferentes para diferentes proyectos

### ❌ DON'T

- ❌ Commitear tokens al repositorio
- ❌ Compartir tokens con otros
- ❌ Usar el mismo token para todo
- ❌ Dejar tokens sin expiración en equipos compartidos
- ❌ Guardar tokens en archivos de texto plano
- ❌ Usar tokens con más permisos de los necesarios

## 🆘 Troubleshooting

### "Error: GET https://api.github.com/repos/...: 401 Bad credentials"

**Causa:** Token inválido o no configurado

**Solución:**
```bash
# Verificar que el token está configurado
echo $GITHUB_TOKEN

# Si está vacío, configurar según las opciones arriba
# Si tiene valor, el token puede estar expirado o revocado
# Crear un nuevo token
```

### "Error: GET https://api.github.com/repos/...: 403 Resource not accessible by integration"

**Causa:** Token no tiene los permisos necesarios

**Solución:**
1. Ir a https://github.com/settings/tokens
2. Editar el token
3. Asegurar que tiene los scopes: `repo` y `admin:repo_hook`
4. Guardar cambios

### "Error: GET https://api.github.com/repos/...: 404 Not Found"

**Causa:** Repositorio no existe o token no tiene acceso

**Solución:**
1. Verificar que `github_owner` y `repository_name` en `terraform.tfvars` son correctos
2. Verificar que el token tiene acceso al repositorio
3. Si es un repositorio de organización, asegurar que el token tiene acceso a la org

### El token desaparece al abrir nueva terminal

**Causa:** No está configurado en el shell profile

**Solución:**
- Seguir "Opción 1: Variable de Entorno en Shell Profile"
- Asegurar que agregaste la línea al archivo correcto (~/.zshrc o ~/.bashrc)
- Asegurar que ejecutaste `source ~/.zshrc`

## 📚 Referencias

- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Terraform GitHub Provider Authentication](https://registry.terraform.io/providers/integrations/github/latest/docs#authentication)
- [direnv Documentation](https://direnv.net/)
