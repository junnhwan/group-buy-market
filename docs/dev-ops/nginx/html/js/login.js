document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if(!username || !password) {
            showError("请输入用户名和密码");
            return;
        }

        // 简单模拟登录成功
        errorMessage.style.display = "none";

        // 设置Cookie (有效期为1天)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        document.cookie = `username=${encodeURIComponent(username)}; expires=${expirationDate.toUTCString()}; path=/`;

        // 登录成功动画或提示（可选）
        const btn = document.querySelector('.btn-submit');
        const originalText = btn.innerText;
        btn.innerText = "登录中...";

        setTimeout(() => {
            // 跳转到首页
            window.location.href = "index.html";
        }, 500);
    });

    function showError(msg) {
        errorMessage.innerText = msg;
        errorMessage.style.display = 'block';
    }
});