# 🚀 justExpress

مجموعه‌ای از **چالش‌ها و پروژه‌های کوچک Express.js** برای تمرین عملی مفاهیم بک‌اند.  
هدف این ریپو یادگیری گام‌به‌گام Express با پروژه‌های واقعی و ساده است 💡

---

## 📁 ساختار پروژه

هر پوشه یک چالش یا پروژه‌ی جداگانه است:

```
justExpress/
├── express001/        # راه‌اندازی اولیه سرور
├── express002/        # مسیرها و پاسخ JSON
├── moviefanapi/       # API برای داده‌های فیلم
├── moviefansite/      # سایت ساده با Express و HTML
├── multerExpress/     # آپلود فایل با Multer
├── mysqlDB/           # اتصال و CRUD با MySQL
└── README.md
```

---

## ⚙️ نحوه اجرا

برای اجرای هر پروژه یا چالش:

```bash
# 1️⃣ کلون کردن پروژه
git clone https://github.com/AbolfazlAdhami/justExpress.git
cd justExpress

# 2️⃣ رفتن به پوشهٔ پروژهٔ موردنظر
cd express001

# 3️⃣ نصب وابستگی‌ها
npm install

# 4️⃣ اجرای سرور
npm start
# یا
node run dev 
```


---

## ✅ چک‌لیست چالش‌ها

### 📦 چالش‌های فعلی
| وضعیت | عنوان | توضیح |
|:------:|:------|:------|
| ✅ | **express001** | ساخت سرور پایه و پاسخ ساده |
| ✅ | **express002** | مدیریت مسیرها و ارسال پاسخ JSON |
| ✅ | **moviefanapi** | ساخت REST API برای فیلم‌ها |
| ✅ | **moviefansite** | سرور با View Engine و قالب HTML |
| ✅ | **multerExpress** | آپلود فایل با استفاده از Multer |
| ✅ | **mysqlDB** | اتصال به MySQL و پیاده‌سازی CRUD |

---

### ⚡ چالش‌های پیشنهادی (برای ادامه مسیر یادگیری)
| وضعیت | عنوان | توضیح کوتاه |
|:------:|:------|:-------------|
| ⬜️ | **MongoDB Challenge** | اتصال به MongoDB با Mongoose |
| ⬜️ | **Authentication (JWT)** | پیاده‌سازی ثبت‌نام، ورود و JWT |
| ⬜️ | **Session & Cookie** | مدیریت سشن و کوکی در Express |
| ⬜️ | **Validation** | اعتبارسنجی داده‌ها با Joi یا express-validator |
| ⬜️ | **Error Handling** | Middleware برای کنترل خطاها |
| ⬜️ | **Role-Based Access Control** | مجوزها و نقش‌ها (User / Admin) |
| ⬜️ | **Pagination & Filtering** | فیلتر، جستجو و صفحه‌بندی در API |
| ⬜️ | **File Upload Advanced** | آپلود پیشرفته (محدودیت نوع و اندازه) |
| ⬜️ | **Logging** | ثبت رویدادها با morgan و winston |
| ⬜️ | **Rate Limiting** | محدودسازی تعداد درخواست‌ها |
| ⬜️ | **CORS & Security Headers** | ایمن‌سازی با helmet و cors |
| ⬜️ | **Socket.io Challenge** | ایجاد ارتباط Real-Time (چت ساده) |
| ⬜️ | **Testing API (Jest + Supertest)** | نوشتن تست برای endpointها |
| ⬜️ | **OAuth / Google Login** | ورود با گوگل یا گیت‌هاب |
| ⬜️ | **Redis Cache** | کش کردن پاسخ‌ها برای بهبود سرعت |
| ⬜️ | **Nested Routing** | ماژولار کردن مسیرها و کنترلرها |
| ⬜️ | **Swagger API Docs** | مستندسازی خودکار APIها |
| ⬜️ | **EJS Template App** | پروژه با View Engine و EJS |
| ⬜️ | **GraphQL API** | ساخت API با GraphQL |
| ⬜️ | **Dockerized Express App** | اجرای پروژه در محیط Docker |

---

## 💡 نکات تکمیلی

- برای تست APIها از **Postman** یا **Thunder Client** استفاده کن.  
- هر چالش جدید رو با **README** مخصوص خودش مستند کن.  
- برای نظم بیشتر، از شاخه‌های جدا (`git branch`) برای هر چالش استفاده کن.  
- سعی کن در هر مرحله یک مفهوم جدید (Middleware, DB, Auth, Validation...) رو تمرین کنی.  

---

## 👨‍💻 نویسنده

**Abolfazl Adhami**  
🌐 [GitHub Profile](https://github.com/AbolfazlAdhami)

---

⭐ اگر این پروژه بهت کمک کرد، لطفاً ستاره‌اش کن تا بقیه هم راحت‌تر پیداش کنن :)
