# EmailJS Setup Instructions

## Настройка отправки формы через EmailJS

### Шаг 1: Создайте аккаунт на EmailJS
1. Перейдите на https://www.emailjs.com/
2. Зарегистрируйтесь или войдите в аккаунт
3. Перейдите в Dashboard

### Шаг 2: Создайте Email Service
1. В Dashboard перейдите в "Email Services"
2. Нажмите "Add New Service"
3. Выберите ваш email провайдер (Gmail, Outlook, и т.д.)
4. Следуйте инструкциям для подключения
5. Запишите **Service ID**

### Шаг 3: Создайте Email Template
1. Перейдите в "Email Templates"
2. Нажмите "Create New Template"
3. Используйте следующий шаблон:

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from RevOrgs contact form.
```

4. Сохраните и запишите **Template ID**

### Шаг 4: Получите Public Key
1. Перейдите в "Account" → "General"
2. Найдите "Public Key" (API Key)
3. Скопируйте ключ

### Шаг 5: Обновите код
Откройте `components/Contact.tsx` и замените:

```typescript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

### Альтернатива: Использование переменных окружения

Создайте файл `.env.local`:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

И обновите `components/Contact.tsx`:
```typescript
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

### Примечание
Если EmailJS не настроен, форма автоматически откроет mailto ссылку как резервный вариант.

