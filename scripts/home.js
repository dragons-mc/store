// 1. تحديث الرابط ليشمل الأي بي والبورت الخاص بسيرفرك
const SERVER_IP = 'de-fra05.altr.cc:25237';
const API_URL = `https://api.mcsrvstat.us/2/${SERVER_IP}`;

async function fetchServerStatus() {
    try {
        // جلب البيانات من الـ API العالمي لماين كرافت
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('no data');
        const data = await res.json();

        // تحديد عناصر الواجهة
        const dot = document.getElementById('status-dot');
        const statusText = document.getElementById('status-text');
        const players = document.getElementById('players');
        const ip = document.getElementById('server-ip');
        const port = document.getElementById('server-port');

        // تحديث الواجهة بناءً على حالة السيرفر (data.online)
        if (data.online) {
            dot.classList.remove('offline');
            dot.classList.add('online');
            statusText.textContent = 'أونلاين';
            
            // في هذا الـ API عدد اللاعبين موجود داخل كائن players
            players.textContent = (data.players && data.players.online) ? data.players.online : '0';
        } else {
            dot.classList.remove('online');
            dot.classList.add('offline');
            statusText.textContent = 'أوفلاين';
            players.textContent = '0';
        }

        // تحديث الأي بي والبورت في الصفحة إذا كانت العناصر موجودة
        if (ip) ip.textContent = data.hostname || SERVER_IP;
        if (port) port.textContent = data.port || '25237';

    } catch (err) {
        // عند فشل الاتصال
        const dot = document.getElementById('status-dot');
        if (dot) {
            dot.classList.remove('online');
            dot.classList.add('offline');
        }
        document.getElementById('status-text').textContent = 'غير متصل';
        document.getElementById('players').textContent = '0';
        console.warn('Server status fetch failed', err);
    }
}

// تشغيل الفحص فور تحميل الصفحة
fetchServerStatus();

// تحديث كل 60 ثانية (يفضل دقيقة لأن الـ API بيعمل Cache للبيانات)
setInterval(fetchServerStatus, 60000);