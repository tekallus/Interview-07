import axios from "axios";
import React, { useState, useEffect } from "react";


//Bu soruda, rastgele kullanıcıların aranabilir bir listesini render etmemiz istiyor.
// API Icin iki farkli yontemden biri ni kulllarak ilgili yre istek gonderip verileri cekelim 
// verileri kayit etmek icin bir useState tanimlayalim
 // datalar geldi simdi kullanıcıların adlarını filtrelemek için handleSearch fonksiyonunu tanimlayalim
 // tailwind den css leri kullaratak return kismini duzenlleyelim
 // inputicin gerekli proplari set edelim
 //  her bir kullanıcı için bir <li> öğesi oluşturmak icin {filteredUsers.map((user) => ( ... ))} bir javasript  ifadesi kulllanalim

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect, bileşenin her yeniden render edildiğinde çalışacak bir etkileşim fonksiyonunu temsil eder.
  // Bu useEffect, bileşen yüklendiğinde (başlatıldığında) bir kez çalışacak.
  // istek yonetecegimiz icin useEffect kullaniyoruz. useEffect(()=>{},[])
  useEffect(() => {
    // fetchUsers adında bir fonksiyon tanımlıyoruz. Bu fonksiyon, kullanıcı verilerini API'den çekmek için kullanılacak.
    const fetchUsers = async () => {
      try {
        // axios.get ile belirtilen URL'den (randomuser.me/api) veri almak için bir GET isteği gönderiyoruz.
        const response = await axios.get("https://randomuser.me/api?results=5");
        console.log(response.data.results)
        // API'den gelen veri, response değişkeninde bulunur. response.data, bu verilerin kendisini temsil eder.
        // response.data.results, kullanıcılarımızı içeren bir dizi obje içerir.
        // setUsers, kullanıcıları state değişkenine (users) ayarlamak için kullanılır. Bu, kullanıcıların bileşende kullanılabilir hale gelmesini sağlar.
        setUsers(response.data.results);
        // setFilteredUsers, başlangıçta filtrelenmiş kullanıcıları temsil eden state değişkenini (filteredUsers) ayarlar.
        // Bu, başlangıçta kullanıcıların tam listesini filtrelemeden göstermek için kullanılır.
        setFilteredUsers(response.data.results);
      } catch (error) {
        // API'den veri alırken bir hata oluşursa, hata konsola yazdırılır.
        console.error("Error fetching users:", error);
      }
    };

    // fetchUsers fonksiyonunu çağırarak, bileşenin başlangıcında kullanıcıları getirmeye çalışıyoruz.
    fetchUsers();
  }, []); // useEffect'in ikinci parametresi, bağımlılıkları temsil eder. Boş bir dizi verilerek, bu useEffect'in yalnızca bileşenin başlangıcında çalışması sağlanır.


  // alternaitif kullanim:
  //useEffect(() => {
  // const fetchUsers = () => {
  //   fetch("https://randomuser.me/api?results=5")
  //     .then((response) => {
  //      if (!response.ok) {
  //        throw new Error("Network response was not ok");
  //      }
  //      return response.json();
  //    })
  //    .then((data) => {
  //      setUsers(data.results);
  //     setFilteredUsers(data.results);
  //    })
  //    .catch((error) => {
  //      console.error("Error fetching users:", error);
  //   });
  //  };

  //  fetchUsers();
  //  }, []);

  // handleSearch adında bir fonksiyon tanımlıyoruz. Bu fonksiyon, kullanıcıların adlarını filtrelemek için kullanılacak.
  const handleSearch = (e) => {
    // Kullanıcının girdiği metni alıyoruz ve küçük harfe dönüştürüyoruz. Böylece büyük/küçük harf duyarlılığını kaldırmış oluyoruz.
    const term = e.target.value.toLowerCase();
    // setSearchTerm, kullanıcının girdiği terimi state değişkenine (searchTerm) ayarlar. Bu, input alanında görüntülenen metni günceller.
    setSearchTerm(term);
    // Kullanıcıları filtrelemek için, users dizisini kullanarak filter fonksiyonunu kullanıyoruz.
    // Bu filter fonksiyonu, her bir kullanıcıyı alır ve belirtilen terimle (küçük harfe dönüştürülmüş) adlarını, başlıklarını veya soyadlarını karşılaştırır.
    const filtered = users.filter(
      (user) =>
        user.name.title.toLowerCase().includes(term) || // Kullanıcı başlığını kontrol eder.
        user.name.first.toLowerCase().includes(term) || // Kullanıcı adını kontrol eder.
        user.name.last.toLowerCase().includes(term) // Kullanıcı soyadını kontrol eder.
    );
    // setFilteredUsers, kullanıcıları filtrelenmiş hale getirerek state değişkenine (filteredUsers) ayarlar.
    // Bu, ekranda sadece filtrelenmiş kullanıcıları göstermek için kullanılır.
    setFilteredUsers(filtered);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search for users..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* {filteredUsers.map((user) => ( ... ))}: Bu JavaScript ifadesi, filteredUsers dizisini haritalar (map) ve her bir kullanıcı için bir <li> öğesi oluşturur.*/}
        <ul className="mt-4">
          {filteredUsers.map((user) => (
            <li key={user.login.uuid} className="border-b py-2">
              {user.name.title} {user.name.first} {user.name.last}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
