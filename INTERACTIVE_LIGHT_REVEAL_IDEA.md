# 💡 İnteraktiv İşıq/Alov İzləmə və Gizli Vizual Açılma İdeyası (TouchDesigner / CV Light Reveal)

> **Status:** 🟡 Gələcək Konsept / Perspektiv İdeya  
> **Hədəf Layihə:** `_private-workspace\z-other\yes-or-yes`  
> **Tarix:** 2026-10-21  
> **İdarəetmə:** SuperAdmin Konsolu (Aktiv / Deaktiv Toggle)  

---

## 📌 1. Xülasə və Konsepsiya

Bu funksionallıq **TouchDesigner** üslublu vizual qovşaq (Texture Operators — TOP) məntiqinə və real-vaxt kompüter görməsinə (**Real-time Computer Vision**) əsaslanır. Ağır süni intellekt və ya mürəkkəb ML modelləri olmadan, ən ucuz, sıfır gecikməli (**low-latency**) və yüksək dəqiqlikli işıq aşkarlama texnologiyasıdır.

İstifadəçi ekrana çaxmaq alovu və ya güclü işıq mənbəyi (fənər) yaxınlaşdırdıqda, kamera həmin alovun koordinatlarını hesablayır və ekrandakı qaranlıq qatın arxasındakı gizli vizualı (məsələn: gizli sevgi mesajı, "Yes" təsdiqi və ya xüsusi animasiya) işıq tutulan hissədə parıldadaraq açır.

---

## ⚙️ 2. Texniki İşləmə Mexanizmi (Addım-addım)

```text
  [ 📷 Veb-kamera ] ──> [ 🔆 Parlaqlıq Filtri ] ──> [ 🎯 (X, Y) Koordinat ]
  (Video Device In)      (Threshold / Luma)           (Blob Centroid)
                                                            │
                                                            ▼
  [ 🖼️ Gizli Vizual ] <── [ 🎭 Dinamik Alpha Maska ] <── [ 💫 Feedback & Blur ]
   (Alov Görünən Yer)      (Matte / Composite)         (Yumşaq İzləmə & Sönmə)
```

### 1. Giriş: Veb-kamera (`Video Device In` / `getUserMedia`)
* Cihazın daxili kamerası canlı video yayımını oxuyur.
* Kamera ekrana yox, qarşıdakı istifadəçiyə baxır. Çaxmaq ekrana yaxın tutulduqda alov birbaşa kameranın görmə bucağına düşür.

### 2. Alovun / İşıq Nöqtəsinin Tapılması (`Thresholding`)
* **Parlaqlıq Filtri (`Threshold TOP` / Luma Filter):** Şəkildəki ən parlaq nöqtələri seçmək üçün yüksək lüminans həddi qoyulur:
  $$\text{Luminance} = 0.299R + 0.587G + 0.114B > \text{Threshold}$$
* Ətraf mühit orta işıqlı olduğundan, çaxmağın alovu kadrda ağ/parlaq ləkə, digər hər yer isə qara qalır.
* **Koordinatların Çıxarılması (`Blob Tracking`):** Ən parlaq ağ ləkənin ağırlıq mərkəzi hesablanaraq ekranın $(X, Y)$ koordinat sisteminə çevrilir. Kamera güzgü əksindədirsə, $X$ oxu `Flip` edilir.

### 3. Dinamik Maskalama və İzləmə (`Feedback & Blur`)
* Tapılan $(X, Y)$ mərkəzində yumşaq radial ləkə yaradılır.
* **`Blur`:** Kənarların kəskinliyini itirib təbii işıq haləsi (glow) alması üçün kənar yayılması verilir.
* **`Feedback`:** Çaxmaq kənarlaşdırıldıqda işığın qəfil kəsilməməsi, alovun reallıqdakı kimi asta-asta sönməsi (decay/fade-out) effekti təmin edilir.

### 4. Qatların Birləşdirilməsi (`Masking / Composite`)
* **Altdakı qat:** Qaranlıq ekran və ya standart oyun vizualı.
* **Üstdəki qat:** Gizli loqo, xüsusi yazı və ya vizual effekt.
* **Aradakı maska:** İşıq haradadırsa, maskanın ağ hissəsi altındakı məzmunu görünən edir, qara hissələr isə gizli saxlayır.

---

## 🎛️ 3. SuperAdmin İdarəetmə Paneli (Aktiv / Deaktiv)

Gələcəkdə bu funksionallıq layihəyə inteqrasiya edildikdə SuperAdmin konsolundan idarə olunacaq:

```javascript
// Gələcək Konfiqurasiya Sxemi (SuperAdmin Settings)
const LIGHT_REVEAL_CONFIG = {
  // Əsas xüsusiyyət açarı (Feature Flag)
  enabled: false, // SuperAdmin bu funksiyanı istədiyi vaxt yandırıb-söndürə bilər
  
  // Kamera və Həssaslıq Tənzimləmələri
  cameraFacingMode: "user",      // Daxili ön kamera
  luminanceThreshold: 240,       // 0-255 parlaqlıq həddi (yalnız alov və güclü fənər)
  blobMinRadius: 15,             // Minimum işıq radiusu
  blurRadius: 45,                // Halə yumşaqlığı
  decayRate: 0.92,               // Feedback sönmə sürəti (0.0 dərhal, 0.98 çox yavaş)
  
  // Hədəf Kontent
  revealedLayerId: "secret-love-message", // İşıqla açılacaq gizli element
  mirrorX: true                  // Güzgü əksi (istifadəçi sağa tutanda sağda açılsın)
};
```

### SuperAdmin İdarəetmə İxtiyarı:
1. **1 Kliklə ON/OFF:** Tətbiq daxilində və ya SuperAdmin panelində `Light Reveal Engine` xüsusi toggle açarı ilə idarə olunur.
2. **Fallback Rejimi:** Funksiya deaktiv olduqda və ya istifadəçi kamera icazəsi vermədikdə, oyun standart toxunma/maus hover rejimi ilə problemsiz işləməyə davam edir.
3. **Kalibrasiya:** Otağın işıq səviyyəsinə görə alovun aşkarlanma həddini (Threshold) interaktiv tənzimləmə imkanı.
