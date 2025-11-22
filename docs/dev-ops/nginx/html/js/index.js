document.addEventListener("DOMContentLoaded", () => {
    // 1. 轮播图逻辑
    initSwiper();

    // 2. 倒计时逻辑
    initCountdowns();

    // 3. 购买与支付弹窗逻辑
    initPaymentModal();
});

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

// --- 轮播图 ---
function initSwiper() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const pagination = document.querySelector('.swiper-pagination');
    if (!swiperWrapper) return;

    const slides = document.querySelectorAll('.swiper-slide');
    const count = slides.length;
    let currentIndex = 0;

    // 创建分页点
    pagination.innerHTML = '';
    for(let i=0; i<count; i++) {
        const dot = document.createElement('div');
        dot.className = `swiper-dot${i===0 ? ' active' : ''}`;
        pagination.appendChild(dot);
    }

    // 自动轮播
    setInterval(() => {
        currentIndex = (currentIndex + 1) % count;
        swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        document.querySelectorAll('.swiper-dot').forEach((dot, index) => {
            dot.className = `swiper-dot${index === currentIndex ? ' active' : ''}`;
        });
    }, 3000);
}

// --- 倒计时 ---
function initCountdowns() {
    // 工具：解析时间字符串 HH:MM:SS
    const parseTime = (str) => {
        // 这里假设文本格式如 "剩余 00:05:49" 或纯 "00:05:49"
        // 为了简单，我们提取数字
        const timePart = str.match(/(\d{2}):(\d{2}):(\d{2})/);
        if(timePart) {
            return parseInt(timePart[1])*3600 + parseInt(timePart[2])*60 + parseInt(timePart[3]);
        }
        return 300; // 默认5分钟
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `剩余 ${h}:${m}:${s}`;
    };

    const timers = document.querySelectorAll('.countdown-timer');

    timers.forEach(el => {
        let remaining = parseTime(el.textContent);

        const interval = setInterval(() => {
            remaining--;
            if(remaining <= 0) {
                el.textContent = "已结束";
                clearInterval(interval);
            } else {
                el.textContent = formatTime(remaining);
            }
        }, 1000);
    });
}

// --- 支付弹窗逻辑 ---
function initPaymentModal() {
    const modal = document.getElementById("paymentModal");
    const paymentAmount = document.getElementById("paymentAmount");
    const cancelPayment = document.getElementById("cancelPayment");
    const completePayment = document.getElementById("completePayment");

    // 所有的购买/拼单按钮
    const buttons = document.querySelectorAll(".group-btn, .trade-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", function() {
            // 1. 检查登录
            const userId = getCookie("username");
            if (!userId) {
                // 未登录，去登录页
                // 保存当前页面以便回来(可选)，这里直接跳转
                window.location.href = "login.html";
                return;
            }

            // 2. 弹出支付框
            const price = this.getAttribute("data-price");
            paymentAmount.textContent = `支付金额：￥${price}`;
            modal.style.display = "block";
        });
    });

    // 隐藏模态框
    function hideModal() {
        modal.style.display = "none";
    }

    // 绑定关闭事件
    if(cancelPayment) cancelPayment.addEventListener("click", hideModal);

    // 点击遮罩关闭
    const mask = document.querySelector('.modal-mask');
    if(mask) mask.addEventListener("click", hideModal);

    // 支付完成
    if(completePayment) {
        completePayment.addEventListener("click", () => {
            // 模拟结算请求...
            alert("支付成功！开始结算...");
            hideModal();
        });
    }
}