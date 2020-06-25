const e = React.createElement;
const openModalbuttons = document.getElementById('open_modal_buttons');
const questionsRoot = document.getElementById('questions_modal_container');
const messageRoot = document.getElementById('message_modal_container');

function setModalState(mode, props = null) {
  switch (mode) {
    case 'questions':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 100);
      ReactDOM.render(e(ModalQuestions), questionsRoot);
      break;
    case 'question1':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(LivArrangement), questionsRoot);
      break;
    case 'question1Single':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(LivArrangementSingle), questionsRoot);
      break;
    case 'question1Couple':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(LivArrangementCouple), questionsRoot);
      break;
    case 'question1SParent':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(LivArrangementSParent), questionsRoot);
      break;
    case 'question1Nuclear':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(LivArrangementNuclear), questionsRoot);
      break;
    case 'question1Cohousing':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(LivArrangementCohousing), questionsRoot);
      break;
    case 'question1Assisted':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(LivArrangementAssisted), questionsRoot);
      break;
    case 'question1Multi':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(LivArrangementMulti), questionsRoot);
      break;
    case 'question2':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(AgeGroup), questionsRoot);
      break;
    case 'question2Youth':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(AgeGroupYouth), questionsRoot);
      break;
    case 'question2Mid':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(AgeGroupMidlife), questionsRoot);
      break;
    case 'question2Eld':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(AgeGroupElderly), questionsRoot);
      break;
    case 'question3':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(Capacity), questionsRoot);
      break;
    case 'question4':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(Affordable), questionsRoot);
      break;
    case 'question5':
      messageRoot.style.opacity = 0;
      questionsRoot.style.opacity = 0;
      questionsRoot.style.display = 'block';
      setTimeout(function () {
        messageRoot.style.display = 'none';
        questionsRoot.style.opacity = 1;
      }, 0);
      ReactDOM.render(e(Room), questionsRoot);
      break;
    case 'comment':
      questionsRoot.style.opacity = 0;
      messageRoot.style.opacity = 0;
      messageRoot.style.display = 'block';
      setTimeout(function () {
        questionsRoot.style.display = 'none';
        messageRoot.style.opacity = 1;
        if (props == null) {
          toggleMessageTopicsMenu('message_topic_button', true);
          setReply();
        } else setReply(props);
      }, 100);
      break;
    default:
      questionsRoot.style.opacity = 0;
      messageRoot.style, (opacity = 0);
      setTimeout(function () {
        questionsRoot.style.display = 'none';
        messageRoot.style.display = 'none';
      }, 100);
  }
}
setModalState(null);
