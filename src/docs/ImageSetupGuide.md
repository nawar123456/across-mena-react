# دليل إعداد الصور للمدونة

## 🔧 حل مشكلة عدم ظهور الصور

### المشكلة:
الصور لا تظهر في BlogCard لأن المسارات غير صحيحة أو الصور غير موجودة.

### الحل:

#### 1. **نسخ الصور إلى مجلد public/images**

```bash
# انسخ الصور من مجلد assets إلى public/images
cp src/assets/images/HeroHome.png public/images/
cp src/assets/images/other-images.png public/images/
```

#### 2. **إنشاء صور افتراضية**

أنشئ هذه الصور في مجلد `public/images/`:

- `default-blog-image.jpg` - صورة افتراضية للمقالات
- `default-avatar.jpg` - صورة افتراضية للمؤلفين
- `blog-featured.jpg` - صورة مميزة للمدونة

#### 3. **تحديث مسارات الصور في البيانات**

```javascript
// في src/data/blogArticles.js
{
  featuredImage: '/images/HeroHome.png', // ✅ صحيح
  author: {
    avatar: '/images/HeroHome.png', // ✅ صحيح
  }
}
```

#### 4. **صور مقترحة للمقالات**

يمكنك استخدام هذه الصور من مجلد `src/assets/images/`:

- `HeroHome.png` - للصور المميزة
- أي صورة أخرى مناسبة من مجلد assets

#### 5. **إنشاء صور جديدة**

إذا كنت تريد صور مخصصة:

```javascript
// في src/data/blogArticles.js
{
  featuredImage: '/images/syria-shipping.jpg',
  author: {
    avatar: '/images/team-member.jpg',
  }
}
```

ثم أضف هذه الصور إلى `public/images/`

### 📁 هيكل المجلدات المطلوب:

```
public/
├── images/
│   ├── HeroHome.png ✅ (موجود)
│   ├── default-blog-image.jpg (أنشئه)
│   ├── default-avatar.jpg (أنشئه)
│   ├── blog-featured.jpg (أنشئه)
│   └── أي صور أخرى للمقالات
```

### 🔍 التحقق من الصور:

1. **تأكد من وجود الصور في public/images/**
2. **تحقق من المسارات في البيانات**
3. **اختبر في المتصفح**

### 💡 نصائح:

- استخدم صور بحجم مناسب (800x400 للمقالات)
- ضغط الصور لتحسين الأداء
- استخدم تنسيقات WebP للصور الحديثة
- أضف alt text مناسب للصور

### 🚀 بعد إصلاح الصور:

ستظهر الصور بشكل صحيح في:
- ✅ BlogCard (بطاقات المقالات)
- ✅ صفحة تفاصيل المقالة
- ✅ SEO images

---

**بعد تطبيق هذه الخطوات، ستظهر جميع الصور بشكل صحيح!** 🎉


