# DersAI · Yapay Zeka ile Türkçe Dersler

Hikâye, şarkı, etkileşimli etkinlikler ve yazdırılabilir materyallerle Türkçe öğretimi.

**[Ana sayfayı aç](https://savasabd.github.io/dersai/)** · [36 derslik liste](https://savasabd.github.io/dersai/dersler.html)

## Hazır dersler

- **[Renkler](https://savasabd.github.io/dersai/Renkler/index.html)** — Renklerini Kaybeden Köy. Hikâye, şarkı, sekiz aşamalı sınıf akışı, TR/FR renk kartları, A4 materyaller ve ileri alternatifler.
- **[Sayılar](https://savasabd.github.io/dersai/Sayilar/index.html)** — Bay Numara ve Şenlik Treni. Hikâye, şarkı, sekiz aşamalı akış, sayı tahmin oyunu, sayı kartları, 35 sözcüklük bulmaca, A4 formlar ve ileri alternatifler.

## Depo düzeni

```text
index.html        Ana sayfa ve ders listesi
dersler.html      Aynı ders listesi için korunmuş bağlantı
README.md         Projeyi kullanma ve yayımlama bilgileri
404.html          Taşınan eski ders bağlantılarını yeni konuma yönlendirir
.nojekyll         GitHub Pages statik yayın ayarı
Renkler/          Renkler dersine ait bütün sayfalar, video ve materyaller
Sayilar/          Sayılar dersine ait bütün sayfalar, video ve materyaller
```

Yeni dersler kendi klasörlerine eklenir; ana sayfadaki ders listesinde açılır. Hazır iki ders, toplam 36 konuluk planın parçasıdır.

## Kullanma

Ders listesi için ana sayfayı, sınıfta ders işlemek için ilgili ders kartını açın. Etkinlikler aşama menüsünden, yazdırılabilir PDF dosyaları ilgili aşama veya materyal sayfasından açılır. Öğretmen notları yalnızca kullanılan tarayıcıda saklanır.

Yerelde deponun kök klasöründe `python -m http.server 8000` çalıştırıp `http://localhost:8000/` adresini açabilirsiniz. GitHub Pages ayarı `main / (root)` olarak kalır.

Bu depo tarayıcıda kullanılan hazır ders yayınını içerir. Model ağırlıkları, özel ses referansları ve öğrenci kayıtları depoda bulunmaz.
