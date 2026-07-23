let current = 0; // 現在の質問番号
let questions = questionsData; // 質問データ
let misTakes = []; // ミス記録用の配列

//ボタンの機能
document.getElementById("button-start").addEventListener("click", showQuestion);
document.getElementById("button-back").addEventListener("click", back);
document.getElementById("button-restart").addEventListener("click", showStart);
document.getElementById("button-pdf").addEventListener("click", savePDF);

// 画面切り替え
function showScreen(id) {
  document.getElementById("screen-start").style.display = "none";
  document.getElementById("screen-question").style.display = "none";
  document.getElementById("screen-result").style.display = "none";

  document.getElementById(id).style.display = "block";
}

// 開始画面
function showStart() {
  current = 0;
  misTakes = [];
  showScreen("screen-start");
}

showStart();

// 質問画面
function showQuestion() {
  // 質問の読み込み
  const q = questions[current];
  document.getElementById("num").textContent =
    current + 1 + " / " + questions.length;
  document.getElementById("title").textContent = q.title;
  document.getElementById("question").textContent = q.question;
  document.getElementById("question-image").src = q.image;

  // 質問画面の表示
  showScreen("screen-question");
}

// yes、noボタン
function answer(isYes) {
  if (isYes) {
    nextQuestion();
  } else {
    saveMistake();
  }
}

// 次の質問へ
function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 訂正指示の記録
function saveMistake() {
  misTakes.push(questions[current]);
  nextQuestion();
}

// 戻る
function back() {
  // 1問目の場合
  if (current <= 0) {
    showScreen("screen-start");
    return;
  }
  current--;
  showQuestion();
}

// 結果画面
function showResult() {
  showScreen("screen-result");
  const list = document.getElementById("result-list");
  list.innerHTML = "";

  // 訂正なし
  if (misTakes.length === 0) {
    list.innerHTML = "<p>訂正なし</p>";
    return;
  }

  // 訂正あり
  misTakes.forEach((item) => {
    const div = document.createElement("div");
    div.className = "mistake";

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.order}</p>
      <img src="${item.image}" width="300">
    `;

    list.appendChild(div);
  });
}

// PDF保存機能
function savePDF() {
  window.print();
}
