# 🦷 مركز قنديل - Backend API

## الهيكلية

```
server/
├── package.json
├── .env.example
├── supabase-setup.sql
└── src/
    ├── config/
    │   └── index.js
    ├── controllers/
    │   ├── authController.js
    │   ├── servicesController.js
    │   ├── appointmentsController.js
    │   ├── notificationsController.js
    │   └── usersController.js
    ├── middleware/
    │   ├── auth.js
    │   └── validate.js
    ├── routes/
    │   ├── auth.js
    │   ├── services.js
    │   ├── appointments.js
    │   ├── notifications.js
    │   └── users.js
    ├── utils/
    │   ├── supabase.js
    │   └── validation.js
    └── index.js
```

## التشغيل

### 1. إعداد Supabase

1. أنشئ مشروع على [supabase.com](https://supabase.com)
2. انسخ الكود من `supabase-setup.sql` ونفذه في SQL Editor
3. احصل على:
   - `SUPABASE_URL` (من Settings > API)
   - `SUPABASE_SERVICE_KEY` (service_role)
   - `SUPABASE_ANON_KEY` (anon public)

### 2. إعداد البيئة

```bash
cd server
cp .env.example .env
# عدل .env بالقيم الصحيحة
```

### 3. تشغيل السيرفر

```bash
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - تسجيل حساب جديد
- `POST /api/auth/login` - تسجيل دخول
- `POST /api/auth/logout` - تسجيل خروج
- `GET /api/auth/profile` - بيانات المستخدم الحالي

### Services
- `GET /api/services` - قائمة الخدمات
- `GET /api/services/:id` - خدمة محددة
- `POST /api/services` - إضافة خدمة (أدمن)
- `PUT /api/services/:id` - تحديث خدمة (أدمن)
- `DELETE /api/services/:id` - حذف خدمة (أدمن)

### Appointments
- `POST /api/appointments` - حجز جديد
- `GET /api/appointments/my` - حجوزاتي
- `GET /api/appointments/:id` - تفاصيل الحجز
- `PUT /api/appointments/:id/cancel` - إلغاء الحجز
- `GET /api/appointments/doctor/:doctorId/slots?date=` - الأوقات المتاحة
- `GET /api/appointments/admin/all` - جميع الحجوزات (أدمن)
- `PUT /api/appointments/:id/status` - تحديث الحالة

### Notifications
- `GET /api/notifications` - إشعاراتي
- `PUT /api/notifications/read-all` - تحديد الكل كمقروء

### Users (Admin)
- `GET /api/users` - جميع المستخدمين
- `GET /api/users/doctors` - قائمة الأطباء
- `GET /api/users/stats` - إحصائيات لوحة التحكم
- `PUT /api/users/:id` - تحديث مستخدم
- `DELETE /api/users/:id` - تعطيل مستخدم

## الصلاحيات

| الدور | الخدمات | الحجوزات | المستخدمين | الإشعارات |
|-------|--------|----------|-----------|----------|
| patient | قراءة | حجز/إلغاء/قراءة | - | قراءة |
| doctor | قراءة | قراءة/تأكيد/إكمال | - | قراءة |
| admin | CRUD | CRUD | CRUD | CRUD |

## Headers Required

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```