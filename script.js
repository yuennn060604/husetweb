// ==========================================
// 1. 表單送出防跳轉與按鈕狀態切換
// ==========================================
let submitted = false;
const form = document.querySelector('.custom-form');

if (form) {
    form.addEventListener('submit', () => {
        submitted = true;
        
        // 抓取送出按鈕
        const submitBtn = form.querySelector('.submit-btn');
        
        // 當使用者點擊送出後，改變按鈕外觀與文字，避免重複點擊
        if (submitBtn) {
            submitBtn.textContent = '表單傳送中...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none'; // 暫時停用按鈕
            
            // 設定 2 秒後恢復原狀，並清空表單
            setTimeout(() => {
                submitBtn.textContent = '送出諮詢';
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'auto';
                form.reset(); // 清空使用者剛剛輸入的內容
            }, 2000);
        }
    });
}

// ==========================================
// 2. 導覽列與按鈕的「平滑捲動」效果
// ==========================================
// 抓取所有 href 屬性以 # 開頭的連結 (包含導覽列和首頁按鈕)
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // 阻止預設的瞬間跳轉行為
        e.preventDefault();
        
        // 取得目標區塊的 ID (例如 #about, #contact)
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // 抓取上方導覽列的高度，避免捲動後標題被導覽列蓋住
            const headerHeight = document.querySelector('header').offsetHeight;
            
            // 計算目標位置 (目標元素距離網頁頂端的高度 - 導覽列高度)
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            // 執行平滑捲動
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});