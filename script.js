const pages = document.querySelectorAll(".page");
function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* DATA SOAL */
let questions = [
    {
        q: "Apa kepanjangan HTML?",
        o: ["Hyper Text Markup Language", "High Tool Machine", "Home Tool Markup", "Hyperlink Test"],
        a: 0
    },
    {
        q: "CSS berfungsi untuk?",
        o: ["Logika", "Database", "Tampilan", "Server"],
        a: 2
    }
];

let index = 0;
let score = 0;
let time = 20;
let timer;

/* ELEMENT */
const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const finalScoreEl = document.getElementById("finalScore");

/* TIMER */
function startTimer() {
    time = 20;
    timerEl.textContent = "Waktu: " + time;

    timer = setInterval(() => {
        time--;
        timerEl.textContent = "Waktu: " + time;

        if (time === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

/* QUIZ */
function startQuiz() {
    index = 0;
    score = 0;
    showPage("quiz");
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    questionEl.textContent = questions[index].q;
    optionBtns.forEach((btn, i) => {
        btn.textContent = questions[index].o[i];
    });
    startTimer();
}

function checkAnswer(choice) {
    if (choice === questions[index].a) {
        score += 20;
    }
    clearInterval(timer);
}

function nextQuestion() {
    index++;
    if (index < questions.length) {
        loadQuestion();
    } else {
        finalScoreEl.textContent = "Skor kamu: " + score;
        showPage("score");
    }
}

/* TAMBAH SOAL */
function addQuestion() {
    const q = document.getElementById("newQuestion").value;
    const o1 = document.getElementById("opt1").value;
    const o2 = document.getElementById("opt2").value;
    const o3 = document.getElementById("opt3").value;
    const o4 = document.getElementById("opt4").value;
    const a = parseInt(document.getElementById("correct").value);

    if (!q || !o1 || !o2 || !o3 || !o4) {
        document.getElementById("info").textContent = "Semua kolom harus diisi!";
        return;
    }

    questions.push({
        q: q,
        o: [o1, o2, o3, o4],
        a: a
    });

    document.getElementById("info").textContent = "Soal berhasil ditambahkan!";
}