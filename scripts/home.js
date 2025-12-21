    // مثال بسيط لتحديث الحالة من API
    // استبدل URL بالـ API الحقيقي لديك أو ببيانات WebSocket
    const API_URL = '/api/server-status'; // ضع هنا رابط الـ API الفعلي

    async function fetchServerStatus(){
      try{
        // مثال: نتوقع رد بالشكل { online: true, players: 12, ip: "play.example", port: 25565 }
        const res = await fetch(API_URL, {cache: "no-store"});
        if(!res.ok) throw new Error('no data');
        const data = await res.json();

        // تحديث الواجهة
        const dot = document.getElementById('status-dot');
        const statusText = document.getElementById('status-text');
        const players = document.getElementById('players');
        const ip = document.getElementById('server-ip');
        const port = document.getElementById('server-port');

        if(data.online){
          dot.classList.remove('offline'); dot.classList.add('online');
          statusText.textContent = 'أونلاين';
        } else {
          dot.classList.remove('online'); dot.classList.add('offline');
          statusText.textContent = 'أوفلاين';
        }

        players.textContent = data.players ?? '0';
        ip.textContent = data.ip ?? ip.textContent;
        port.textContent = data.port ?? port.textContent;

      }catch(err){
        // عند فشل الاتصال نعرض أوفلاين
        document.getElementById('status-dot').classList.remove('online');
        document.getElementById('status-dot').classList.add('offline');
        document.getElementById('status-text').textContent = 'غير متصل';
        document.getElementById('players').textContent = '0';
        // يمكنك تسجيل الخطأ في الكونسول أثناء التطوير
        console.warn('Server status fetch failed', err);
      }
    }

    // تحديث دوري كل 10 ثواني
    fetchServerStatus();
    setInterval(fetchServerStatus, 10000);

    