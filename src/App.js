/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin
import React from 'react'
import { useState } from 'react'
// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin
import './App.css'
import sahteVeri from './sahte-veri'
import Gönderiler from './bileşenler/Gönderiler/Gönderiler'
import AramaÇubuğu from './bileşenler/AramaÇubuğu/AramaÇubuğu'

const App = () => {
  const [gonderiler, setGonderiler] = useState(sahteVeri)
  const [aramaKriteri, setAramaKriteri] = useState('')
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.

  const aramaOnChange = (e) => {
    setAramaKriteri(e.target.value)
    const aramaGirdisi = () => {
      !aramaKriteri || aramaKriteri.length === 0
        ? setGonderiler(sahteVeri)
        : setGonderiler(
            gonderiler.filter(
              (e) => e.username.indexOf(aramaKriteri.trim().toLowerCase()) >= 0
            )
          )
    }
    aramaGirdisi()
  }

  const gonderiyiBegen = (gonderiID) => {
    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

	  "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */

    const postArray = []
    gonderiler.map((e) => {
      if (e.id == gonderiID) {
        e.likes += 1
      }
      postArray.push(e)
      console.log(gonderiler + 'gonderi')
    })
    setGonderiler(postArray)
  }

  return (
    <div className="App">
      {/* AramaÇubuğu ve Gönderiler'i render etmesi için buraya ekleyin */}
      <AramaÇubuğu aramaOnChange={aramaOnChange} />

      <Gönderiler gonderiyiBegen={gonderiyiBegen} gonderiler={gonderiler} />

      {/* Her bileşenin hangi proplara ihtiyaç duyduğunu kontrol edin, eğer ihtiyaç varsa ekleyin! */}
    </div>
  )
}

export default App
