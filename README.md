# Sanatografi Tiyatrosu resmi mobil uygulaması

Bu proje Sanatografi tiyatrosu için geliştirdiğimiz React Native tabanlı mobil uygulamasının kaynak kodlarını barındırmaktadır. React Native ile geliştirme yaparken örnek alabilirsiniz.

Sanatografi tiyatrosu hakkında detaylı bilgi almak isterseniz : www.sanatografi.com

## Alt Yapı

Projede React ve React Native ana alt yapısına ek olarak şu kütüphaneler kullanıldı :

* wix/react-native-navigation
* redux
* redux-saga
* nativebase


## Uygulamayı çalıştırmak için

**React Native kurulumu**

Geliştirme ortamınızda React Native kurulu değilse aşadağıki linklerden kurulum yapabilirsiniz.

Windows için : https://medium.com/mol42/windows-%C3%BCzerinde-react-native-kurulumu-4de15e0e33b9

MacOS için : https://medium.com/mol42/macos-%C3%BCzerinde-react-native-kurulumu-71d4f96c282e

Linux için : https://medium.com/mol42/linux-%C3%BCzerinde-react-native-kurulumu-a61b54927941


Kurulum yaptıktan sonra ilk olarak terminalde scripts folderi altındaki `start_mock_server.sh` dosyasını çalıştırmanız gerekiyor, bu sayede mock
data sağlayan lokal sunucu ayağa kalkacak ve uygulama bu mock datalar üzerinden incelenebilir hale gelecek.

iOS için `react-native run-ios`

Android için `react-native run-android` komutunu vererek simulatör veya emulatörde uygulamayı çalıştırabilirsiniz.

**Not :** Android emulatörü geliştirme ortamında farklı bir local adresleme kullandığı için configureApi.js dosyasında
yer alan `localhost` adresini `10.0.2.2` olarak değiştirmeniz gerekiyor !


## Geliştirici Ekip

* Buğra Çakır

## İletişim için

www.mol42.com

info[at]mol42.co.uk

tayfun[at]mol42.com
