# Sanatografi Tiyatrosu resmi mobil uygulaması

Bu proje Sanatografi tiyatrosu için geliştirdiğimiz React Native tabanlı mobil uygulamasının kaynak kodlarını barındırmaktadır. 

Sanatografi tiyatrosu hakkında detaylı bilgi almak isterseniz : www.sanatografi.com

## Alt Yapı

Projede React ve React Native ana alt yapısına ek olarak şu kütüphaneler kullanıldı :

* wix/react-native-navigation
* redux
* redux-saga
* nativebase

## Uygulamayı çalıştırmak için

Öncelikle terminalde scripts folderi altındaki `start_mock_server.sh` dosyasını çalıştırmanız gerekiyor, bu sayede mock
data sağlayan lokal sunucu ayağa kalkacak ve uygulama bu mock datalar üzerinden incelenebilir hale gelecek.

iOS için `react-native run-ios`

Android için `react-native run-android` komutunu vererek simulatör veya emulatörde uygulamayı çalıştırabilirsiniz.

**Not :** Android emulatörü geliştirme ortamında farklı bir local adresleme kullandığı için configureApi.js dosyasında
yer alan `localhost` adresini `10.0.2.2` olarak değiştirmeniz gerekiyor !

## Geliştirici Ekip

* Buğra Çakır

## İletişim için

info[at]mol42.co.uk

tayfun[at]mol42.com
