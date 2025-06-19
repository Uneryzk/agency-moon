// 🎥 Video hızını ayarla (yavaş süzülme)
const bgVideo = document.getElementById("spaceBackground");
if (bgVideo) {
  bgVideo.playbackRate = 0.5;
}

// 🎵 Arka plan sesi (mouse hareketiyle başlar)
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgAudio");

  function enableAudio() {
    audio.volume = 0.04;
    audio.play().then(() => {
      console.log("🎵 Müzik başarıyla başladı");
    }).catch((e) => {
      console.warn("🎵 Ses başlatılamadı:", e);
    });

    document.removeEventListener("click", enableAudio);
  }

  document.addEventListener("click", enableAudio); // 🔑 Kullanıcı tıklarsa çalışır
});

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const msg = document.getElementById("welcomeMessage");
    if (msg) {
      msg.style.opacity = 1;
    }
  }, 2000);
});

// 🌌 Three.js Sahne Kurulumu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2.5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("moonCanvas"),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

// 💡 Işıklandırma
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3); // 🔼 Işık yoğunluğunu artırdık
directionalLight.position.set(3, 0, 1); // 🔼 Daha yukarıdan gelsin ki gölge net olsun
directionalLight.castShadow = true;

// Gölge kalitesini artır
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 10;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;

scene.add(directionalLight);

// Ortam ışığını biraz azalt (gölge daha belirgin olur)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.015);
scene.add(ambientLight);


// 🌕 Ay dokusu ve mesh oluşturma
const loader = new THREE.TextureLoader();
loader.load(
  "assets/moon-texture.jpg",
  function (texture) {
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
  map: texture,
  roughness: 0.8,
  metalness: 0.1,
  color: new THREE.Color(0xF5F5DC),        // 🔸 Krem tonu (bej)
  emissive: new THREE.Color(0x7E7E71),     // 🔸 Hafif parlayan aynı renk
  emissiveIntensity: 0.005                  // 🔸 Çok düşük parlaklık
});

    const moon = new THREE.Mesh(geometry, material);
    moon.castShadow = true;
    moon.receiveShadow = true;
    moon.position.z = -5;
    scene.add(moon);

    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isMouseMoving = false;

    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      isMouseMoving = true;
    });

    document.addEventListener("mouseout", () => {
      isMouseMoving = false;
    });

    const targetZ = 0;
    const duration = 5000;
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      moon.position.z = -5 + (targetZ + 5) * ease;

      if (t >= 1 && moon.position.z < 1.8) {
        moon.position.z += 0.00005;
      }

      moon.rotation.y += 0.0005;

      if (isMouseMoving) {
        const deltaX = mouseX - lastMouseX;
        const deltaY = mouseY - lastMouseY;
        moon.rotation.y += deltaX * 0.09;
        moon.rotation.x += deltaY * 0.09;
      } else {
        moon.rotation.y += 0.00015;
        moon.rotation.x += 0.00015;
      }

      lastMouseX = mouseX;
      lastMouseY = mouseY;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  },
  undefined,
  (error) => {
    console.error("❌ Ay dokusu yüklenemedi:", error);
  }
);

function typeText(element, text, speed = 40, callback = null) {
  let i = 0;
  element.textContent = "";
  const typer = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typer);
      if (callback) callback();
    }
  }, speed);
}

window.addEventListener("DOMContentLoaded", () => {
  const msg1 = document.getElementById("welcomeMessageBox");
  const msg2 = document.getElementById("secondMessageBox");
  const msg3 = document.getElementById("thirdMessageBox");
  const msg4 = document.getElementById("fourthMessageBox");
  const msg5 = document.getElementById("fifthMessageBox");
  const msg6 = document.getElementById("sixthMessageBox");
  const msg7 = document.getElementById("seventhMessageBox");
  const msg8 = document.getElementById("eighthMessageBox");

  // 1. mesaj
  setTimeout(() => {
    msg1.textContent = "Merhaba Moon'a Hoşgeldiniz.";
    msg1.style.opacity = 1;
  }, 2000);

  // 1. mesaj silinsin
  setTimeout(() => {
    msg1.style.opacity = 0;
  }, 6000);

  // 2. mesaj
  setTimeout(() => {
    msg2.textContent = "Size nasıl yardımcı olabilirim?";
    msg2.style.opacity = 1;
  }, 7000);

  // 2. mesaj yukarı kaydırılsın
  setTimeout(() => {
    msg2.style.bottom = "165px";
  }, 9000);

  // 2. mesaj silinsin
  setTimeout(() => {
    msg2.style.opacity = 0;
  }, 14000);

  // 3. mesaj
  setTimeout(() => {
    msg3.textContent = "İstersen sana Baskı Cozumleri sunabilirim.";
    msg3.style.opacity = 1;
  }, 9500);

  // 3. mesaj silinsin
  setTimeout(() => {
    msg3.style.opacity = 0;
  }, 14000);

  // 4. mesaj
  setTimeout(() => {
    msg4.textContent = "Baskı işlerinin metre kare hesabını yapabilirim.";
    msg4.style.opacity = 1;
    msg4.style.bottom = "50px";
  }, 14500);

  // 4. mesaj silinsin
  setTimeout(() => {
    msg4.style.opacity = 0;
  }, 20000);

  // 5. mesaj
  setTimeout(() => {
    msg5.textContent = "Bana cm olarak (en x boy) olcunu yaz.";
    msg5.style.opacity = 1;
    msg5.style.bottom = "50px";
  }, 22000);

  // 5. mesaj yukarı kaydırılsın
  setTimeout(() => {
    msg5.style.bottom = "200px";
  }, 24000);

  // 5. mesaj silinsin
  setTimeout(() => {
    msg5.style.opacity = 0;
  }, 50000);

  // 6. mesaj: Hesaplama kutusu
  setTimeout(() => {
    msg6.style.opacity = 1;
    msg6.style.bottom = "50px";
  }, 25000);
});

function calculateM2() {
  const inputField = document.getElementById("sizeInput");
  const input = inputField.value.trim();
  const resultBox = document.getElementById("seventhMessageBox");
  const msg6 = document.getElementById("sixthMessageBox");
  const msg5 = document.getElementById("fifthMessageBox");
  const msg8 = document.getElementById("eighthMessageBox");

  // 5. mesajı gizle
  msg5.style.opacity = 0;

  const match = input.match(/^(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)$/);
  if (!match) {
    resultBox.textContent = "⚠️ Lütfen '256x127' formatında girin.";
    resultBox.style.opacity = 1;
    return;
  }

  // 6. kutuyu yukarı taşı ve gizle
  msg6.style.bottom = "130px";
  msg6.style.opacity = 0;

  // 7. kutuyu göster
  setTimeout(() => {
    const width = parseFloat(match[1]);
    const height = parseFloat(match[2]);
    const cm2 = width * height;
    const m2 = (cm2 / 10000).toFixed(2);

    resultBox.textContent = `🚀 Hesaplanan Alan: ${m2} m²`;
    resultBox.style.bottom = "70px";
    resultBox.style.opacity = 1;

    // 5 saniye sonra 7. mesajı gizle
    setTimeout(() => {
      resultBox.style.opacity = 0;
    }, 5000);

    // 6 saniye sonra 8. kutuyu göster
    setTimeout(() => {
   msg8.innerHTML = `
  <div style="font-family: 'ShareTechMono', monospace; font-size: 15px; line-height: 1.6; color: #00f0ff;">
    Baktığın iş ve tekliflerimiz için<br>
    <a href="mailto:info@agency-moon.com" style="color:#00f0ff; text-decoration:underline;">
      <strong>info@agency-moon.com</strong>
    </a><br><br>
    <a href="https://wa.me/905358193446" target="_blank" style="color:#00f0ff; text-decoration:underline; font-weight: 600;">
      Hemen tıkla ve WhatsApp canlı destek
    </a>
  </div>`;
      msg8.style.opacity = 1;
      msg8.style.bottom = "70px";
    }, 6000);

  }, 1200); // 7. kutunun gecikmesi
}

// ✅ Enter tuşu ile çalıştır
document.getElementById("sizeInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateM2();
  }
});

// ✅ Butona tıklama ile çalıştır
document.getElementById("calculateBtn").addEventListener("click", function () {
  calculateM2();
});
setTimeout(() => {
  document.getElementById("welcome").classList.add("welcome-move-up");
}, 5000); // Blur'dan sonra 2s sonra yukarı
