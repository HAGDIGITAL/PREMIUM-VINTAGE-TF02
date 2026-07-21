window.addEventListener("load", () => {

    const loading = document.getElementById("loadingScreen");

    loading.style.opacity = "0";

    setTimeout(() => {
        loading.style.display = "none";
    }, 500);

});

// ==========================
// COVER CONTENT DELAY
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .querySelector(".cover-content")
            .classList.add("show");

    }, 10800); // 15 detik

});

// ==========================
// COVER
// ==========================

const cover = document.getElementById("cover");
const openBtn = document.getElementById("openInvitation");
const mainContent = document.getElementById("mainContent");
const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

// ⬇️ TARUH DI SINI
gsap.registerPlugin(ScrollTrigger);
// Lock scroll
document.body.classList.add("lock-scroll");

openBtn.addEventListener("click", () => {

    if (openBtn.disabled) return;

    openBtn.disabled = true;

    // tampilkan isi
    mainContent.classList.remove("hidden");

    // Kalau masih pakai video
    if (typeof heroVideo !== "undefined" && heroVideo) {
        heroVideo.style.opacity = "1";

        if (typeof updateVideo === "function") {
            updateVideo(hero, heroVideo);
        }
    }

    // pastikan isi halaman terlihat
    gsap.set(mainContent, {
        opacity: 1
    });

    // animasi hero
    const tl = gsap.timeline();

    tl.from(".hero-img", {
        opacity: 0,
        scale: 0.7,
        y: 120,
        rotate: -8,
        duration: 1.4,
        ease: "elastic.out(1,0.6)"
    })

    .from(".hero-text-content", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power4.out"
    }, "-=0.8")

    .from(".hero-btn", {
        opacity: 0,
        scale: 0,
        duration: 0.7,
        ease: "back.out(2)"
    }, "-=0.5");

    // animasi cover hilang
    gsap.to(cover, {
        yPercent: -100,
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => {
            cover.style.display = "none";
        }
    });

    // buka scroll
    document.body.classList.remove("lock-scroll");

    // play musik
    bgMusic.play().catch(() => {});

    // tombol musik
    gsap.to("#musicButton", {
        opacity: 1,
        visibility: "visible",
        duration: .8
    });

});

gsap.utils.toArray(".reveal").forEach((section) => {

    gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "restart none restart reset"
        }
    });

});

// ==========================
// COPY REKENING
// ==========================

document.querySelectorAll(".copyRekening").forEach((button) => {

    button.addEventListener("click", async () => {

        // Cari nomor rekening di card yang sama
        const card = button.closest(".gift-card");
        const rekening = card.querySelector("h2").textContent.trim();

        try {

            await navigator.clipboard.writeText(rekening);

            const textAwal = button.textContent;

            button.textContent = "✔ Berhasil Disalin";
            button.disabled = true;

            setTimeout(() => {
                button.textContent = textAwal;
                button.disabled = false;
            }, 2000);

        } catch {

            alert("Gagal menyalin nomor rekening.");

        }

    });

});

// ==========================
// COUNTDOWN
// ==========================

const targetDate = new Date("2027-07-01T21:00:00+07:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {

    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {

        clearInterval(countdownInterval);

        daysEl.textContent = "0";
        hoursEl.textContent = "0";
        minutesEl.textContent = "0";
        secondsEl.textContent = "0";

        document.querySelector("#countdown .section-title").textContent =
            "🎉 Acara Sedang Berlangsung";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

}

const countdownInterval = setInterval(updateCountdown, 1000);

updateCountdown();

// ==========================
// NAMA TAMU DARI URL
// ==========================

const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get("to");

const guestName = document.getElementById("guestName");

if (guestName) {

    if (guest) {

        guestName.textContent = decodeURIComponent(guest);

    } else {

        guestName.textContent = "Bapak / Ibu / Saudara(i)";

    }

}

// ==========================
// SAVE THE DATE
// ==========================

const saveDateBtn = document.getElementById("saveDate");

if (saveDateBtn) {

    saveDateBtn.addEventListener("click", () => {

        const title = "Pernikahan Utari & Fajar";
        const location = "MISAL GEDUNG SERBAGUNA TANGERANG";
        const details = "Kami mengundang Anda untuk menghadiri pernikahan Utari & Fajar.";

        const start = "20260705T020000Z";
        const end = "20260705T050000Z";

        const googleCalendarUrl =
            `https://calendar.google.com/calendar/render?action=TEMPLATE` +
            `&text=${encodeURIComponent(title)}` +
            `&dates=${start}/${end}` +
            `&details=${encodeURIComponent(details)}` +
            `&location=${encodeURIComponent(location)}`;

        window.open(googleCalendarUrl, "_blank");

    });

}


//*penggerak*//

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll("h1,h2,h3,h4,p,span,small,img,.btn-primary,.btn-open")
.forEach((el) => {

    if (el.tagName === "IMG") {
        el.classList.add("animate-up");
    }
    else if (el.classList.contains("btn-primary") || el.classList.contains("btn-open")) {
        el.classList.add("animate-right");
    }
    else {
        el.classList.add("animate-left");
    }

    observer.observe(el);
});
musicButton.addEventListener("click", () => {

    if (bgMusic.paused) {

        bgMusic.play();
        musicButton.textContent = "🎵";

    } else {

        bgMusic.pause();
        musicButton.textContent = "🔇";

    }

});

// ==========================================
// RSVP GOOGLE SHEET
// ==========================================
// ==========================================
// RSVP GOOGLE SHEET
// ==========================================

const form = document.getElementById("rsvpForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

const formData = new FormData();

formData.append("nama", document.getElementById("name").value);
formData.append("kehadiran", document.getElementById("attendance").value);
formData.append("jumlah", 1);
formData.append("ucapan", document.getElementById("message").value);
    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxklKPoEWBZ5TIami9xbInIB_rb6c9Ok2VXX36Y7XSDXBTjHHAxGYL6UJF1fTcIns1MfA/exec",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.text();

        alert(result);

        form.reset();

    } catch (err) {

        console.error(err);
        alert("Gagal mengirim RSVP.");

    }

});

// ==========================================
// LOAD UCAPAN
// ==========================================

async function loadComments() {

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxklKPoEWBZ5TIami9xbInIB_rb6c9Ok2VXX36Y7XSDXBTjHHAxGYL6UJF1fTcIns1MfA/exec"
    );

    const data = await response.json();

    const commentList = document.getElementById("commentList");

    commentList.innerHTML = "";

    data.reverse().forEach(item => {

        commentList.innerHTML += `
            <div class="comment-card">
                <h4>${item.nama}</h4>
                <small>${item.kehadiran}</small>
                <p>${item.ucapan}</p>
            </div>
        `;

    });

}

loadComments();
