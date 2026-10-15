const moodAdvice = {
  Great: ["It's good to notice what's going well.", "Take a moment to appreciate one thing that helped today. You could share that positive moment with someone you trust."],
  Okay: ["You don't have to feel amazing to be doing okay.", "Keep things simple: drink some water, stretch, or choose one manageable task. Small steps count."],
  Stressed: ["It sounds like you have a lot on your mind.", "Try naming just one thing you can do next. Take a short break, slow your breathing comfortably, and consider talking to someone you trust."],
  Low: ["Thanks for checking in with yourself.", "Be gentle with yourself. Try one basic need—water, food, rest, or company. If this feeling continues or becomes hard to manage, reach out to a trusted adult or counsellor."]
};
document.querySelectorAll(".mood").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mood").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const [title, advice] = moodAdvice[button.dataset.mood];
    document.getElementById("mood-result").innerHTML = `<div class="result-icon">♡</div><div><b>${title}</b><p>${advice}</p></div>`;
  });
});

let breathTimer = null, breathStep = 0;
const breathSteps = [{text:"Breathe in", cls:"expand"},{text:"Breathe out", cls:""}];
document.getElementById("breath-button").addEventListener("click", function(){
  const circle = document.getElementById("breath-circle");
  const label = document.getElementById("breath-text");
  const status = document.getElementById("breath-status");
  if (breathTimer) {
    clearInterval(breathTimer); breathTimer = null;
    circle.classList.remove("expand"); label.textContent = "Ready?"; this.textContent = "Start breathing";
    status.textContent = "Paused. Stop whenever you like."; return;
  }
  this.textContent = "Stop exercise"; status.textContent = "Follow a comfortable rhythm; no need to force your breath.";
  breathStep = 0; label.textContent = breathSteps[0].text; circle.classList.add("expand");
  breathTimer = setInterval(() => {
    breathStep = 1 - breathStep;
    label.textContent = breathSteps[breathStep].text;
    circle.classList.toggle("expand", breathStep === 0);
  }, 4000);
});

document.getElementById("thought-button").addEventListener("click", () => {
  const input = document.getElementById("thought-input");
  const status = document.getElementById("thought-status");
  if (!input.value.trim()) { status.textContent = "Write a short thought first, if you want to."; return; }
  status.textContent = "Saved only in this page for now. Refreshing will clear it.";
  input.style.borderColor = "#75a68e";
});

document.getElementById("task-button").addEventListener("click", () => {
  const task = document.getElementById("task-input").value.trim();
  document.getElementById("task-result").textContent = task
    ? `Try this: spend 5 minutes opening your materials and doing the very first part of “${task}”. After 5 minutes, decide on your next step.`
    : "Enter a task first, such as revising one topic.";
});

const chatMessages = document.getElementById("chat-messages");
function addMessage(text, type) {
  const div = document.createElement("div"); div.className = `bubble ${type}`; div.textContent = text;
  chatMessages.appendChild(div); chatMessages.scrollTop = chatMessages.scrollHeight;
}
function replyTo(message) {
  const m = message.toLowerCase();
  if (/(suicid|kill myself|hurt myself|unsafe|danger)/.test(m)) {
    return "I'm sorry this feels difficult. This demo cannot provide crisis care. Please tell a trusted adult or qualified professional now. In India, you can call Tele-MANAS at 14416 or 1-800-891-4416 for mental-health support. If there is immediate danger, contact local emergency services.";
  }
  if (/(exam|test|marks|study pressure|stress|anxious|overwhelm)/.test(m)) {
    return "Exam pressure can feel heavy. Try making the next step smaller: choose one topic, set a short timer, and take a break afterward. What is one manageable thing you could start with? If the stress keeps affecting you, talk with a trusted adult or counsellor.";
  }
  if (/(focus|distract|concentrat)/.test(m)) {
    return "Try a simple reset: put away one distraction, choose a task you can finish in 5–10 minutes, and keep only the materials you need nearby. A short break can help too. What is the smallest first step?";
  }
  if (/(support|someone|counsell|talk|help)/.test(m)) {
    return "You deserve support from a real person, too. Consider speaking with a trusted friend, family member, teacher, school counsellor, or qualified mental-health professional. You can start with: “I've had a lot on my mind and could use someone to listen.”";
  }
  if (/(sad|low|lonely|bad day|upset)/.test(m)) {
    return "I'm sorry today feels hard. You don't have to fix everything at once. Could you do one kind thing for yourself—drink water, take a break, or sit with someone you trust? If this feeling persists, consider reaching out for support.";
  }
  if (/(thank|thanks)/.test(m)) return "You're welcome. Remember, this is a simple demo, and it's okay to ask a trusted person for help when you need it.";
  return "Thanks for sharing. I can offer general ideas for study stress, focus, and everyday wellness, but I'm not a therapist. Would it help to try a short reset, break a task into smaller steps, or think about who you could talk to?";
}
function sendChat(message) {
  if (!message.trim()) return;
  addMessage(message.trim(), "user");
  document.getElementById("chat-input").value = "";
  setTimeout(() => addMessage(replyTo(message), "bot"), 250);
}
document.getElementById("chat-form").addEventListener("submit", e => { e.preventDefault(); sendChat(document.getElementById("chat-input").value); });
document.querySelectorAll("[data-prompt]").forEach(button => button.addEventListener("click", () => sendChat(button.dataset.prompt)));
